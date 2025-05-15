// src/components/CommentCorrelationCharts.jsx
import React from 'react';
import CommentPieChart from './CommentPieChart';

const COLORS = ['#61DDAA', '#F6BD16', '#E86452'];

export default function CommentCorrelationCharts({ commentByLabel }) {
  // Lấy tên của 3 nhóm cảm xúc từ label 1 (giả định tất cả đều giống nhau)
  const baseNames = commentByLabel[1].map((e) => e.name);

  return (
    <div className="chart-box">
      <h3>Phân bố cảm xúc bình luận theo label</h3>
      <p>Biểu đồ này cho thấy sự phân bố cảm xúc của các bình luận theo từng label.</p>
      <div className="correlation-row">
        {Object.entries(commentByLabel).map(([label, data]) => (
          <CommentPieChart
            key={label}
            data={data}
            title={`Label ${label} sao`}
          />
        ))}
      </div>

      {/* Legend chung */}
      <div className="common-legend">
        {baseNames.map((name, idx) => (
          <div key={name} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: COLORS[idx] }}
            />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
