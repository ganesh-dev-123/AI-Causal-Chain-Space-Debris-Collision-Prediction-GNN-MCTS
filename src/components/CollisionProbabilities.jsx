import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sliders, ShieldAlert } from 'lucide-react';

export default function CollisionProbabilities({ selectedYear, setSelectedYear }) {
  const [activeModel, setActiveModel] = useState('MonteCarlo');
  const [hoveredYear, setHoveredYear] = useState(null);

  const probabilityData = [
    {
      year: 2027,
      percentage: 98.7,
      label: '98.7%',
      color: '#e53935',
      glow: 'rgba(229, 57, 53, 0.4)',
      risk: 'CRITICAL',
      object: 'Satellite A ↔ Fragment 409',
      missDistance: '420 meters',
      relativeVel: '14.2 km/s'
    },
    {
      year: 2029,
      percentage: 73.4,
      label: '73.4%',
      color: '#fb8c00',
      glow: 'rgba(251, 140, 0, 0.4)',
      risk: 'HIGH',
      object: 'Debris F1 ↔ Sentinel-6',
      missDistance: '1.2 km',
      relativeVel: '11.8 km/s'
    },
    {
      year: 2032,
      percentage: 45.6,
      label: '45.6%',
      color: '#fdd835',
      glow: 'rgba(253, 216, 53, 0.3)',
      risk: 'MEDIUM',
      object: 'Debris G1 ↔ MEO Navigation Belt',
      missDistance: '3.8 km',
      relativeVel: '9.4 km/s'
    },
    {
      year: 2036,
      percentage: 22.1,
      label: '22.1%',
      color: '#43a047',
      glow: 'rgba(67, 160, 71, 0.3)',
      risk: 'MODERATE',
      object: 'Satellite C ↔ Secondary Cascade Cloud',
      missDistance: '8.5 km',
      relativeVel: '7.1 km/s'
    }
  ];

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
          <BarChart3 size={18} color="#1e6fd9" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            COLLISION PROBABILITIES <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>(Temporal Risk Curve)</span>
          </span>
        </div>

        {/* Model Switcher */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(16, 26, 56, 0.6)', padding: '2px', borderRadius: '6px' }}>
          <button
            onClick={() => setActiveModel('MonteCarlo')}
            style={{
              background: activeModel === 'MonteCarlo' ? 'rgba(30, 111, 217, 0.35)' : 'transparent',
              color: activeModel === 'MonteCarlo' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Monte Carlo
          </button>
          <button
            onClick={() => setActiveModel('SGP4')}
            style={{
              background: activeModel === 'SGP4' ? 'rgba(30, 111, 217, 0.35)' : 'transparent',
              color: activeModel === 'SGP4' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            SGP4 Analytical
          </button>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {probabilityData.map((item) => {
            const isSelected = selectedYear === item.year;
            const isHovered = hoveredYear === item.year;

            return (
              <div
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                onMouseEnter={() => setHoveredYear(item.year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                {/* Year Label & Probability Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="font-mono" style={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: isSelected ? '#60a5fa' : '#fff'
                    }}>
                      {item.year}:
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {item.object}
                    </span>
                  </div>

                  <span className="font-mono" style={{
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: item.color
                  }}>
                    {item.label}
                  </span>
                </div>

                {/* Horizontal Progress Bar */}
                <div style={{
                  height: '24px',
                  width: '100%',
                  background: 'rgba(16, 26, 56, 0.7)',
                  borderRadius: '6px',
                  border: isSelected ? `1px solid ${item.color}` : '1px solid var(--border-glass)',
                  padding: '3px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Glowing Fill Bar */}
                  <div style={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    background: `linear-gradient(90deg, ${item.color}bb 0%, ${item.color} 100%)`,
                    borderRadius: '4px',
                    boxShadow: `0 0 12px ${item.glow}`,
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px'
                  }}>
                    {/* Visual ASCII / Micro Pattern Overlay */}
                    <div style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'rgba(255,255,255,0.7)',
                      letterSpacing: '1px'
                    }}>
                      {item.percentage > 40 ? '██████████' : '████'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover / Telemetry Quick Info Box */}
        <div className="glass-card" style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: 'rgba(10, 14, 39, 0.85)',
          fontSize: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Conjunction Miss Distance: </span>
            <strong className="font-mono" style={{ color: '#60a5fa' }}>
              {hoveredYear 
                ? probabilityData.find(d => d.year === hoveredYear)?.missDistance 
                : '420 meters (2027)'}
            </strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Rel Velocity: </span>
            <strong className="font-mono" style={{ color: '#fb8c00' }}>
              {hoveredYear 
                ? probabilityData.find(d => d.year === hoveredYear)?.relativeVel 
                : '14.2 km/s (2027)'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
