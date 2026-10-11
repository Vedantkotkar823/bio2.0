import React, { useState } from 'react';
import { SILK_TYPES, STARTUPS, SURPRISING_FACTS } from '../data/scienceData';
import { SilkTypeData } from '../types';
import { 
  Globe, 
  AlertTriangle, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SilkDiversityMatrix: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedSilk, setSelectedSilk] = useState<SilkTypeData>(SILK_TYPES[0]);

  const filteredSilks = SILK_TYPES.filter(silk => {
    if (filter === 'all') return true;
    if (filter === 'high-strength') return silk.tensileStrengthMPa >= 900;
    if (filter === 'high-elasticity') return silk.extensibilityPct >= 50;
    if (filter === 'specialized') return silk.tensileStrengthMPa < 900 && silk.extensibilityPct < 50;
    return true;
  });

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', margin: '1.5rem 0' }} id="silk-diversity-matrix">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge-pill badge-emerald">Evolutionary Functional Divergence</span>
            <span className="badge-pill badge-cyan">7 Specialized Gland Systems</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Orb-Weaver Silk Diversity & Proteomic Matrix</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Female orb-weaving spiders synthesize seven distinct silks with tailored mechanical properties suited for structural frames, kinetic prey capture, egg shielding, or adhesion.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All 7 Types' },
            { id: 'high-strength', label: 'High Strength (>900 MPa)' },
            { id: 'high-elasticity', label: 'High Elasticity (>50%)' },
            { id: 'specialized', label: 'Specialized (Egg/Glue/Cement)' }
          ].map(btn => (
            <button
              key={btn.id}
              type="button"
              className={filter === btn.id ? 'btn-primary' : 'btn-outline'}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Silk Type Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {filteredSilks.map(silk => {
            const isSelected = selectedSilk.name === silk.name;
            return (
              <div
                key={silk.name}
                onClick={() => setSelectedSilk(silk)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isSelected ? 'var(--silk-cyan)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: isSelected ? 'var(--silk-cyan)' : '#ffffff' }}>
                    {silk.name}
                  </strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {silk.primarySpidroin}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  {silk.naturalFunction}
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <span>Strength: <strong style={{ color: '#38bdf8' }}>{silk.tensileStrengthMPa} MPa</strong></span>
                  <span>Strain: <strong style={{ color: '#10b981' }}>{silk.extensibilityPct}%</strong></span>
                  <span>Toughness: <strong style={{ color: '#f59e0b' }}>{silk.toughnessMJm3} MJ/m³</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Silk Detail Card */}
        <div style={{
          background: 'rgba(6, 12, 22, 0.9)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-accent)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-pill badge-cyan">{selectedSilk.gland}</span>
              <span className="badge-pill badge-emerald">Protein: {selectedSilk.primarySpidroin}</span>
            </div>
            <h4 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.6rem' }}>
              {selectedSilk.name} Silk
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '1.25rem' }}>
              {selectedSilk.naturalFunction}
            </p>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.25rem',
              borderLeft: '3px solid var(--silk-cyan)'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Structural Proteomic Composition
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {selectedSilk.structuralComposition}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Tensile Strength</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                  {selectedSilk.tensileStrengthMPa} <span style={{ fontSize: '0.75rem' }}>MPa</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Extensibility (Strain)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                  {selectedSilk.extensibilityPct} <span style={{ fontSize: '0.75rem' }}>%</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Work of Fracture (Toughness)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                  {selectedSilk.toughnessMJm3} <span style={{ fontSize: '0.75rem' }}>MJ/m³</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Initial Young's Modulus</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a855f7', fontFamily: 'var(--font-mono)' }}>
                  {selectedSilk.youngsModulusGPa} <span style={{ fontSize: '0.75rem' }}>GPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StartupEcosystem: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', margin: '1.5rem 0' }} id="startup-ecosystem">
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span className="badge-pill badge-cyan">Commercialization Landscape</span>
          <span className="badge-pill badge-emerald">Venture Capital & Scale-Up</span>
        </div>
        <h3 style={{ fontSize: '1.4rem' }}>Global Recombinant Spider Silk Venture Landscape</h3>
        <p style={{ fontSize: '0.88rem' }}>
          Analysis of top synthetic biology corporations navigating the transition from lab-scale fermentation to global commercial production.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
        {STARTUPS.map(startup => (
          <div
            key={startup.name}
            style={{
              background: 'rgba(5, 10, 18, 0.75)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#ffffff' }}>{startup.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Globe size={12} /> {startup.country} • Est. {startup.founded}
                  </div>
                </div>
                <span className="badge-pill badge-amber" style={{ fontSize: '0.7rem' }}>
                  {startup.fundingRaisedUSD}
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--silk-cyan)', fontWeight: 600, marginBottom: '0.4rem' }}>
                Host: {startup.hostOrganism}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                {startup.targetProduct}
              </p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                color: '#e2e8f0',
                marginBottom: '0.75rem'
              }}>
                <strong>Status:</strong> {startup.currentStatus}
              </div>
            </div>

            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '0.6rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.4rem',
              fontSize: '0.74rem',
              color: '#fbbf24'
            }}>
              <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Bottleneck:</strong> {startup.keyTechnicalChallenge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FactDiscoveryDrawer: React.FC = () => {
  const [expandedFactId, setExpandedFactId] = useState<string | null>(null);

  const toggleFact = (id: string) => {
    setExpandedFactId(prev => (prev === id ? null : id));
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', margin: '2rem 0' }} id="fact-discovery-vault">
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span className="badge-pill badge-amber">Curator's Discovery Vault</span>
          <span className="badge-pill badge-cyan">Surprising Biological Facts</span>
        </div>
        <h3 style={{ fontSize: '1.4rem' }}>Fascinating Bioengineering Anomalies</h3>
        <p style={{ fontSize: '0.88rem' }}>
          Explore counter-intuitive scientific realities discovered across 380 million years of arachnid evolutionary refinement.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {SURPRISING_FACTS.map(f => {
          const isExpanded = expandedFactId === f.id;
          return (
            <div
              key={f.id}
              onClick={() => toggleFact(f.id)}
              style={{
                background: isExpanded ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isExpanded ? 'var(--silk-cyan)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--silk-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {f.category}
                  </span>
                  {isExpanded ? <ChevronUp size={16} color="var(--silk-cyan)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>

                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '0.2rem' }}>
                  {f.stat}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {f.metric}
                </div>

                <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                  {f.title}
                </h4>
              </div>

              {isExpanded && (
                <p style={{
                  fontSize: '0.84rem',
                  color: '#e2e8f0',
                  lineHeight: 1.55,
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  {f.fact}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
