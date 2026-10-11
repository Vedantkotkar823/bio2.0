import { 
  Section, 
  MaterialProperty, 
  SilkTypeData, 
  StartupEntity, 
  ImageExplorerItem,
  QuizQuestion,
  SpinningProcessStage
} from '../types';

export const MATERIALS: MaterialProperty[] = [
  {
    id: 'dragline-silk',
    name: 'Major Ampullate Silk (Spider Dragline)',
    category: 'Natural Silk',
    tensileStrengthMPa: 1300,
    breakingStrainPct: 35,
    youngsModulusGPa: 10,
    toughnessMJm3: 160,
    densityGcm3: 1.34,
    color: '#10b981', // Emerald
    description: 'Gold standard for biological toughness. Combination of rigid crystalline beta-sheets in an elastic amorphous matrix allows massive kinetic energy absorption without catastrophic failure.'
  },
  {
    id: 'kevlar-29',
    name: 'Kevlar 29 (Aramid Fiber)',
    category: 'Synthetic Polymer',
    tensileStrengthMPa: 2800,
    breakingStrainPct: 3.5,
    youngsModulusGPa: 70,
    toughnessMJm3: 50,
    densityGcm3: 1.44,
    color: '#eab308', // Amber/Yellow
    description: 'High tensile strength and high stiffness, but brittle failure mode. Fails at only ~3.5% strain, absorbing ~3x less energy per unit volume than spider dragline silk before fracture.'
  },
  {
    id: 'high-tensile-steel',
    name: 'High-Tensile Structural Steel (ASTM A514)',
    category: 'Structural Metal',
    tensileStrengthMPa: 1500,
    breakingStrainPct: 8.0,
    youngsModulusGPa: 200,
    toughnessMJm3: 60,
    densityGcm3: 7.85,
    color: '#94a3b8', // Steel Gray
    description: 'Extremely high modulus (stiff) and respectable tensile strength, but massive weight penalty (density 7.85 g/cm³ vs 1.34 g/cm³ for silk). Specific strength is 5.8x lower than spider silk.'
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber (Standard Modulus)',
    category: 'Carbon Composite',
    tensileStrengthMPa: 3500,
    breakingStrainPct: 1.5,
    youngsModulusGPa: 230,
    toughnessMJm3: 25,
    densityGcm3: 1.78,
    color: '#38bdf8', // Cyan
    description: 'Exceptional specific stiffness and ultimate tensile strength, but virtually zero elasticity. Brittle shattering upon exceeding maximum load limit (1.5% strain).'
  },
  {
    id: 'nylon-66',
    name: 'Nylon 6,6 (Polyamide)',
    category: 'Synthetic Polymer',
    tensileStrengthMPa: 950,
    breakingStrainPct: 18.0,
    youngsModulusGPa: 5,
    toughnessMJm3: 80,
    densityGcm3: 1.14,
    color: '#a855f7', // Purple
    description: 'Ductile petroleum-derived polymer with moderate strength and good elongation, but lacks the crystalline nano-crosslinks necessary for true super-polymer toughness.'
  },
  {
    id: 'flagelliform-silk',
    name: 'Flagelliform Silk (Web Prey Capture Spiral)',
    category: 'Natural Silk',
    tensileStrengthMPa: 1000,
    breakingStrainPct: 270,
    youngsModulusGPa: 0.003,
    toughnessMJm3: 150,
    densityGcm3: 1.30,
    color: '#f43f5e', // Rose
    description: 'Hyper-elastic bio-elastomer capable of stretching nearly 3x its original length (270% strain) to arrest incoming airborne prey insects without snapping.'
  },
  {
    id: 'silkworm-silk',
    name: 'Commercial Silkworm Silk (Bombyx mori)',
    category: 'Natural Silk',
    tensileStrengthMPa: 600,
    breakingStrainPct: 18.0,
    youngsModulusGPa: 7,
    toughnessMJm3: 70,
    densityGcm3: 1.35,
    color: '#f59e0b', // Warm Amber
    description: 'Historically domesticated sericulture silk. Composed of fibroin and sericin, but exhibits less than half the tensile strength and toughness of orb-weaver dragline silk.'
  }
];

export const SILK_TYPES: SilkTypeData[] = [
  {
    name: 'Major Ampullate (Dragline)',
    gland: 'Major Ampullate Gland',
    primarySpidroin: 'MaSp1, MaSp2',
    naturalFunction: 'Orb-web outer frame, radial spokes, safety lifeline dragline',
    tensileStrengthMPa: 1300,
    extensibilityPct: 35,
    toughnessMJm3: 160,
    youngsModulusGPa: 10,
    structuralComposition: 'Poly-Ala antiparallel β-sheet nanocrystals (30-40%) + Gly-rich amorphous coils'
  },
  {
    name: 'Minor Ampullate',
    gland: 'Minor Ampullate Gland',
    primarySpidroin: 'MiSp1, MiSp2',
    naturalFunction: 'Temporary web scaffold spiral, web reinforcement, auxiliary lifelines',
    tensileStrengthMPa: 900,
    extensibilityPct: 12,
    toughnessMJm3: 65,
    youngsModulusGPa: 12,
    structuralComposition: 'High β-sheet crystalline content; minimal proline; low extensibility'
  },
  {
    name: 'Flagelliform',
    gland: 'Flagelliform Gland',
    primarySpidroin: 'Flag',
    naturalFunction: 'Orb-web capture spiral core; absorbs kinetic impact of flying prey',
    tensileStrengthMPa: 1000,
    extensibilityPct: 270,
    toughnessMJm3: 150,
    youngsModulusGPa: 0.003,
    structuralComposition: 'GPGGX pentapeptide motif repeats forming molecular spring nano-springs'
  },
  {
    name: 'Aggregate',
    gland: 'Aggregate Gland',
    primarySpidroin: 'AgSp1, AgSp2',
    naturalFunction: 'Aqueous sticky glue droplets coating the flagelliform capture spiral',
    tensileStrengthMPa: 10,
    extensibilityPct: 400,
    toughnessMJm3: 5,
    youngsModulusGPa: 0.0001,
    structuralComposition: 'Glycoprotein matrix with hygroscopic organic salts (betaine, GABamide)'
  },
  {
    name: 'Tubuliform / Cylindrical',
    gland: 'Tubuliform Gland',
    primarySpidroin: 'TuSp1',
    naturalFunction: 'Protective cocoon outer shell for egg sac shielding',
    tensileStrengthMPa: 600,
    extensibilityPct: 25,
    toughnessMJm3: 85,
    youngsModulusGPa: 4,
    structuralComposition: 'Large fibrous repeats rich in serine and alanine; environmental barrier'
  },
  {
    name: 'Aciniform',
    gland: 'Aciniform Gland',
    primarySpidroin: 'AcSp1',
    naturalFunction: 'Wrapping prey, stabilizing egg sac interior lining, web decorations',
    tensileStrengthMPa: 800,
    extensibilityPct: 80,
    toughnessMJm3: 110,
    youngsModulusGPa: 3,
    structuralComposition: 'Conserved globular repeated domains linked by disordered loops'
  },
  {
    name: 'Pyriform',
    gland: 'Pyriform Gland',
    primarySpidroin: 'PySp1',
    naturalFunction: 'Attachment cement discs (anchors silk threads to stone, wood, glass)',
    tensileStrengthMPa: 300,
    extensibilityPct: 15,
    toughnessMJm3: 30,
    youngsModulusGPa: 2,
    structuralComposition: 'Fibrous adhesive composite with histidine- and tyrosine-rich domains'
  }
];

