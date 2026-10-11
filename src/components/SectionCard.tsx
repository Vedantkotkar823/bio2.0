
import React from 'react';
import { Section } from '../types';
import { StressStrainAnalyzer } from './StressStrainAnalyzer';
import { TechnoEconomicCalculator } from './TechnoEconomicCalculator';
import { SilkDiversityMatrix, StartupEcosystem } from './ExhibitionPanels';
import {
  Maximize2,
  BookOpen,
  TrendingUp,
  AlertCircle,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SectionCardProps {
  section: Section;
  onOpenExplorer: (explorerId: string, triggerElement: HTMLElement) => void;
  onJumpToPresentation: (sectionIndex: number) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  onOpenExplorer,
  onJumpToPresentation
}) => {
  const handleExplorerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (section.imageExplorerId) {
      onOpenExplorer(section.imageExplorerId, e.currentTarget);
    }
  };

  return (
    <article
      id={section.id}
      className="glass-panel"
      style={{
        padding: '2rem 2.25rem',
        margin: '0 auto 2.5rem',
        maxWidth: '1440px',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative'
      }}
      aria-labelledby={`heading-${section.id}`}
    >
      {/* Top Meta Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge-pill badge-emerald">
            SECTION {section.number}
          </span>
          <span className="badge-pill badge-cyan">
            {section.category}
          </span>
        </div>

        <button
          type="button"
          className="btn-outline"
          style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
          onClick={() => onJumpToPresentation(section.number - 1)}
          title={`Present Section ${section.number} in Presentation Mode`}
        >
          Present this section <ChevronRight size={14} />
        </button>
      </div>

      {/* Section Title & Subtitle */}
      <h2
        id={`heading-${section.id}`}
        style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
          fontWeight: 800,
          marginBottom: '0.4rem',
          color: '#ffffff'
        }}
      >
        {section.title}
      </h2>

      <div style={{
        fontSize: '1rem',
        color: 'var(--silk-emerald)',
        fontWeight: 600,
        marginBottom: '1.25rem'
      }}>
        {section.subtitle}
      </div>

      {/* Summary Box */}
      <p style={{
        fontSize: '1.02rem',
        lineHeight: 1.65,
        color: '#e2e8f0',
        marginBottom: '1.5rem',
        borderLeft: '4px solid var(--silk-cyan)',
        paddingLeft: '1.2rem'
      }}>
        {section.summary}
      </p>

      {/* Embedded Interactive Tools or Explorer Triggers */}
      {section.diagramType === 'stressStrain' && <StressStrainAnalyzer />}
      {section.diagramType === 'technoEconomic' && <TechnoEconomicCalculator />}
      {section.diagramType === 'diversity' && <SilkDiversityMatrix />}
      {section.diagramType === 'patents' && <StartupEcosystem />}

      {/* Explorer Launch Banner for Diagram Sections */}
      {section.imageExplorerId && (
        <div style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(14, 28, 49, 0.9) 0%, rgba(6, 12, 22, 0.95) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          margin: '1.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--silk-cyan)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
              <Layers size={16} /> INTERACTIVE HIGH-RESOLUTION SCIENTIFIC DIAGRAM
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              Explore {section.title} in Fullscreen Lightbox
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Click hotspot pins to inspect bio-chemical zones, pH transitions, and molecular forces.
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleExplorerClick}
            id={`open-explorer-${section.id}`}
          >
            <Maximize2 size={16} />
            Open Interactive Explorer
          </button>
        </div>
      )}

      {/* Scientific Principles Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        margin: '1.5rem 0'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--silk-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Biological & Physical Mechanisms
          </h3>
          <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {section.scientificDetails.map((detail, idx) => (
              <li key={idx} style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* MBA Tech Relevance Box */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.05)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--silk-amber)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <TrendingUp size={16} /> MBA TECH CE: COMMERCIAL & STRATEGIC INSIGHT
            </div>
            <p style={{ fontSize: '0.88rem', color: '#f8fafc', lineHeight: 1.6 }}>
              {section.mbaRelevance}
            </p>
          </div>

          {/* Key Metrics Pill Grid if present */}
          {section.keyMetrics && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.6rem',
              marginTop: '1rem'
            }}>
              {section.keyMetrics.map((km, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{km.label}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--silk-cyan)', fontFamily: 'var(--font-heading)' }}>
                    {km.value} <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{km.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conceptual Disclaimer if present */}
      {section.conceptualDisclaimer && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '1rem'
        }}>
          <AlertCircle size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.8rem', color: '#fef08a' }}>
            {section.conceptualDisclaimer}
          </span>
        </div>
      )}

      {/* Section Footer Citation */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '0.75rem',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        <BookOpen size={14} />
        <span><strong>Citation:</strong> {section.citation}</span>
      </div>
    </article>
  );
};
