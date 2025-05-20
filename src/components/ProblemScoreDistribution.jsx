// src/components/NullValueBar.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';

// Giả lập dữ liệu phân bố điểm bài tập theo các khoảng (0.5 đơn vị)
const scoreDistribution = [
  { range: '9.5 - 10.0', count: 108 },
  { range: '9.0 - 9.5', count: 89 },
  { range: '8.5 - 9.0', count: 57 },
  { range: '8.0 - 8.5', count: 114 },
  { range: '7.5 - 8.0', count: 206 },
  { range: '7.0 - 7.5', count: 331 },
  { range: '6.5 - 7.0', count: 529 },
  { range: '6.0 - 6.5', count: 796 },
  { range: '5.5 - 6.0', count: 1132 },
  { range: '5.0 - 5.5', count: 1524 },
  { range: '4.5 - 5.0', count: 1834 },
  { range: '4.0 - 4.5', count: 2117 },
  { range: '3.5 - 4.0', count: 2484 },
  { range: '3.0 - 3.5', count: 2696 },
  { range: '2.5 - 3.0', count: 2851 },
  { range: '2.0 - 2.5', count: 3110 },
  { range: '1.5 - 2.0', count: 3105 },
  { range: '1.0 - 1.5', count: 2970 },
  { range: '0.5 - 1.0', count: 2534 },
  { range: '0 - 0.5', count: 1575 }
];

export default function ProblemScoreDistribution() {
  return (
    <div className="chart-box">
      <h3>Phân bố điểm bài tập theo nhóm điểm</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={scoreDistribution} layout="vertical" margin={{ left: 40, bottom: 30 }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{
              value: 'Số lượng',
              position: 'insideBottom',
              offset: -10,
              style: { fontSize: 16 },
            }}
          />
          <YAxis
            type="category"
            dataKey="range"
            width={80}
            label={{
              value: 'Nhóm điểm',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
              style: { fontSize: 16 }
            }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#5B8FF9">
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
