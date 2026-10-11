import React, { useEffect, useRef } from 'react';
import { 
  Play, 
  Maximize2, 
  BookOpen, 
  Eye, 
  Zap, 
  Activity,
  Layers,
  HelpCircle,
  Cpu,
  ArrowRight,
  Users
} from 'lucide-react';

interface HeaderProps {
  onStartPresentation: () => void;
  onOpenExplorer: (id: string) => void;
  onOpenReferences: () => void;
  onJumpToSection: (sectionNumber: number) => void;
  onScrollToQuiz: () => void;
  onScrollToSimulator: () => void;
  onScrollToCredits: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onStartPresentation,
  onOpenExplorer,
  onOpenReferences,
  onJumpToSection,
  onScrollToQuiz,
  onScrollToSimulator,
  onScrollToCredits,
  reducedMotion,
  onToggleReducedMotion,
  highContrast,
  onToggleHighContrast
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Particle Silk Canvas Effect (AMOLED Dark Mode)
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const numNodes = 45;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ['#00ffaa', '#00e5ff', '#ffb703', '#c77dff'];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with glowing silk threads
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          node.x -= (mdx / mdist) * 0.8;
          node.y -= (mdy / mdist) * 0.8;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = 'rgba(0, 255, 170, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <header className="poster-header" style={{
      maxWidth: '1440px',
      margin: '0 auto',
      position: 'relative',
      padding: '2.5rem 2rem 2rem'
    }}>
      {/* Top Academic Ribbon with Creator Accreditation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge-pill badge-emerald">
            <Activity size={13} /> MBA TECH CE (COMPUTER ENGINEERING)
          </span>
          <span className="badge-pill badge-cyan">
            <Layers size={13} /> EOB: ELEMENTS OF BIOLOGY
          </span>
          <span className="badge-pill badge-amber">
            <Cpu size={13} /> ACADEMIC RESEARCH POSTER
          </span>
        </div>

        {/* Accessibility, Credits & Rigor Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            type="button"
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            onClick={onScrollToCredits}
            title="View Academic Research & Project Team Credits"
            id="nav-credits-btn"
          >
            <Users size={14} color="var(--silk-cyan)" />
            Research & Team Credits
          </button>

          <button 
            type="button"
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            onClick={onToggleHighContrast}
            aria-pressed={highContrast}
            title="Toggle High Contrast Mode for enhanced legibility"
          >
            <Eye size={14} />
            {highContrast ? 'Standard Contrast' : 'High Contrast'}
          </button>

          <button 
            type="button"
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            onClick={onToggleReducedMotion}
            aria-pressed={reducedMotion}
            title="Toggle Reduced Motion to disable heavy transitions"
          >
            <Zap size={14} />
            {reducedMotion ? 'Enable Motion' : 'Reduced Motion'}
          </button>

          <button
            type="button"
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            onClick={onOpenReferences}
            title="View Peer-Reviewed Academic Citations & Conceptual Disclosures"
          >
            <BookOpen size={14} />
            Citations & Rigor
          </button>
        </div>
      </div>

      {/* Main Hero Exhibition Stage (AMOLED Dark) */}
      <div 
        className="glass-panel"
        style={{
          position: 'relative',
          padding: '3rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(4, 8, 16, 0.98) 0%, rgba(0, 0, 0, 1) 100%)',
          border: '1px solid rgba(0, 229, 255, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 229, 255, 0.1)'
        }}
      >
        {/* Interactive Canvas Layer in Background */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.7,
            zIndex: 1
          }}
          aria-hidden="true"
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Academic Topic & Scope Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            borderRadius: 'var(--radius-full)',
            padding: '0.35rem 0.95rem',
            marginBottom: '1rem',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
          }}>
            <Layers size={13} color="var(--silk-cyan)" />
            <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
              BIOMACROMOLECULAR NANOTECHNOLOGY & TECHNO-ECONOMICS
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--silk-emerald)', fontFamily: 'var(--font-mono)' }}>
              15 ACADEMIC SECTIONS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            background: 'linear-gradient(135deg, #ffffff 25%, #00e5ff 65%, #00ffaa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.035em',
            maxWidth: '1000px'
          }}>
            SPIDER SILK: NATURE'S SUPER-POLYMER & THE BIO-SCALING HORIZON
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#cbd5e1',
            maxWidth: '780px',
            marginBottom: '2.25rem',
            lineHeight: 1.65
          }}>
            An immersive academic science poster dissecting the molecular architecture of major ampullate spidroins, room-temperature in vivo microfluidics, algorithmic AI protein design, and precision fermentation unit economics.
          </p>

          {/* Quick Action Navigation Deck */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginBottom: '2.5rem' }}>
            <button
              type="button"
              className="btn-emerald"
              onClick={onStartPresentation}
              id="start-presentation-btn"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.96rem' }}
            >
              <Play size={18} fill="currentColor" />
              Launch Student Presentation Mode (15 Sections)
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={onScrollToSimulator}
              id="hero-simulator-btn"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.96rem' }}
            >
              <Cpu size={16} />
              In Vivo Spinning Simulator
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={onScrollToQuiz}
              id="hero-quiz-btn"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.96rem' }}
            >
              <HelpCircle size={16} />
              Take Academic Challenge Quiz
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={() => onOpenExplorer('gland')}
              id="open-gland-explorer-btn"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.96rem' }}
            >
              <Maximize2 size={16} />
              Gland Lightbox
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={onScrollToCredits}
              id="hero-credits-btn"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.96rem' }}
            >
              <Users size={16} color="var(--silk-cyan)" />
              Project Credits & Team
            </button>
          </div>

          {/* Core Mechanical Metrics Showcase (AMOLED Pure Contrast) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--silk-emerald)',
              border: '1px solid rgba(0, 255, 170, 0.25)',
              borderLeftWidth: '4px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ultimate Tensile Strength
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                1.3 <span style={{ fontSize: '1rem', color: 'var(--silk-emerald)', fontWeight: 600 }}>GPa</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Parallels high-strength alloy steels (ASTM A514)
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--silk-cyan)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              borderLeftWidth: '4px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Work of Fracture (Toughness)
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                160 <span style={{ fontSize: '1rem', color: 'var(--silk-cyan)', fontWeight: 600 }}>MJ/m³</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                3.2x greater kinetic energy capture than Kevlar 29
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--silk-amber)',
              border: '1px solid rgba(255, 183, 3, 0.25)',
              borderLeftWidth: '4px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Breaking Elongation (Strain)
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                35 <span style={{ fontSize: '1rem', color: 'var(--silk-amber)', fontWeight: 600 }}>%</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                10x greater stretchability than aramid fibers
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.65)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid #c77dff',
              border: '1px solid rgba(199, 125, 255, 0.25)',
              borderLeftWidth: '4px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Weight-Normalized Specific Strength
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                0.97 <span style={{ fontSize: '0.9rem', color: '#c77dff', fontWeight: 600 }}>GPa/(g/cm³)</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                5.8x lower weight penalty compared to steel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pavilion Zone Quick Selector */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        padding: '0.5rem 0'
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', flexShrink: 0 }}>
          Exhibition Wings:
        </span>
        {[
          { label: 'Pavilion A: Anatomy & Dope (Sec 1-5)', num: 1 },
          { label: 'Pavilion B: Biomechanics & 7 Silks (Sec 6-7)', num: 6 },
          { label: 'Pavilion C: Synthetic Bio & AI (Sec 8-9)', num: 8 },
          { label: 'Pavilion D: Medicine & Defense (Sec 10-11)', num: 10 },
          { label: 'Pavilion E: MBA Techno-Economics (Sec 12-14)', num: 12 },
          { label: 'Pavilion F: Rigor & Citations (Sec 15)', num: 15 }
        ].map(wing => (
          <button
            key={wing.num}
            type="button"
            className="btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap' }}
            onClick={() => onJumpToSection(wing.num)}
          >
            {wing.label} <ArrowRight size={12} />
          </button>
        ))}
      </div>
    </header>
  );
};
