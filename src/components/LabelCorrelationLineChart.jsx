// src/components/LabelCorrelationLineChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { star: 1, comment: 150, ex: 95, vid: 130, student: 90 },
  { star: 2, comment: 189, ex: 170, vid: 97, student: 160 },
  { star: 3, comment: 148, ex: 226, vid: 155, student: 135 },
  { star: 4, comment: 278, ex: 199, vid: 206, student: 320 },
  { star: 5, comment: 301, ex: 275, vid: 237, student: 280 }
];

export default function LabelCorrelationLineChart() {
  return (
    <div className="chart-box">
      <h3>Mối tương quan giữa nhãn (số sao) và các đặc trưng</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="star" label={{ value: 'Số sao', position: 'insideBottom', offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Legend />

          
          <Line type="monotone" dataKey="comment" stroke="#F6BD16" name="Số lượng bình luận trung bình" />
          <Line type="monotone" dataKey="ex" stroke="#E86452" name="Số bài tập trung bình" />
          <Line type="monotone" dataKey="vid" stroke="#9B72AA" name="Số video trung bình" />
          <Line type="monotone" dataKey="student" stroke="#FF9845" name="Số học viên trung bình" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
