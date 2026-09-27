import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OrbitalView from './components/OrbitalView';
import CausalChainTree from './components/CausalChainTree';
import CollisionProbabilities from './components/CollisionProbabilities';
import RecommendedActions from './components/RecommendedActions';
import AiInsightsPanel from './components/AiInsightsPanel';
import BottomStatusBar from './components/BottomStatusBar';
import SimulationModal from './components/SimulationModal';
import DebrisCatalogView from './components/DebrisCatalogView';
import ReportsView from './components/ReportsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSection, setActiveSection] = useState('Dashboard');

  const [selectedYear, setSelectedYear] = useState(2027);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isAiCollapsed, setIsAiCollapsed] = useState(false);
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);

  // Synchronize Tab and Sidebar selection
  const handleSelectSection = (section) => {
    setActiveSection(section);
    if (['Dashboard', 'Simulation', 'Causal Chain', 'Reports', 'API'].includes(section)) {
      setActiveTab(section);
    }
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'Causal Chain') {
      setActiveSection('Causal Chain Explorer');
    } else if (tab === 'Simulation') {
      setIsSimModalOpen(true);
    } else {
      setActiveSection(tab);
    }
  };

  const renderMainContent = () => {
    if (activeSection === 'Debris Catalog') {
      return <DebrisCatalogView />;
    }
    if (activeSection === 'Reports') {
      return <ReportsView />;
    }

    // Default 4 Quadrants Dashboard View
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '12px',
        height: '100%',
        width: '100%',
        padding: '12px'
      }}>
        {/* Quadrant 1 (Top Left) — ORBITAL VIEW */}
        <div style={{ minHeight: 0, height: '100%' }}>
          <OrbitalView
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedNode={selectedNode}
          />
        </div>

        {/* Quadrant 2 (Top Right) — CAUSAL CHAIN TREE */}
        <div style={{ minHeight: 0, height: '100%' }}>
          <CausalChainTree
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>

        {/* Quadrant 3 (Bottom Left) — COLLISION PROBABILITIES */}
        <div style={{ minHeight: 0, height: '100%' }}>
          <CollisionProbabilities
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        {/* Quadrant 4 (Bottom Right) — RECOMMENDED ACTIONS */}
        <div style={{ minHeight: 0, height: '100%' }}>
          <RecommendedActions
            onTriggerAction={(action) => console.log('Action triggered:', action)}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'var(--bg-dark)'
    }}>
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenSimulation={() => setIsSimModalOpen(true)}
      />

      {/* Main Body Layout (Sidebar + Center Content + Right AI Insights Panel) */}
      <div style={{
        display: 'flex',
        flex: 1,
        height: 'calc(100vh - 85px)',
        overflow: 'hidden'
      }}>
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleSelectSection}
        />

        {/* Center Content Area */}
        <main style={{
          flex: 1,
          height: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {renderMainContent()}
        </main>

        {/* Right Collapsible AI Insights Panel */}
        <AiInsightsPanel
          isCollapsed={isAiCollapsed}
          setIsCollapsed={setIsAiCollapsed}
          onOpenSimulation={() => setIsSimModalOpen(true)}
        />
      </div>

      {/* Bottom Status Bar */}
      <BottomStatusBar />

      {/* Simulation Modal */}
      <SimulationModal
        isOpen={isSimModalOpen}
        onClose={() => setIsSimModalOpen(false)}
        onCompleteSimulation={() => setIsSimModalOpen(false)}
      />
    </div>
  );
}
