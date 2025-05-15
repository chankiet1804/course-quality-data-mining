// src/components/CommentPieChart.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

const commentData = [
  { name: 'Tích cực', value: 62 },
  { name: 'Trung lập', value: 24 },
  { name: 'Tiêu cực', value: 14 }
];

const COLORS = ['#61DDAA', '#F6BD16', '#E86452'];

export default function CommentPieChart() {
  return (
    <div className="chart-box">
      <h3>Phân bố cảm xúc bình luận</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={commentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {commentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
