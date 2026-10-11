import React, { useState, useMemo } from 'react';
import { TechnoEconomicParams } from '../types';
import { calculateTechnoEconomics } from '../utils/calculations';
import { ShieldAlert, CheckCircle } from 'lucide-react';

export const TechnoEconomicCalculator: React.FC = () => {
  const [params, setParams] = useState<TechnoEconomicParams>({
    titreYieldGPerL: 18,
    bioreactorVolumeM3: 30,
    downstreamRecoveryPct: 75,
    feedstockCostPerKg: 1.2,
    batchCycleDays: 4,
    capexInvestmentMillionUSD: 25
  });

  const model = useMemo(() => {
    return calculateTechnoEconomics(params);
  }, [params]);

  const handleSliderChange = (field: keyof TechnoEconomicParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', margin: '1.5rem 0' }} id="techno-economic-calculator">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge-pill badge-amber">MBA Tech Operations Model</span>
            <span className="badge-pill badge-cyan">Precision Fermentation Unit Economics</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Bioreactor Scaling & Production Cost Simulator</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Model the cost of goods sold (COGS per kg) as a function of fermentation titre, bioreactor volume, and downstream processing (DSP) recovery.
          </p>
        </div>

        {/* Commercial Parity Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: model.isCommerciallyCompetitive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${model.isCommerciallyCompetitive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
        }}>
          {model.isCommerciallyCompetitive ? (
            <CheckCircle size={20} color="#10b981" />
          ) : (
            <ShieldAlert size={20} color="#ef4444" />
          )}
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Market Status</div>
            <div style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              color: model.isCommerciallyCompetitive ? '#34d399' : '#f87171'
            }}>
              {model.isCommerciallyCompetitive ? 'COMPETITIVE WITH TECHNICAL NYLON' : 'PREMIUM / LUXURY / MEDICAL MARGIN ONLY'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
        {/* Sliders Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Titre Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label htmlFor="titre-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Fermentation Titre (Yield)
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-cyan)' }}>
                {params.titreYieldGPerL} g/L
              </span>
            </div>
            <input
              id="titre-slider"
              type="range"
              min="2"
              max="45"
              step="1"
              value={params.titreYieldGPerL}
              onChange={(e) => handleSliderChange('titreYieldGPerL', parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-cyan)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>2 g/L (Early Lab)</span>
              <span>15 g/L (Pilot)</span>
              <span>45 g/L (High Density Target)</span>
            </div>
          </div>

          {/* Bioreactor Volume */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label htmlFor="volume-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Bioreactor Vessel Volume
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-emerald)' }}>
                {params.bioreactorVolumeM3} m³ ({params.bioreactorVolumeM3 * 1000} L)
              </span>
            </div>
            <input
              id="volume-slider"
              type="range"
              min="5"
              max="100"
              step="5"
              value={params.bioreactorVolumeM3}
              onChange={(e) => handleSliderChange('bioreactorVolumeM3', parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-emerald)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>5 m³ (Demo plant)</span>
              <span>30 m³ (Commercial pilot)</span>
              <span>100 m³ (Industrial scale)</span>
            </div>
          </div>

          {/* Downstream Recovery (DSP) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label htmlFor="recovery-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Downstream Purification Recovery
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--silk-amber)' }}>
                {params.downstreamRecoveryPct}%
              </span>
            </div>
            <input
              id="recovery-slider"
              type="range"
              min="40"
              max="90"
              step="5"
              value={params.downstreamRecoveryPct}
              onChange={(e) => handleSliderChange('downstreamRecoveryPct', parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--silk-amber)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span>40% (High losses)</span>
              <span>75% (Target thermal precipitation)</span>
              <span>90% (Theoretical maximum)</span>
            </div>
          </div>

          {/* Feedstock Cost */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label htmlFor="feedstock-slider" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Carbon Feedstock Cost (Glucose)
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f8fafc' }}>
                ${params.feedstockCostPerKg.toFixed(2)} / kg
              </span>
            </div>
            <input
              id="feedstock-slider"
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={params.feedstockCostPerKg}
              onChange={(e) => handleSliderChange('feedstockCostPerKg', parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Output Financial Dashboard */}
        <div style={{
          background: 'rgba(5, 10, 18, 0.85)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Modeled Unit Cost of Goods (COGS)
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: model.isCommerciallyCompetitive ? '#34d399' : '#f59e0b' }}>
                ${model.costPerKgUSD}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ kg pure spidroin</span>
            </div>

            {/* Benchmark Comparison */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span>Target Parity ($50/kg):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{model.targetParityRatio}x benchmark</span>
              </div>
              <div style={{
                height: '8px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${Math.min(100, (50 / Math.max(50, model.costPerKgUSD)) * 100)}%`,
                  height: '100%',
                  background: model.isCommerciallyCompetitive ? 'var(--silk-emerald)' : 'var(--silk-amber)',
                  borderRadius: 'var(--radius-full)'
                }}></div>
              </div>
            </div>

            {/* Cost Share Breakdown */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Cost Component Breakdown
              </div>
              <div style={{ display: 'flex', height: '14px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '0.5rem' }}>
                <div style={{ width: `${model.feedstockCostSharePct}%`, background: 'var(--silk-cyan)' }} title={`Feedstock: ${model.feedstockCostSharePct}%`}></div>
                <div style={{ width: `${model.dspCostSharePct}%`, background: 'var(--silk-amber)' }} title={`Downstream DSP: ${model.dspCostSharePct}%`}></div>
                <div style={{ width: `${model.overheadSharePct}%`, background: '#a855f7' }} title={`Utilities & CapEx: ${model.overheadSharePct}%`}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--silk-cyan)', borderRadius: '2px' }}></span>
                  Feedstock ({model.feedstockCostSharePct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--silk-amber)', borderRadius: '2px' }}></span>
                  DSP ({model.dspCostSharePct}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', background: '#a855f7', borderRadius: '2px' }}></span>
                  CapEx/Util ({model.overheadSharePct}%)
                </span>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Annual Plant Capacity</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--silk-emerald)' }}>
                {(model.annualCapacityKg / 1000).toFixed(1)} Metric Tons / year
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CapEx Depreciation</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                ${model.capexDepreciationPerKgUSD}/kg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
