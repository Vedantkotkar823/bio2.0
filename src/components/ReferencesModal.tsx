import React, { useEffect, useRef } from 'react';
import { X, BookOpen, AlertTriangle, Users } from 'lucide-react';
import { SECTIONS } from '../data/scienceData';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="references-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(10, 18, 34, 0.98)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
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
              <span className="badge-pill badge-emerald">Academic Integrity & Disclosures</span>
              <span className="badge-pill badge-cyan">1st Year MBA Tech CE (EOB)</span>
            </div>
            <h2 id="references-title" style={{ fontSize: '1.35rem', color: '#ffffff' }}>
              Scientific Rigor, Conceptual Notices & Bibliography
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close References Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Scientific Disclosures Callout */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              <AlertTriangle size={18} /> MANDATORY SCIENTIFIC ACCURACY AUDIT STATEMENTS
            </div>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li>
                <strong>Ballistic Protection Notice:</strong> The illustrated composite armor and protective vest applications represent academic biomechanical energy-absorption research models. Spider silk is <em>not</em> certified military/police ballistic protection.
              </li>
              <li>
                <strong>Biomedical Approvals Notice:</strong> Experimental recombinant spider silk sutures, nerve conduits, and scaffolds are currently undergoing pre-clinical evaluations and clinical trials; they are <em>not</em> universally approved clinical medical devices.
              </li>
              <li>
                <strong>Silk Property Heterogeneity:</strong> Spiders synthesize seven distinct silk types with vastly different mechanics (e.g. Flagelliform: 270% strain; Minor Ampullate: 12% strain). Spider silks do not have identical physical properties.
              </li>
              <li>
                <strong>Biodegradation Kinetics:</strong> Biodegradation rates depend strictly on environmental conditions (enzymatic microbial presence, humidity, temperature); silk remains stable for years under clean, dry ambient conditions.
              </li>
            </ul>
          </div>

          {/* Peer-Reviewed Bibliography */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--silk-cyan)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
              <BookOpen size={18} /> Primary Peer-Reviewed Literature Citations
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SECTIONS.map(s => (
                <div
                  key={s.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 1rem'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--silk-emerald)', fontWeight: 600, marginBottom: '0.2rem' }}>
                    Section {s.number}: {s.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    {s.citation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Team & Authorship Credits */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              <Users size={18} color="var(--silk-cyan)" /> Authorship, Architecture & Research Team
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                <strong>Academic Capstone Project:</strong> 1st Year MBA Tech CE (Computer Engineering) • Elements of Biology (EOB), SVKM's NMIMS MPSTME.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--silk-emerald)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Academic Project Cohort & Research Team:
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                gap: '0.5rem'
              }}>
                {[
                  { name: 'Vedant Kotkar', role: 'Lead Architect' },
                  { name: 'Aditya Yadav', role: 'Biomechanics' },
                  { name: 'Sarthak Jaiswal', role: 'Proteomics' },
                  { name: 'Prachi Chaudhari', role: 'Gland Anatomy' },
                  { name: 'Aryan Chavan', role: 'Comp Biology' },
                  { name: 'Devesh', role: 'Techno-Economics' },
                  { name: 'Raksha Patil', role: 'Biomedical' },
                  { name: 'Aditya Patil', role: 'Materials' },
                  { name: 'Anushri Salunke', role: 'Taxonomy' },
                  { name: 'Kostubh Toshniwal', role: 'Synthetic Bio' },
                  { name: 'Shaubhika', role: 'Sustainability' },
                  { name: 'Avika Barve', role: 'Commercial IP' }
                ].map((member, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.4rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>{member.name}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--silk-cyan)', fontFamily: 'var(--font-mono)' }}>{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
