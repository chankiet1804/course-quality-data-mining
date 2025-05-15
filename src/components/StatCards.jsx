import React from 'react';
import './DashboardSection.css';

const stats = [
  { label: 'Số lượng khóa học', value: 3633 },
  { label: 'Số lượng trường dữ liệu (features)', value: 10 },
  { label: 'Tổng số trường có thiếu dữ liệu', value: 5 },
  { label: 'Bình luận trung bình / khóa học', value: 25.4 }
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
