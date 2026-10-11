import React, { useState, useMemo, useEffect } from 'react';
import { 
  Layers, 
  Sliders, 
  Compass, 
  Activity,
  DollarSign,
  Play,
  Pause,
  Sparkles
} from 'lucide-react';

/* =========================================================================
   1. DATA & LOGIC: BIOMATERIAL RADAR / SPIDER GRAPH
   ========================================================================= */

interface RadarMaterial {
  id: string;
  name: string;
  category: 'Natural Silk' | 'Synthetic / Engineered' | 'Conventional Engineering';
  color: string;
  // Normalized 0 - 100 for radar plotting
  normalized: {
    strength: number;      // Tensile strength
    extensibility: number; // Strain at break
    toughness: number;     // Work of fracture
    stiffness: number;     // Young's modulus
    weightEfficiency: number; // Specific strength (strength/density)
    damping: number;       // Energy dissipation / hysteresis
  };
  // Real physical values
  actual: {
    strength: string;      // MPa
    extensibility: string; // %
    toughness: string;     // MJ/m³
    stiffness: string;     // GPa
    density: string;       // g/cm³
    damping: string;       // %
  };
}

const RADAR_MATERIALS: RadarMaterial[] = [
  {
    id: 'dragline',
    name: 'Major Ampullate Dragline Silk',
    category: 'Natural Silk',
    color: '#00ffaa',
    normalized: {
      strength: 72,
      extensibility: 68,
      toughness: 98,
      stiffness: 42,
      weightEfficiency: 88,
      damping: 94
    },
    actual: {
      strength: '1,400 MPa',
      extensibility: '35%',
      toughness: '160 MJ/m³',
      stiffness: '11 GPa',
      density: '1.34 g/cm³',
      damping: '65% hysteresis'
    }
  },
  {
    id: 'flagelliform',
    name: 'Flagelliform Silk (Capture Spiral)',
    category: 'Natural Silk',
    color: '#00e5ff',
    normalized: {
      strength: 48,
      extensibility: 100,
      toughness: 92,
      stiffness: 15,
      weightEfficiency: 65,
      damping: 80
    },
    actual: {
      strength: '1,000 MPa',
      extensibility: '270%',
      toughness: '150 MJ/m³',
      stiffness: '3 GPa',
      density: '1.30 g/cm³',
      damping: '55% hysteresis'
    }
  },
  {
    id: 'recombinant',
    name: 'Recombinant Spidroin (Synthetic)',
    category: 'Synthetic / Engineered',
    color: '#ffb703',
    normalized: {
      strength: 58,
      extensibility: 55,
      toughness: 76,
      stiffness: 38,
      weightEfficiency: 72,
      damping: 75
    },
    actual: {
      strength: '1,100 MPa',
      extensibility: '28%',
      toughness: '120 MJ/m³',
      stiffness: '9 GPa',
      density: '1.34 g/cm³',
      damping: '50% hysteresis'
    }
  },
  {
    id: 'kevlar',
    name: 'Kevlar 29 Aramid Fiber',
    category: 'Conventional Engineering',
    color: '#f97316',
    normalized: {
      strength: 95,
      extensibility: 12,
      toughness: 42,
      stiffness: 82,
      weightEfficiency: 95,
      damping: 20
    },
    actual: {
      strength: '3,000 MPa',
      extensibility: '3.5%',
      toughness: '50 MJ/m³',
      stiffness: '70 GPa',
      density: '1.44 g/cm³',
      damping: '12% hysteresis'
    }
  },
  {
    id: 'carbon',
    name: 'Carbon Fiber (T300 High Modulus)',
    category: 'Conventional Engineering',
    color: '#94a3b8',
    normalized: {
      strength: 100,
      extensibility: 6,
      toughness: 20,
      stiffness: 100,
      weightEfficiency: 98,
      damping: 8
    },
    actual: {
      strength: '3,500 MPa',
      extensibility: '1.5%',
      toughness: '25 MJ/m³',
      stiffness: '230 GPa',
      density: '1.76 g/cm³',
      damping: '5% hysteresis'
    }
  },
  {
    id: 'steel',
    name: 'ASTM A514 High-Yield Steel',
    category: 'Conventional Engineering',
    color: '#a855f7',
    normalized: {
      strength: 42,
      extensibility: 38,
      toughness: 48,
      stiffness: 94,
      weightEfficiency: 18,
      damping: 15
    },
    actual: {
      strength: '760 MPa',
      extensibility: '18%',
      toughness: '60 MJ/m³',
      stiffness: '205 GPa',
      density: '7.85 g/cm³',
      damping: '10% hysteresis'
    }
  }
];

