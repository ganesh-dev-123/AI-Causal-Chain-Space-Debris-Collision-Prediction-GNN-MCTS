import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Play, 
  ShieldAlert, 
  Plus, 
  Satellite, 
  Link2,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSimulation }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Critical Conjunction Alert', text: 'Satellite A & Debris F1 miss distance < 450m', time: '2m ago', type: 'critical' },
    { id: 2, title: 'Cascade Prediction Updated', text: 'Monte Carlo 10,000 runs completed for 2027-2077 horizon', time: '14m ago', type: 'info' },
    { id: 3, title: 'Recommended Maneuver Ready', text: 'Delta-V 0.5m/s thruster profile generated for Sat-C', time: '1h ago', type: 'success' },
  ]);

  const navItems = ['Dashboard', 'Simulation', 'Causal Chain', 'Reports', 'API'];

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="header-bar" style={{
      height: '60px',
      background: 'rgba(10, 14, 39, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 100,
      position: 'relative'
    }}>
      {/* Left: Brand Logo */}
      <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('Dashboard')}>
        <div style={{
          position: 'relative',
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(30,111,217,0.3) 0%, rgba(10,14,39,0.8) 100%)',
          border: '1px solid var(--border-glass-bright)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(30, 111, 217, 0.3)'
        }}>
          <Satellite size={22} color="#388BFD" />
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            background: '#e53935',
            borderRadius: '50%',
            padding: '2px',
            display: 'flex',
            boxShadow: '0 0 8px rgba(229,57,53,0.8)'
          }}>
            <Link2 size={10} color="#fff" />
          </div>
        </div>
        <div>
          <div className="font-brand" style={{ fontSize: '1.15rem', fontWeight: 800, background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DebrisChain <span style={{ color: '#fb8c00', WebkitTextFillColor: '#fb8c00', fontSize: '0.9rem' }}>AI</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Orbital Cascade Prediction
          </div>
        </div>
      </div>

      {/* Center: Navigation Menu */}
      <nav style={{ display: 'flex', gap: '6px', background: 'rgba(16, 26, 56, 0.5)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(30, 111, 217, 0.15)' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item;
          return (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(30, 111, 217, 0.35) 0%, rgba(21, 79, 179, 0.2) 100%)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 10px rgba(30, 111, 217, 0.25)' : 'none'
              }}
            >
              {item}
            </button>
          );
        })}
      </nav>

      {/* Right: Actions, Avatar, Notifications */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* New Simulation Button */}
        <button className="btn-primary" onClick={onOpenSimulation}>
          <Plus size={16} />
          <span>New Simulation</span>
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: showNotifications ? 'rgba(30, 111, 217, 0.25)' : 'rgba(16, 26, 56, 0.6)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: 'var(--accent-red)',
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(229, 57, 53, 0.8)'
              }}>
                {notifications.length}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showNotifications && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '46px',
              right: '0',
              width: '320px',
              padding: '12px',
              zIndex: 200,
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Conjunction Notifications</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue-bright)', cursor: 'pointer' }} onClick={() => setNotifications([])}>Clear all</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>No new notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} style={{
                      background: n.type === 'critical' ? 'rgba(229, 57, 53, 0.12)' : 'rgba(30, 111, 217, 0.1)',
                      borderLeft: n.type === 'critical' ? '3px solid #e53935' : '3px solid #1e6fd9',
                      borderRadius: '4px',
                      padding: '8px 10px',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: n.type === 'critical' ? '#ff6b6b' : '#fff' }}>{n.title}</span>
                        <X size={12} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => clearNotification(n.id)} />
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{n.text}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>{n.time}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(16, 26, 56, 0.6)',
          border: '1px solid var(--border-glass)',
          borderRadius: '20px',
          padding: '4px 12px 4px 4px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e6fd9 0%, #fb8c00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}>
            DV
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Dr. Vance</span>
        </div>
      </div>
    </header>
  );
}
