import { MaterialProperty, TechnoEconomicParams } from '../types';

/**
 * Calculates tensile stress (MPa) for a given material at a given strain (decimal).
 * Returns 0 if strain exceeds breaking strain.
 */
export function calculateStressAtStrain(material: MaterialProperty, strain: number): number {
  const maxStrain = material.breakingStrainPct / 100;
  if (strain <= 0) return 0;
  if (strain > maxStrain) return 0;

  const normalizedStrain = strain / maxStrain;

  switch (material.id) {
    case 'dragline-silk': {
      // Non-linear initial elastic region, softening yield plateau, then strong strain hardening
      // Sigmoidal power curve characteristic of semicrystalline spidroin network
      const base = Math.sin((normalizedStrain * Math.PI) / 2);
      const hardening = Math.pow(normalizedStrain, 2.2);
      return material.tensileStrengthMPa * (0.35 * base + 0.65 * hardening);
    }
    case 'kevlar-29': {
      // Linear elastic brittle failure
      return material.tensileStrengthMPa * normalizedStrain;
    }
    case 'high-tensile-steel': {
      // Elastic region followed by plastic deformation plateau
      if (normalizedStrain < 0.15) {
        return (material.tensileStrengthMPa * 0.75) * (normalizedStrain / 0.15);
      } else {
        const plasticFraction = (normalizedStrain - 0.15) / 0.85;
        return material.tensileStrengthMPa * (0.75 + 0.25 * Math.sqrt(plasticFraction));
      }
    }
    case 'carbon-fiber': {
      // Steep linear elastic
      return material.tensileStrengthMPa * normalizedStrain;
    }
    case 'nylon-66': {
      // Ductile polymer with early yield and long plastic elongation
      const yieldPoint = 0.25;
      if (normalizedStrain < yieldPoint) {
        return (material.tensileStrengthMPa * 0.5) * (normalizedStrain / yieldPoint);
      } else {
        const plasticFraction = (normalizedStrain - yieldPoint) / (1 - yieldPoint);
        return material.tensileStrengthMPa * (0.5 + 0.5 * Math.pow(plasticFraction, 0.6));
      }
    }
    case 'flagelliform-silk': {
      // J-shaped hyperelastic entropic spring
      return material.tensileStrengthMPa * Math.pow(normalizedStrain, 3.2);
    }
    default: {
      return material.tensileStrengthMPa * Math.pow(normalizedStrain, 1.2);
    }
  }
}

/**
 * Computes the work of fracture (toughness) in MJ/m³ up to a specific strain limit
 * using numerical trapezoidal integration under the stress-strain curve.
 */
export function calculateToughnessUpToStrain(
  material: MaterialProperty,
  currentStrain: number,
  steps: number = 100
): number {
  const maxAllowedStrain = Math.min(currentStrain, material.breakingStrainPct / 100);
  if (maxAllowedStrain <= 0) return 0;

  const stepSize = maxAllowedStrain / steps;
  let integralSum = 0;

  for (let i = 0; i < steps; i++) {
    const s1 = i * stepSize;
    const s2 = (i + 1) * stepSize;
    const stress1 = calculateStressAtStrain(material, s1);
    const stress2 = calculateStressAtStrain(material, s2);
    // Trapezoidal rule: 0.5 * (stress1 + stress2) * deltaStrain
    integralSum += 0.5 * (stress1 + stress2) * stepSize;
  }

  // 1 MPa * 1 strain unit = 1 MJ/m³
  return Math.round(integralSum * 10) / 10;
}

export interface TechnoEconomicOutput {
  annualCapacityKg: number;
  costPerKgUSD: number;
  feedstockCostSharePct: number;
  dspCostSharePct: number;
  overheadSharePct: number;
  capexDepreciationPerKgUSD: number;
  isCommerciallyCompetitive: boolean; // under $50/kg
  targetParityRatio: number; // cost / $50
}

/**
 * Techno-economic modeling function for MBA Tech bio-manufacturing analysis.
 */
export function calculateTechnoEconomics(params: TechnoEconomicParams): TechnoEconomicOutput {
  const workingVolumeFraction = 0.8; // 80% working volume in stirred-tank bioreactor
  const workingVolumeLiters = params.bioreactorVolumeM3 * 1000 * workingVolumeFraction;
  
  // Grams produced per batch = working volume * titre
  const grossGramsPerBatch = workingVolumeLiters * params.titreYieldGPerL;
  const grossKgPerBatch = grossGramsPerBatch / 1000;
  
  // Net recovered pure spidroin after DSP (Downstream Processing)
  const netKgPerBatch = grossKgPerBatch * (params.downstreamRecoveryPct / 100);

  // Operational batches per year (accounting for clean-in-place CIP and turnaround)
  const operatingDaysPerYear = 330;
  const batchesPerYear = Math.floor(operatingDaysPerYear / params.batchCycleDays);

  const annualCapacityKg = Math.max(1, Math.round(netKgPerBatch * batchesPerYear));

  // Operating Expenses (OpEx)
  // 1. Raw feedstock: ~3 kg glucose required per kg biomass/product + media salts
  const glucoseReqMultiplier = 3.5;
  const rawMaterialCostPerBatch = grossKgPerBatch * glucoseReqMultiplier * params.feedstockCostPerKg;
  
  // 2. Downstream processing (DSP) reagents, filtration membranes, solvents
  // DSP cost scales inversely with titre: low titre means massive volume to purify
  const dspCostFactor = Math.max(12, 120 / Math.sqrt(params.titreYieldGPerL));
  const dspCostPerBatch = grossKgPerBatch * dspCostFactor;

  // 3. Labor, utility energy (aeration, chilling, agitation, steam sterilization)
  const utilityAndLaborPerBatch = 8500 + params.bioreactorVolumeM3 * 250;

  // 4. Annual CapEx depreciation (10-year straight-line depreciation)
  const annualDepreciationUSD = (params.capexInvestmentMillionUSD * 1000000) / 10;
  const capexDepreciationPerKgUSD = annualDepreciationUSD / annualCapacityKg;

  const totalAnnualOpEx = (rawMaterialCostPerBatch + dspCostPerBatch + utilityAndLaborPerBatch) * batchesPerYear;
  const opexPerKgUSD = totalAnnualOpEx / annualCapacityKg;

  const totalCostPerKgUSD = Math.round((opexPerKgUSD + capexDepreciationPerKgUSD) * 10) / 10;

  const annualFeedstockCost = rawMaterialCostPerBatch * batchesPerYear;
  const annualDspCost = dspCostPerBatch * batchesPerYear;
  const annualUtilitiesLabor = utilityAndLaborPerBatch * batchesPerYear;
  const totalCostAnnual = totalAnnualOpEx + annualDepreciationUSD;

  const feedstockCostSharePct = Math.round((annualFeedstockCost / totalCostAnnual) * 100);
  const dspCostSharePct = Math.round((annualDspCost / totalCostAnnual) * 100);
  const overheadSharePct = Math.round(((annualUtilitiesLabor + annualDepreciationUSD) / totalCostAnnual) * 100);

  const isCommerciallyCompetitive = totalCostPerKgUSD <= 50;
  const targetParityRatio = Math.round((totalCostPerKgUSD / 50) * 100) / 100;

  return {
    annualCapacityKg,
    costPerKgUSD: totalCostPerKgUSD,
    feedstockCostSharePct,
    dspCostSharePct,
    overheadSharePct,
    capexDepreciationPerKgUSD: Math.round(capexDepreciationPerKgUSD * 10) / 10,
    isCommerciallyCompetitive,
    targetParityRatio
  };
}
