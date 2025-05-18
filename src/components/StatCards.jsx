import React from 'react';
import './DashboardSection.css';

const stats = [
  { label: 'Số lượng khóa học', value: 3633 },
  { label: 'Số lượng lĩnh vực', value: 148 },
  { label: 'Số lượng trường học', value: 375 },
  { label: 'Số lượng sinh viên', value: '1.756.320' }
];

export default function StatCards() {
  return (
    <section className="stats-grid">
      {stats.map((s, i) => (
        <div className="stat-card" key={i}>
          <h3>{s.label}</h3>
          <p>{s.value}</p>
        </div>
      ))}
    </section>
  );
}
