import React from 'react';
import { Users, GraduationCap, BookOpen } from 'lucide-react';

export interface Contributor {
  name: string;
  role: string;
  focusArea: string;
  isLead?: boolean;
}

export const RESEARCH_TEAM: Contributor[] = [
  {
    name: 'Vedant Kotkar',
    role: 'Lead System Architect & Developer',
    focusArea: 'Interactive Poster Architecture, Numerical Integration Engines, Microfluidics & AMOLED Design',
    isLead: true
  },
  {
    name: 'Aditya Yadav',
    role: 'Biomechanics Research',
    focusArea: 'Tensile Strength, Work of Fracture & Stress-Strain Analysis'
  },
  {
    name: 'Sarthak Jaiswal',
    role: 'Molecular Proteomics',
    focusArea: 'MaSp1/MaSp2 Sequences, Beta-Sheet Nanocrystals & MD Folding'
  },
  {
    name: 'Prachi Chaudhari',
    role: 'Gland Anatomy & Fluidics',
    focusArea: 'Major Ampullate Gland Morphology & In Vivo Microfluidic pH Gradient'
  },
  {
    name: 'Aryan Chavan',
    role: 'Computational Biology',
    focusArea: 'AlphaFold Structure Prediction & Algorithmic Codon Harmonization'
  },
  {
    name: 'Devesh',
    role: 'Techno-Economic Modeling',
    focusArea: 'Fermentation Titre Economics, Downstream DSP & CapEx/OpEx Parity'
  },
  {
    name: 'Raksha Patil',
    role: 'Biomedical Engineering',
    focusArea: 'Peripheral Nerve Conduits, Tissue Scaffolds & Biocompatibility'
  },
  {
    name: 'Aditya Patil',
    role: 'Materials & Defense',
    focusArea: 'Continuous Fiber Bio-Composites & Kinetic Impact Absorption'
  },
  {
    name: 'Anushri Salunke',
    role: 'Arachnid Taxonomy',
    focusArea: 'Comparative Proteomics Across the 7 Specialized Spider Silk Glands'
  },
  {
    name: 'Kostubh Toshniwal',
    role: 'Synthetic Biology',
    focusArea: 'Heterologous Expression in E. coli, Yeast & Transgenic Hosts'
  },
  {
    name: 'Shaubhika',
    role: 'Sustainability & LCA',
    focusArea: 'Microplastic Abatement, Life Cycle Assessment & Enzymatic Proteolysis'
  },
  {
    name: 'Avika Barve',
    role: 'Commercialization & IP',
    focusArea: 'Patent Landscape Analysis & Global Startup Venture Strategies'
  }
];

export const ProjectCredits: React.FC = () => {
  return (
    <section 
      id="project-credits" 
      className="glass-panel"
      style={{
        padding: '3rem 2.5rem',
        margin: '4rem auto 2.5rem',
        maxWidth: '1440px',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        background: 'linear-gradient(135deg, rgba(3, 7, 15, 0.98) 0%, rgba(0, 0, 0, 1) 100%)',
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 229, 255, 0.1)'
      }}
      aria-labelledby="credits-heading"
    >
      {/* Subtle AMOLED Top Border Highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--silk-cyan), var(--silk-emerald), transparent)',
        pointerEvents: 'none'
      }} />

      {/* Top Academic Ribbon */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="badge-pill badge-emerald">
            <GraduationCap size={14} /> MBA TECH CE • ELEMENTS OF BIOLOGY (EOB)
          </span>
          <span className="badge-pill badge-cyan">
            ACADEMIC CAPSTONE COHORT
          </span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          ACADEMIC YEAR 1 • SVKM'S NMIMS MPSTME
        </div>
      </div>

      {/* Dignified Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 
          id="credits-heading"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            marginBottom: '0.5rem'
          }}
        >
          ACADEMIC RESEARCH & PROJECT TEAM
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Interactive bioengineering research exhibition created for 1st Year MBA Tech Computer Engineering (Elements of Biology) by the student research cohort.
        </p>
      </div>

      {/* Unified Professional Contributor Grid (All 12 Members in Balanced Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.25rem'
      }}>
        {RESEARCH_TEAM.map((contributor, idx) => (
          <div
            key={idx}
            style={{
              background: contributor.isLead 
                ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(3, 7, 16, 0.95) 100%)'
                : 'rgba(5, 10, 20, 0.75)',
              border: contributor.isLead 
                ? '1px solid rgba(0, 229, 255, 0.45)'
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '1.4rem 1.25rem',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--silk-cyan)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 229, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = contributor.isLead 
                ? 'rgba(0, 229, 255, 0.45)' 
                : 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.4rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.18rem', color: '#ffffff', fontWeight: 800, margin: 0 }}>
                  {contributor.name}
                </h3>
                {contributor.isLead && (
                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--silk-cyan)',
                    background: 'rgba(0, 229, 255, 0.15)',
                    border: '1px solid rgba(0, 229, 255, 0.4)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}>
                    PROJECT LEAD
                  </span>
                )}
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: contributor.isLead ? 'var(--silk-cyan)' : 'var(--silk-emerald)',
                background: contributor.isLead ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 255, 170, 0.08)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${contributor.isLead ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 255, 170, 0.2)'}`,
                lineHeight: 1.35
              }}>
                {contributor.role}
              </span>
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {contributor.focusArea}
            </div>
          </div>
        ))}
      </div>

      {/* Academic Citation & Integrity Footer */}
      <div style={{
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={14} color="var(--silk-cyan)" />
          <span>SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering (MPSTME)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={14} color="var(--silk-emerald)" />
          <span>Elements of Biology (EOB) • Academic Year 2026</span>
        </div>
      </div>
    </section>
  );
};
