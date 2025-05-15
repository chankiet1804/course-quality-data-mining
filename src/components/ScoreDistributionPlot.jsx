// src/components/ScoreDistributionPlot.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const scoreData = [
  { range: '0–1', count: 120 },
  { range: '1–2', count: 300 },
  { range: '2–3', count: 550 },
  { range: '3–4', count: 680 },
  { range: '4–5', count: 420 }
];

export default function ScoreDistributionPlot() {
  return (
    <div className="chart-box">
      <h3>Phân bố điểm trung bình bài tập (problem_scores)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={scoreData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#5B8FF9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