const RADAR_AXES = [
  { key: 'strength', label: 'Tensile Strength', unit: 'MPa' },
  { key: 'extensibility', label: 'Extensibility', unit: '%' },
  { key: 'toughness', label: 'Toughness (Work)', unit: 'MJ/m³' },
  { key: 'stiffness', label: 'Stiffness (Modulus)', unit: 'GPa' },
  { key: 'weightEfficiency', label: 'Specific Strength', unit: 'kN·m/kg' },
  { key: 'damping', label: 'Hysteresis Damping', unit: '%' }
];

/* =========================================================================
   2. COMPONENT: BIOMATERIAL RADAR / SPIDER CHART
   ========================================================================= */

export const BiomaterialRadarChart: React.FC = () => {
  const [activeMaterialIds, setActiveMaterialIds] = useState<string[]>([
    'dragline',
    'flagelliform',
    'kevlar',
    'recombinant'
  ]);
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('dragline');
  const [glycineSlider, setGlycineSlider] = useState<number>(50); // Custom Tuning
  const [isCycling, setIsCycling] = useState<boolean>(false);

  // Auto-Cycle Materials Animation
  useEffect(() => {
    if (!isCycling) return;
    const interval = setInterval(() => {
      setSelectedMaterialId(prev => {
        const idx = RADAR_MATERIALS.findIndex(m => m.id === prev);
        const nextIdx = (idx + 1) % RADAR_MATERIALS.length;
        const nextId = RADAR_MATERIALS[nextIdx].id;
        setActiveMaterialIds(curr => curr.includes(nextId) ? curr : [...curr, nextId]);
        return nextId;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [isCycling]);

  const toggleMaterial = (id: string) => {
    setActiveMaterialIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(m => m !== id) : prev) 
        : [...prev, id]
    );
  };

  // Center coordinates & radius for SVG
  const cx = 200;
  const cy = 200;
  const radius = 140;
  const numAxes = RADAR_AXES.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Compute point for a given axis index and normalized value (0-100)
  const getCoordinates = (axisIndex: number, value: number) => {
    const angle = axisIndex * angleStep - Math.PI / 2; // start at top
    const r = (value / 100) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  // Dynamically recalculate real mechanical values when user tunes recombinant spidroin!
  const selectedMaterial = useMemo(() => {
    const base = RADAR_MATERIALS.find(m => m.id === selectedMaterialId) || RADAR_MATERIALS[0];
    if (base.id === 'recombinant') {
      const fraction = (glycineSlider - 10) / 80; // 0 to 1
      const strengthVal = Math.round(1550 - fraction * 760); // 1550 -> 790 MPa
      const extensibilityVal = Math.round(12 + fraction * 36); // 12% -> 48%
      const stiffnessVal = (17.0 - fraction * 12.8).toFixed(1); // 17.0 -> 4.2 GPa
      const dampingVal = Math.round(28 + fraction * 42); // 28% -> 70%
      const toughnessVal = Math.round(85 + Math.sin(fraction * Math.PI) * 65); // 85 -> 150 -> 110 MJ/m³
      
      return {
        ...base,
        actual: {
          strength: `${strengthVal.toLocaleString()} MPa`,
          extensibility: `${extensibilityVal}%`,
          toughness: `${toughnessVal} MJ/m³`,
          stiffness: `${stiffnessVal} GPa`,
          density: '1.34 g/cm³',
          damping: `${dampingVal}% hysteresis`
        }
      };
    }
    return base;
  }, [selectedMaterialId, glycineSlider]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
      alignItems: 'center'
    }}>
      {/* SVG Radar Chart Display */}
      <div style={{
        background: 'rgba(2, 6, 14, 0.92)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(0, 229, 255, 0.05)'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--silk-cyan)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            6-Axis Radar Matrix
          </span>

          <button
            type="button"
            onClick={() => setIsCycling(prev => !prev)}
            style={{
              background: isCycling ? 'rgba(0, 255, 170, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${isCycling ? 'var(--silk-emerald)' : 'rgba(255, 255, 255, 0.15)'}`,
              color: isCycling ? 'var(--silk-emerald)' : '#ffffff',
              borderRadius: 'var(--radius-full)',
              padding: '0.25rem 0.65rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease'
            }}
          >
            {isCycling ? <Pause size={12} /> : <Play size={12} />}
            {isCycling ? 'Pause Cycle' : 'Auto-Cycle'}
          </button>
        </div>

        <svg 
          viewBox="0 0 400 400" 
          style={{ width: '100%', maxWidth: '380px', height: 'auto', overflow: 'visible' }}
          role="img"
          aria-label="Multi-axis biomechanical radar chart comparing spider silk to engineered fibers"
        >
          {/* Concentric Grid Polygons (20%, 40%, 60%, 80%, 100%) */}
          {[20, 40, 60, 80, 100].map(level => {
            const points = RADAR_AXES.map((_, i) => {
              const { x, y } = getCoordinates(i, level);
              return `${x},${y}`;
            }).join(' ');

            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth={level === 100 ? '1.5' : '1'}
                strokeDasharray={level === 100 ? 'none' : '3 3'}
              />
            );
          })}

          {/* Radial Spokes from Center */}
          {RADAR_AXES.map((axis, i) => {
            const { x, y } = getCoordinates(i, 100);
            const isHovered = hoveredAxis === axis.key;
            return (
              <g key={axis.key}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={isHovered ? 'var(--silk-cyan)' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isHovered ? '2' : '1'}
                />
              </g>
            );
          })}

          {/* Render Material Polygons */}
          {RADAR_MATERIALS.map(mat => {
            if (!activeMaterialIds.includes(mat.id)) return null;

            // Dynamically modulate recombinant synthetic properties with slider
            const values = { ...mat.normalized };
            if (mat.id === 'recombinant') {
              // Higher glycine = more extensibility & damping, slightly lower tensile
              const shift = (glycineSlider - 50) / 100;
              values.extensibility = Math.min(100, Math.max(10, values.extensibility + shift * 30));
              values.damping = Math.min(100, Math.max(10, values.damping + shift * 20));
              values.strength = Math.min(100, Math.max(10, values.strength - shift * 20));
              values.stiffness = Math.min(100, Math.max(10, values.stiffness - shift * 15));
            }

            const points = RADAR_AXES.map((axis, i) => {
              const val = values[axis.key as keyof typeof values];
              const { x, y } = getCoordinates(i, val);
              return `${x},${y}`;
            }).join(' ');

            const isSelected = selectedMaterialId === mat.id;

            return (
              <g key={mat.id}>
                {/* Translucent Fill */}
                <polygon
                  points={points}
                  fill={mat.color}
                  fillOpacity={isSelected ? 0.28 : 0.08}
                  stroke={mat.color}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  style={{
                    filter: isSelected ? `drop-shadow(0 0 6px ${mat.color})` : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedMaterialId(mat.id)}
                />

                {/* Vertex Markers */}
                {RADAR_AXES.map((axis, i) => {
                  const val = values[axis.key as keyof typeof values];
                  const { x, y } = getCoordinates(i, val);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isSelected ? 4 : 2.5}
                      fill={mat.color}
                      stroke="#050a14"
                      strokeWidth={1.5}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axis Labels outside perimeter */}
          {RADAR_AXES.map((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 24;
            const lx = cx + labelRadius * Math.cos(angle);
            const ly = cy + labelRadius * Math.sin(angle);
            const isHovered = hoveredAxis === axis.key;

            return (
              <text
                key={axis.key}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? 'var(--silk-cyan)' : '#94a3b8'}
                fontSize="11"
                fontWeight={isHovered ? '700' : '500'}
                fontFamily="var(--font-sans)"
                style={{ cursor: 'pointer', transition: 'fill 0.15s ease' }}
                onMouseEnter={() => setHoveredAxis(axis.key)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                {axis.label}
              </text>
            );
          })}
        </svg>

        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          💡 Click any material polygon or badge to isolate metrics.
        </div>
      </div>

      {/* Controls & Metrics Readout Card */}
      <div>
        {/* Material Toggles */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.6rem', fontWeight: 600 }}>
            Active Comparison Layers (Toggle On / Off):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {RADAR_MATERIALS.map(mat => {
              const isActive = activeMaterialIds.includes(mat.id);
              const isSelected = selectedMaterialId === mat.id;

              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => {
                    toggleMaterial(mat.id);
                    setSelectedMaterialId(mat.id);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    border: `1px solid ${isSelected ? mat.color : isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: mat.color,
                    boxShadow: isActive ? `0 0 6px ${mat.color}` : 'none'
                  }} />
                  {mat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Material Card */}
        <div style={{
          background: 'rgba(5, 12, 24, 0.95)',
          border: `1px solid ${selectedMaterial.color}`,
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: `0 0 25px rgba(0, 0, 0, 0.9), 0 0 15px ${selectedMaterial.color}33`,
          marginBottom: '1.25rem',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: selectedMaterial.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}>
                  {selectedMaterial.category}
                </span>
                {selectedMaterial.id === 'recombinant' && (
                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--silk-amber)',
                    background: 'rgba(255, 183, 3, 0.15)',
                    border: '1px solid var(--silk-amber)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Sparkles size={10} /> Live Tuned ({glycineSlider}%)
                  </span>
                )}
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 800, margin: '0.15rem 0 0' }}>
                {selectedMaterial.name}
              </h4>
            </div>
            <span style={{
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              Density: {selectedMaterial.actual.density}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.6rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Tensile Strength</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: selectedMaterial.id === 'recombinant' ? 'var(--silk-amber)' : '#ffffff' }}>
                {selectedMaterial.actual.strength}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Extensibility</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: selectedMaterial.id === 'recombinant' ? 'var(--silk-cyan)' : '#ffffff' }}>
                {selectedMaterial.actual.extensibility}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Work of Fracture</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--silk-emerald)' }}>
                {selectedMaterial.actual.toughness}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Young’s Modulus</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: selectedMaterial.id === 'recombinant' ? 'var(--silk-amber)' : '#ffffff' }}>
                {selectedMaterial.actual.stiffness}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Damping Capacity</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--silk-cyan)' }}>
                {selectedMaterial.actual.damping}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Energy Damping</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Non-catastrophic</div>
            </div>
          </div>
        </div>

        {/* Live Recombinant Synthesis Tuning Slider */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 183, 3, 0.35)',
          borderRadius: 'var(--radius-sm)',
          padding: '1.1rem',
          boxShadow: '0 0 15px rgba(255, 183, 3, 0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={14} color="var(--silk-amber)" /> Genetic Tuning: Glycine vs Poly-Alanine Ratio
            </span>
            <span style={{
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--silk-amber)',
              background: 'rgba(255, 183, 3, 0.1)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 183, 3, 0.3)'
            }}>
              {glycineSlider}% Glycine Rich
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={glycineSlider}
            onChange={(e) => {
              const val = Number(e.target.value);
              setGlycineSlider(val);
              setSelectedMaterialId('recombinant');
              setActiveMaterialIds(prev => prev.includes('recombinant') ? prev : [...prev, 'recombinant']);
            }}
            style={{ width: '100%', accentColor: 'var(--silk-amber)', cursor: 'pointer' }}
            aria-label="Adjust synthetic spidroin glycine to alanine ratio"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            <span style={{ color: glycineSlider < 40 ? 'var(--silk-amber)' : 'var(--text-muted)' }}>
              ◀ Stiff Alanine Nanocrystals (High Tensile)
            </span>
            <span style={{ color: glycineSlider > 60 ? 'var(--silk-cyan)' : 'var(--text-muted)' }}>
              Elastic Glycine Amorphous Chains (High Stretch) ▶
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. DATA & COMPONENT: IN VIVO DOPE MICROFLUIDIC & PHASE DIAGRAM GRAPH
   ========================================================================= */

export const ProteinPhaseDiagramGraph: React.FC = () => {
  const [phSlider, setPhSlider] = useState<number>(6.1);
  const [shearRate, setShearRate] = useState<number>(250); // s^-1

  // Calculate phase transition states based on pH (7.4 -> 5.0) and shear
  // At higher shear, beta-sheet crystallization triggers at higher pH
  const effectivePHShift = (shearRate / 1000) * 0.4;
  const criticalPH = 5.7 - effectivePHShift;

  const betaSheetPercent = useMemo(() => {
    // Sigmoidal transition from 5% (at pH 7.4) to 48% (at pH 5.0)
    const normalized = Math.min(1, Math.max(0, (7.4 - phSlider) / 2.4));
    const sigmoid = 1 / (1 + Math.exp(-((normalized - 0.5) * 8)));
    const shearBonus = (shearRate / 1000) * 8;
    return Math.min(50, Math.round(5 + sigmoid * 40 + shearBonus));
  }, [phSlider, shearRate]);

  const alphaHelixPercent = useMemo(() => {
    // Inversely transitions from 70% down to 22%
    return Math.max(18, 75 - betaSheetPercent);
  }, [betaSheetPercent]);

  const viscosityPaS = useMemo(() => {
    // Non-Newtonian liquid crystalline dope:
    // Low shear in ampulla: high viscosity ~120 Pa.s
    // Mid duct: shear thinning drops viscosity to 30 Pa.s
    // Extensional draw-down: gelation spikes viscosity to solid fiber >200 Pa.s
    if (phSlider > 6.4) {
      return Math.round(110 - (7.4 - phSlider) * 40);
    } else if (phSlider > criticalPH) {
      return Math.round(35 + (6.4 - phSlider) * 50);
    } else {
      return Math.round(120 + (criticalPH - phSlider) * 180);
    }
  }, [phSlider, criticalPH]);

  const currentPhaseState = useMemo(() => {
    if (phSlider >= 6.8) {
      return {
        title: 'Isotropic Sol (LLPS Emulsion)',
        zone: 'Ampulla Reservoir (pH 7.2 - 7.4)',
        desc: 'Spidroins stored at hyper-high concentrations (up to 50% w/v) as liquid-liquid phase separated spherical micelles. Terminal domains prevent premature aggregation.',
        color: '#38bdf8'
      };
    } else if (phSlider >= 6.0) {
      return {
        title: 'Nematic Liquid-Crystalline Alignment',
        zone: 'Anterior Duct Funnel (pH 6.3 - 6.7)',
        desc: 'Elongated shear flow aligns spidroin dimers into nematic liquid-crystalline domains with minimal energy expenditure. Non-Newtonian shear-thinning reduces flow resistance.',
        color: '#00ffaa'
      };
    } else if (phSlider >= 5.5) {
      return {
        title: 'N-Terminal Antiparallel Dimerization',
        zone: 'Tapering S-Shaped Duct (pH 5.6 - 5.9)',
        desc: 'Protons protonate conserved glutamate residues in N-terminal domains, locking them into antiparallel dimers and initiating continuous linear polymer chains.',
        color: '#ffb703'
      };
    } else {
      return {
        title: 'Irreversible β-Sheet Nanocrystal Lock',
        zone: 'Exit Spigot Draw-Down Zone (pH 5.0 - 5.4)',
        desc: 'Potassium and chloride displacement plus mechanical draw-down shear induces cooperative hydrogen-bonded poly-alanine beta-sheet crystallization. Solid dragline thread emerges.',
        color: '#f43f5e'
      };
    }
  }, [phSlider]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
      alignItems: 'center'
    }}>
      {/* SVG Phase Transition Graph */}
      <div style={{
        background: 'rgba(2, 6, 14, 0.85)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--silk-cyan)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Dope Rheology & Secondary Structure Plot
          </span>
          <span style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            Vollrath & Knight In Vivo Model
          </span>
        </div>

        {/* 2D SVG Coordinate System */}
        <svg
          viewBox="0 0 500 280"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          role="img"
          aria-label="Secondary structure and viscosity curve plotted against gland pH gradient"
        >
          {/* Background Grid Lines */}
          <line x1="50" y1="20" x2="470" y2="20" stroke="rgba(255,255,255,0.06)" />
          <line x1="50" y1="80" x2="470" y2="80" stroke="rgba(255,255,255,0.06)" />
          <line x1="50" y1="140" x2="470" y2="140" stroke="rgba(255,255,255,0.06)" />
          <line x1="50" y1="200" x2="470" y2="200" stroke="rgba(255,255,255,0.06)" />
          <line x1="50" y1="240" x2="470" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="50" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

          {/* X-Axis Labels: pH 7.4 down to 5.0 */}
          <text x="50" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">pH 7.4 (Ampulla)</text>
          <text x="155" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">pH 6.8</text>
          <text x="260" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">pH 6.2 (Funnel)</text>
          <text x="365" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">pH 5.6 (Duct)</text>
          <text x="470" y="258" fill="#94a3b8" fontSize="10" textAnchor="middle">pH 5.0 (Spigot)</text>

          {/* Left Y-Axis: Secondary Structure (0% to 60%) */}
          <text x="42" y="240" fill="#94a3b8" fontSize="9" textAnchor="end">0%</text>
          <text x="42" y="140" fill="#94a3b8" fontSize="9" textAnchor="end">30%</text>
          <text x="42" y="40" fill="#94a3b8" fontSize="9" textAnchor="end">60%</text>
          <text x="25" y="130" fill="var(--silk-emerald)" fontSize="9" transform="rotate(-90 25 130)" textAnchor="middle">
            Structure Fraction (%)
          </text>

          {/* Curve 1: Beta-Sheet Nanocrystal Growth (Emerald Glowing Curve) */}
          {/* Computed path based on sigmoidal formula from x=50 (pH 7.4) to x=470 (pH 5.0) */}
          <path
            d="M 50 225 C 150 220, 220 205, 300 160 C 370 120, 420 80, 470 65"
            fill="none"
            stroke="var(--silk-emerald)"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.4))' }}
          />

          {/* Curve 2: Alpha-Helix / Disordered (Cyan Curve Decreasing) */}
          <path
            d="M 50 50 C 150 55, 230 75, 310 120 C 380 160, 420 185, 470 195"
            fill="none"
            stroke="var(--silk-cyan)"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />

          {/* Curve 3: Apparent Viscosity (Amber Curve) */}
          <path
            d="M 50 110 C 120 125, 220 190, 310 180 C 380 150, 430 70, 470 30"
            fill="none"
            stroke="var(--silk-amber)"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Active Interactive Slider Position (Vertical Glowing Indicator) */}
          {(() => {
            // Map pH 7.4 -> 50, pH 5.0 -> 470
            const currentX = 50 + ((7.4 - phSlider) / 2.4) * 420;
            return (
              <g>
                <line
                  x1={currentX}
                  y1="20"
                  x2={currentX}
                  y2="240"
                  stroke={currentPhaseState.color}
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={currentX}
                  cy={240 - (betaSheetPercent / 60) * 200}
                  r="6"
                  fill={currentPhaseState.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ filter: `drop-shadow(0 0 8px ${currentPhaseState.color})` }}
                />
                <circle
                  cx={currentX}
                  cy={240}
                  r="4"
                  fill={currentPhaseState.color}
                />
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.25rem',
          marginTop: '0.75rem',
          fontSize: '0.72rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--silk-emerald)' }}>
            <span style={{ width: '12px', height: '3px', background: 'var(--silk-emerald)', display: 'inline-block' }} />
            β-Sheet Nanocrystal Fraction
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--silk-cyan)' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--silk-cyan)', borderTop: '1px dashed var(--silk-cyan)', display: 'inline-block' }} />
            α-Helix / Random Coil
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--silk-amber)' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--silk-amber)', display: 'inline-block' }} />
            Dope Viscosity (Pa·s)
          </span>
        </div>
      </div>

      {/* Interactive Controls & Biophysical Phase State */}
      <div>
        {/* Sliders */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label htmlFor="ph-gradient-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                Gland Duct pH Position:
              </label>
              <span style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: currentPhaseState.color,
                background: 'rgba(0,0,0,0.4)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                pH {phSlider.toFixed(2)}
              </span>
            </div>
            <input
              id="ph-gradient-slider"
              type="range"
              min="5.0"
              max="7.4"
              step="0.05"
              value={phSlider}
              onChange={(e) => setPhSlider(Number(e.target.value))}
              style={{ width: '100%', accentColor: currentPhaseState.color }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              <span>Duct Exit (pH 5.0)</span>
              <span>Ampulla Reservoir (pH 7.4)</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label htmlFor="shear-rate-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                Extensional Shear Rate:
              </label>
              <span style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--silk-cyan)',
                background: 'rgba(0,0,0,0.4)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {shearRate} s⁻¹
              </span>
            </div>
            <input
              id="shear-rate-slider"
              type="range"
              min="20"
              max="800"
              step="10"
              value={shearRate}
              onChange={(e) => setShearRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-cyan)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              <span>Static Quiescent (20 s⁻¹)</span>
              <span>High-Speed Pultrusion (800 s⁻¹)</span>
            </div>
          </div>
        </div>

        {/* Phase State Card */}
        <div style={{
          background: 'rgba(5, 12, 24, 0.95)',
          border: `1px solid ${currentPhaseState.color}`,
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: `0 0 20px rgba(0, 0, 0, 0.8), 0 0 15px ${currentPhaseState.color}25`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: currentPhaseState.color,
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {currentPhaseState.zone}
              </span>
              <h4 style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, margin: '0.2rem 0 0' }}>
                {currentPhaseState.title}
              </h4>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '1rem' }}>
            {currentPhaseState.desc}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.6rem'
          }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>β-Sheet Fraction</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--silk-emerald)' }}>{betaSheetPercent}%</div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>α-Helix Fraction</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--silk-cyan)' }}>{alphaHelixPercent}%</div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Apparent Viscosity</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--silk-amber)' }}>{viscosityPaS} Pa·s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. DATA & COMPONENT: MBA TECHNO-ECONOMIC TITRE SENSITIVITY GRAPH
   ========================================================================= */

export const EconomicSensitivityGraph: React.FC = () => {
  const [targetTitre, setTargetTitre] = useState<number>(18); // g/L
  const [dspYield, setDspYield] = useState<number>(75); // %
  const [feedstockCost, setFeedstockCost] = useState<number>(0.55); // $/kg glucose
  const [bioreactorCapEx, setBioreactorCapEx] = useState<number>(60); // $M

  // Function to calculate COGS ($/kg) for any titre (g/L)
  const calculateCOGS = (titre: number, yieldPct: number, sugarCost: number, capexM: number): number => {
    const recoveryFraction = yieldPct / 100;
    // Chemical engineering cost scaling:
    // Fixed CapEx amortization per kg = (Capex * factor) / (Titre * Recovery * annual batches)
    const fixedCostPerKg = (capexM * 420) / (titre * recoveryFraction * 300);
    // Raw materials = (sugarCost * 3.8) / recoveryFraction
    const variableCostPerKg = (sugarCost * 3.6) / recoveryFraction + 12;
    // Downstream purification overhead
    const dspCostPerKg = 180 / (titre * recoveryFraction);

    return Math.round(fixedCostPerKg + variableCostPerKg + dspCostPerKg);
  };

  const currentCOGS = useMemo(() => {
    return calculateCOGS(targetTitre, dspYield, feedstockCost, bioreactorCapEx);
  }, [targetTitre, dspYield, feedstockCost, bioreactorCapEx]);

  // Generate curve coordinates for Titre from 2 g/L to 45 g/L
  const curvePoints = useMemo(() => {
    const titres = [2, 4, 6, 8, 10, 12, 15, 18, 22, 26, 30, 35, 40, 45];
    return titres.map(t => ({
      titre: t,
      cogs: calculateCOGS(t, dspYield, feedstockCost, bioreactorCapEx)
    }));
  }, [dspYield, feedstockCost, bioreactorCapEx]);

  // Find break-even titre where COGS <= $50/kg
  const breakEvenTitre = useMemo(() => {
    for (let t = 2; t <= 50; t += 0.5) {
      if (calculateCOGS(t, dspYield, feedstockCost, bioreactorCapEx) <= 50) {
        return t.toFixed(1);
      }
    }
    return '> 50';
  }, [dspYield, feedstockCost, bioreactorCapEx]);

  // SVG coordinate mapper:
  // Titre: 0 to 45 g/L -> X: 60 to 470
  // COGS: 0 to $600/kg -> Y: 220 to 20
  const mapX = (titre: number) => 60 + (titre / 45) * 410;
  const mapY = (cogs: number) => {
    const clamped = Math.min(600, Math.max(0, cogs));
    return 220 - (clamped / 600) * 200;
  };

  const pathD = useMemo(() => {
    return curvePoints.reduce((acc, pt, idx) => {
      const x = mapX(pt.titre);
      const y = mapY(pt.cogs);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [curvePoints]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
      alignItems: 'center'
    }}>
      {/* SVG Cost Sensitivity Curve */}
      <div style={{
        background: 'rgba(2, 6, 14, 0.85)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--silk-cyan)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            COGS ($/kg) vs Fermentation Titre (g/L)
          </span>
          <span style={{
            fontSize: '0.72rem',
            color: 'var(--silk-emerald)',
            fontFamily: 'var(--font-mono)'
          }}>
            Target Parity: $50/kg
          </span>
        </div>

        <svg
          viewBox="0 0 500 260"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          role="img"
          aria-label="Cost sensitivity curve showing manufacturing cost dropping exponentially as fermentation titre scales"
        >
          {/* Horizontal Grid lines (COGS: $0, $100, $200, $300, $400, $500, $600) */}
          {[100, 200, 300, 400, 500].map(val => (
            <g key={val}>
              <line
                x1="60"
                y1={mapY(val)}
                x2="470"
                y2={mapY(val)}
                stroke="rgba(255, 255, 255, 0.06)"
              />
              <text x="52" y={mapY(val) + 3} fill="#94a3b8" fontSize="9" textAnchor="end">
                ${val}
              </text>
            </g>
          ))}

          {/* Baseline Parity Threshold: $50 / kg */}
          <line
            x1="60"
            y1={mapY(50)}
            x2="470"
            y2={mapY(50)}
            stroke="var(--silk-emerald)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text x="475" y={mapY(50) + 3} fill="var(--silk-emerald)" fontSize="9" fontWeight="700">
            $50 Parity
          </text>

          {/* Axes */}
          <line x1="60" y1="220" x2="470" y2="220" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
          <line x1="60" y1="20" x2="60" y2="220" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />

          {/* X-Axis Tick Labels */}
          {[5, 10, 15, 20, 25, 30, 35, 40, 45].map(t => (
            <text key={t} x={mapX(t)} y="238" fill="#94a3b8" fontSize="9" textAnchor="middle">
              {t}g/L
            </text>
          ))}

          {/* Curve Path */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--silk-cyan)"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 229, 255, 0.4))' }}
          />

          {/* Current Operating Point Pin */}
          {(() => {
            const curX = mapX(targetTitre);
            const curY = mapY(currentCOGS);

            return (
              <g>
                <line x1={curX} y1={curY} x2={curX} y2="220" stroke="var(--silk-amber)" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="60" y1={curY} x2={curX} y2={curY} stroke="var(--silk-amber)" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle
                  cx={curX}
                  cy={curY}
                  r="6"
                  fill="var(--silk-amber)"
                  stroke="#ffffff"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 8px var(--silk-amber))' }}
                />
              </g>
            );
          })()}
        </svg>

        <div style={{
          marginTop: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Y-Axis: Total Unit COGS ($/kg)</span>
          <span>X-Axis: Fermentation Titre (g/L)</span>
        </div>
      </div>

      {/* Interactive Inputs & MBA Analysis */}
      <div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          {/* Titre Slider */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label htmlFor="titre-density-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                Fermentation Titre (g/L):
              </label>
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-cyan)' }}>
                {targetTitre} g/L
              </span>
            </div>
            <input
              id="titre-density-slider"
              type="range"
              min="2"
              max="45"
              step="1"
              value={targetTitre}
              onChange={(e) => setTargetTitre(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-cyan)' }}
            />
          </div>

          {/* DSP Yield Slider */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label htmlFor="dsp-recovery-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                Downstream Purification Yield (%):
              </label>
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-emerald)' }}>
                {dspYield}%
              </span>
            </div>
            <input
              id="dsp-recovery-slider"
              type="range"
              min="40"
              max="90"
              step="5"
              value={dspYield}
              onChange={(e) => setDspYield(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-emerald)' }}
            />
          </div>

          {/* Sugar Feedstock Cost Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label htmlFor="feedstock-cost-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                Carbon Feedstock Cost ($/kg sugar):
              </label>
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-amber)' }}>
                ${feedstockCost.toFixed(2)} / kg
              </span>
            </div>
              <input
                id="feedstock-cost-slider"
                type="range"
                min="0.25"
                max="1.20"
                step="0.05"
                value={feedstockCost}
                onChange={(e) => setFeedstockCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--silk-amber)' }}
              />
            </div>

            {/* Bioreactor Facility CapEx Slider */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label htmlFor="facility-capex-slider" style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                  Facility CapEx Investment ($M):
                </label>
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-cyan)' }}>
                  ${bioreactorCapEx}M
                </span>
              </div>
              <input
                id="facility-capex-slider"
                type="range"
                min="20"
                max="150"
                step="5"
                value={bioreactorCapEx}
                onChange={(e) => setBioreactorCapEx(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--silk-cyan)' }}
              />
            </div>
          </div>

        {/* Dynamic Result Card */}
        <div style={{
          background: 'rgba(5, 12, 24, 0.95)',
          border: '1px solid rgba(0, 229, 255, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.9)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Calculated Unit Cost</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: currentCOGS <= 50 ? 'var(--silk-emerald)' : '#ffffff' }}>
                ${currentCOGS} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ kg</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: currentCOGS <= 50 ? 'var(--silk-emerald)' : 'var(--silk-amber)' }}>
                {currentCOGS <= 50 ? '✅ Commercial Parity Reached' : '⚠️ Above Commodity Target'}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Break-Even Titre ($50/kg)</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--silk-cyan)' }}>
                {breakEvenTitre} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>g/L</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Minimum fermentation threshold
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            <strong>MBA Executive Takeaway:</strong> High early CapEx ($80M+) makes downstream purification recovery the primary lever for reducing COGS before building 50,000L+ scale facilities.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. MASTER CONTAINER: INTERACTIVE SCIENTIFIC GRAPHS SUITE
   ========================================================================= */

export const InteractiveGraphsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'radar' | 'phase' | 'economic'>('radar');

  return (
    <section 
      id="interactive-graphs"
      className="glass-panel"
      style={{
        padding: '2.5rem 2.25rem',
        margin: '0 auto 3rem',
        maxWidth: '1440px',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(3, 7, 16, 0.98) 0%, rgba(0, 0, 0, 1) 100%)',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 229, 255, 0.1)'
      }}
      aria-labelledby="graphs-suite-heading"
    >
      {/* Top Header & Tab Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge-pill badge-emerald">
              <Activity size={13} /> DYNAMIC SCIENCE SUITE
            </span>
            <span className="badge-pill badge-cyan">
              BIO-PHYSICS & UNIT ECONOMICS
            </span>
          </div>
          <h3 
            id="graphs-suite-heading"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}
          >
            INTERACTIVE SCIENTIFIC GRAPHS & SIMULATION SUITE
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
            Interactive multi-dimensional mechanical radar plots, microfluidic phase transition diagrams, and MBA sensitivity models.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.3rem',
          gap: '0.35rem',
          flexWrap: 'wrap'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('radar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'radar' ? 700 : 500,
              background: activeTab === 'radar' ? 'var(--silk-cyan)' : 'transparent',
              color: activeTab === 'radar' ? '#050a14' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Compass size={14} />
            Biomaterial Radar Graph
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('phase')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'phase' ? 700 : 500,
              background: activeTab === 'phase' ? 'var(--silk-emerald)' : 'transparent',
              color: activeTab === 'phase' ? '#050a14' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Layers size={14} />
            pH & Phase Transition Plot
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('economic')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'economic' ? 700 : 500,
              background: activeTab === 'economic' ? 'var(--silk-amber)' : 'transparent',
              color: activeTab === 'economic' ? '#050a14' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <DollarSign size={14} />
            Titre Sensitivity Curve
          </button>
        </div>
      </div>

      {/* Render Selected Interactive Graph */}
      <div>
        {activeTab === 'radar' && <BiomaterialRadarChart />}
        {activeTab === 'phase' && <ProteinPhaseDiagramGraph />}
        {activeTab === 'economic' && <EconomicSensitivityGraph />}
      </div>
    </section>
  );
};
