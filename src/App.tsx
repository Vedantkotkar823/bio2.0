import React, { useState, useEffect } from 'react';
import { SECTIONS, EXPLORER_ITEMS } from './data/scienceData';
import { Header } from './components/Header';
import { PosterNavigation, SpiderWebTransition } from './components/PosterNavigation';
import { SectionCard } from './components/SectionCard';
import { PresentationMode } from './components/PresentationMode';
import { ImageExplorerModal } from './components/ImageExplorerModal';
import { ReferencesModal } from './components/ReferencesModal';
import { SpinningProcessSimulator } from './components/SpinningProcessSimulator';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { FactDiscoveryDrawer } from './components/ExhibitionPanels';
import { ProjectCredits } from './components/ProjectCredits';
import { InteractiveGraphsSuite } from './components/InteractiveGraphsSuite';
import { ChevronUp, Activity } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(SECTIONS[0].id);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [presentationStartIndex, setPresentationStartIndex] = useState<number>(0);
  
  const [activeExplorerId, setActiveExplorerId] = useState<string | null>(null);
  const [explorerTriggerRef, setExplorerTriggerRef] = useState<HTMLElement | null>(null);

  const [isReferencesOpen, setIsReferencesOpen] = useState<boolean>(false);

  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const [transitionState, setTransitionState] = useState<{
    from: number;
    to: number;
    isNavigating: boolean;
  }>({
    from: 1,
    to: 1,
    isNavigating: false
  });

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigateToSection = (targetSectionNumber: number) => {
    const targetSection = SECTIONS.find(s => s.number === targetSectionNumber);
    if (!targetSection) return;

    const currentSection = SECTIONS.find(s => s.id === activeSectionId);
    const fromNum = currentSection ? currentSection.number : 1;

    setTransitionState({
      from: fromNum,
      to: targetSectionNumber,
      isNavigating: true
    });

    const element = document.getElementById(targetSection.id);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }

    setActiveSectionId(targetSection.id);

    setTimeout(() => {
      setTransitionState(prev => ({ ...prev, isNavigating: false }));
    }, 600);
  };

  const handleOpenExplorer = (explorerId: string, triggerElement?: HTMLElement) => {
    setActiveExplorerId(explorerId);
    if (triggerElement) {
      setExplorerTriggerRef(triggerElement);
    }
  };

  const handleCloseExplorer = () => {
    setActiveExplorerId(null);
  };

  const handleStartPresentation = (sectionIndex: number = 0) => {
    setPresentationStartIndex(sectionIndex);
    setIsPresentationOpen(true);
  };

  const scrollToQuiz = () => {
    const el = document.getElementById('interactive-knowledge-check');
    if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('spinning-process-simulator');
    if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const scrollToCredits = () => {
    const el = document.getElementById('project-credits');
    if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const selectedExplorerItem = activeExplorerId ? EXPLORER_ITEMS[activeExplorerId] || null : null;

  return (
    <div className={`poster-app ${highContrast ? 'high-contrast' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}>
      {/* Spider-Web Thread Transition */}
      <SpiderWebTransition
        fromSection={transitionState.from}
        toSection={transitionState.to}
        isNavigating={transitionState.isNavigating}
        reducedMotion={reducedMotion}
      />

      {/* Hero Exhibition Banner */}
      <Header
        onStartPresentation={() => handleStartPresentation(0)}
        onOpenExplorer={(id) => handleOpenExplorer(id)}
        onOpenReferences={() => setIsReferencesOpen(true)}
        onJumpToSection={handleNavigateToSection}
        onScrollToQuiz={scrollToQuiz}
        onScrollToSimulator={scrollToSimulator}
        onScrollToCredits={scrollToCredits}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(prev => !prev)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(prev => !prev)}
      />

      {/* Sticky Dock Navigation */}
      <PosterNavigation
        sections={SECTIONS}
        activeSectionId={activeSectionId}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Exhibition Ground */}
      <main style={{ padding: '0 1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Sections 1 to 5 (Pavilion Alpha: Fundamentals & Molecular Architecture) */}
        {SECTIONS.slice(0, 5).map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onOpenExplorer={handleOpenExplorer}
            onJumpToPresentation={handleStartPresentation}
          />
        ))}

        {/* Feature Interactive Exhibition 1: Step-by-Step Spinning Simulator */}
        <SpinningProcessSimulator />

        {/* Sections 6 to 7 (Pavilion Beta: Biomechanics & 7 Silks) */}
        {SECTIONS.slice(5, 7).map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onOpenExplorer={handleOpenExplorer}
            onJumpToPresentation={handleStartPresentation}
          />
        ))}

        {/* Feature Interactive Exhibition 2: Dynamic Science Graphs Suite */}
        <InteractiveGraphsSuite />

        {/* Sections 8 to 11 (Pavilion Gamma & Delta: Synthetic Biology, AI & Applications) */}
        {SECTIONS.slice(7, 11).map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onOpenExplorer={handleOpenExplorer}
            onJumpToPresentation={handleStartPresentation}
          />
        ))}

        {/* Feature Interactive Exhibition 3: Surprising Science Discovery Vault */}
        <FactDiscoveryDrawer />

        {/* Sections 12 to 14 (Pavilion Epsilon: Techno-Economics & ESG) */}
        {SECTIONS.slice(11, 14).map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onOpenExplorer={handleOpenExplorer}
            onJumpToPresentation={handleStartPresentation}
          />
        ))}

        {/* Feature Interactive Exhibition 4: Knowledge Check Quiz */}
        <InteractiveQuiz />

        {/* Section 15 (Pavilion Zeta: Grand Synthesis & Citations) */}
        <SectionCard
          section={SECTIONS[14]}
          onOpenExplorer={handleOpenExplorer}
          onJumpToPresentation={handleStartPresentation}
        />

        {/* Feature Exhibition 5: Dedicated Project Credits & Research Team */}
        <ProjectCredits />
      </main>

      {/* Exhibition Footer */}
      <footer style={{
        maxWidth: '1440px',
        margin: '5rem auto 2rem',
        padding: '2.5rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#ffffff', fontWeight: 700 }}>
            <Activity size={15} color="var(--silk-cyan)" />
            1st Year MBA Tech CE (Computer Engineering) • Elements of Biology (EOB)
          </div>
          <p style={{ maxWidth: '750px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
            Project Architecture: Vedant Kotkar • Research Cohort: Aditya Yadav, Sarthak Jaiswal, Prachi Chaudhari, Aryan Chavan, Devesh, Raksha Patil, Aditya Patil, Anushri Salunke, Kostubh Toshniwal, Shaubhika, Avika Barve.
          </p>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.35rem' }}>
            Academic Capstone Exhibition • AMOLED Dark Architecture
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-outline"
            onClick={scrollToCredits}
          >
            Project Team Credits
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() => setIsReferencesOpen(true)}
          >
            Bibliography & Citations
          </button>
          
          <button
            type="button"
            className="btn-icon"
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to top of science poster"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <PresentationMode
        sections={SECTIONS}
        initialSectionIndex={presentationStartIndex}
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      <ImageExplorerModal
        item={selectedExplorerItem}
        isOpen={!!activeExplorerId}
        onClose={handleCloseExplorer}
        triggerElementRef={explorerTriggerRef}
      />

      <ReferencesModal
        isOpen={isReferencesOpen}
        onClose={() => setIsReferencesOpen(false)}
      />
    </div>
  );
};

export default App;
