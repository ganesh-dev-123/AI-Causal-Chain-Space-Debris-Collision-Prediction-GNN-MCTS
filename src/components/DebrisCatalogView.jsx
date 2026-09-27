import React, { useState } from 'react';
import { Satellite, Search, Filter, ShieldAlert, ArrowUpRight, Globe } from 'lucide-react';

export default function DebrisCatalogView() {
  const [searchTerm, setSearchTerm] = useState('');

  const catalogItems = [
    { id: 'NORAD-40921', name: 'Fragment 409 (Cosmos 2251)', epoch: 'LEO 780km', inc: '74.0°', rcs: '0.45 m²', risk: 'CRITICAL', status: 'Conjunction Imminent' },
    { id: 'NORAD-33451', name: 'Fengyun 1C Fragment B', epoch: 'LEO 850km', inc: '98.6°', rcs: '1.20 m²', risk: 'HIGH', status: 'Tracked' },
    { id: 'NORAD-12094', name: 'SL-8 Rocket Body Fragment', epoch: 'LEO 950km', inc: '82.9°', rcs: '3.10 m²', risk: 'MEDIUM', status: 'Decaying' },
    { id: 'NORAD-55201', name: 'Envisat Debris Cascade A', epoch: 'LEO 760km', inc: '98.5°', rcs: '0.12 m²', risk: 'CRITICAL', status: 'Active Conjunction' },
    { id: 'NORAD-28902', name: 'Iridium 33 Fragment 88', epoch: 'LEO 776km', inc: '86.4°', rcs: '0.08 m²', risk: 'HIGH', status: 'Tracked' },
    { id: 'NORAD-41002', name: 'Atlas V Centaur Fragment', epoch: 'MEO 14,200km', inc: '55.0°', rcs: '4.80 m²', risk: 'MEDIUM', status: 'Stable Orbit' },
  ];

  const filtered = catalogItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>🛰️ High-Risk Orbital Debris Catalog</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live NORAD TLE space object catalog & radar cross-section telemetry</p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search catalog ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(16, 26, 56, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: '6px',
                padding: '8px 12px 8px 32px',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
                width: '240px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: '#60a5fa' }}>{item.id}</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{item.name}</h3>
              </div>
              <span className={item.risk === 'CRITICAL' ? 'badge-red' : item.risk === 'HIGH' ? 'badge-orange' : 'badge-yellow'}>
                {item.risk}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', background: 'rgba(10, 14, 39, 0.6)', padding: '8px', borderRadius: '6px' }}>
              <div>Orbit Shell: <strong className="font-mono" style={{ color: '#fff' }}>{item.epoch}</strong></div>
              <div>Inclination: <strong className="font-mono" style={{ color: '#fff' }}>{item.inc}</strong></div>
              <div>RCS Area: <strong className="font-mono" style={{ color: '#fff' }}>{item.rcs}</strong></div>
              <div>Status: <strong style={{ color: item.risk === 'CRITICAL' ? '#ff6b6b' : '#81c784' }}>{item.status}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
