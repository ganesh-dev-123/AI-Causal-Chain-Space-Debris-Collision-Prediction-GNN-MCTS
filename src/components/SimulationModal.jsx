import React, { useState, useEffect } from 'react';
import { X, Play, Sparkles, CheckCircle2, Cpu, RefreshCw, Terminal, Layers } from 'lucide-react';

export default function SimulationModal({ isOpen, onClose, onCompleteSimulation }) {
  const [runs, setRuns] = useState(10000);
  const [startYear, setStartYear] = useState(2027);
  const [endYear, setEndYear] = useState(2077);
  const [shell, setShell] = useState('LEO');

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  if (!isOpen) return null;

  const handleStartSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setLogs(['[00:00:01] Initializing SGP4 propagator & epoch vectors...']);

    const logSteps = [
      { p: 20, msg: '[00:00:02] Loading 36,247 active NORAD TLE orbital catalogs...' },
      { p: 45, msg: `[00:00:04] Executing ${runs.toLocaleString()} Monte Carlo conjunction runs across ${shell} shell...` },
      { p: 75, msg: '[00:00:07] Computing fragment cascade cross-sections (Kessler index)...' },
      { p: 92, msg: '[00:00:09] Synthesizing decision trees & optimal Delta-V maneuver vectors...' },
      { p: 100, msg: '[00:00:10] Simulation matrix complete! Risk models refreshed.' }
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.p);
        setLogs(prev => [...prev, step.msg]);
        if (step.p === 100) {
          setTimeout(() => {
            setIsRunning(false);
            if (onCompleteSimulation) onCompleteSimulation();
          }, 800);
        }
      }, (index + 1) * 1200);
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(4, 6, 18, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass-panel" style={{
        width: '560px',
        background: 'rgba(10, 14, 39, 0.95)',
        border: '1px solid var(--border-glass-bright)',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(30, 111, 217, 0.2)', padding: '6px', borderRadius: '8px' }}>
              <Sparkles size={20} color="#60a5fa" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>New Monte Carlo Cascade Simulation</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Configure orbital propagation parameters & collision matrices</p>
            </div>
          </div>
          {!isRunning && (
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {!isRunning ? (
          /* Form Controls */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Monte Carlo Iterations ({runs.toLocaleString()} runs)
              </label>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={runs}
                onChange={(e) => setRuns(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#388bfd' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>1,000 (Fast)</span>
                <span>50,000</span>
                <span>100,000 (High Precision)</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Target Altitude Shell
                </label>
                <select
                  value={shell}
                  onChange={(e) => setShell(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(16, 26, 56, 0.8)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="LEO">LEO (Low Earth Orbit: 300 - 1,200 km)</option>
                  <option value="MEO">MEO (Medium Earth Orbit: 2,000 - 20,000 km)</option>
                  <option value="GEO">GEO (Geostationary: 35,786 km)</option>
                  <option value="ALL">Global Full-Spectrum (All Shells)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Epoch Projection Range
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    value={startYear}
                    onChange={(e) => setStartYear(parseInt(e.target.value))}
                    style={{ width: '50%', background: 'rgba(16, 26, 56, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.82rem' }}
                  />
                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                  <input
                    type="number"
                    value={endYear}
                    onChange={(e) => setEndYear(parseInt(e.target.value))}
                    style={{ width: '50%', background: 'rgba(16, 26, 56, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.82rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleStartSimulation}>
                <Play size={16} />
                <span>Execute Simulation</span>
              </button>
            </div>
          </div>
        ) : (
          /* Execution Progress View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Propagating Cascade Matrix...</span>
                <span className="font-mono" style={{ color: '#60a5fa', fontWeight: 700 }}>{progress}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(16, 26, 56, 0.8)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #1e6fd9 0%, #388bfd 100%)',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(56, 139, 253, 0.8)',
                  transition: 'width 0.4s ease'
                }}></div>
              </div>
            </div>

            {/* Live Terminal Output */}
            <div className="font-mono" style={{
              background: '#040612',
              border: '1px solid rgba(30, 111, 217, 0.3)',
              borderRadius: '6px',
              padding: '12px',
              height: '140px',
              overflowY: 'auto',
              fontSize: '0.75rem',
              color: '#4af626',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
