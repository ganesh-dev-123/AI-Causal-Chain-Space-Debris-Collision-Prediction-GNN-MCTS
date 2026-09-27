import React, { useState } from 'react';
import { GitFork, AlertTriangle, ShieldCheck, ChevronRight, Info, Zap } from 'lucide-react';

export default function CausalChainTree({ selectedNode, setSelectedNode, onNudgeManeuver }) {
  const [chainState, setChainState] = useState({
    nodeF1Broken: false,
    selectedId: 'sat-a'
  });

  const [expandedNodes, setExpandedNodes] = useState({
    'sat-a': true,
    'debris-f1': true,
    'debris-g1': true,
    'satellite-c': true,
    'debris-f2': true
  });

  const toggleExpand = (id) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNodeClick = (node) => {
    setChainState(prev => ({ ...prev, selectedId: node.id }));
    if (setSelectedNode) setSelectedNode(node);
  };

  const toggleBreakF1 = () => {
    setChainState(prev => ({ ...prev, nodeF1Broken: !prev.nodeF1Broken }));
  };

  // Node data tree structure
  const nodes = [
    {
      id: 'sat-a',
      year: 2027,
      name: 'Satellite A',
      prob: '98.7%',
      risk: 'high',
      color: '#e53935',
      badge: 'RED (High Risk)',
      details: 'Primary target in Low Earth Orbit (750 km). Conjunction with Fragment 409.',
      children: ['debris-f1', 'debris-f2']
    },
    {
      id: 'debris-f1',
      parentId: 'sat-a',
      year: 2029,
      name: 'Debris F1',
      prob: chainState.nodeF1Broken ? '2.1%' : '73.4%',
      risk: chainState.nodeF1Broken ? 'low' : 'medium',
      color: chainState.nodeF1Broken ? '#43a047' : '#fb8c00',
      badge: chainState.nodeF1Broken ? 'MITIGATED' : 'ORANGE (Medium)',
      details: 'Fragment generated from Sat-A explosion. Propagates towards MEO shell.',
      children: ['debris-g1']
    },
    {
      id: 'debris-g1',
      parentId: 'debris-f1',
      year: 2032,
      name: 'Debris G1',
      prob: chainState.nodeF1Broken ? '0.4%' : '45.6%',
      risk: chainState.nodeF1Broken ? 'low' : 'low',
      color: chainState.nodeF1Broken ? '#43a047' : '#fdd835',
      badge: chainState.nodeF1Broken ? 'MITIGATED' : 'YELLOW (Low)',
      details: 'Secondary collision cloud fragment. High inclination orbital intersect.',
      children: ['satellite-c']
    },
    {
      id: 'satellite-c',
      parentId: 'debris-g1',
      year: 2036,
      name: 'Satellite C',
      prob: chainState.nodeF1Broken ? '0.1%' : '22.1%',
      risk: chainState.nodeF1Broken ? 'low' : 'low',
      color: chainState.nodeF1Broken ? '#43a047' : '#fdd835',
      badge: chainState.nodeF1Broken ? 'MITIGATED' : 'YELLOW (Low)',
      details: 'Critical Earth Observation asset ($700M value). Threat endpoint.',
      children: []
    }
  ];

  // Secondary side branch
  const nodeF2 = {
    id: 'debris-f2',
    parentId: 'sat-a',
    year: 2028,
    name: 'Debris F2',
    prob: '64.2%',
    risk: 'medium',
    color: '#fb8c00',
    badge: 'ORANGE (Medium)',
    details: 'Secondary ejection fragment. Intersects polar weather constellation.'
  };

  const activeNodeData = nodes.find(n => n.id === chainState.selectedId) || nodeF2;

  return (
    <div className="glass-panel" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 16px',
        background: 'var(--bg-panel-header)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitFork size={18} color="#fb8c00" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            CAUSAL CHAIN TREE <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>(Domino Cascade)</span>
          </span>
        </div>

        {/* Break Chain Interactive Simulator Button */}
        <button
          onClick={toggleBreakF1}
          style={{
            background: chainState.nodeF1Broken 
              ? 'rgba(67, 160, 71, 0.25)' 
              : 'rgba(251, 140, 0, 0.2)',
            border: chainState.nodeF1Broken 
              ? '1px solid rgba(67, 160, 71, 0.5)' 
              : '1px solid rgba(251, 140, 0, 0.4)',
            color: chainState.nodeF1Broken ? '#81c784' : '#ffb74d',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
        >
          <Zap size={14} />
          <span>{chainState.nodeF1Broken ? "Reset Node F1" : "Simulate Break at F1"}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Tree Branch Diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
          
          {/* Node 1: 2027 Satellite A */}
          <div style={{ position: 'relative' }}>
            <NodeCard node={nodes[0]} isSelected={chainState.selectedId === 'sat-a'} onClick={() => handleNodeClick(nodes[0])} />
            
            {/* Connection Line Downward */}
            <div style={{
              position: 'absolute',
              left: '32px',
              top: '44px',
              width: '2px',
              height: '24px',
              background: 'linear-gradient(to bottom, #e53935, #fb8c00)',
              boxShadow: '0 0 8px rgba(229, 57, 53, 0.5)'
            }}></div>
          </div>

          {/* Node 2: 2029 Debris F1 (Level 1) */}
          <div style={{ paddingLeft: '24px', position: 'relative' }}>
            {/* Branch Connector Line */}
            <div style={{
              position: 'absolute',
              left: '8px',
              top: '20px',
              width: '16px',
              height: '2px',
              background: '#fb8c00'
            }}></div>

            <NodeCard 
              node={nodes[1]} 
              isSelected={chainState.selectedId === 'debris-f1'} 
              onClick={() => handleNodeClick(nodes[1])}
              isBroken={chainState.nodeF1Broken}
            />

            {/* Connection Line Downward */}
            <div style={{
              position: 'absolute',
              left: '56px',
              top: '44px',
              width: '2px',
              height: '24px',
              background: chainState.nodeF1Broken ? '#43a047' : 'linear-gradient(to bottom, #fb8c00, #fdd835)'
            }}></div>
          </div>

          {/* Node 3: 2032 Debris G1 (Level 2) */}
          <div style={{ paddingLeft: '48px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '32px',
              top: '20px',
              width: '16px',
              height: '2px',
              background: chainState.nodeF1Broken ? '#43a047' : '#fdd835'
            }}></div>

            <NodeCard 
              node={nodes[2]} 
              isSelected={chainState.selectedId === 'debris-g1'} 
              onClick={() => handleNodeClick(nodes[2])}
              isBroken={chainState.nodeF1Broken}
            />

            {/* Connection Line Downward */}
            <div style={{
              position: 'absolute',
              left: '80px',
              top: '44px',
              width: '2px',
              height: '24px',
              background: chainState.nodeF1Broken ? '#43a047' : '#fdd835'
            }}></div>
          </div>

          {/* Node 4: 2036 Satellite C (Level 3) */}
          <div style={{ paddingLeft: '72px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '56px',
              top: '20px',
              width: '16px',
              height: '2px',
              background: chainState.nodeF1Broken ? '#43a047' : '#fdd835'
            }}></div>

            <NodeCard 
              node={nodes[3]} 
              isSelected={chainState.selectedId === 'satellite-c'} 
              onClick={() => handleNodeClick(nodes[3])}
              isBroken={chainState.nodeF1Broken}
            />
          </div>
        </div>

        {/* Selected Node Details Box */}
        {activeNodeData && (
          <div className="glass-card" style={{
            marginTop: '14px',
            padding: '10px 14px',
            background: 'rgba(10, 14, 39, 0.9)',
            borderLeft: `4px solid ${activeNodeData.color}`,
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info size={14} color={activeNodeData.color} />
                <strong style={{ fontSize: '0.85rem' }}>{activeNodeData.name} ({activeNodeData.year})</strong>
              </div>
              <span className="font-mono" style={{ color: activeNodeData.color, fontWeight: 700 }}>
                Cascade Risk: {activeNodeData.prob}
              </span>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.3 }}>
              {activeNodeData.details}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Single Node Card Component
function NodeCard({ node, isSelected, onClick, isBroken }) {
  return (
    <div
      onClick={onClick}
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        border: isSelected 
          ? `1px solid ${node.color}` 
          : '1px solid var(--border-glass)',
        boxShadow: isSelected ? `0 0 12px ${node.color}50` : 'none',
        background: isSelected 
          ? 'rgba(26, 42, 88, 0.9)' 
          : 'rgba(16, 26, 56, 0.7)',
        transition: 'all 0.15s ease'
      }}
    >
      {/* Left: Year + Object Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="font-mono" style={{
          background: 'rgba(30, 111, 217, 0.2)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: '#60a5fa'
        }}>
          {node.year}
        </span>
        <span style={{ fontWeight: 600, fontSize: '0.83rem' }}>{node.name}</span>
      </div>

      {/* Right: Probability + Color Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="font-mono" style={{
          fontSize: '0.88rem',
          fontWeight: 700,
          color: node.color
        }}>
          {node.prob}
        </span>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: node.color,
          boxShadow: `0 0 8px ${node.color}`
        }}></div>
      </div>
    </div>
  );
}