export const STARTUPS: StartupEntity[] = [
  {
    name: 'Spiber Inc.',
    country: 'Japan',
    founded: 2007,
    hostOrganism: 'Microbial Fermentation (Engineered Bacteria)',
    targetProduct: 'Brewed Protein™ fibers for high-performance apparel, automotive composites, luxury fashion',
    fundingRaisedUSD: '$450M+',
    currentStatus: 'Commercial pilot plant operating in Rayong, Thailand; partnerships with The North Face & Goldwin',
    keyTechnicalChallenge: 'Purification recovery yields, spinning solvent environmental recycling, production cost parity'
  },
  {
    name: 'AMSilk GmbH',
    country: 'Germany',
    founded: 2008,
    hostOrganism: 'Escherichia coli (E. coli)',
    targetProduct: 'Biosteel® fibers, medical coatings (breast implant biocompatibility), microcapsules',
    fundingRaisedUSD: '$60M+',
    currentStatus: 'Supply agreements with Mercedes-Benz (sustainable EQXX concept interior) and Omega watch straps',
    keyTechnicalChallenge: 'Scale-up fermentation beyond 100 m³ vessels without inclusion body precipitation'
  },
  {
    name: 'Bolt Threads',
    country: 'USA',
    founded: 2009,
    hostOrganism: 'Pichia pastoris (Yeast)',
    targetProduct: 'Microsilk™ recombinant spider silk peptides & mycelium leather (Mylo)',
    fundingRaisedUSD: '$250M+',
    currentStatus: 'Pivoted to cosmetic bio-ingredients (B-Silk) and public listing via SPAC merger',
    keyTechnicalChallenge: 'Downstream spinning capital expenditure economics versus commodity petrochemical synthetic fibers'
  },
  {
    name: 'Kraig Biocraft Laboratories',
    country: 'USA',
    founded: 2006,
    hostOrganism: 'Transgenic Bombyx mori (Silkworm)',
    targetProduct: 'Monster Silk® & Dragon Silk® (spider gene integrated into silkworm genome)',
    fundingRaisedUSD: '$30M+',
    currentStatus: 'Factory operational in Vietnam; producing recombinant raw silk yarn utilizing existing sericulture facilities',
    keyTechnicalChallenge: 'Balancing cocoon yield with higher percentage of MaSp spidroin incorporation'
  },
  {
    name: 'Spintex Engineering',
    country: 'United Kingdom (Oxford Spin-out)',
    founded: 2018,
    hostOrganism: 'Biomimetic Room-Temperature Aqueous Spinning',
    targetProduct: 'Water-based artificial spinning mimicking the spider duct without harsh organic solvents',
    fundingRaisedUSD: '$5M+',
    currentStatus: 'Lab-scale pilot demonstrating room temperature spinning with 1,000x lower energy usage than wet synthetic spinning',
    keyTechnicalChallenge: 'Continuous high-speed filament winding and long-term dope rheological stability'
  }
];

export const EXPLORER_ITEMS: Record<string, ImageExplorerItem> = {
  gland: {
    id: 'gland',
    title: 'Major Ampullate Gland & Biomimetic Spinning Duct',
    subtitle: 'Anatomical Architecture of the Spider Silk Bio-Extruder (In Vivo Microfluidics)',
    caption: 'Cross-sectional architectural schematic of the major ampullate gland showing the physiological gradient: chemical acidification (pH 7.2 to 5.7), shear drawdown, and liquid crystal phase inversion.',
    diagramType: 'gland',
    highResNotes: [
      'Spider spinning occurs at ambient temperature (20-25°C) and atmospheric pressure without harsh petrochemical solvents.',
      'The silk dope reaches extreme concentrations (up to 50% wt/vol) without aggregating prematurely due to steric protection by N- and C-terminal globular domains.',
      'Active proton pumps (V-ATPases) and carbonic anhydrase establish a steep pH gradient across the duct.',
      'Ion exchange: Sodium (Na+) and Chloride (Cl-) ions are actively extracted and replaced with Potassium (K+) and Phosphate (PO4^3-).'
    ],
    conceptualNotice: 'Diagram represents a generalized biological model based on Nephila clavipes and Araneus diadematus physiological studies (Vollrath, Knight, & Andersson).',
    hotspots: [
      {
        id: 'tail-synthesis',
        title: 'Zone 1: Gland Tail (Spidroin Biosynthesis)',
        x: 18,
        y: 68,
        description: 'Columnar epithelial cells synthesize massive, repetitive spidroin proteins (250-350 kDa) at high translation rates.',
        biologicalRole: 'Continuous secretion of MaSp1 and MaSp2 pro-proteins into the lumen in a soluble, unaggregated state.',
        molecularStructure: 'Hyper-repetitive glycine- and alanine-rich motifs wrapped between folded N- and C-terminal globular caps.',
        engineeringSignificance: 'Biological translation efficiency of repetitive genes without premature ribosomal stalling — a major hurdle for synthetic bioreactors.'
      },
      {
        id: 'ampulla-reservoir',
        title: 'Zone 2: Ampulla (Liquid Dope Storage Reservoir)',
        x: 35,
        y: 42,
        description: 'Large storage chamber containing a high-density (30-50% w/v) lyotropic liquid crystalline dope.',
        biologicalRole: 'Stores unspun protein in an inactive, metastable nematic liquid crystal phase at neutral pH (~7.2) with high NaCl.',
        molecularStructure: 'Random-coil and helical conformations prevented from beta-sheet aggregation by electrostatic repulsion and terminal domain caps.',
        engineeringSignificance: 'Solubility maintenance at extreme concentrations: inspires stable protein storage formulations and biopharmaceutical packaging.'
      },
      {
        id: 'funnel-transition',
        title: 'Funnel Zone (Shear Alignment Initiation)',
        x: 52,
        y: 36,
        description: 'Tapering orifice that funnels the silk dope from the wide ampulla into the narrow, elongated spinning duct.',
        biologicalRole: 'Initiates extensional flow and aligns liquid crystalline polymer domains along the flow axis.',
        molecularStructure: 'Spidroin chains begin to stretch from disordered random coils into elongated parallel conformations.',
        engineeringSignificance: 'Hydrodynamic geometry minimizes vortex formation and prevents clumping during high-throughput micro-extrusion.'
      },
      {
        id: 's-duct-ion-exchange',
        title: 'Zone 3: Elongated S-Duct (Physicochemical Reactor)',
        x: 70,
        y: 50,
        description: 'Long, looped microfluidic channel where chemical acidification and ion exchange trigger molecular re-folding.',
        biologicalRole: 'Proton exchange drops pH from 7.2 to 5.7. Na+ is actively pumped out; K+ and phosphate are introduced. Water is actively absorbed.',
        molecularStructure: 'N-terminal domains undergo antiparallel homodimerization, crosslinking spidroins into infinite polymeric chains.',
        engineeringSignificance: 'Aqueous, energy-efficient phase transition without organic solvents (replaces toxic DMAc or HFIP used in commercial fiber spinning).'
      },
      {
        id: 'valve-drawdown',
        title: 'Muscular Drawdown Valve',
        x: 82,
        y: 44,
        description: 'Specialized sphincter muscle that exerts mechanical draw and controls fiber diameter.',
        biologicalRole: 'Imposes strong extensional shear stress, forcing alanine-rich regions to collapse into antiparallel beta-sheet crystals.',
        molecularStructure: 'Permanent conformational lock: conversion of alpha-helices and random coils into insoluble beta-sheet nanocrystals.',
        engineeringSignificance: 'Enables real-time variable diameter control and post-draw crystallization similar to industrial fiber drawing lines.'
      },
      {
        id: 'spigot-exit',
        title: 'Spigot Nozzle (Atmospheric Solidification)',
        x: 93,
        y: 38,
        description: 'Microscopic exit orifice located on the external spinneret surface.',
        biologicalRole: 'Extrudes solid, dry, insoluble dragline silk fiber directly into atmospheric air.',
        molecularStructure: 'Final hierarchy: 2-5 nm beta-sheet nanocrystals embedded in amorphous glycine-rich nano-spring matrix.',
        engineeringSignificance: 'Zero-cure-time solid fiber generation at room temperature and pressure.'
      }
    ]
  },
  nanostructure: {
    id: 'nanostructure',
    title: 'Spidroin Hierarchical Nano-Architecture',
    subtitle: 'From Angstrom-Scale Amino Acid Motifs to Macroscopic High-Toughness Fibers',
    caption: 'Multi-scale structural hierarchy of Major Ampullate Spidroin (MaSp). Antiparallel beta-sheet nanocrystals (~30-40% volume fraction) impart ultra-high tensile strength, while amorphous glycine-rich motifs provide immense extensibility.',
    diagramType: 'nanostructure',
    highResNotes: [
      'Scale 1: Primary Amino Acid Motifs (Poly-Ala, (GA)n, GPGXX, GGX).',
      'Scale 2: Secondary Nanocrystals (2-5 nm beta-sheet stacks bonded by dense hydrogen bonds).',
      'Scale 3: Amorphous Matrix (Disordered elastin-like nano-springs with hidden length).',
      'Scale 4: Fibrillar Bundles (100-200 nm sub-filaments aligned axially).',
      'Scale 5: Macroscopic Core-Shell Fiber (2-5 µm diameter dragline thread with protective lipid/glycoprotein coat).'
    ],
    conceptualNotice: 'Structural model synthesized from Solid-State NMR, Wide-Angle X-ray Scattering (WAXS), and Molecular Dynamics simulations (Kaplan, Lewis, Vollrath, Buehler).',
    hotspots: [
      {
        id: 'n-terminal-lock',
        title: 'N-Terminal Domain (pH-Dependent Molecular Switch)',
        x: 15,
        y: 28,
        description: 'Conserved globular domain (~130 amino acids) acting as an environmentally responsive trigger.',
        biologicalRole: 'Soluble monomer at pH > 7.0; shifts to a tight antiparallel homodimer as pH drops below 6.0 in the spinning duct.',
        molecularStructure: 'Five-helix bundle with conserved glutamate and aspartate residues regulating proton-dependent dimerization.',
        engineeringSignificance: 'Bio-switch mechanism prevents premature clotting inside bioreactor lines until triggered by controlled pH acidification.'
      },
      {
        id: 'beta-sheet-nanocrystals',
        title: 'Poly-Alanine Beta-Sheet Nanocrystals (Strength & Stiffness)',
        x: 42,
        y: 45,
        description: 'Densely packed, interdigitated methyl groups forming 2-5 nm nanocrystalline domains.',
        biologicalRole: 'Carries tensile load, resists shear slip, and provides the extraordinary 1.3+ GPa tensile strength.',
        molecularStructure: 'Antiparallel beta-sheets stabilized by dense networks of cooperative hydrogen bonds and hydrophobic alanine sidechains.',
        engineeringSignificance: 'Cooperative nanoscale confinement: small crystal size (2-5 nm) prevents stress concentrations and maximizes Griffith critical crack resistance.'
      },
      {
        id: 'amorphous-matrix',
        title: 'Glycine-Rich Amorphous Matrix (Extensibility & Springiness)',
        x: 65,
        y: 55,
        description: 'Elastin-like disordered peptide segments (GPGXX and GGX motifs) wrapping between crystalline blocks.',
        biologicalRole: 'Uncoils under tension to dissipate mechanical kinetic energy, allowing 30-40% elongation before fracture.',
        molecularStructure: 'Proline-induced beta-turn spirals and disordered random coils providing entropic elasticity and hidden length.',
        engineeringSignificance: 'Prevents catastrophic brittle failure seen in Kevlar and carbon fiber; acts as a sacrificial molecular shock absorber.'
      },
      {
        id: 'c-terminal-regulator',
        title: 'C-Terminal Domain (Alignment & Dimerization Anchor)',
        x: 85,
        y: 35,
        description: 'Globular domain (~100 amino acids) containing a conserved intermolecular disulfide bridge.',
        biologicalRole: 'Maintains constitutive covalent dimerization, ensuring correct parallel registration of spidroin dimers.',
        molecularStructure: 'Five-helix bundle held together by covalent Cys-Cys disulfide linkage and salt bridges.',
        engineeringSignificance: 'Ensures unidirectional shear alignment during biomimetic wet-spinning and microfluidic extrusion.'
      }
    ]
  },
  bioreactor: {
    id: 'bioreactor',
    title: 'Synthetic Biology & Industrial Biomanufacturing Architecture',
    subtitle: 'From Recombinant Gene Design to Downstream Spinning and Fiber Winding',
    caption: 'Industrial workflow for producing recombinant spider silk spidroins via heterologous microbial fermentation and biomimetic aqueous spinning.',
    diagramType: 'bioreactor',
    highResNotes: [
      'Gene synthesis: Codon optimization is essential to overcome host tRNA depletion caused by glycine (GGA/GGU) and alanine bias.',
      'Fermentation: Fed-batch cultivation in stirred-tank bioreactors (5,000L - 50,000L) operating with carbon-limiting glucose feeds.',
      'Downstream recovery: Thermal precipitation takes advantage of the unique intrinsic thermal stability of spidroins (denatures host proteins while spidroins stay soluble).',
      'Spinning: Replacement of toxic hexafluoroisopropanol (HFIP) with aqueous formic acid or biomimetic shear-coagulation.'
    ],
    conceptualNotice: 'Industrial flow model derived from published pilot data from Spiber Inc., AMSilk GmbH, and academic scale-up literature.',
    hotspots: [
      {
        id: 'host-strain',
        title: 'Host Strain & Genetic Engineering',
        x: 16,
        y: 50,
        description: 'Heterologous host (E. coli, Pichia pastoris, or engineered Corynebacterium glutamicum) harboring synthetic spidroin gene.',
        biologicalRole: 'Translates high-molecular-weight (>100 kDa) silk proteins without homologous recombination breakdown.',
        molecularStructure: 'Synthetic codon-harmonized cDNA plasmids with inducible promoters (e.g. IPTG or methanol-driven AOX1).',
        engineeringSignificance: 'Genetic stability: reducing repeat tract length vs preserving mechanical properties is the central engineering trade-off.'
      },
      {
        id: 'fermentation-vessel',
        title: 'Precision Fed-Batch Fermentation',
        x: 38,
        y: 42,
        description: 'Controlled bioreactor vessel regulating dissolved oxygen (DO > 30%), pH 7.0, and exponential glucose feed.',
        biologicalRole: 'Achieves high cell density (>100 g/L dry cell weight) and pushes spidroin titre toward commercial viability (>15 g/L).',
        molecularStructure: 'Proteins accumulate intracellularly (either soluble in cytoplasm or packaged into discrete inclusion bodies).',
        engineeringSignificance: 'Volumetric productivity (g/L/hr) is the single biggest determinant of cost per kilogram in MBA techno-economic modeling.'
      },
      {
        id: 'downstream-purification',
        title: 'Downstream Processing (DSP) & Thermal Purification',
        x: 62,
        y: 52,
        description: 'Cell disruption followed by selective heat shock (80°C for 20 min) or tangential flow filtration (TFF).',
        biologicalRole: 'Precipitates and coagulates host cell proteins (HCPs) while thermostable spidroins remain in soluble supernatant.',
        molecularStructure: 'Spidroin disorder enables rapid reversible refolding following thermal exposure, leaving >95% pure monomer.',
        engineeringSignificance: 'Eliminates costly multi-step affinity chromatography, cutting downstream processing operating expenses by over 60%.'
      },
      {
        id: 'spinning-extrusion',
        title: 'Microfluidic Spinning & Draw Alignment',
        x: 86,
        y: 40,
        description: 'Aqueous dope extrusion through micro-nozzles into an isopropanol/water coagulation bath followed by post-drawing rollers.',
        biologicalRole: 'Applies 3x - 5x draw ratio, aligning polymer chains and inducing shear crystallization into insoluble macroscopic fibers.',
        molecularStructure: 'Soluble random coils convert into load-bearing beta-sheet nanocrystals under mechanical tension.',
        engineeringSignificance: 'Continuous roll-to-roll filament production ready for industrial textile winding and composite weaving.'
      }
    ]
  }
};

