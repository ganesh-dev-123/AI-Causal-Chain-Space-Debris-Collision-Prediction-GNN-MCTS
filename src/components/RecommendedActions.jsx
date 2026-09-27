import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle, ArrowRight, DollarSign, Clock, Zap, Flame } from 'lucide-react';

export default function RecommendedActions({ onTriggerAction }) {
  const [actions, setActions] = useState([
    {
      id: 'nudge-sat-c',
      type: 'green',
      icon: '🟢',
      title: 'Nudge Satellite C by 0.5 m/s',
      subtitle: 'Proactive orbit inclination shift to break downstream fragment cascade',
      cost: '$50K',
      saves: '$700M',
      window: '18 months',
      status: 'Ready for Thrust Command',
      btnText: 'Execute Maneuver',
      btnColor: 'var(--accent-green)',
      executed: false
    },
    {
      id: 'monitor-f2',
      type: 'yellow',
      icon: '🟡',
      title: 'Monitor Debris F2 conjunction',
      subtitle: 'High precision radar tracking requested via USSPACECOM & SSA network',
      risk: 'Medium',
      nextCheck: '2028-06-15',
      status: 'Radar Tracking Active',
      btnText: 'Schedule Radar Task',
      btnColor: 'var(--accent-orange)',
      executed: false
    },
    {
      id: 'urgent-72h',
      type: 'red',
      icon: '🔴',
      title: 'Urgent: Collision imminent in 72 hours',
      subtitle: 'Conjunction alert: Satellite A & Fragment 409 distance < 450m',
      actionReq: 'Emergency maneuver',
      priority: 'CRITICAL',
      status: 'Thrust Vector Calculated',
      btnText: 'Trigger Emergency Thrust',
      btnColor: 'var(--accent-red)',
      executed: false
    }
  ]);

  const [notification, setNotification] = useState(null);

  const handleExecute = (action) => {
    setActions(prev => prev.map(a => a.id === action.id ? { ...a, executed: true, status: 'EXECUTIVE COMMAND SENT' } : a));
    setNotification(`Command dispatched: ${action.title}. Orbit parameters updated.`);
    if (onTriggerAction) onTriggerAction(action);
    setTimeout(() => setNotification(null), 4000);
  };

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
          <ShieldCheck size={18} color="#43a047" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            RECOMMENDED ACTIONS <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>(AI Maneuver Protocols)</span>
          </span>
        </div>
      </div>

      {/* Action Execution Notification Banner */}
      {notification && (
        <div style={{
          background: 'rgba(67, 160, 71, 0.25)',
          borderBottom: '1px solid rgba(67, 160, 71, 0.5)',
          color: '#81c784',
          padding: '8px 16px',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fade-in 0.3s ease'
        }}>
          <CheckCircle size={14} />
          <span>{notification}</span>
        </div>
      )}

      {/* Action Cards List */}
      <div style={{
        flex: 1,
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflowY: 'auto'
      }}>
        {/* Card 1: Green Nudge Satellite C */}
        <div className="glass-card" style={{
          padding: '10px 14px',
          borderLeft: '4px solid #43a047',
          background: actions[0].executed ? 'rgba(67, 160, 71, 0.12)' : 'rgba(16, 26, 56, 0.75)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>🟢</span>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{actions[0].title}</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{actions[0].subtitle}</div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
              <div>Cost: <strong className="font-mono" style={{ color: '#81c784' }}>{actions[0].cost}</strong></div>
              <div>Saves: <strong className="font-mono" style={{ color: '#60a5fa' }}>{actions[0].saves}</strong></div>
              <div>Window: <strong className="font-mono" style={{ color: '#ffb74d' }}>{actions[0].window}</strong></div>
            </div>

            <button
              onClick={() => handleExecute(actions[0])}
              disabled={actions[0].executed}
              style={{
                background: actions[0].executed ? 'rgba(67, 160, 71, 0.3)' : 'linear-gradient(135deg, #43a047 0%, #2e7d32 100%)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: actions[0].executed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {actions[0].executed ? <CheckCircle size={12} /> : <Zap size={12} />}
              <span>{actions[0].executed ? 'Maneuver Queued' : 'Execute Maneuver'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Yellow Monitor Debris F2 */}
        <div className="glass-card" style={{
          padding: '10px 14px',
          borderLeft: '4px solid #fb8c00',
          background: actions[1].executed ? 'rgba(251, 140, 0, 0.12)' : 'rgba(16, 26, 56, 0.75)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>🟡</span>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{actions[1].title}</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{actions[1].subtitle}</div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
              <div>Risk: <strong style={{ color: '#ffb74d' }}>{actions[1].risk}</strong></div>
              <div>Next check: <strong className="font-mono" style={{ color: '#60a5fa' }}>{actions[1].nextCheck}</strong></div>
            </div>

            <button
              onClick={() => handleExecute(actions[1])}
              disabled={actions[1].executed}
              style={{
                background: actions[1].executed ? 'rgba(251, 140, 0, 0.3)' : 'rgba(251, 140, 0, 0.2)',
                border: '1px solid rgba(251, 140, 0, 0.4)',
                color: '#ffb74d',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: actions[1].executed ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {actions[1].executed ? <CheckCircle size={12} /> : <Clock size={12} />}
              <span>{actions[1].executed ? 'Tracking Scheduled' : 'Schedule Radar Check'}</span>
            </button>
          </div>
        </div>

        {/* Card 3: Red Urgent Collision Imminent in 72h */}
        <div className="glass-card pulse-critical" style={{
          padding: '10px 14px',
          borderLeft: '4px solid #e53935',
          background: actions[2].executed ? 'rgba(229, 57, 53, 0.15)' : 'rgba(229, 57, 53, 0.12)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1rem' }}>🔴</span>
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#ff6b6b' }}>{actions[2].title}</strong>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{actions[2].subtitle}</div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
              <div>Action: <strong style={{ color: '#fff' }}>{actions[2].actionReq}</strong></div>
              <div>Priority: <strong className="badge-red" style={{ fontSize: '0.65rem' }}>{actions[2].priority}</strong></div>
            </div>

            <button
              onClick={() => handleExecute(actions[2])}
              disabled={actions[2].executed}
              className={actions[2].executed ? "" : "btn-danger"}
              style={actions[2].executed ? {
                background: 'rgba(229, 57, 53, 0.3)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              } : {
                padding: '4px 10px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {actions[2].executed ? <CheckCircle size={12} /> : <Flame size={12} />}
              <span>{actions[2].executed ? 'Emergency Thrust Active' : 'Emergency Maneuver'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
