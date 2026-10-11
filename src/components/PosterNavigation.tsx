import React, { useEffect, useState } from 'react';
import { Section } from '../types';
import { ChevronLeft, ChevronRight, Navigation } from 'lucide-react';

interface SpiderWebTransitionProps {
  fromSection: number;
  toSection: number;
  isNavigating: boolean;
  reducedMotion: boolean;
}

export const SpiderWebTransition: React.FC<SpiderWebTransitionProps> = ({
  fromSection,
  toSection,
  isNavigating,
  reducedMotion
}) => {
  const [threadVisible, setThreadVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isNavigating || reducedMotion) {
      setThreadVisible(false);
      return;
    }

    setThreadVisible(true);
    const timer = setTimeout(() => {
      setThreadVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [isNavigating, fromSection, toSection, reducedMotion]);

  if (!threadVisible || reducedMotion) return null;

  const isForward = toSection > fromSection;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 900,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <defs>
          <linearGradient id="silkThreadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
          <filter id="silkThreadGlow">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={
            isForward
              ? `M 100 80 Q ${window.innerWidth / 2} ${window.innerHeight / 2 + 100}, ${window.innerWidth - 100} ${window.innerHeight - 80}`
              : `M ${window.innerWidth - 100} ${window.innerHeight - 80} Q ${window.innerWidth / 2} ${window.innerHeight / 2 - 100}, 100 80`
          }
          fill="none"
          stroke="url(#silkThreadGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          filter="url(#silkThreadGlow)"
          style={{
            animation: 'drawThread 0.55s ease-out forwards'
          }}
        />

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <line
            key={idx}
            x1={window.innerWidth / 2}
            y1={window.innerHeight / 2}
            x2={window.innerWidth / 2 + Math.cos((angle * Math.PI) / 180) * 120}
            y2={window.innerHeight / 2 + Math.sin((angle * Math.PI) / 180) * 120}
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ opacity: 0.6 }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes drawThread {
          0% { stroke-dashoffset: 1200; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

interface PosterNavigationProps {
  sections: Section[];
  activeSectionId: string;
  onNavigateToSection: (sectionNumber: number) => void;
}

export const PosterNavigation: React.FC<PosterNavigationProps> = ({
  sections,
  activeSectionId,
  onNavigateToSection
}) => {
  const currentIndex = sections.findIndex(s => s.id === activeSectionId);
  const currentSectionNumber = currentIndex >= 0 ? sections[currentIndex].number : 1;

  const handlePrev = () => {
    if (currentSectionNumber > 1) {
      onNavigateToSection(currentSectionNumber - 1);
    }
  };

  const handleNext = () => {
    if (currentSectionNumber < sections.length) {
      onNavigateToSection(currentSectionNumber + 1);
    }
  };

  return (
    <nav
      className="glass-panel"
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 500,
        maxWidth: '1440px',
        margin: '0 auto 1.5rem',
        padding: '0.65rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(9, 16, 30, 0.94)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
      }}
      aria-label="Academic Poster Navigation"
      id="poster-sticky-nav"
    >
      {/* Left: Prev Button & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          type="button"
          className="btn-icon"
          onClick={handlePrev}
          disabled={currentSectionNumber <= 1}
          title="Navigate to Previous Section"
          id="nav-prev-btn"
          aria-label="Previous section"
          style={{ opacity: currentSectionNumber <= 1 ? 0.35 : 1 }}
        >
          <ChevronLeft size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Navigation size={14} color="var(--silk-emerald)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Section <strong style={{ color: '#ffffff' }}>{currentSectionNumber}</strong> / {sections.length}
          </span>
        </div>
      </div>

      {/* Center: 15 Section Jump Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.35rem',
        alignItems: 'center',
        overflowX: 'auto',
        padding: '0.2rem',
        maxWidth: '700px'
      }}>
        {sections.map((sec) => {
          const isActive = sec.id === activeSectionId;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigateToSection(sec.number)}
              title={`Section ${sec.number}: ${sec.title}`}
              id={`nav-dot-${sec.number}`}
              aria-label={`Jump to Section ${sec.number}: ${sec.title}`}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: isActive ? 800 : 500,
                backgroundColor: isActive ? 'var(--silk-emerald)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#050a14' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--silk-emerald)' : 'var(--border-subtle)'}`,
                transition: 'all 0.15s ease'
              }}
            >
              {sec.number}
            </button>
          );
        })}
      </div>

      {/* Right: Next Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          type="button"
          className="btn-icon"
          onClick={handleNext}
          disabled={currentSectionNumber >= sections.length}
          title="Navigate to Next Section"
          id="nav-next-btn"
          aria-label="Next section"
          style={{ opacity: currentSectionNumber >= sections.length ? 0.35 : 1 }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};
