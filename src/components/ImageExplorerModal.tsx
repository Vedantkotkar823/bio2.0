import React, { useState, useEffect, useRef } from 'react';
import { Hotspot, ImageExplorerItem } from '../types';
import { 
  X, 
  AlertCircle, 
  BookOpen, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';

interface HotspotViewerProps {
  item: ImageExplorerItem;
  onSelectHotspot?: (hotspot: Hotspot) => void;
}

export const HotspotViewer: React.FC<HotspotViewerProps> = ({ item, onSelectHotspot }) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(item.hotspots[0]?.id || '');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0); // 1.0x to 2.0x
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeHotspot = item.hotspots.find(h => h.id === selectedHotspotId) || item.hotspots[0];

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspotId(hotspot.id);
    if (onSelectHotspot) onSelectHotspot(hotspot);

    // Smoothly pan toward the hotspot
    const targetX = (50 - hotspot.x) * 1.5;
    const targetY = (50 - hotspot.y) * 1.5;
    setPanOffset({
      x: Math.max(-60, Math.min(60, targetX)),
      y: Math.max(-40, Math.min(40, targetY))
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(2.0, Math.round((prev + 0.25) * 100) / 100));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(1.0, Math.round((prev - 0.25) * 100) / 100));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(280px, 1.2fr)', gap: '1.5rem', alignItems: 'stretch' }}>
      {/* Diagram Canvas Container */}
      <div style={{
        position: 'relative',
        background: 'radial-gradient(ellipse at center, #0e1c31 0%, #060b14 100%)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Controls Toolbar Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          display: 'flex',
          gap: '0.4rem',
          background: 'rgba(7, 13, 24, 0.85)',
          padding: '0.35rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            className="btn-icon"
            onClick={handleZoomIn}
            title="Zoom In (Max 2.0x)"
            aria-label="Zoom in diagram"
            disabled={zoomLevel >= 2.0}
            style={{ opacity: zoomLevel >= 2.0 ? 0.4 : 1 }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={handleZoomOut}
            title="Zoom Out (Min 1.0x)"
            aria-label="Zoom out diagram"
            disabled={zoomLevel <= 1.0}
            style={{ opacity: zoomLevel <= 1.0 ? 0.4 : 1 }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={handleResetZoom}
            title="Reset Zoom and Overview"
            aria-label="Reset diagram view to overview"
          >
            <RotateCcw size={16} />
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--silk-cyan)',
            padding: '0 0.4rem'
          }}>
            {zoomLevel.toFixed(2)}x
          </div>
        </div>

        {/* Pan and Zoom Layer */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center center'
        }}>
          {item.diagramType === 'gland' && (
            <svg viewBox="0 0 800 480" style={{ width: '100%', height: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="ampullaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="ductGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <rect x="20" y="20" width="760" height="440" rx="16" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="6 6" />

              {/* Secretory Tail */}
              <path
                d="M 60 360 C 80 420, 160 410, 190 340 C 210 290, 220 250, 240 230"
                fill="none"
                stroke="url(#tailGrad)"
                strokeWidth="38"
                strokeLinecap="round"
              />
              <path
                d="M 60 360 C 80 420, 160 410, 190 340 C 210 290, 220 250, 240 230"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Ampulla / Main Reservoir */}
              <ellipse
                cx="310"
                cy="210"
                rx="110"
                ry="85"
                fill="url(#ampullaGrad)"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="4"
              />
              <g opacity="0.6">
                {[
                  [260, 180], [290, 190], [330, 175], [360, 195],
                  [250, 220], [285, 230], [325, 225], [355, 235]
                ].map(([cx, cy], i) => (
                  <ellipse key={i} cx={cx} cy={cy} rx="14" ry="4" transform={`rotate(${-15 + (i % 3) * 10} ${cx} ${cy})`} fill="#38bdf8" />
                ))}
              </g>

              {/* Tapering Funnel */}
              <path
                d="M 410 185 L 470 195 L 470 215 L 410 235 Z"
                fill="rgba(56, 189, 248, 0.4)"
                stroke="#38bdf8"
                strokeWidth="2"
              />

              {/* Looped S-Duct with Ion Gradient */}
              <path
                d="M 470 205 C 530 150, 560 300, 620 220 C 650 170, 670 210, 710 200"
                fill="none"
                stroke="url(#ductGrad)"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Muscular Draw Valve */}
              <rect x="670" y="185" width="22" height="30" rx="4" fill="#f43f5e" opacity="0.85" stroke="#ffffff" strokeWidth="1.5" />

              {/* Exit Spigot and Solid Thread Extrusion */}
              <path
                d="M 710 200 L 780 195"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              <text x="80" y="320" fill="var(--silk-emerald)" fontSize="12" fontWeight="700">Biosynthesis Zone</text>
              <text x="260" y="140" fill="var(--silk-cyan)" fontSize="13" fontWeight="700">Dope Reservoir (pH 7.2)</text>
              <text x="510" y="125" fill="#f59e0b" fontSize="12" fontWeight="700">Acidification & Ion Exchange</text>
              <text x="690" y="245" fill="var(--silk-emerald)" fontSize="12" fontWeight="700">Solid Thread Extrusion</text>
            </svg>
          )}

          {item.diagramType === 'nanostructure' && (
            <svg viewBox="0 0 800 480" style={{ width: '100%', height: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="amorphousGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              <rect x="20" y="20" width="760" height="440" rx="16" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="6 6" />

              <g transform="translate(100, 120)">
                <circle cx="20" cy="20" r="28" fill="#10b981" opacity="0.8" stroke="#ffffff" strokeWidth="2" />
                <circle cx="48" cy="20" r="28" fill="#10b981" opacity="0.8" stroke="#ffffff" strokeWidth="2" />
                <text x="34" y="24" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">NTD Lock</text>
              </g>

              <path
                d="M 160 140 Q 220 200, 290 190 T 360 210"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="4"
              />

              <g transform="translate(320, 160)">
                <rect x="0" y="0" width="90" height="16" rx="4" fill="url(#crystalGrad)" stroke="#ffffff" strokeWidth="1" />
                <rect x="0" y="22" width="90" height="16" rx="4" fill="url(#crystalGrad)" stroke="#ffffff" strokeWidth="1" />
                <rect x="0" y="44" width="90" height="16" rx="4" fill="url(#crystalGrad)" stroke="#ffffff" strokeWidth="1" />
                <rect x="0" y="66" width="90" height="16" rx="4" fill="url(#crystalGrad)" stroke="#ffffff" strokeWidth="1" />
                
                {[8, 30, 52].map((yVal, i) => (
                  <line key={i} x1="15" y1={yVal + 8} x2="75" y2={yVal + 8} stroke="#ffffff" strokeDasharray="3 3" strokeWidth="2" opacity="0.7" />
                ))}
                <text x="45" y="105" fill="var(--silk-cyan)" fontSize="11" fontWeight="700" textAnchor="middle">
                  Poly-Ala β-Sheet (2-5 nm)
                </text>
              </g>

              <g transform="translate(450, 180)">
                <path
                  d="M 0 40 Q 25 -20, 50 40 T 100 40 T 150 40 T 200 40"
                  fill="none"
                  stroke="url(#amorphousGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <text x="100" y="90" fill="var(--silk-amber)" fontSize="11" fontWeight="700" textAnchor="middle">
                  Gly-Rich Amorphous Coils (GPGXX)
                </text>
              </g>

              <g transform="translate(680, 150)">
                <circle cx="20" cy="20" r="26" fill="#a855f7" opacity="0.8" stroke="#ffffff" strokeWidth="2" />
                <line x1="20" y1="20" x2="20" y2="55" stroke="#fbbf24" strokeWidth="3" />
                <circle cx="20" cy="55" r="26" fill="#a855f7" opacity="0.8" stroke="#ffffff" strokeWidth="2" />
                <text x="20" y="40" fill="#fbbf24" fontSize="10" fontWeight="800" textAnchor="middle">S—S</text>
                <text x="20" y="95" fill="#a855f7" fontSize="11" fontWeight="700" textAnchor="middle">CTD Dimer</text>
              </g>
            </svg>
          )}

          {item.diagramType === 'bioreactor' && (
            <svg viewBox="0 0 800 480" style={{ width: '100%', height: '100%', display: 'block' }}>
              <rect x="20" y="20" width="760" height="440" rx="16" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="6 6" />

              <g transform="translate(80, 160)">
                <rect x="0" y="0" width="110" height="70" rx="35" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2" />
                <path d="M 25 35 Q 40 20, 55 35 T 85 35" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="55" y="95" fill="#10b981" fontSize="11" fontWeight="700" textAnchor="middle">Host Strain (E. coli / Yeast)</text>
              </g>

              <g transform="translate(270, 120)">
                <rect x="0" y="20" width="100" height="150" rx="16" fill="rgba(2, 132, 199, 0.2)" stroke="#38bdf8" strokeWidth="3" />
                <line x1="50" y1="0" x2="50" y2="150" stroke="#ffffff" strokeWidth="3" />
                <line x1="20" y1="120" x2="80" y2="120" stroke="#ffffff" strokeWidth="3" />
                <line x1="20" y1="80" x2="80" y2="80" stroke="#ffffff" strokeWidth="3" />
                <text x="50" y="195" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">Fed-Batch Bioreactor</text>
              </g>

              <g transform="translate(470, 140)">
                <polygon points="0,0 90,0 60,110 30,110" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="2" />
                <text x="45" y="140" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">Thermal DSP & TFF</text>
              </g>

              <g transform="translate(660, 140)">
                <circle cx="35" cy="40" r="35" fill="none" stroke="#10b981" strokeWidth="4" />
                <circle cx="35" cy="40" r="15" fill="#10b981" opacity="0.6" />
                <path d="M 0 40 L 70 40" stroke="#ffffff" strokeWidth="2" />
                <text x="35" y="105" fill="#10b981" fontSize="11" fontWeight="700" textAnchor="middle">Fiber Winding Spool</text>
              </g>

              <path d="M 200 195 L 260 195" stroke="#ffffff" strokeWidth="2" />
              <path d="M 380 195 L 460 195" stroke="#ffffff" strokeWidth="2" />
              <path d="M 570 195 L 650 195" stroke="#ffffff" strokeWidth="2" />
            </svg>
          )}

          {/* Hotspot Pins Overlay */}
          {item.hotspots.map(hotspot => {
            const isSelected = hotspot.id === selectedHotspotId;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => handleSelectHotspot(hotspot)}
                style={{
                  position: 'absolute',
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: isSelected ? 20 : 5,
                  padding: 0
                }}
                aria-label={`Hotspot: ${hotspot.title}`}
                aria-pressed={isSelected}
              >
                <div style={{
                  position: 'relative',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--silk-cyan)' : 'var(--silk-emerald)',
                    opacity: 0.3,
                    animation: isSelected ? 'pulseGlow 1.5s infinite ease-out' : 'pulseGlow 2.5s infinite ease-out'
                  }}></div>

                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#ffffff' : 'var(--silk-emerald)',
                    border: `2px solid ${isSelected ? 'var(--silk-cyan)' : '#070d18'}`,
                    boxShadow: isSelected ? '0 0 12px var(--silk-cyan)' : '0 0 6px var(--silk-emerald)',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotspot Scientific Explanation Panel */}
      <div style={{
        background: 'rgba(6, 12, 22, 0.95)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--border-accent)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {activeHotspot ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-pill badge-cyan">Selected Component</span>
              <span className="badge-pill badge-emerald">Interactive Hotspot</span>
            </div>
            
            <h4 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.6rem' }}>
              {activeHotspot.title}
            </h4>

            <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {activeHotspot.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--silk-emerald)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  In Vivo Biological Role
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {activeHotspot.biologicalRole}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--silk-cyan)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Molecular Conformation
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {activeHotspot.molecularStructure}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--silk-amber)'
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Engineering & Bio-Manufacturing Relevance
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {activeHotspot.engineeringSignificance}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            Select a hotspot to view scientific breakdown.
          </div>
        )}

        <div style={{
          marginTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.85rem',
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap'
        }}>
          {item.hotspots.map(h => (
            <button
              key={h.id}
              type="button"
              className={h.id === selectedHotspotId ? 'btn-emerald' : 'btn-outline'}
              style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
              onClick={() => handleSelectHotspot(h)}
            >
              {h.title.split(':')[0].trim()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ImageExplorerModalProps {
  item: ImageExplorerItem | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: HTMLElement | null;
}

export const ImageExplorerModal: React.FC<ImageExplorerModalProps> = ({
  item,
  isOpen,
  onClose,
  triggerElementRef
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && triggerElementRef) {
      triggerElementRef.focus();
    }
  }, [isOpen, triggerElementRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explorer-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1240px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(11, 20, 38, 0.98)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(6, 12, 22, 0.7)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="badge-pill badge-emerald">Interactive Lightbox Explorer</span>
              <span className="badge-pill badge-cyan">Vector Scientific Diagram</span>
            </div>
            <h2 id="explorer-title" style={{ fontSize: '1.4rem', color: '#ffffff' }}>
              {item.title}
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {item.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Press Esc to close</span>
            <button
              ref={closeButtonRef}
              type="button"
              className="btn-icon"
              onClick={onClose}
              id="close-explorer-modal-btn"
              aria-label="Close Explorer Lightbox"
              style={{ width: '38px', height: '38px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '1.5rem 1.75rem',
          overflowY: 'auto',
          flex: 1
        }}>
          <HotspotViewer item={item} />

          {/* High Resolution Scientific Notes & Conceptual Notices */}
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--silk-cyan)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <BookOpen size={16} /> Key Physiological Observations
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                {item.highResNotes.map((note, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{note}</li>
                ))}
              </ul>
            </div>

            {item.conceptualNotice && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}>
                <AlertCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.2rem' }}>
                    SCIENTIFIC DISCLOSURE & MODEL STATUS
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {item.conceptualNotice}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
