import React from 'react';
import { 
  Home, 
  Satellite, 
  Flame, 
  GitFork, 
  BarChart3, 
  FileText, 
  Settings,
  Wifi,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: Home, emoji: '🏠' },
    { id: 'Debris Catalog', label: 'Debris Catalog', icon: Satellite, emoji: '🛰️', badge: '36.2K' },
    { id: 'Collision Events', label: 'Collision Events', icon: Flame, emoji: '💥', badge: '12', badgeColor: '#e53935' },
    { id: 'Causal Chain Explorer', label: 'Causal Chain', icon: GitFork, emoji: '🌳' },
    { id: 'Risk Analysis', label: 'Risk Analysis', icon: BarChart3, emoji: '📊' },
    { id: 'Reports', label: 'Reports', icon: FileText, emoji: '📋' },
    { id: 'Settings', label: 'Settings', icon: Settings, emoji: '⚙️' }
  ];

  return (
    <aside style={{
      width: '210px',
      height: 'calc(100vh - 85px)',
      background: 'rgba(10, 14, 39, 0.85)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid var(--border-glass)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '16px 10px',
      flexShrink: 0
    }}>
      {/* Navigation List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ padding: '0 8px 8px 8px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Navigation
        </div>
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '9px 12px',
                background: isActive ? 'linear-gradient(90deg, rgba(30, 111, 217, 0.25) 0%, rgba(16, 26, 56, 0.4) 100%)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                borderLeft: isActive ? '3px solid #388bfd' : '3px solid transparent',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderRadius: '0 6px 6px 0',
                fontSize: '0.83rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1rem' }}>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  background: item.badgeColor ? 'rgba(229, 57, 53, 0.2)' : 'rgba(30, 111, 217, 0.2)',
                  color: item.badgeColor || '#60a5fa',
                  border: item.badgeColor ? '1px solid rgba(229, 57, 53, 0.4)' : '1px solid rgba(30, 111, 217, 0.3)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* System Status at Bottom */}
      <div className="glass-card" style={{
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: 'rgba(13, 20, 44, 0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-online"></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green-bright)' }}>
              System Status: ONLINE
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>Orbit Telemetry</span>
          <span className="font-mono" style={{ color: '#60a5fa' }}>12ms latency</span>
        </div>
      </div>
    </aside>
  );
}
