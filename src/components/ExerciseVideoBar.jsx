// src/components/ExerciseVideoBar.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { school: 'ĐH A', exercises: 12, videos: 8 },
  { school: 'ĐH B', exercises: 10, videos: 6 },
  { school: 'ĐH C', exercises: 8, videos: 5 },
  { school: 'Khác', exercises: 9, videos: 7 }
];

export default function ExerciseVideoBar() {
  return (
    <div className="chart-box">
      <h3>Phân bố trung bình số bài tập và video giảng dạy</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="school" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="exercises" fill="#5B8FF9" />
          <Bar dataKey="videos" fill="#F6BD16" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
