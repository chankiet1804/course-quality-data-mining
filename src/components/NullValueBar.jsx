// src/components/NullValueBar.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';

const nullData = [
  { field: 'about', missing: 3 },
  { field: 'comments', missing: 1 },
  { field: 'school_name', missing: 4 },
  { field: 'problem_scores', missing: 18 },
  { field: 'student', missing: 2 },
  { field: 'teacher', missing: 20 }
];

export default function NullValueBar() {
  return (
    <div className="chart-box">
      <h3>Tỉ lệ thiếu dữ liệu (%) theo trường dữ liệu</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={nullData} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" unit="%" />
          <YAxis type="category" dataKey="field" />
          <Tooltip />
          <Bar dataKey="missing" fill="#ff6b6b">
            <LabelList dataKey="missing" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
