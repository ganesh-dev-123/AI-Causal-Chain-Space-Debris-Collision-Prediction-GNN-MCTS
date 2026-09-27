import React from 'react';
import { FileText, Download, Share2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ReportsView() {
  const reports = [
    { title: 'Kessler Syndrome Domino Assessment 2027-2077', date: '2027-03-15', size: '4.2 MB', status: 'Verified', author: 'Dr. Vance' },
    { title: 'LEO Shell 750km Conjunction Matrix Report', date: '2027-03-12', size: '2.8 MB', status: 'Verified', author: 'AI Engine Monte-Carlo' },
    { title: 'Satellite C Thruster Delta-V Mitigation Profile', date: '2027-03-10', size: '1.5 MB', status: 'Approved', author: 'Orbital Dynamics Team' },
  ];

  return (
    <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>📋 Automated Cascade Analysis Reports</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Generated SSA & Monte Carlo risk assessment documents</p>
        </div>

        <button className="btn-primary">
          <FileText size={16} />
          <span>Generate New Report</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reports.map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ background: 'rgba(30, 111, 217, 0.2)', padding: '10px', borderRadius: '8px' }}>
                <FileText size={24} color="#60a5fa" />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{r.title}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Date: {r.date} | Size: {r.size} | Author: {r.author}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => alert(`Downloading ${r.title}...`)}>
                <Download size={14} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