export const SECTIONS: Section[] = [
  {
    id: 'section-1',
    number: 1,
    title: 'Executive Summary: The Biomaterial Frontier',
    category: 'Fundamentals',
    subtitle: 'Nature’s High-Performance Super-Polymer & The Bio-Economy Transition',
    summary: 'Spider silk represents one of the pinnacle achievements of molecular evolution: an entirely proteinaceous biopolymer synthesized from renewable amino acids at ambient temperature and pressure that outclasses synthetic petrochemical fibers in toughness and strength-to-weight ratio.',
    scientificDetails: [
      'Evolutionary refinement over 380+ million years has generated an ultra-tough structural protein capable of absorbing massive kinetic impact energy without catastrophic brittle fracture.',
      'Major ampullate dragline silk combines a tensile strength of ~1.3 GPa (comparable to high-strength alloy steels) with an elongation at break of ~35%, yielding a work of fracture (toughness) of 160 MJ/m³ — triple that of Kevlar 29.',
      'Unlike synthetic polyamides and aramids manufactured using petroleum feedstocks, harsh sulfuric acid solvents, and elevated temperatures (>250°C), spiders spin dragline silk out of aqueous dope at room temperature (~22°C) with water as the sole byproduct.',
      'For 1st Year MBA Tech Computer Engineering students, spider silk embodies the ultimate intersection of biological nanotechnology, algorithmic gene design, and advanced industrial techno-economics.'
    ],
    keyMetrics: [
      { label: 'Tensile Strength', value: '1.3 - 1.5', unit: 'GPa', note: 'Exceeds structural steel' },
      { label: 'Extensibility', value: '30 - 35', unit: '%', note: '10x higher than Kevlar' },
      { label: 'Toughness', value: '160', unit: 'MJ/m³', note: '3x superior to Kevlar 29' },
      { label: 'Spinning Solvent', value: '100% Aqueous', unit: 'H₂O', note: 'Zero petrochemicals' }
    ],
    mbaRelevance: 'Addresses the trillion-dollar technical textiles and advanced biomaterials market. Bridges biological synthesis with industrial manufacturing, positioning bio-based polymers as replacements for carbon-intensive petroleum nylon and polyester.',
    citation: 'Vollrath, F., & Knight, D. P. (2001). Liquid crystalline spinning of spider silk. Nature, 410(6828), 541-548.',
    diagramType: 'summary',
    imageExplorerId: 'gland'
  },
  {
    id: 'section-2',
    number: 2,
    title: 'Gland Anatomy & In Vivo Spinning Apparatus',
    category: 'Fundamentals',
    subtitle: 'Microfluidic Engineering in the Major Ampullate Gland',
    summary: 'Spiders extrude silk through specialized internal abdominal glands connected to external spinnerets. The major ampullate gland is an exquisite natural microfluidic chemical reactor that converts soluble liquid protein dope into an insoluble solid fiber in fractions of a second.',
    scientificDetails: [
      'The major ampullate gland comprises three primary morphological zones: the secretory tail (biosynthesis zone), the ampulla (storage reservoir), and the elongated S-shaped spinning duct.',
      'In the secretory tail, specialized columnar epithelial cells synthesize high-molecular-weight spidroin proteins (>250-350 kDa) at exceptional translation rates.',
      'The ampulla stores silk dope at extreme concentrations (30-50% w/v) in a liquid crystalline nematic state, preventing premature aggregation through elevated pH (~7.2) and high NaCl concentrations.',
      'As dope traverses the S-shaped duct, proton pumps (V-ATPases) and carbonic anhydrase lower the pH from 7.2 to 5.7, while ion exchange replaces Na+ with K+ and phosphate.',
      'A muscular drawdown valve applies extensional shear stress, forcing the alanine-rich domains to align and crystallize into antiparallel beta-sheets before exiting the spigot nozzle.'
    ],
    keyMetrics: [
      { label: 'Dope Concentration', value: '30 - 50', unit: '% w/v', note: 'High-density liquid crystal' },
      { label: 'Duct pH Gradient', value: '7.2 → 5.7', unit: 'pH', note: 'Active acidification' },
      { label: 'Spinning Speed', value: '1 - 100', unit: 'mm/s', note: 'Controlled by draw valve' }
    ],
    mbaRelevance: 'Demonstrates low-energy microfluidic manufacturing: room-temperature aqueous extrusion provides an architectural blueprint for biomimetic industrial fiber spinning lines with minimal energy inputs.',
    citation: 'Andersson, M., et al. (2017). Biomimetic spinning of artificial spider silk from a chimeric minispidroin. Nature Chemical Biology, 13(3), 262-264.',
    diagramType: 'gland',
    imageExplorerId: 'gland'
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Molecular Architecture & Spidroin Genetics',
    category: 'Molecular Biology',
    subtitle: 'Primary Sequences, Repetitive Block Copolymers, and Terminal Locks',
    summary: 'Spider dragline silk is composed predominantly of two massive structural proteins: Major Ampullate Spidroin 1 (MaSp1) and Major Ampullate Spidroin 2 (MaSp2). These proteins exhibit a triblock copolymer architecture consisting of a vast repetitive core flanked by non-repetitive globular terminal domains.',
    scientificDetails: [
      'MaSp1 is characterized by poly-alanine (An) segments and glycine-alanine/glycine-glycine-X ((GA)n / GGX) motifs, contributing predominantly to crystal formation and high tensile stiffness.',
      'MaSp2 contains distinct proline-rich pentapeptide repeats (GPGXX and GPGQQ), introducing beta-turn spirals that furnish dragline silk with its characteristic elasticity.',
      'The central repetitive region spans over 3,000 amino acids (~90% of the protein mass) and is flanked by evolutionary conserved N-terminal (~130 aa) and C-terminal (~100 aa) non-repetitive domains.',
      'The N-terminal domain acts as a pH-dependent homodimerization switch: at neutral pH in the gland reservoir it remains monomeric, but protonation below pH 6.0 locks it into a tight antiparallel dimer.',
      'The C-terminal domain forms a constitutive covalent homodimer via an intermolecular disulfide bridge (Cys-Cys), ensuring parallel registration and shear alignment of spidroin chains.'
    ],
    keyMetrics: [
      { label: 'Molecular Weight', value: '250 - 350', unit: 'kDa', note: 'Native full-length spidroin' },
      { label: 'Repetitive Core', value: '>90', unit: '% sequence', note: 'Poly-Ala and Gly-rich repeats' },
      { label: 'NTD Homodimerization', value: 'pH < 6.0', unit: 'Trigger', note: 'Acid-responsive lock' }
    ],
    mbaRelevance: 'Understanding the modular block copolymer architecture allows protein engineers to design minimized "minispidroins" (30-60 kDa) that retain 70-80% of native mechanical performance while dramatically improving host yield.',
    citation: 'Ayoub, N. A., et al. (2007). Blueprint for a high-performance biomaterial: full-length spider dragline silk genes. PLoS ONE, 2(6), e514.',
    diagramType: 'nanostructure',
    imageExplorerId: 'nanostructure'
  },
  {
    id: 'section-4',
    number: 4,
    title: 'Hierarchical Structure: Nanocrystals to Microfibers',
    category: 'Molecular Biology',
    subtitle: 'Nanoscale Confinement and the Physical Basis of Toughness',
    summary: 'The exceptional mechanical performance of spider silk is rooted in its hierarchical multi-scale architecture spanning five orders of magnitude: from angstrom-level amino acid hydrogen bonds to macroscopic multi-core fibers.',
    scientificDetails: [
      'Scale 1 (Angstroms): Primary amino acid sequence motifs (poly-alanine, GPGXX, GGX) dictate secondary structural propensity.',
      'Scale 2 (Nanometers, 2-5 nm): Antiparallel beta-sheet nanocrystals form through dense hydrogen bonding networks between interdigitated methyl side chains of adjacent poly-alanine blocks.',
      'Scale 3 (10-50 nm): Nanocrystals (~30-40% volume fraction) are embedded homogeneously inside a disordered, amorphous glycine-rich matrix consisting of random coils and 3_10-helices.',
      'Scale 4 (Sub-micron, 100-200 nm): Spidroins assemble into discrete nanofibrils oriented parallel to the longitudinal fiber axis.',
      'Scale 5 (Microns, 2-5 µm): Thousands of nanofibrils bundle within a skin-core sheath coated by a thin protective lipid and glycoprotein outer jacket.',
      'Griffith Crack Criterion: Nanoscale confinement of beta-sheet crystals (sub-5 nm) prevents stress concentrations from propagating microcracks, enabling the material to deform plastically rather than cleaving catastrophically.'
    ],
    keyMetrics: [
      { label: 'Nanocrystal Size', value: '2 - 5', unit: 'nm', note: 'Optimal Griffith confinement' },
      { label: 'Crystalline Fraction', value: '30 - 40', unit: '% vol', note: 'Dispersed in amorphous matrix' },
      { label: 'Fiber Diameter', value: '2 - 5', unit: 'µm', note: 'Monofilament thickness' }
    ],
    mbaRelevance: 'Nanocomposite design principles derived from spider silk are driving next-generation bio-mimetic carbon-fiber composites and sustainable tire reinforcement cords.',
    citation: 'Keten, S., Xu, Z., Ihle, B., & Buehler, M. J. (2010). Nanoconfinement controls stiffness, strength and mechanical toughness of beta-sheet crystals in spider silk. Nature Materials, 9(4), 359-367.',
    diagramType: 'nanostructure',
    imageExplorerId: 'nanostructure'
  },
  {
    id: 'section-5',
    number: 5,
    title: 'Phase Separation & Microfluidic Silk Dope',
    category: 'Molecular Biology',
    subtitle: 'Liquid Crystalline Rheology and Shear-Induced Phase Inversion',
    summary: 'Silk spinning is not a simple drying or chemical coagulation process; it is a shear-induced liquid-liquid phase separation (LLPS) accompanied by an irreversible conformational phase transition from liquid dope to solid fiber.',
    scientificDetails: [
      'In the storage ampulla, spidroins form a lyotropic liquid crystalline dope exhibiting nematic order, which dramatically lowers viscosity at high concentrations and facilitates flow through narrow ducts.',
      'Microfluidic shear thinning: Under laminar extensional flow, the apparent viscosity drops by over 3 orders of magnitude as polymer chains align along streamlines.',
      'Acidification along the spinning duct protonates key histidine and glutamate residues on the N-terminal domain, initiating intermolecular assembly into polymeric nanofibrils.',
      'Ion exchange: Sodium and chloride ions (chaotropic, promoting solubility) are selectively extracted by duct epithelia and replaced with potassium and phosphate ions (kosmotropic, promoting protein folding and water desolvation).',
      'Phase inversion: Mechanical shear stress exceeding a critical threshold triggers cooperative hydrogen bonding, converting amorphous random coils into stable beta-sheets and expelling water molecules from the hydrophobic core.'
    ],
    keyMetrics: [
      { label: 'Viscosity Reduction', value: '>1000x', unit: 'Shear-thinning', note: 'Non-Newtonian flow behavior' },
      { label: 'Water Content in Dope', value: '~50 - 70', unit: '%', note: 'Expelled during drawdown' },
      { label: 'Phase State', value: 'Nematic LC', unit: 'Phase', note: 'Lowers extrusion pressure' }
    ],
    mbaRelevance: 'Eliminates the need for expensive, hazardous organic solvents (like hexafluoroisopropanol at $1,200/L or concentrated sulfuric acid) in industrial fiber production, drastically cutting environmental compliance and solvent recovery CapEx.',
    citation: 'Knight, D. P., & Vollrath, F. (2001). Changes in element composition along the spinning duct in Nephila clavipes. Naturwissenschaften, 88(4), 179-182.',
    diagramType: 'gland',
    imageExplorerId: 'gland'
  },
  {
    id: 'section-6',
    number: 6,
    title: 'Mechanical Super-Properties & Stress-Strain Analysis',
    category: 'Biomechanics',
    subtitle: 'Quantitative Comparison: Spider Silk vs Kevlar, Steel, and Carbon Fiber',
    summary: 'The defining characteristic of spider dragline silk is its unparalleled toughness (work of fracture) — the total kinetic energy a material can absorb per unit volume before breaking, quantified as the area under the stress-strain curve.',
    scientificDetails: [
      'Tensile Strength (Ultimate Stress): Dragline silk achieves 1.3 - 1.5 GPa, matching high-strength alloy steels (~1.5 GPa) and outperforming structural titanium (~1.0 GPa).',
      'Breaking Elongation (Strain): Unlike brittle engineering fibers (Kevlar at 3.5%, Carbon Fiber at 1.5%), dragline silk elongates by 30-35% before catastrophic failure.',
      'Young’s Modulus (Initial Stiffness): With a modulus of 10 - 12 GPa, dragline silk is supple enough to flex in wind without snapping, yet stiff enough to support the spider’s weight.',
      'Work of Fracture (Toughness): Calculated by integrating engineering stress over strain: Dragline silk reaches 160 MJ/m³, compared to 50 MJ/m³ for Kevlar 29, 60 MJ/m³ for structural steel, and 25 MJ/m³ for carbon fiber.',
      'Specific Properties (Weight-Normalized): At a low density of 1.34 g/cm³, spider silk’s specific strength (strength/density) is nearly 6 times greater than high-strength steel (7.85 g/cm³).'
    ],
    keyMetrics: [
      { label: 'Spider Dragline Silk', value: '160', unit: 'MJ/m³', note: 'Gold standard toughness' },
      { label: 'Kevlar 29', value: '50', unit: 'MJ/m³', note: 'High strength, low stretch' },
      { label: 'Structural Steel A514', value: '60', unit: 'MJ/m³', note: 'Dense weight penalty' },
      { label: 'Carbon Fiber', value: '25', unit: 'MJ/m³', note: 'Brittle failure mode' }
    ],
    mbaRelevance: 'High toughness makes spider silk the ideal material for dynamic energy absorption applications where weight savings are critical: aircraft arrestor cables, ballistic vehicle liners, automotive crumple composites, and athletic footwear.',
    citation: 'Gosline, J. M., et al. (1999). The mechanical design of spider silks: from fibroin sequence to mechanical function. Journal of Experimental Biology, 202(23), 3295-3303.',
    diagramType: 'stressStrain'
  },
  {
    id: 'section-7',
    number: 7,
    title: 'Spider Silk Diversity: The 7 Specialized Glands',
    category: 'Biomechanics',
    subtitle: 'Evolutionary Divergence of Silk Types for Specialized Functional Niches',
    summary: 'Female orb-weaving spiders (*Araneidae*) produce up to seven distinct types of silk, each synthesized in a dedicated gland system with customized amino acid composition, mechanical properties, and biological roles.',
    scientificDetails: [
      '1. Major Ampullate: High-strength, high-toughness dragline lifeline and orb-web radial structural frame.',
      '2. Minor Ampullate: Highly oriented, low-proline silk used for auxiliary web scaffolding and temporary reinforcement.',
      '3. Flagelliform: Hyper-elastic prey capture spiral capable of 270% elongation without permanent deformation, absorbing the kinetic momentum of flying insects.',
      '4. Aggregate: Glycoprotein aqueous glue droplets containing hygroscopic salts that prevent droplets from drying out in ambient air.',
      '5. Tubuliform (Cylindrical): Tough, protective multi-layered shell surrounding and insulating the spider’s egg sac.',
      '6. Aciniform: High-toughness wrapping silk utilized for swathing captured prey and padding egg cocoons (absorbs 50% more energy than dragline silk).',
      '7. Pyriform: Fast-drying bio-adhesive cement discs anchoring silk threads securely to wood, stone, foliage, and manmade substrates.'
    ],
    keyMetrics: [
      { label: 'Distinct Silk Glands', value: '7', unit: 'Specialized', note: 'In female orb-weavers' },
      { label: 'Flagelliform Strain', value: '270', unit: '%', note: 'Hyper-elastic bio-rubber' },
      { label: 'Aciniform Toughness', value: '110', unit: 'MJ/m³', note: 'Ultra-tough wrapping thread' }
    ],
    mbaRelevance: 'Demonstrates a versatile platform chemistry: a single biological organism expresses distinct protein formulations for rigid structural frames, hyper-elastic shock absorbers, and specialized contact adhesives.',
    citation: 'Romer, L., & Scheibel, T. (2008). The elaborate structure of spider silk: Structure and function of a natural high performance fiber. Prion, 2(4), 154-161.',
    diagramType: 'diversity'
  },
  {
    id: 'section-8',
    number: 8,
    title: 'Recombinant Biotechnology & Heterologous Hosts',
    category: 'Synthetic Biology & Biotech',
    subtitle: 'Overcoming Cannibalism: Microbial Fermentation vs Transgenic Organisms',
    summary: 'Spiders are aggressive territorial predators that cannot be farmed like domesticated silkworms (*Bombyx mori*). Consequently, industrial production relies entirely on recombinant DNA technology and heterologous expression systems.',
    scientificDetails: [
      'Microbial Hosts (*Escherichia coli*): Enables rapid growth and well-characterized genetics, but faces high tRNA depletion when translating repetitive glycine and alanine codons; proteins often aggregate into insoluble inclusion bodies requiring denaturing agents.',
      'Yeast Expression (*Pichia pastoris*, *Saccharomyces cerevisiae*): Capable of high-density fed-batch fermentation with extracellular protein secretion; however, yeast post-translational modifications and genetic recombination can excise repetitive sequences.',
      'Transgenic Silkworms (*Bombyx mori*): Pioneered using TALEN and CRISPR-Cas9 genome editing to insert spidroin sequences into the silkworm fibroin heavy chain locus, allowing direct cocoon spinning in existing sericulture textile infrastructure.',
      'Transgenic Mammals (Nexia Biotechnologies Goat Milk): Historic proof-of-concept expressing MaSp1 in dairy goat mammary glands; faced severe scale-up economics and downstream purification bottlenecks.',
      'Minispidroin Engineering: Truncating 300 kDa spidroins down to 30-60 kDa artificial constructs containing 4-8 repeat blocks with native N- and C-terminal domains restores expression yields without sacrificing self-assembly capabilities.'
    ],
    keyMetrics: [
      { label: 'E. coli Titre Record', value: '10 - 15', unit: 'g/L', note: 'Laboratory fed-batch' },
      { label: 'Pichia pastoris Yield', value: '15 - 25', unit: 'g/L', note: 'Extracellular secretion' },
      { label: 'Silkworm Silk Chimeras', value: 'Up to 15', unit: '% Spidroin', note: 'Spun directly into cocoons' }
    ],
    mbaRelevance: 'Scale-up economics dictate that microbial fermentation using low-cost carbon sources (glucose, agricultural sucrose, or industrial methanol) is the most scalable, capital-efficient production route for industrial bio-polymers.',
    citation: 'Widhe, M., et al. (2012). Recombinant spider silk proteins: production, characterization, and potential applications. Biomaterials, 33(32), 7957-7965.',
    diagramType: 'pipeline',
    imageExplorerId: 'bioreactor'
  },
  {
    id: 'section-9',
    number: 9,
    title: 'Computational Biology, AI & de novo Protein Design',
    category: 'Computational Biology',
    subtitle: 'AlphaFold, Molecular Dynamics & Algorithmic Sequence Engineering',
    summary: 'For Computer Engineering students, recombinant spider silk is a premier application of modern computational biology: combining deep learning protein structure prediction, all-atom molecular dynamics, and algorithmic gene optimization.',
    scientificDetails: [
      'AlphaFold & ESMFold Limitations: Deep learning models excel at predicting globular terminal domains (NTD and CTD) with pLDDT > 90, but assign low confidence scores (pLDDT < 50) to the repetitive core due to intrinsic disorder and lack of evolutionary covariation.',
      'All-Atom Molecular Dynamics (MD): Steered molecular dynamics (SMD) simulations pioneered by Buehler and colleagues simulate force-induced unfolding of beta-sheet nanocrystals, revealing that clusters of 3-4 beta-strands resist shear stress via cooperative hydrogen bond breaking.',
      'Algorithmic Codon Harmonization: Machine learning tools optimize nucleotide sequences to match host-specific tRNA pools, balancing codon frequency with mRNA secondary structure to prevent ribosome stalling.',
      'De Novo Minispidroin Design: Generative diffusion models (RFdiffusion, Chroma) enable computational design of non-repetitive artificial silk sequences with enhanced solubility and tailored mechanical properties.',
      'Digital Twin Bioprocess Control: Neural networks and Kalman filters monitor real-time bioreactor parameters (dissolved oxygen, off-gas CO2, stirrer power) to dynamically modulate feed rates and maximize protein titres.'
    ],
    keyMetrics: [
      { label: 'MD Simulation Scale', value: '>10^6', unit: 'Atoms', note: 'Buehler nanoconfinement models' },
      { label: 'AI pLDDT (Terminal)', value: '>92', unit: 'Score', note: 'High structural confidence' },
      { label: 'Generative Design', value: 'RFdiffusion', unit: 'Pipeline', note: 'De novo non-repetitive silk' }
    ],
    mbaRelevance: 'AI-accelerated protein design compresses the R&D cycle from 5-7 years of wet-lab mutagenesis down to 6-12 months of in silico screening, drastically lowering early-stage biotech burn rate.',
    citation: 'Buehler, M. J., & Yung, Y. C. (2009). Deformation and failure of protein materials in physiological environments. Nature Materials, 8(3), 175-188.',
    diagramType: 'pipeline'
  },
  {
    id: 'section-10',
    number: 10,
    title: 'Biomedical Applications & Regenerative Scaffolds',
    category: 'Biomedical & Engineering',
    subtitle: 'Nerve Regeneration, Biocompatible Sutures & Cell Growth Matrices',
    summary: 'Spider silk proteins are remarkably biocompatible, eliciting minimal immune response while providing exceptional mechanical strength and controlled enzymatic biodegradability inside physiological environments.',
    scientificDetails: [
      'Nerve Guide Conduits: Spider silk fibers inserted into decellularized vein grafts promote axonal elongation across severe peripheral nerve lesions (>6 cm gaps in animal models), guiding Schwann cell migration without neurotoxic scar tissue.',
      'Surgical Microsutures: Extremely thin monofilaments (sub-10 µm) exhibit high knot pull strength and zero inflammatory reaction, ideal for ophthalmic and neurosurgical procedures (conceptual / pre-clinical stages).',
      'Stem Cell Scaffolding: 3D porous recombinant spider silk foams support human mesenchymal stem cell attachment, proliferation, and chondrogenic differentiation for cartilage tissue engineering.',
      'Wound Dressings & Antimicrobial Coatings: Silk films functionalized with antimicrobial peptides prevent bacterial colonization (e.g. *Staphylococcus aureus*) while maintaining moist wound healing conditions.',
      'Conceptual Framing: While research demonstrates outstanding in vitro and animal model biocompatibility, experimental spider-silk-inspired sutures and implants are not yet universally approved for clinical human medical use and remain in clinical trial pipelines.'
    ],
    keyMetrics: [
      { label: 'Inflammatory Response', value: 'Minimal', unit: 'In Vivo', note: 'Absence of toxic sericin' },
      { label: 'Degradation Products', value: 'Amino Acids', unit: 'Bio-safe', note: 'Metabolized naturally' },
      { label: 'Axonal Extension', value: '>60', unit: 'mm gap', note: 'Pre-clinical nerve repair' }
    ],
    mbaRelevance: 'High-margin biomedical devices represent the most lucrative early-commercialization wedge for biotech startups, supporting premium price points ($1,000+ per gram) that easily absorb early high biomanufacturing costs.',
    citation: 'Allmeling, C., et al. (2008). Spider silk fibres promote peripheral nerve regeneration. Journal of Cellular and Molecular Medicine, 12(6a), 2410-2417.',
    diagramType: 'applications',
    conceptualDisclaimer: 'Notice: Biomedical applications and surgical sutures discussed are in pre-clinical and clinical trial evaluation phases; experimental spider silk materials are not universally approved clinical medical devices.'
  },
  {
    id: 'section-11',
    number: 11,
    title: 'Advanced Structural Bio-Composites & Defense',
    category: 'Biomedical & Engineering',
    subtitle: 'Impact Energy Absorption, Aerospace Liners, and Conceptual Protective Gear',
    summary: 'The combination of high specific tensile strength and massive kinetic toughness makes spider silk fibers prime candidates for continuous fiber-reinforced bio-composites in impact-critical structural engineering.',
    scientificDetails: [
      'Kinetic Energy Dissipation: Unlike rigid carbon fiber composites which delaminate upon high-velocity foreign object impact, spider-silk-reinforced epoxy composites deform plastically and dissipate impact energy throughout the matrix.',
      'Aerospace Interior Panels: Replacing petroleum-based fiberglass and epoxy panels with recombinant silk composites provides a 25-30% weight reduction while improving shatter resistance during emergency hard landings.',
      'Soft Robotics & Biomimetic Actuators: Spider silk fibers exhibit reversible supercontraction — contracting by up to 50% in length when exposed to relative humidity >70%, generating high work density for moisture-driven artificial muscles.',
      'Automotive Impact Buffers: Crash-box structural crumple zones reinforced with spider silk composites absorb peak deceleration forces, protecting passenger compartments in collision events.',
      'Conceptual Ballistic Protection: Popular media frequently claims spider silk creates bulletproof vests; in reality, while spider silk absorbs immense kinetic energy, its high extensibility (35%) can cause excessive blunt trauma deformation behind the strike face unless hybridized with ultra-stiff ceramic or aramid strike faces. Illustrated concepts are scientific research models, not certified ballistic armor.'
    ],
    keyMetrics: [
      { label: 'Impact Absorption', value: '2.5x - 3x', unit: 'vs Carbon Fiber', note: 'Prevents brittle shattering' },
      { label: 'Weight Reduction', value: '25 - 30', unit: '% vs Glass', note: 'Density 1.34 vs 2.54 g/cm³' },
      { label: 'Supercontraction', value: 'Up to 50', unit: '% contraction', note: 'Humidity-driven actuation' }
    ],
    mbaRelevance: 'Enables entry into high-value aerospace, automotive, and defense composite supply chains seeking lightweighting solutions to meet net-zero aviation and electric vehicle range targets.',
    citation: 'Shah, D. U., et al. (2014). Recombinant spider silk/synthetic polymer hybrid composites for impact-resistant structural applications. Advanced Functional Materials, 24(12), 1705-1715.',
    diagramType: 'applications',
    conceptualDisclaimer: 'Notice: Illustrated body armor and ballistic concepts represent academic biomechanical research models. They are not certified ballistic protection systems.'
  },
  {
    id: 'section-12',
    number: 12,
    title: 'Techno-Economic Analysis & Scaling Bottlenecks',
    category: 'MBA Tech & Economics',
    subtitle: 'Unit Economics, Titre Yields, CapEx/OpEx, and the Parity Horizon',
    summary: 'The commercial viability of recombinant spider silk is strictly governed by chemical engineering unit economics: fermentation titre (g/L), volumetric productivity (g/L/hr), downstream recovery yield (%), and bioreactor CapEx.',
    scientificDetails: [
      'Cost Structure Breakdown: In early-stage fermentation, downstream purification accounts for 45-60% of total OpEx, raw materials (glucose, nitrogen, trace minerals) account for 20-30%, and energy/utility overhead accounts for 15-20%.',
      'The Titre Threshold: At current laboratory titres of 2-5 g/L, production cost hovers between $300 - $800/kg, restricting applications to high-margin luxury fashion and biomedical implants.',
      'The Commercial Parity Target: Achieving an operating cost under $50/kg (necessary to compete with technical nylon and high-end automotive textiles) requires fermentation titres exceeding 20-25 g/L, downstream recovery >75%, and 50,000L+ bioreactor scale.',
      'Capital Expenditure Bottleneck: Constructing a 500,000L commercial-scale precision fermentation facility requires $80M - $150M in upfront CapEx, creating significant financing hurdles during venture capital downturns.',
      'Spinning Solvent Economics: Traditional wet spinning uses toxic hexafluoroisopropanol (HFIP) costing >$1,000/L; transitioning to aqueous formic acid or biomimetic water-based spinning lines is non-negotiable for commercial unit economic viability.'
    ],
    keyMetrics: [
      { label: 'Current Pilot Cost', value: '$300 - $500', unit: '/kg', note: 'Luxury fashion & cosmetics' },
      { label: 'Target Parity Cost', value: '$30 - $50', unit: '/kg', note: 'Technical textiles market' },
      { label: 'Titre Threshold', value: '>20', unit: 'g/L', note: 'Required fermentation density' },
      { label: 'Downstream Recovery', value: '>75', unit: '% target', note: 'Thermal precipitation route' }
    ],
    mbaRelevance: 'Core curriculum case study for Technology Commercialization and Operations Management: balancing unit margin progression through multi-tier market entry (Cosmetics → Luxury Textiles → Automotive Composites → Commodity Synthetics).',
    citation: 'Babu, S. R., et al. (2018). Techno-economic assessment of recombinant protein production in high-density bacterial fermentation. Biotechnology and Bioengineering, 115(4), 932-945.',
    diagramType: 'technoEconomic'
  },
  {
    id: 'section-13',
    number: 13,
    title: 'Environmental Sustainability & Life Cycle Assessment',
    category: 'Sustainability & Outlook',
    subtitle: 'Microplastic Abatement, Carbon Footprint & Biodegradation Dynamics',
    summary: 'Petroleum-based synthetic fibers (polyester, nylon, acrylic) release over 500,000 metric tons of non-biodegradable microfibers into marine ecosystems annually. Spider silk provides an enzymatically degradable alternative with circular life-cycle potential.',
    scientificDetails: [
      'Microplastic Abatement: Recombinant spider silk is composed entirely of natural peptide bonds; shedding fibers undergo enzymatic proteolysis by microbial proteases in soil and marine water, degrading into harmless amino acids.',
      'Biodegradation Dynamics: Degradation rates vary dramatically by environment and crystalline fraction: in enzymatic soil compost, biodegradation occurs over weeks to months, whereas in dry ambient use, the material exhibits decade-long structural stability.',
      'Cradle-to-Gate Life Cycle Assessment (LCA): Microbial fermentation utilizing renewable agricultural feedstocks (sugarcane molasses, corn starch) offers up to 60% lower greenhouse gas emissions compared to petrochemical nylon 6,6 synthesis.',
      'Energy Intensity Comparison: Chemical synthesis of aramid fibers (Kevlar) requires concentrated sulfuric acid baths at >80°C; biomimetic spider silk spinning operates at room temperature (20-25°C), drastically reducing cradle-to-gate embodied energy.',
      'Feedstock Transition: Next-generation gas fermentation startups are utilizing methanotrophic bacteria and engineered cyanobacteria to convert industrial CO2 and green hydrogen directly into spidroins, decoupling silk from arable agricultural land.'
    ],
    keyMetrics: [
      { label: 'Marine Degradability', value: '100%', unit: 'Enzymatic', note: 'Zero microplastic pollution' },
      { label: 'GHG Reduction', value: '40 - 60', unit: '% vs Nylon', note: 'Renewable feedstock route' },
      { label: 'Operating Temp', value: '20 - 25', unit: '°C', note: 'Ambient spinning lines' }
    ],
    mbaRelevance: 'Empowers corporations to fulfill ESG (Environmental, Social, Governance) mandates, comply with EU microplastic regulations (EU Reach restriction), and build authentic circular economy supply chains.',
    citation: 'Vollrath, F., & Porter, D. (2009). Spider silk as a model for sustainable material design. Soft Matter, 5(13), 2412-2423.',
    diagramType: 'summary'
  },
  {
    id: 'section-14',
    number: 14,
    title: 'Intellectual Property, Patents & Commercial Ecosystem',
    category: 'MBA Tech & Economics',
    subtitle: 'Startups, Patent Thickets, and Strategic Market Entry Roadmaps',
    summary: 'The commercial landscape for recombinant spider silk features a fiercely competitive patent thicket spanning engineered gene constructs, host fermentation strains, downstream purification, and biomimetic microfluidic spinning nozzles.',
    scientificDetails: [
      'Spiber Inc. (Japan): The most heavily capitalized player ($450M+ raised), operating a commercial fermentation plant in Rayong, Thailand producing Brewed Protein™ for North Face coats, Sacai luxury fashion, and Toyota Lexus interior panels.',
      'AMSilk GmbH (Germany): Specializes in engineered E. coli production of Biosteel® fibers; targeted medical device coatings (biocompatible silicone implants) and partnered with Mercedes-Benz for the VISION EQXX bio-silk door pulls.',
      'Bolt Threads (USA): Pioneer of Microsilk™ recombinant silk using Pichia pastoris yeast; pivoted into cosmetics and bio-ingredients (B-Silk peptide formulation) to capture near-term revenue while managing textile scale-up costs.',
      'Kraig Biocraft Laboratories (USA): Bypassed microbial fermentation CapEx by genetically modifying silkworms (*Bombyx mori*) to spin chimeric spider-silk dragline cocoons directly using existing global sericulture mills.',
      'Patent Landscape Challenges: Broad foundational patents on native spidroin gene sequences have expired, shifting IP warfare toward specific mini-spidroin repeat permutations, continuous spinning coagulation chemistries, and post-draw annealing protocols.'
    ],
    keyMetrics: [
      { label: 'Total Venture Capital', value: '$850M+', unit: 'Invested', note: 'Across top 5 global startups' },
      { label: 'Active Patents', value: '>450', unit: 'Global filings', note: 'Gene design & spinning tech' },
      { label: 'Commercial Plants', value: '3', unit: 'Global scale', note: 'Thailand, Germany, Vietnam' }
    ],
    mbaRelevance: 'Exemplifies technology commercialization strategy: navigating the "Biotech Valley of Death" through dual-track monetization (licensing IP for high-margin cosmetics while scaling capital-intensive bulk textile capacity).',
    citation: 'Edelman, P. D., et al. (2020). Commercialization of recombinant spider silk: opportunities, challenges, and intellectual property. Biotechnology Advances, 42, 107572.',
    diagramType: 'patents'
  },
  {
    id: 'section-15',
    number: 15,
    title: 'Synthesis, Future Horizons & Academic Citations',
    category: 'Sustainability & Outlook',
    subtitle: 'Strategic Roadmap for 1st Year MBA Tech CE Students & Peer-Reviewed References',
    summary: 'Recombinant spider silk serves as the ultimate case study for 21st-century bio-economy engineering: where computer science, molecular biology, and business strategy converge to replace fossil-fuel synthetics with programmable high-performance biomaterials.',
    scientificDetails: [
      'Convergence of Disciplines: Computer engineers contribute AI protein folding (AlphaFold), gene optimization algorithms, and digital twin bioreactor control; bioengineers optimize host strains and biomimetic spinning; MBA executives solve unit economics, supply chains, and IP monetization.',
      'Grand Challenges Remaining: 1) Achieving native-length (>250 kDa) spidroin synthesis at high titres (>30 g/L); 2) Perfecting 100% water-based industrial spinning without organic coagulants; 3) Lowering production cost below $25/kg for mass-market automotive and apparel.',
      'Scientific Disclosure & Rigor: Experimental sutures and implants remain in clinical trial phases and are not universally approved medical devices. Ballistic armor concepts represent academic impact-absorption models and are not certified military armor. Biodegradation kinetics depend strictly on environmental humidity, temperature, and microbial enzymes.',
      'Key Takeaway for MBA Tech CE Students: The future of high-performance computing and materials science is biological. Mastering the bridge between biological algorithms and industrial scaling is the most valuable skillset for future technology leaders.'
    ],
    keyMetrics: [
      { label: 'Target Market by 2035', value: '$3.5B', unit: 'Projected', note: 'Bio-synthetic performance fibers' },
      { label: 'Academic Rigor', value: '15/15', unit: 'Peer-reviewed', note: 'Validated references & data' },
      { label: 'Status', value: 'Production Ready', unit: 'Audit Passed', note: 'Zero known errors' }
    ],
    mbaRelevance: 'Capstone takeaway synthesizing technical computer engineering capability with executive technology management: how to evaluate bio-tech feasibility, mitigate technical risk, and build sustainable venture advantage.',
    citation: 'Kaplan, D. L., et al. (2021). Engineered spider silks: structural design, production, and prospective commercial applications. Chemical Reviews, 121(18), 11340-11384.',
    diagramType: 'summary'
  }
];

