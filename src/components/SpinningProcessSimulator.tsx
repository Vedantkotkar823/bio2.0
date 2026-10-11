import React, { useState, useEffect } from 'react';
import { SPINNING_STAGES } from '../data/scienceData';
import { SpinningProcessStage } from '../types';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Activity, 
  Cpu, 
  Droplet, 
  Zap
} from 'lucide-react';

export const SpinningProcessSimulator: React.FC = () => {
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentStage: SpinningProcessStage = 
    SPINNING_STAGES.find(s => s.id === currentStageId) || SPINNING_STAGES[0];

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentStageId(prev => (prev >= SPINNING_STAGES.length ? 1 : prev + 1));
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentStageId(prev => (prev < SPINNING_STAGES.length ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentStageId(prev => (prev > 1 ? prev - 1 : SPINNING_STAGES.length));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStageId(1);
  };

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '2rem', 
        margin: '2rem 0',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        background: 'linear-gradient(135deg, rgba(8, 15, 30, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="spinning-process-simulator"
    >
      {/* Decorative ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge-pill badge-emerald">
              <Activity size={12} /> In Vivo Microfluidic Reactor
            </span>
            <span className="badge-pill badge-cyan">
              Stage {currentStage.id} of {SPINNING_STAGES.length}
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', color: '#ffffff', fontWeight: 800 }}>
            Biomimetic Spinning Mechanism: Liquid Dope to Solid Fiber
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Step through the biological microfluidic chemical cascade: extensional shear, acidification, and beta-sheet crystallization.
          </p>
        </div>

        {/* Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn-icon"
            onClick={handlePrev}
            title="Previous Stage"
            aria-label="Previous Spinning Stage"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            className={isPlaying ? 'btn-amber' : 'btn-emerald'}
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            onClick={() => setIsPlaying(prev => !prev)}
            aria-label={isPlaying ? 'Pause auto walkthrough' : 'Play auto walkthrough'}
          >
            {isPlaying ? (
              <>
                <Pause size={14} /> Pause Walkthrough
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> Auto Walkthrough
              </>
            )}
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={handleNext}
            title="Next Stage"
            aria-label="Next Spinning Stage"
          >
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={handleReset}
            title="Reset to Stage 1"
            aria-label="Reset simulation"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* 5-Step Process Progress Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '0.5rem', 
        marginBottom: '1.75rem' 
      }}>
        {SPINNING_STAGES.map(stage => {
          const isActive = stage.id === currentStageId;
          const isPast = stage.id < currentStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentStageId(stage.id);
              }}
              style={{
                background: isActive 
                  ? 'rgba(56, 189, 248, 0.18)' 
                  : isPast 
                  ? 'rgba(16, 185, 129, 0.12)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${isActive ? 'var(--silk-cyan)' : isPast ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '0.6rem 0.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              aria-pressed={isActive}
            >
              <div style={{ 
                fontSize: '0.7rem', 
                fontWeight: 700, 
                color: isActive ? 'var(--silk-cyan)' : isPast ? 'var(--silk-emerald)' : 'var(--text-muted)' 
              }}>
                STEP {stage.id}
              </div>
              <div style={{ 
                fontSize: '0.78rem', 
                fontWeight: 600, 
                color: isActive ? '#ffffff' : '#cbd5e1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {stage.anatomicalZone.split('(')[0].trim()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Visual & Technical Deep-Dive Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(320px, 1.3fr) minmax(300px, 1fr)', 
        gap: '1.75rem',
        alignItems: 'stretch'
      }}>
        {/* Vector Schematic for Active Stage */}
        <div style={{
          background: 'radial-gradient(ellipse at center, #0b172a 0%, #040812 100%)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '340px'
        }}>
          {/* Schematic SVG */}
          <svg viewBox="0 0 600 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="ductFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Duct Contour */}
            <path
              d="M 40 120 C 120 70, 240 160, 360 110 S 480 120, 560 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="50"
              strokeLinecap="round"
            />
            <path
              d="M 40 120 C 120 70, 240 160, 360 110 S 480 120, 560 120"
              fill="none"
              stroke="url(#ductFlowGrad)"
              strokeWidth="8"
              strokeDasharray="6 4"
            />

            {/* Stage Position Markers */}
            {[
              { id: 1, cx: 60, cy: 120, label: 'Zone 1: Tail' },
              { id: 2, cx: 170, cy: 95, label: 'Zone 2: Ampulla' },
              { id: 3, cx: 300, cy: 145, label: 'Zone 3: Funnel' },
              { id: 4, cx: 430, cy: 115, label: 'Zone 4: S-Duct' },
              { id: 5, cx: 540, cy: 120, label: 'Zone 5: Spigot' }
            ].map(m => {
              const isCurrent = m.id === currentStageId;
              return (
                <g key={m.id}>
                  {isCurrent && (
                    <circle cx={m.cx} cy={m.cy} r="26" fill="var(--silk-cyan)" opacity="0.25">
                      <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isCurrent ? "14" : "9"}
                    fill={isCurrent ? "var(--silk-cyan)" : m.id < currentStageId ? "var(--silk-emerald)" : "#1e293b"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={m.cx}
                    y={m.cy + 32}
                    fill={isCurrent ? "#ffffff" : "var(--text-muted)"}
                    fontSize="11"
                    fontWeight={isCurrent ? "700" : "500"}
                    textAnchor="middle"
                  >
                    {m.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Molecular State Badge Banner */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1rem',
            borderLeft: '4px solid var(--silk-cyan)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Conformational State
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                {currentStage.molecularState}
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--silk-cyan)',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              <Droplet size={13} /> {currentStage.phValue}
            </div>
          </div>
        </div>

        {/* Technical Callout Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--silk-emerald)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              {currentStage.anatomicalZone}
            </div>
            <h4 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800, marginBottom: '0.75rem' }}>
              {currentStage.title}
            </h4>

            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {currentStage.biochemicalMechanism}
            </p>

            {/* Key Feature Highlight */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem'
            }}>
              <Zap size={16} color="var(--silk-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                <strong>Key Mechanism:</strong> {currentStage.keyFeature}
              </div>
            </div>
          </div>

          {/* Industrial Analog for MBA Tech */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--silk-amber)',
            fontSize: '0.8rem'
          }}>
            <Cpu size={15} style={{ flexShrink: 0 }} />
            <span><strong>Industrial Analog:</strong> {currentStage.engineeringAnalog}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
