// src/components/CourseBySchoolChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { school: 'ĐH A', courseCount: 1200, ranking: 4.6 },
  { school: 'ĐH B', courseCount: 950, ranking: 4.2 },
  { school: 'ĐH C', courseCount: 700, ranking: 3.9 },
  { school: 'Khác', courseCount: 783, ranking: 4.0 }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>{payload[0].payload.school}</strong></p>
        <p>Số khóa học: {payload[0].value}</p>
        <p>Ranking trung bình: {payload[0].payload.ranking}</p>
      </div>
    );
  }
  return null;
};

export default function CourseBySchoolChart() {
  return (
    <div className="chart-box">
      <h3>Phân bố số khóa học theo trường</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="school" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="courseCount" fill="#61DDAA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
