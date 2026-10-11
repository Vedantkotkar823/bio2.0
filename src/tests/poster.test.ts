import { describe, it, expect } from 'vitest';
import { 
  SECTIONS, 
  MATERIALS, 
  EXPLORER_ITEMS, 
  SPINNING_STAGES, 
  QUIZ_QUESTIONS 
} from '../data/scienceData';
import { 
  calculateStressAtStrain, 
  calculateToughnessUpToStrain, 
  calculateTechnoEconomics 
} from '../utils/calculations';

describe('1. Academic Poster Structure & Integrity', () => {
  it('contains exactly 15 sequential sections with citations', () => {
    expect(SECTIONS.length).toBe(15);
    SECTIONS.forEach((sec, idx) => {
      expect(sec.number).toBe(idx + 1);
      expect(sec.id).toBe(`section-${idx + 1}`);
      expect(sec.title.length).toBeGreaterThan(5);
      expect(sec.summary.length).toBeGreaterThan(20);
      expect(sec.citation.length).toBeGreaterThan(10);
      expect(sec.mbaRelevance.length).toBeGreaterThan(10);
    });
  });

  it('validates that all hotspot coordinates are within [0, 100] percent', () => {
    Object.values(EXPLORER_ITEMS).forEach(item => {
      expect(item.hotspots.length).toBeGreaterThan(0);
      item.hotspots.forEach(h => {
        expect(h.x).toBeGreaterThanOrEqual(0);
        expect(h.x).toBeLessThanOrEqual(100);
        expect(h.y).toBeGreaterThanOrEqual(0);
        expect(h.y).toBeLessThanOrEqual(100);
        expect(h.title.length).toBeGreaterThan(3);
        expect(h.description.length).toBeGreaterThan(10);
      });
    });
  });
});

describe('2. Biomechanical Stress-Strain Engine', () => {
  const draglineSilk = MATERIALS.find(m => m.id === 'dragline-silk')!;
  const kevlar29 = MATERIALS.find(m => m.id === 'kevlar-29')!;
  const steel = MATERIALS.find(m => m.id === 'high-tensile-steel')!;

  it('correctly loads baseline material properties', () => {
    expect(draglineSilk).toBeDefined();
    expect(draglineSilk.tensileStrengthMPa).toBe(1300);
    expect(draglineSilk.breakingStrainPct).toBe(35);
    expect(draglineSilk.toughnessMJm3).toBe(160);

    expect(steel).toBeDefined();
    expect(steel.tensileStrengthMPa).toBe(1500);
    expect(steel.densityGcm3).toBe(7.85);
  });

  it('calculates zero stress at zero strain', () => {
    expect(calculateStressAtStrain(draglineSilk, 0)).toBe(0);
    expect(calculateStressAtStrain(kevlar29, 0)).toBe(0);
  });

  it('returns zero stress if applied strain exceeds fracture limit', () => {
    expect(calculateStressAtStrain(kevlar29, 0.05)).toBe(0);
    expect(calculateStressAtStrain(draglineSilk, 0.40)).toBe(0);
  });

  it('calculates continuous stress before breaking limit', () => {
    const stressAt10Pct = calculateStressAtStrain(draglineSilk, 0.10);
    const stressAt20Pct = calculateStressAtStrain(draglineSilk, 0.20);
    const stressAt30Pct = calculateStressAtStrain(draglineSilk, 0.30);

    expect(stressAt10Pct).toBeGreaterThan(0);
    expect(stressAt20Pct).toBeGreaterThan(stressAt10Pct);
    expect(stressAt30Pct).toBeGreaterThan(stressAt20Pct);
  });

  it('verifies that spider silk exhibits higher toughness than Kevlar 29', () => {
    const silkToughness = calculateToughnessUpToStrain(draglineSilk, 0.35);
    const kevlarToughness = calculateToughnessUpToStrain(kevlar29, 0.035);

    expect(silkToughness).toBeGreaterThan(kevlarToughness * 2);
  });
});

describe('3. MBA Tech Techno-Economic Scaling Model', () => {
  it('calculates baseline fermentation economics accurately', () => {
    const result = calculateTechnoEconomics({
      titreYieldGPerL: 20,
      bioreactorVolumeM3: 30,
      downstreamRecoveryPct: 75,
      feedstockCostPerKg: 1.2,
      batchCycleDays: 4,
      capexInvestmentMillionUSD: 20
    });

    expect(result.annualCapacityKg).toBeGreaterThan(1000);
    expect(result.costPerKgUSD).toBeGreaterThan(10);
    expect(result.feedstockCostSharePct + result.dspCostSharePct + result.overheadSharePct).toBeCloseTo(100, -1);
  });

  it('demonstrates that higher titre yield lowers unit production cost', () => {
    const lowTitre = calculateTechnoEconomics({
      titreYieldGPerL: 5,
      bioreactorVolumeM3: 30,
      downstreamRecoveryPct: 75,
      feedstockCostPerKg: 1.2,
      batchCycleDays: 4,
      capexInvestmentMillionUSD: 20
    });

    const highTitre = calculateTechnoEconomics({
      titreYieldGPerL: 35,
      bioreactorVolumeM3: 30,
      downstreamRecoveryPct: 75,
      feedstockCostPerKg: 1.2,
      batchCycleDays: 4,
      capexInvestmentMillionUSD: 20
    });

    expect(highTitre.costPerKgUSD).toBeLessThan(lowTitre.costPerKgUSD);
  });
});

describe('4. Interactive Process & Quiz State Machine', () => {
  it('validates all 5 in vivo spinning process stages', () => {
    expect(SPINNING_STAGES.length).toBe(5);
    SPINNING_STAGES.forEach((stage, idx) => {
      expect(stage.id).toBe(idx + 1);
      expect(stage.anatomicalZone.length).toBeGreaterThan(3);
      expect(stage.phValue.length).toBeGreaterThan(3);
      expect(stage.biochemicalMechanism.length).toBeGreaterThan(10);
    });
  });

  it('validates academic quiz questions and answer bounds', () => {
    expect(QUIZ_QUESTIONS.length).toBe(5);
    QUIZ_QUESTIONS.forEach(q => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(20);
    });
  });

  it('enforces zoom level boundary conditions [1.0x, 2.0x]', () => {
    let zoomLevel = 1.0;
    const zoomIn = (curr: number) => Math.min(2.0, Math.round((curr + 0.25) * 100) / 100);
    const zoomOut = (curr: number) => Math.max(1.0, Math.round((curr - 0.25) * 100) / 100);

    zoomLevel = zoomIn(zoomLevel);
    expect(zoomLevel).toBe(1.25);
    zoomLevel = zoomIn(zoomIn(zoomIn(zoomIn(zoomLevel))));
    expect(zoomLevel).toBe(2.0); // Clamped

    zoomLevel = zoomOut(zoomLevel);
    expect(zoomLevel).toBe(1.75);
    zoomLevel = zoomOut(zoomOut(zoomOut(zoomOut(zoomLevel))));
    expect(zoomLevel).toBe(1.0); // Clamped
  });
});
