// src/components/LabelCorrelationLineChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { star: 1, problem: 1.8, teacher: 2.2, comment: 15, ex: 5, vid: 3, student: 40 },
  { star: 2, problem: 2.5, teacher: 2.7, comment: 25, ex: 7, vid: 4, student: 60 },
  { star: 3, problem: 3.1, teacher: 3.4, comment: 32, ex: 8, vid: 5, student: 85 },
  { star: 4, problem: 3.8, teacher: 4.1, comment: 38, ex: 10, vid: 6, student: 110 },
  { star: 5, problem: 4.5, teacher: 4.7, comment: 45, ex: 12, vid: 7, student: 150 }
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

          <Line type="monotone" dataKey="problem" stroke="#5B8FF9" name="Điểm bài tập" />
          <Line type="monotone" dataKey="teacher" stroke="#61DDAA" name="Điểm giảng viên" />
          <Line type="monotone" dataKey="comment" stroke="#F6BD16" name="Độ dài bình luận" />
          <Line type="monotone" dataKey="ex" stroke="#E86452" name="Số bài tập" />
          <Line type="monotone" dataKey="vid" stroke="#9B72AA" name="Số video" />
          <Line type="monotone" dataKey="student" stroke="#FF9845" name="Số học viên" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
