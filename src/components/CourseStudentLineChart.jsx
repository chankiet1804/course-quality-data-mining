import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function CourseStudentLineChart({ data, title }) {
  return (
    <div className="chart-box">
      <h3>{title || 'Phân bố số lượng học viên theo thời gian'}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" textAnchor="end" height={40} />
          <YAxis tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="students"
            name="Số lượng học viên"
            stroke="#E86452"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 