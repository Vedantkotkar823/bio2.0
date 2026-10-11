import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MATERIALS } from '../data/scienceData';
import { calculateStressAtStrain, calculateToughnessUpToStrain } from '../utils/calculations';
import { Play, Pause, RotateCcw, Sliders, Info, Zap } from 'lucide-react';

export const StressStrainAnalyzer: React.FC = () => {
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<string[]>([
    'dragline-silk',
    'kevlar-29',
    'high-tensile-steel',
    'carbon-fiber'
  ]);
  const [strainPct, setStrainPct] = useState<number>(18); // 0 to 40%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const animFrameRef = useRef<number | null>(null);

  // Auto-Pull Tensile Test Animation Engine
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setStrainPct(prev => {
        const next = prev + delta * 6 * playbackSpeed;
        if (next >= 40) {
          setIsPlaying(false);
          return 40;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const toggleMaterial = (id: string) => {
    setSelectedMaterialIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // Keep at least one selected
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const activeMaterials = useMemo(() => {
    return MATERIALS.filter(m => selectedMaterialIds.includes(m.id));
  }, [selectedMaterialIds]);

  // Chart coordinates
  const svgWidth = 720;
  const svgHeight = 400;
  const margin = { top: 35, right: 35, bottom: 60, left: 70 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Max scales
  const maxStressScale = 3800; // MPa
  const maxStrainScale = 0.40;  // 40% strain (0.40)

  const toX = (strain: number) => margin.left + (strain / maxStrainScale) * plotWidth;
  const toY = (stress: number) => margin.top + plotHeight - (stress / maxStressScale) * plotHeight;

  // Generate SVG paths for each active material
  const materialPaths = useMemo(() => {
    return activeMaterials.map(mat => {
      const maxStrain = mat.breakingStrainPct / 100;
      const points: { x: number; y: number }[] = [];
      const numSteps = 70;
      const step = Math.min(maxStrain, maxStrainScale) / numSteps;

      for (let i = 0; i <= numSteps; i++) {
        const s = i * step;
        const stress = calculateStressAtStrain(mat, s);
        points.push({ x: toX(s), y: toY(stress) });
      }

      const pathData = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      
      // Calculate shaded area up to current slider strain
      const currentStrainDecimal = strainPct / 100;
      const currentCappedStrain = Math.min(currentStrainDecimal, maxStrain);
      const areaPoints: { x: number; y: number }[] = [];
      const areaSteps = 40;
      const areaStep = currentCappedStrain / areaSteps;

      for (let i = 0; i <= areaSteps; i++) {
        const s = i * areaStep;
        const stress = calculateStressAtStrain(mat, s);
        areaPoints.push({ x: toX(s), y: toY(stress) });
      }

      let areaPathData = '';
      if (areaPoints.length > 0) {
        areaPathData = `M ${toX(0)} ${toY(0)} ` +
          areaPoints.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
          ` L ${toX(currentCappedStrain)} ${toY(0)} Z`;
      }

      const stressAtCurrentStrain = calculateStressAtStrain(mat, currentStrainDecimal);
      const toughnessAbsorbed = calculateToughnessUpToStrain(mat, currentStrainDecimal);
      const isBroken = currentStrainDecimal > maxStrain;

      // Active point on curve
      const activeX = toX(currentCappedStrain);
      const activeY = toY(isBroken ? 0 : stressAtCurrentStrain);

      return {
        material: mat,
        pathData,
        areaPathData,
        stressAtCurrentStrain,
        toughnessAbsorbed,
        isBroken,
        activePoint: { x: activeX, y: activeY },
        breakPoint: {
          x: toX(Math.min(maxStrain, maxStrainScale)),
          y: toY(calculateStressAtStrain(mat, Math.min(maxStrain, maxStrainScale)))
        }
      };
    });
  }, [activeMaterials, strainPct]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (strainPct >= 40) {
      setStrainPct(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStrainPct(0);
  };

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '2rem 2.25rem', 
        margin: '2rem 0',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        background: 'linear-gradient(135deg, rgba(3, 7, 18, 0.98) 0%, rgba(0, 0, 0, 1) 100%)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 229, 255, 0.08)'
      }} 
      id="stress-strain-analyzer"
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge-pill badge-emerald">
              <Zap size={13} /> DYNAMIC TENSILE ENGINE
            </span>
            <span className="badge-pill badge-cyan">
              AREA = WORK OF FRACTURE (TOUGHNESS)
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Biomechanical Constitutive Stress-Strain Simulator
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
            Live numerical deformation test comparing spider silk toughness against synthetic aramids and structural steel.
          </p>
        </div>

        {/* Material Selection Toggles */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          {MATERIALS.map(mat => {
            const isSelected = selectedMaterialIds.includes(mat.id);
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => toggleMaterial(mat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: isSelected ? `${mat.color}25` : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? mat.color : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? mat.color : 'var(--border-subtle)'}`,
                  boxShadow: isSelected ? `0 0 10px ${mat.color}33` : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                aria-pressed={isSelected}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: mat.color, boxShadow: isSelected ? `0 0 6px ${mat.color}` : 'none' }}></span>
                {mat.name.split('(')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Tensile Pull Controls & Gauge */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1.75rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        alignItems: 'center'
      }}>
        {/* Left: Playback & Animated Pull Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-emerald"
            onClick={handleTogglePlay}
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: isPlaying ? '0 0 15px rgba(0, 255, 170, 0.4)' : 'none'
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause Tensile Test' : strainPct >= 40 ? 'Restart Pull Test' : 'Run Tensile Pull Test'}
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={handleReset}
            title="Reset strain to 0%"
            style={{ padding: '0.55rem', borderRadius: 'var(--radius-md)' }}
          >
            <RotateCcw size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Speed:</span>
            {[1, 2].map(speed => (
              <button
                key={speed}
                type="button"
                onClick={() => setPlaybackSpeed(speed)}
                style={{
                  background: playbackSpeed === speed ? 'var(--silk-cyan)' : 'transparent',
                  color: playbackSpeed === speed ? '#050a14' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  cursor: 'pointer'
                }}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Center: Live Strain Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={16} color="var(--silk-cyan)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Applied Strain (ε):</span>
            </div>
            <span style={{
              fontSize: '1.15rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--silk-cyan)',
              background: 'rgba(0, 229, 255, 0.1)',
              padding: '0.15rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(0, 229, 255, 0.25)'
            }}>
              {strainPct.toFixed(1)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="40"
            step="0.2"
            value={strainPct}
            onChange={(e) => {
              setIsPlaying(false);
              setStrainPct(parseFloat(e.target.value));
            }}
            style={{
              width: '100%',
              accentColor: 'var(--silk-cyan)',
              cursor: 'pointer'
            }}
            id="strain-slider"
            aria-label="Applied Tensile Strain Slider"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            <span>0% Unloaded</span>
            <span>Carbon Snap (1.5%)</span>
            <span>Kevlar Snap (3.5%)</span>
            <span>Steel Yield (8%)</span>
            <span style={{ color: 'var(--silk-emerald)', fontWeight: 700 }}>Silk Max (35%)</span>
          </div>
        </div>
      </div>

      {/* SVG Chart & Live Telemetry Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(280px, 1.2fr)', gap: '1.75rem', alignItems: 'start' }}>
        {/* SVG Stress Strain Chart with AMOLED Bioluminescent Aesthetics */}
        <div style={{
          background: 'rgba(2, 6, 14, 0.92)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          overflowX: 'auto'
        }}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            role="img"
            aria-label="Constitutive Stress vs Strain Chart for Spider Silk and Engineering Materials"
          >
            <defs>
              {/* Glowing Gradients for Toughness Integration Areas */}
              <linearGradient id="area-grad-dragline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ffaa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00ffaa" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="area-grad-kevlar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="area-grad-steel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="area-grad-carbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="area-grad-nylon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.02" />
              </linearGradient>

              {/* Glowing Filter for Curves */}
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid Lines */}
            {[0, 1000, 2000, 3000].map(s => (
              <g key={`grid-y-${s}`}>
                <line
                  x1={margin.left}
                  y1={toY(s)}
                  x2={svgWidth - margin.right}
                  y2={toY(s)}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="4 4"
                />
                <text
                  x={margin.left - 12}
                  y={toY(s) + 4}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                >
                  {s}
                </text>
              </g>
            ))}

            {[0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40].map(s => (
              <g key={`grid-x-${s}`}>
                <line
                  x1={toX(s)}
                  y1={margin.top}
                  x2={toX(s)}
                  y2={margin.top + plotHeight}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="4 4"
                />
                <text
                  x={toX(s)}
                  y={margin.top + plotHeight + 20}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {(s * 100).toFixed(0)}%
                </text>
              </g>
            ))}

            {/* Axes */}
            <line
              x1={margin.left}
              y1={margin.top + plotHeight}
              x2={svgWidth - margin.right}
              y2={margin.top + plotHeight}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />
            <line
              x1={margin.left}
              y1={margin.top}
              x2={margin.left}
              y2={margin.top + plotHeight}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Axis Labels */}
            <text
              x={margin.left + plotWidth / 2}
              y={svgHeight - 15}
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
              letterSpacing="0.04em"
            >
              Tensile Strain ε (%)
            </text>
            <text
              x={- (margin.top + plotHeight / 2)}
              y={20}
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
              transform="rotate(-90)"
              letterSpacing="0.04em"
            >
              Tensile Stress σ (MPa)
            </text>

            {/* Shaded Areas representing Work of Fracture (Toughness) with Gradient Fills */}
            {materialPaths.map(mp => {
              const gradId = 
                mp.material.id === 'dragline-silk' ? 'url(#area-grad-dragline)' :
                mp.material.id === 'kevlar-29' ? 'url(#area-grad-kevlar)' :
                mp.material.id === 'high-tensile-steel' ? 'url(#area-grad-steel)' :
                mp.material.id === 'carbon-fiber' ? 'url(#area-grad-carbon)' : 'url(#area-grad-nylon)';

              return (
                <path
                  key={`area-${mp.material.id}`}
                  d={mp.areaPathData}
                  fill={gradId}
                  style={{ transition: isPlaying ? 'none' : 'd 0.1s ease' }}
                />
              );
            })}

            {/* Material Curves with Neon Bioluminescent Stroke */}
            {materialPaths.map(mp => (
              <g key={`curve-${mp.material.id}`}>
                {/* Glow underlay */}
                <path
                  d={mp.pathData}
                  fill="none"
                  stroke={mp.material.color}
                  strokeWidth="6"
                  opacity="0.25"
                  strokeLinecap="round"
                />
                {/* Main sharp curve */}
                <path
                  d={mp.pathData}
                  fill="none"
                  stroke={mp.material.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Fracture Marker */}
                <circle
                  cx={mp.breakPoint.x}
                  cy={mp.breakPoint.y}
                  r="5"
                  fill={mp.material.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ filter: `drop-shadow(0 0 6px ${mp.material.color})` }}
                />
                <text
                  x={mp.breakPoint.x + 8}
                  y={mp.breakPoint.y - 4}
                  fill={mp.material.color}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  ✕ {mp.material.name.split('(')[0].trim()}
                </text>

                {/* Animated Particle Bead at current strain cursor along the active curve */}
                {!mp.isBroken && (
                  <circle
                    cx={mp.activePoint.x}
                    cy={mp.activePoint.y}
                    r="5"
                    fill="#ffffff"
                    stroke={mp.material.color}
                    strokeWidth="2.5"
                    style={{ filter: `drop-shadow(0 0 8px ${mp.material.color})` }}
                  />
                )}
              </g>
            ))}

            {/* Vertical Strain Cursor (Active Test Line) */}
            <line
              x1={toX(strainPct / 100)}
              y1={margin.top}
              x2={toX(strainPct / 100)}
              y2={margin.top + plotHeight}
              stroke="var(--silk-cyan)"
              strokeWidth="2"
              strokeDasharray="4 3"
              style={{ filter: 'drop-shadow(0 0 6px var(--silk-cyan))' }}
            />
            <circle
              cx={toX(strainPct / 100)}
              cy={margin.top + plotHeight}
              r="5"
              fill="var(--silk-cyan)"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Live Material Telemetry Cards with Dynamic Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Key Insight Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 170, 0.08) 0%, rgba(0, 229, 255, 0.08) 100%)',
            border: '1px solid rgba(0, 255, 170, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.15rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--silk-emerald)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
              <Info size={16} /> MBA TECH BIOMECHANICAL INSIGHT
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.55, color: '#e2e8f0', margin: 0 }}>
              <strong>Toughness = Area under the curve:</strong> Although Kevlar exhibits high peak tensile strength (2,800 MPa), its brittle elongation limit (3.5%) restricts its energy absorption. Spider silk stretches 10x further while maintaining gigapascal strength, capturing <strong>3.2x more kinetic impact energy</strong> before rupture.
            </p>
          </div>

          {/* Real-time Cards for Each Material */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {materialPaths.map(mp => (
              <div
                key={`telemetry-${mp.material.id}`}
                style={{
                  background: mp.isBroken ? 'rgba(239, 68, 68, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${mp.isBroken ? 'rgba(239, 68, 68, 0.35)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: mp.material.color,
                      boxShadow: !mp.isBroken ? `0 0 6px ${mp.material.color}` : 'none'
                    }} />
                    <strong style={{ fontSize: '0.88rem', color: '#ffffff' }}>{mp.material.name}</strong>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Modulus: {mp.material.youngsModulusGPa} GPa • Max Strain: {mp.material.breakingStrainPct}%
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {mp.isBroken ? (
                    <div>
                      <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                        ⚡ FRACTURED
                      </span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        Snapped at {mp.material.breakingStrainPct}%
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: mp.material.color }}>
                        {Math.round(mp.stressAtCurrentStrain)} MPa
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--silk-emerald)', fontFamily: 'var(--font-mono)' }}>
                        Energy: <strong>{mp.toughnessAbsorbed}</strong> MJ/m³
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
