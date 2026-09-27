import React, { useState } from 'react';
import { 
  Bot, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Cpu, 
  Play, 
  CheckCircle2, 
  Send,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

export default function AiInsightsPanel({ isCollapsed, setIsCollapsed, onOpenSimulation }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Chain A→F1→G1 has 22% probability of destroying 3 satellites by 2036.'
    },
    {
      sender: 'ai',
      text: 'Recommended: Break chain at node F1. Cost: $50K. Savings: $700M.'
    },
    {
      sender: 'ai',
      text: 'Confidence interval: 85% (Monte Carlo, 10,000 runs)'
    }
  ]);

  const handleSendQuery = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // AI Response generator mock
    setTimeout(() => {
      let reply = "Analyzing orbital parameters... Conjunction miss distance for Sat-C estimated at 1.4 km under 0.5 m/s Delta-V thruster burn.";
      if (userText.toLowerCase().includes('kessler')) {
        reply = "Kessler syndrome threshold currently modeled at 4.2% density increase per decade in LEO 750-800km shell.";
      } else if (userText.toLowerCase().includes('cost') || userText.toLowerCase().includes('save')) {
        reply = "Node F1 break delivers optimal ROI: $50,000 active laser/thruster burn prevents $700M asset loss across 3 commercial satellites.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  if (isCollapsed) {
    return (
      <div style={{
        width: '36px',
        height: 'calc(100vh - 85px)',
        background: 'rgba(10, 14, 39, 0.9)',
        backdropFilter: 'blur(12px)',
        borderLeft: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '16px',
        cursor: 'pointer'
      }} onClick={() => setIsCollapsed(false)} title="Expand AI Insights Panel">
        <button style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', marginBottom: '16px' }}>
          <ChevronLeft size={20} />
        </button>
        <Bot size={20} color="#388bfd" />
        <div style={{
          writingMode: 'vertical-rl',
          textTransform: 'uppercase',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '1px',
          color: 'var(--text-secondary)',
          marginTop: '20px'
        }}>
          AI Insights
        </div>
      </div>
    );
  }

  return (
    <aside className="glass-panel" style={{
      width: '280px',
      height: 'calc(100vh - 85px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderLeft: '1px solid var(--border-glass)',
      borderRadius: '10px 0 0 10px',
      flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--bg-panel-header)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30,111,217,0.3) 0%, rgba(251,140,0,0.3) 100%)',
            padding: '4px',
            borderRadius: '6px',
            display: 'flex'
          }}>
            <Bot size={18} color="#60a5fa" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            AI INSIGHTS
          </span>
        </div>

        <button
          onClick={() => setIsCollapsed(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
          title="Collapse Panel"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Main Insight Cards Area */}
      <div style={{
        flex: 1,
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'auto'
      }}>
        {/* Key Finding 1 */}
        <div className="glass-card" style={{
          padding: '10px 12px',
          borderLeft: '3px solid #e53935',
          background: 'rgba(229, 57, 53, 0.08)'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ff6b6b', textTransform: 'uppercase', marginBottom: '4px' }}>
            Cascade Warning
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fff', lineHeight: 1.35 }}>
            Chain A→F1→G1 has <strong style={{ color: '#ff6b6b' }}>22% probability</strong> of destroying 3 satellites by 2036.
          </div>
        </div>

        {/* Key Finding 2 */}
        <div className="glass-card" style={{
          padding: '10px 12px',
          borderLeft: '3px solid #43a047',
          background: 'rgba(67, 160, 71, 0.08)'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#81c784', textTransform: 'uppercase', marginBottom: '4px' }}>
            Optimal Intervention
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fff', lineHeight: 1.35 }}>
            Recommended: Break chain at node F1. Cost: <strong style={{ color: '#81c784' }}>$50K</strong>. Savings: <strong style={{ color: '#60a5fa' }}>$700M</strong>.
          </div>
        </div>

        {/* Key Finding 3 */}
        <div className="glass-card" style={{
          padding: '10px 12px',
          borderLeft: '3px solid #388bfd',
          background: 'rgba(30, 111, 217, 0.08)'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '4px' }}>
            Model Precision
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fff', lineHeight: 1.35 }}>
            Confidence interval: <strong style={{ color: '#60a5fa' }}>85%</strong> (Monte Carlo, 10,000 runs).
          </div>
        </div>

        {/* Run New Simulation Call to Action */}
        <button
          className="btn-primary"
          onClick={onOpenSimulation}
          style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
        >
          <Sparkles size={16} />
          <span>Run New Simulation</span>
        </button>

        {/* AI Mini-Chat Assistant */}
        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            ASK DEBRISCHAIN AI
          </div>
          <div style={{
            maxHeight: '120px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            marginBottom: '8px',
            fontSize: '0.75rem'
          }}>
            {messages.slice(3).map((m, idx) => (
              <div key={idx} style={{
                background: m.sender === 'user' ? 'rgba(30, 111, 217, 0.25)' : 'rgba(16, 26, 56, 0.8)',
                padding: '6px 10px',
                borderRadius: '6px',
                color: m.sender === 'user' ? '#fff' : 'var(--text-secondary)'
              }}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendQuery} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              placeholder="Ask orbit question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(16, 26, 56, 0.6)',
                border: '1px solid var(--border-glass)',
                borderRadius: '6px',
                padding: '6px 10px',
                color: '#fff',
                fontSize: '0.75rem',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              background: 'rgba(30, 111, 217, 0.3)',
              border: '1px solid var(--border-glass-bright)',
              color: '#60a5fa',
              borderRadius: '6px',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
