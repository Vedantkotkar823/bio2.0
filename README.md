# Spider Silk: Nature's Super-Polymer — Interactive Science Poster & Simulation System

> **Academic Project Cohort:** 1st Year MBA Tech CE (Computer Engineering)  
> **System Architecture & Lead Developer:** Vedant Kotkar  
> **Research & Academic Contributors:** Aditya Yadav, Sarthak Jaiswal, Prachi Chaudhari, Aryan Chavan, Devesh, Raksha Patil, Aditya Patil, Anushri Salunke, Kostubh Toshniwal, Shaubhika, Avika Barve  
> **Course & Institution:** Elements of Biology (EOB) • SVKM's NMIMS MPSTME  
> **Design Theme:** AMOLED Dark Theme (`#000000` base with bioluminescent emerald & cyan accents)  
> **Topic:** Biomolecular Nanotechnology, In Vivo Microfluidics, Recombinant Genetic Engineering, and Techno-Economic Scaling of Spider Silk.

---

## 🌟 Executive Summary

This interactive academic science poster and simulation application explores the multi-scale biomechanics and synthetic biology of spider dragline silk (*Major Ampullate Spidroin*). The project bridges biological nanotechnology, computer science / AI protein design, and executive techno-economic modeling for MBA Tech students.

---

## 🔬 Core Features & Interactive Capabilities

### 1. Presentation Mode (All 15 Curriculum Sections)
- **15 Structured Academic Sections** covering:
  1. *Executive Summary: The Biomaterial Frontier*
  2. *Gland Anatomy & In Vivo Spinning Apparatus*
  3. *Molecular Architecture & Spidroin Genetics*
  4. *Hierarchical Structure: Nanocrystals to Microfibers*
  5. *Phase Separation & Microfluidic Silk Dope*
  6. *Mechanical Super-Properties & Stress-Strain Analysis*
  7. *Spider Silk Diversity: The 7 Specialized Glands*
  8. *Recombinant Biotechnology & Heterologous Hosts*
  9. *Computational Biology, AI & de novo Protein Design*
  10. *Biomedical Applications & Regenerative Scaffolds*
  11. *Advanced Structural Bio-Composites & Defense*
  12. *Techno-Economic Analysis & Scaling Bottlenecks*
  13. *Environmental Sustainability & Life Cycle Assessment*
  14. *Intellectual Property, Patents & Commercial Ecosystem*
  15. *Synthesis, Future Horizons & Academic Citations*
- **Timer Controls:** Manual Start, Pause, Resume, Reset (does not auto-start or reset on slide change).
- **Speaker Notes:** Dedicated MBA Tech talking points for student presentations.
- **Keyboard Shortcuts:** Arrow keys (`←` / `→`), Spacebar (Timer pause/play), `F` (Fullscreen), `Esc` (Exit), `N` (Notes).

### 2. Interactive Image Explorer & Vector Hotspots
- High-resolution SVG diagrams for the **Major Ampullate Gland**, **Spidroin Nano-Architecture**, and **Industrial Fermentation Pipeline**.
- Clickable pulsing hotspot pins that zoom and focus on physiological zones.
- Enforced zoom limits (1.0x to 2.0x) and overview reset button.
- Accessible focus trapping, escape-key exit, and background scroll locking.

### 3. Interactive Biomechanical Stress-Strain Analyzer
- Uniaxial tensile load simulator with live strain slider ($\epsilon = 0\%$ to $40\%$).
- Real-time numerical trapezoidal integration calculating **Work of Fracture (Toughness in $\text{MJ/m}^3$)**.
- Direct comparison between **Major Ampullate Dragline Silk (160 $\text{MJ/m}^3$)**, **Kevlar 29 (50 $\text{MJ/m}^3$)**, **ASTM A514 Structural Steel (60 $\text{MJ/m}^3$)**, **Carbon Fiber (25 $\text{MJ/m}^3$)**, and **Nylon 6,6 (80 $\text{MJ/m}^3$)**.

### 4. Interactive Techno-Economic Scaling Calculator (MBA Focus)
- Sliders for fermentation titre ($g/L$), bioreactor volume ($m^3$), downstream recovery (%), and feedstock cost.
- Instant calculation of **Cost of Goods Sold (COGS per kg)**, annual plant capacity (Metric Tons), and target commercial parity ($50/kg benchmark).

### 5. Spider Silk Diversity Matrix (7 Glands)
- Interactive comparative matrix detailing Major Ampullate, Minor Ampullate, Flagelliform, Aggregate, Tubuliform, Aciniform, and Pyriform silks.

---

## 🛠️ Technology Stack & Engineering Standards

- **Framework:** React 18 with TypeScript in Strict Mode.
- **Bundler:** Vite 5.
- **Styling:** Custom CSS design system with dark mode glassmorphism, bioluminescent gradients, and full accessibility (`:focus-visible`, High Contrast, and Reduced Motion).
- **Testing:** Automated Vitest test suite covering mechanics, techno-economics, and interactive state logic.
- **Icons:** Lucide React.

---

## 🚀 Available Scripts

In the project root folder:

```bash
# Run local development server
npm run dev

# Run TypeScript type check
npm run lint

# Run automated test suite
npm run test

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📚 Academic Citations & Scientific Disclosures

All scientific values and biological models are grounded in peer-reviewed literature:
- **Vollrath, F., & Knight, D. P. (2001).** *Liquid crystalline spinning of spider silk.* Nature, 410, 541–548.
- **Keten, S., Xu, Z., Ihle, B., & Buehler, M. J. (2010).** *Nanoconfinement controls stiffness, strength and mechanical toughness of beta-sheet crystals in spider silk.* Nature Materials, 9, 359–367.
- **Andersson, M., et al. (2017).** *Biomimetic spinning of artificial spider silk from a chimeric minispidroin.* Nature Chemical Biology, 13, 262–264.
- **Gosline, J. M., et al. (1999).** *The mechanical design of spider silks: from fibroin sequence to mechanical function.* Journal of Experimental Biology, 202, 3295–3303.

*Notice: Illustrated body armor and biomedical suture applications represent academic biomechanical research models in pre-clinical / experimental testing and are not certified military ballistic gear or universally approved clinical medical devices.*
