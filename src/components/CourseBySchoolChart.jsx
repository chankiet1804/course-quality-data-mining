import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Tạo danh sách tên trường mẫu
const universityNames = [
  'Tsinghua University', 'Peking University', 'Fudan University', 'Zhejiang University',
  'Shanghai Jiao Tong University', 'University of Science and Technology of China',
  'Wuhan University', 'Nanjing University', 'Sun Yat-sen University', 'Harbin Institute of Technology',
  'Xi\'an Jiaotong University', 'Jilin University', 'Sichuan University', 'Beihang University', 'Tongji University',
  'Xiamen University', 'Renmin University of China', 'Beijing Normal University', 'East China Normal University', 'Central South University'
];
// Fake 200 trường
const data = Array.from({ length: 200 }, (_, i) => ({
  school: universityNames[i % universityNames.length] + ` #${i+1}`,
  courseCount: Math.floor(Math.random() * 360) + 40,
  ranking: Math.floor(Math.random() * 40) + 60
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
        <p><strong>{payload[0].payload.school}</strong></p>
        <p>Số khóa học: {payload[0].value}</p>
        <p>Ranking score: {payload[0].payload.ranking}</p>
      </div>
    );
  }
  return null;
};

export default function CourseBySchoolChart() {
  return (
    <div className="chart-box">
      <h3 style={{ marginBottom: 14 }}>Phân bố số lượng khóa học theo các trường</h3>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="school"
            tick={false}
            axisLine={true}
            label={{
              value: "Các trường học",
              position: "insideBottom",
              offset: -1,
              fontSize: 15,
              fontWeight: 400
            }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="courseCount" fill="#61DDAA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
