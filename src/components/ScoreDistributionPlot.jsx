// src/components/ScoreDistributionPlot.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ScoreDistributionPlot({ courses }) {
  // 1. Gom tất cả điểm problem
  const allScores = courses.flatMap((c) => c.problem_scores);

  // 2. Tạo mảng bin [0, 0.5, 1.0, ..., 5.0]
  const binSize = 0.5;
  const bins = Array.from(
    { length: Math.ceil(10 / binSize) + 1 },
    (_, i) => i * binSize
  );

  // 3. Tạo distributionData
  const distributionData = bins.slice(0, -1).map((min, i) => {
    const max = bins[i + 1];
    // Count problems
    const countProblems = allScores.filter(
      (score) =>
        (i < bins.length - 2
          ? score >= min && score < max
          : score >= min && score <= max)
    ).length;
    // Count courses có ít nhất 1 problem trong bin này
    const countCourses = courses.filter((course) =>
      course.problem_scores.some(
        (score) =>
          (i < bins.length - 2
            ? score >= min && score < max
            : score >= min && score <= max)
      )
    ).length;

    return {
      range: `${min.toFixed(1)}–${max.toFixed(1)}`,
      countProblems,
      countCourses,
    };
  });

  // 4. Custom Tooltip để show cả 2 giá trị
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { range, countProblems, countCourses } = payload[0].payload;
    return (
      <div
        style={{
          background: '#fff',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
        }}
      >
        <p><strong>Khoảng: {range}</strong></p>
        <p>Số bài tập: {countProblems}</p>
        <p>Số khóa học: {countCourses}</p>
      </div>
    );
  };

  return (
    <div className="chart-box">
      <h3>Phân bố điểm problem theo nhóm 0.5</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={distributionData}
          margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            label={{ value: 'Khoảng điểm', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: 'Số lượng bài tập',
              angle: -90,
              position: 'insideLeft',
              offset: 8,
              dy: 52,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="countProblems" fill="#5B8FF9" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
