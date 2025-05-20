import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { week: '03/03', students: 980000, courses: 3000 },
  { week: '10/03', students: 990000, courses: 3050 },
  { week: '17/03', students: 970000, courses: 3100 },
  { week: '24/03', students: 985000, courses: 3070 },
  { week: '31/03', students: 995000, courses: 3120 },
  { week: '07/04', students: 1002000, courses: 3180 },
  { week: '14/04', students: 1005000, courses: 3160 },
  { week: '21/04', students: 1008000, courses: 3210 },
  { week: '28/04', students: 1011000, courses: 3240 },
  { week: '05/05', students: 1007000, courses: 3200 },
  { week: '12/05', students: 1013000, courses: 3260 },
  { week: '19/05', students: 1017000, courses: 3280 },
];

export default function StudentLineChart() {
  return (
    <div className="chart-box">
      <h3>Phân bố số lượng học viên và khóa học theo thời gian</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" textAnchor="end" height={40} />
          
          {/* Y-axis trái: học viên */}
          <YAxis yAxisId="left" tickFormatter={(v) => `${v / 1000}k`} />
          
          {/* Y-axis phải: khóa học */}
          <YAxis yAxisId="right" orientation="right" />
          
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="students"
            name="Số lượng học viên"
            stroke="#E86452"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="courses"
            name="Số lượng khóa học"
            stroke="#4E9F3D"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