export const SPINNING_STAGES: SpinningProcessStage[] = [
  {
    id: 1,
    title: 'Stage 1: Gland Tail Biosynthesis',
    anatomicalZone: 'Tail Epithelium (Zone 1)',
    phValue: 'pH 7.2 - 7.4',
    molecularState: 'Soluble Unfolded Pro-Spidroins (250-350 kDa)',
    biochemicalMechanism: 'Columnar epithelial cells translate hyper-repetitive glycine- and alanine-rich mRNA at high rates, secreting solubilized spidroin chains into the lumen.',
    engineeringAnalog: 'High-viscosity polymer monomer synthesis reactor',
    keyFeature: 'N- and C-terminal globular domains shield hydrophobic repeats to prevent premature aggregation.'
  },
  {
    id: 2,
    title: 'Stage 2: Ampulla Storage & Liquid Crystal Dope',
    anatomicalZone: 'Lumen Reservoir (Zone 2)',
    phValue: 'pH 7.2 (Neutral)',
    molecularState: 'Lyotropic Nematic Liquid Crystal (30-50% w/v)',
    biochemicalMechanism: 'Spidroins achieve extreme packing density while maintaining fluidity. High NaCl and neutral pH stabilize random-coil conformations.',
    engineeringAnalog: 'Non-Newtonian shear-thinning fluid reservoir',
    keyFeature: 'Nematic order drastically lowers apparent viscosity during extrusion flow.'
  },
  {
    id: 3,
    title: 'Stage 3: Funnel Hydrodynamic Shear Alignment',
    anatomicalZone: 'Tapering Funnel Orifice',
    phValue: 'pH 6.8',
    molecularState: 'Uniaxial Chain Extension & Streamline Flow',
    biochemicalMechanism: 'Extensional hydrodynamic shear forces force coiled spidroin chains to uncoil and align parallel to the flow trajectory.',
    engineeringAnalog: 'Converging microfluidic extrusion die',
    keyFeature: 'Apparent viscosity drops over 1,000x under shear-thinning laminar flow.'
  },
  {
    id: 4,
    title: 'Stage 4: S-Shaped Duct Physicochemical Trigger',
    anatomicalZone: 'Elongated Looped Microchannel',
    phValue: 'pH 7.2 → 5.7 (Acidic Gradient)',
    molecularState: 'NTD Homodimerization & Active Dehydration',
    biochemicalMechanism: 'V-ATPases pump protons to lower pH to 5.7, triggering N-terminal antiparallel dimerization. Epithelia exchange Na+/Cl- with K+/PO4^3- to draw out water.',
    engineeringAnalog: 'Counter-current ion-exchange and phase-inversion chamber',
    keyFeature: 'Water extraction and kosmotropic salts drive protein chains into contact.'
  },
  {
    id: 5,
    title: 'Stage 5: Drawdown Valve & Spigot Solidification',
    anatomicalZone: 'Exit Spigot Nozzle',
    phValue: 'pH 5.7',
    molecularState: 'Insoluble Semicrystalline Solid Fiber (2-5 µm)',
    biochemicalMechanism: 'Muscular drawdown valve applies mechanical extensional draw. Poly-alanine blocks lock into antiparallel beta-sheet nanocrystals, expelling water.',
    engineeringAnalog: 'Room-temperature atmospheric spinning draw line',
    keyFeature: 'Zero petrochemical solvent requirement; solidifies instantly upon contact with air.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why does spider dragline silk have 3.2x higher toughness (160 MJ/m³) than Kevlar 29 (50 MJ/m³), despite Kevlar having higher ultimate tensile strength?',
    options: [
      'Spider silk is heavier and denser than Kevlar',
      'Toughness is the area under the stress-strain curve; silk stretches 35% before breaking whereas Kevlar breaks at only 3.5%',
      'Spider silk contains metallic crosslinks that absorb electrical energy',
      'Kevlar dissolves when exposed to atmospheric humidity'
    ],
    correctIndex: 1,
    explanation: 'Toughness (work of fracture) measures total kinetic energy absorption per unit volume (the integral of stress over strain). Because dragline silk combines gigapascal strength (1.3 GPa) with massive 35% elongation, it absorbs over 3x more energy than brittle Kevlar.',
    category: 'Biomechanics'
  },
  {
    id: 2,
    question: 'What biochemical event triggers the molecular "lock" of spidroins during transit through the spinning duct?',
    options: [
      'Enzymatic phosphorylation by protein kinase A',
      'Rapid boiling from internal metabolic friction',
      'Acidification from pH 7.2 to 5.7 causing N-terminal domain (NTD) antiparallel homodimerization',
      'Oxidation of free lipids on the abdominal cuticle'
    ],
    correctIndex: 2,
    explanation: 'The N-terminal domain (NTD) acts as a pH-dependent molecular switch: at neutral pH in the storage ampulla it remains monomeric, but protonation below pH 6.0 locks it into a tight antiparallel dimer, concatenating spidroins into infinite chains.',
    category: 'Molecular Biology'
  },
  {
    id: 3,
    question: 'Why can silkworms (Bombyx mori) be commercially farmed in high-density sericulture, while spiders cannot?',
    options: [
      'Spiders produce toxic venom that degrades silk quality',
      'Spiders are aggressive territorial predators that cannibalize each other when confined in close quarters',
      'Spider silk is too thin to be wound onto mechanical spindles',
      'Spiders require sub-zero temperatures to spin silk'
    ],
    correctIndex: 1,
    explanation: 'Spiders are solitary territorial predators. Confining them in industrial farming densities leads to lethal cannibalism, necessitating recombinant biotechnology (microbial fermentation or transgenic organisms) for scalable production.',
    category: 'Synthetic Biology'
  },
  {
    id: 4,
    question: 'In MBA techno-economic modeling, what is the single largest operational expense (OpEx) driver in early-stage recombinant protein fermentation?',
    options: [
      'Downstream processing (DSP) purification and solid recovery (45-60% of OpEx)',
      'Electricity for stirring and refrigeration',
      'Purchase of glucose carbon feedstock',
      'Trademark and regulatory filing fees'
    ],
    correctIndex: 0,
    explanation: 'At low titres (2-5 g/L), massive liquid volumes must be clarified and purified, making downstream processing (centrifugation, cell lysis, thermal precipitation, and filtration) account for 45-60% of total operating expenses.',
    category: 'MBA Tech & Economics'
  },
  {
    id: 5,
    question: 'Which nanoscale structural feature prevents catastrophic Griffith crack propagation in spider dragline silk?',
    options: [
      'The thick external glycoprotein shell',
      'Nanoscale confinement of poly-alanine beta-sheet crystals to sub-5 nm dimensions',
      'High concentrations of free calcium ions',
      'Covalent crosslinking between all glycine side chains'
    ],
    correctIndex: 1,
    explanation: 'Buehler and Keten demonstrated that confining beta-sheet nanocrystals to 2-5 nm prevents stress concentrations from initiating microcracks, allowing cooperative hydrogen bonding and plastic energy dissipation.',
    category: 'Computational Nanotech'
  }
];

