import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  X, 
  FileText, 
  Clock, 
  Award
} from 'lucide-react';

interface PresentationModeProps {
  sections: Section[];
  initialSectionIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  sections,
  initialSectionIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialSectionIndex);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Strict: Timer does NOT start automatically
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialSectionIndex);
      // Background scroll lock
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, initialSectionIndex]);

  // Timer effect: Only runs when isPlaying is true.
  // CRITICAL: Changing currentIndex does NOT reset the timer.
  // Proper cleanup on unmount or pause.
  useEffect(() => {
    let intervalId: number | undefined;

    if (isOpen && isPlaying) {
      intervalId = window.setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen, isPlaying]);

  // Clean up presentation when exited
  const handleExit = () => {
    setIsPlaying(false);
    onClose();
  };

  const handleStartTimer = () => setIsPlaying(true);
  const handlePauseTimer = () => setIsPlaying(false);
  const handleResetTimer = () => {
    setIsPlaying(false);
    setSecondsElapsed(0);
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(sections.length - 1, prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      setCurrentIndex(index);
    }
  };

  // Fullscreen support with graceful fallback
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current && containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      // Graceful fallback for browsers where fullscreen is restricted
      console.warn('Fullscreen API not supported or denied by policy:', err);
    }
  };

  // Listen for fullscreen change events (e.g. user pressed Esc to exit fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation shortcuts
  // CRITICAL: Ignore shortcuts if user is typing into an input/textarea
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInput =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement && activeElement.getAttribute('contenteditable') === 'true');

      if (isInput) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrev();
          break;
        case ' ': // Space bar toggles timer
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'Escape':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            handleExit();
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, sections.length]);

  if (!isOpen) return null;

  const currentSection = sections[currentIndex];
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Student Presentation Mode"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: '#050a14',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      id="presentation-mode-container"
    >
      {/* Top Presentation Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(8, 15, 28, 0.95)',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Left: Presentation Title & Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge-pill badge-emerald">
            <Award size={13} /> MBA TECH CE PRESENTER
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Section <strong style={{ color: '#ffffff' }}>{currentIndex + 1}</strong> of {sections.length}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--silk-cyan)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
            paddingLeft: '0.75rem',
            fontFamily: 'var(--font-mono)'
          }}>
            1st Year MBA Tech CE (EOB)
          </span>
        </div>

        {/* Center: Timer Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '0.35rem 0.8rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <Clock size={16} color="var(--silk-cyan)" />
          <span style={{
            fontSize: '1.05rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: isPlaying ? 'var(--silk-cyan)' : 'var(--text-muted)'
          }}>
            {formattedTime}
          </span>

          {isPlaying ? (
            <button
              type="button"
              className="btn-icon"
              style={{ width: '28px', height: '28px' }}
              onClick={handlePauseTimer}
              id="pause-timer-btn"
              title="Pause Timer (Spacebar)"
            >
              <Pause size={14} />
            </button>
          ) : (
            <button
              type="button"
              className="btn-icon"
              style={{ width: '28px', height: '28px' }}
              onClick={handleStartTimer}
              id="start-timer-btn"
              title="Start / Resume Timer (Spacebar)"
            >
              <Play size={14} fill="currentColor" />
            </button>
          )}

          <button
            type="button"
            className="btn-icon"
            style={{ width: '28px', height: '28px' }}
            onClick={handleResetTimer}
            id="reset-timer-btn"
            title="Reset Timer to 00:00"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Right: Controls (Notes, Fullscreen, Exit) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className={showNotes ? 'btn-primary' : 'btn-outline'}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            onClick={() => setShowNotes(prev => !prev)}
            id="toggle-notes-btn"
            title="Toggle Speaker Notes (N)"
          >
            <FileText size={14} />
            Speaker Notes {showNotes ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={toggleFullscreen}
            id="toggle-fullscreen-btn"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>

          <button
            type="button"
            className="btn-icon"
            onClick={handleExit}
            id="exit-presentation-btn"
            title="Exit Presentation Mode (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Workspace */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: showNotes ? 'minmax(350px, 2.2fr) minmax(280px, 1fr)' : '1fr',
        gap: '1.5rem',
        padding: '1.5rem 2rem',
        overflowY: 'auto'
      }}>
        {/* Main Section Content Slide */}
        <div style={{
          background: 'rgba(11, 20, 38, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <span className="badge-pill badge-cyan">{currentSection.category}</span>
              <span className="badge-pill badge-amber">Section {currentSection.number} of 15</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '0.5rem',
              color: '#ffffff'
            }}>
              {currentSection.title}
            </h2>

            <div style={{
              fontSize: '1.05rem',
              color: 'var(--silk-emerald)',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              {currentSection.subtitle}
            </div>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: '#cbd5e1',
              marginBottom: '1.75rem',
              borderLeft: '4px solid var(--silk-cyan)',
              paddingLeft: '1.25rem'
            }}>
              {currentSection.summary}
            </p>

            {/* Scientific Bullet Points */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Key Technical & Biological Principles
              </h4>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {currentSection.scientificDetails.map((detail, idx) => (
                  <li key={idx} style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics Grid if present */}
            {currentSection.keyMetrics && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {currentSection.keyMetrics.map((km, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{km.label}</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--silk-cyan)', fontFamily: 'var(--font-heading)' }}>
                      {km.value} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{km.unit}</span>
                    </div>
                    {km.note && <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{km.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slide Footer with Citation */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <div>
              <strong>Peer-Reviewed Citation:</strong> {currentSection.citation}
            </div>
            {currentSection.conceptualDisclaimer && (
              <div style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: 600 }}>
                {currentSection.conceptualDisclaimer}
              </div>
            )}
          </div>
        </div>

        {/* Presenter Speaker Notes Sidebar */}
        {showNotes && (
          <div style={{
            background: 'rgba(7, 13, 24, 0.9)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-accent)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <FileText size={18} color="var(--silk-amber)" />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>MBA Tech Presenter Talking Points</h3>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.25rem' }}>
                  EXECUTIVE & BUSINESS PERSPECTIVE
                </div>
                <div style={{ fontSize: '0.88rem', color: '#f8fafc', lineHeight: 1.55 }}>
                  {currentSection.mbaRelevance}
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <h4 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Suggested Delivery Notes:
                </h4>
                <p style={{ marginBottom: '0.5rem' }}>
                  • Emphasize the bio-engineering mechanism: how biological systems solve mechanical paradoxes (strength + elasticity) without high temperature or petroleum solvents.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  • Connect the computer engineering aspect (AI protein folding / AlphaFold / codon algorithms) directly with the commercial scaling bottleneck (titre yields and CapEx).
                </p>
                <p>
                  • Keep academic rigor high: mention that commercial biomedical sutures and defense armor are currently experimental models rather than certified commodity products.
                </p>
              </div>
            </div>

            {/* Shortcut Cheatsheet */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <div>Shortcuts: <strong>→</strong> Next • <strong>←</strong> Prev • <strong>Space</strong> Timer • <strong>F</strong> Fullscreen • <strong>Esc</strong> Exit</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Student Navigation Dock: All 15 Sections */}
      <div style={{
        padding: '0.75rem 1.5rem',
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(6, 12, 22, 0.98)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: 'space-between'
      }}>
        {/* Previous Button */}
        <button
          type="button"
          className="btn-outline"
          onClick={goToPrev}
          id="prev-slide-btn"
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={18} />
          Previous Section
        </button>

        {/* 15-Section Jump Slider / Dots */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          overflowX: 'auto',
          padding: '0.2rem',
          maxWidth: '650px'
        }}>
          {sections.map((sec, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => goToSection(idx)}
                title={`Jump to Section ${sec.number}: ${sec.title}`}
                id={`jump-section-${idx + 1}`}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isActive ? 800 : 500,
                  backgroundColor: isActive ? 'var(--silk-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#050a14' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'var(--silk-cyan)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.15s ease'
                }}
              >
                {sec.number}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="btn-emerald"
          onClick={goToNext}
          id="next-slide-btn"
          disabled={currentIndex === sections.length - 1}
          style={{ opacity: currentIndex === sections.length - 1 ? 0.4 : 1 }}
        >
          Next Section
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
