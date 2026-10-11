export type SectionCategory =
  | 'Fundamentals'
  | 'Molecular Biology'
  | 'Biomechanics'
  | 'Synthetic Biology & Biotech'
  | 'Computational Biology'
  | 'Biomedical & Engineering'
  | 'MBA Tech & Economics'
  | 'Sustainability & Outlook';

export interface Hotspot {
  id: string;
  title: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  description: string;
  biologicalRole: string;
  molecularStructure: string;
  engineeringSignificance: string;
}

export interface Section {
  id: string;
  number: number;
  title: string;
  category: SectionCategory;
  subtitle: string;
  summary: string;
  scientificDetails: string[];
  keyMetrics?: { label: string; value: string; unit?: string; note?: string }[];
  mbaRelevance: string;
  citation: string;
  diagramType?: 'gland' | 'nanostructure' | 'stressStrain' | 'technoEconomic' | 'diversity' | 'pipeline' | 'applications' | 'patents' | 'summary';
  imageExplorerId?: string;
  conceptualDisclaimer?: string;
}

export interface MaterialProperty {
  id: string;
  name: string;
  category: 'Natural Silk' | 'Synthetic Polymer' | 'Structural Metal' | 'Carbon Composite';
  tensileStrengthMPa: number;
  breakingStrainPct: number;
  youngsModulusGPa: number;
  toughnessMJm3: number;
  densityGcm3: number;
  color: string;
  description: string;
}

export interface TechnoEconomicParams {
  titreYieldGPerL: number;       // 1 - 50 g/L
  bioreactorVolumeM3: number;    // 5 - 100 m³
  downstreamRecoveryPct: number; // 40 - 90 %
  feedstockCostPerKg: number;    // 0.5 - 5 $/kg glucose
  batchCycleDays: number;        // 3 - 10 days
  capexInvestmentMillionUSD: number; // $5M - $50M
}

export interface PresentationState {
  currentSectionIndex: number;
  isPlaying: boolean;
  secondsElapsed: number;
  showSpeakerNotes: boolean;
  isFullscreen: boolean;
}

export interface ImageExplorerItem {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  diagramType: 'gland' | 'nanostructure' | 'bioreactor' | 'microfluidic';
  hotspots: Hotspot[];
  highResNotes: string[];
  conceptualNotice?: string;
}

export interface SilkTypeData {
  name: string;
  gland: string;
  primarySpidroin: string;
  naturalFunction: string;
  tensileStrengthMPa: number;
  extensibilityPct: number;
  toughnessMJm3: number;
  youngsModulusGPa: number;
  structuralComposition: string;
}

export interface StartupEntity {
  name: string;
  country: string;
  founded: number;
  hostOrganism: string;
  targetProduct: string;
  fundingRaisedUSD: string;
  currentStatus: string;
  keyTechnicalChallenge: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface SpinningProcessStage {
  id: number;
  title: string;
  anatomicalZone: string;
  phValue: string;
  molecularState: string;
  biochemicalMechanism: string;
  engineeringAnalog: string;
  keyFeature: string;
}