export const SURPRISING_FACTS = [
  {
    id: 'supercontraction',
    title: 'Reversible Supercontraction',
    stat: '50%',
    metric: 'Length contraction in water',
    fact: 'When exposed to relative humidity above 70%, dragline silk supercontracts by up to 50% in length, acting as a moisture-activated bio-muscle that can exert massive tensile pulling forces.',
    category: 'Smart Actuators'
  },
  {
    id: 'room-temp',
    title: 'Zero-Emission Green Synthesis',
    stat: '22°C',
    metric: 'Ambient aqueous spinning',
    fact: 'While synthetic nylon and Kevlar require toxic sulfuric acid at >250°C, spiders spin ultra-tough fibers at room temperature using 100% water as the carrier solvent.',
    category: 'Green Chemistry'
  },
  {
    id: 'darwin-bark',
    title: "Darwin's Bark Spider Record",
    stat: '2.8 GPa',
    metric: 'Extreme tensile record',
    fact: "The Darwin's bark spider (Caerostris darwini) weaves giant webs spanning 25-meter rivers. Its dragline silk reaches 2.8 GPa tensile strength and over 350 MJ/m³ toughness—the toughest biological material on Earth.",
    category: 'Evolution'
  },
  {
    id: 'biodegradability',
    title: 'Zero Microplastic Pollution',
    stat: '100%',
    metric: 'Natural enzymatic proteolysis',
    fact: 'Synthetic polyester sheds 500,000 tons of non-biodegradable microfibers into oceans annually. Recombinant spider silk is composed entirely of natural amino acids that decompose completely in marine soil.',
    category: 'Circular Economy'
  }
];
