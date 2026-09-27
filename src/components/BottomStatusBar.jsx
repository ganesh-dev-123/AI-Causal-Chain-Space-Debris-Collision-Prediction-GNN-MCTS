import React, { useState, useEffect } from 'react';
import { Clock, Cpu, Server, Activity, AlertCircle } from 'lucide-react';

export default function BottomStatusBar() {
  const [timeStr, setTimeStr] = useState("2027-03-15 14:32 UTC");
  const [gpuLoad, setGpuLoad] = useState(78);

  useEffect(() => {
    // Dynamic micro-jitter for GPU load & live ticker feel
    const interval = setInterval(() => {
      setGpuLoad(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(92, Math.max(70, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer style={{
      height: '25px',
      background: 'rgba(7, 10, 26, 0.95)',
      borderTop: '1px solid var(--border-glass)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      fontSize: '0.72rem',
      color: 'var(--text-secondary)',
      zIndex: 100
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Clock size={12} color="var(--text-muted)" />
        <span className="font-mono">Last updated: {timeStr}</span>
      </div>

      {/* Center */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span><strong style={{ color: '#fff' }}>36,247</strong> objects tracked</span>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <span><strong style={{ color: '#ffb74d' }}>1,247</strong> active chains</span>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <span style={{ color: '#ff6b6b' }}><strong className="badge-red" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>12</strong> critical alerts</span>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="font-mono">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Cpu size={12} color="#60a5fa" />
          <span>GPU: {gpuLoad}%</span>
        </div>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Server size={12} color="#81c784" />
          <span>API: Connected</span>
        </div>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="pulse-online" style={{ width: '6px', height: '6px' }}></span>
          <span style={{ color: '#81c784' }}>Data: Live</span>
        </div>
      </div>
    </footer>
  );
}
