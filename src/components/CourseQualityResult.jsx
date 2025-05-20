// CourseQualityResult.jsx
import React, { useState } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import './CourseQualityResult.css'; // tự tạo style như demo

const STAR_LEVELS = [
  { label: '1 sao', color: '#F44336', desc: 'Rất kém' },
  { label: '2 sao', color: '#FF9800', desc: 'Kém' },
  { label: '3 sao', color: '#FFC107', desc: 'Trung bình' },
  { label: '4 sao', color: '#2196F3', desc: 'Tốt' },
  { label: '5 sao', color: '#4CAF50', desc: 'Rất tốt' },
];

// ví dụ data kết quả
const RESULT_DATA = [
  { star: 5, percent: 30 },
  { star: 4, percent: 32 },
  { star: 3, percent: 18 },
  { star: 2, percent: 13 },
  { star: 1, percent: 7 },
];

// data chi tiết ví dụ cho từng mức sao
const LEVEL_DETAIL = {
  5: {
    schools: [
      { name: "ĐH Công nghệ Thông tin", avg_score: 0.92, teacher_score: 0.91, exercises: 40, sentiment_index: 0.88, diversity: 0.89 }
    ],
    features: [
      "Trường và giảng viên uy tín, điểm ranking cao",
      "Điểm trung bình bài tập xuất sắc",
      "Tỉ lệ bình luận tích cực rất cao",
      "Tài nguyên học tập đa dạng (nhiều video, bài tập...)",
      "Được học viên đánh giá vượt trội về mọi mặt"
    ]
  },
  // ...thêm các mức 4,3,2,1 tương tự
};

export default function CourseQualityResult() {
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleClickLevel = (star) => {
    setSelectedLevel(star);
    setShowModal(true);
  };

  return (
    <div className="quality-result-window">
      {/* <div className="result-header">
        <span className="header-title">
          Kết quả dự đoán chất lượng khóa học
        </span>
      </div> */}
      <div className="result-content">
        <h2>Chất lượng các khóa học</h2>
        <div className="star-levels-list">
          {RESULT_DATA.sort((a, b) => b.star - a.star).map((row, idx) => {
            const level = STAR_LEVELS[row.star - 1];
            return (
              <div
                key={row.star}
                className="result-row"
                onClick={() => handleClickLevel(row.star)}
                style={{padding: "11px 0"}}
              >
                <div className="level-label-wrap">
                  <span className="star-icon" style={{color: level.color, fontSize: 19, marginRight: 4}}>★</span>
                  <span className="level-label" style={{ color: level.color }}>
                    <b>{level.label}</b>
                    <span className="level-desc"> ({level.desc})</span>
                  </span>
                </div>
                <div className="result-bar-bg">
                  <div
                    className="result-bar"
                    style={{
                      width: `${row.percent}%`,
                      background: `linear-gradient(90deg, ${level.color} 75%, #f2f2f7 100%)`,
                      boxShadow: `0 2px 8px ${level.color}22`
                    }}
                  ></div>
                </div>
                <span className="percent">{row.percent}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <CourseQualityDetailModal
          star={selectedLevel}
          data={LEVEL_DETAIL[selectedLevel]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
      );
  }

// --- Modal chi tiết
function CourseQualityDetailModal({ star, data, onClose }) {
  const level = STAR_LEVELS[star - 1];

  // 5 tiêu chí với ví dụ ngưỡng (bạn chỉnh ngưỡng khi dùng thực tế)
  const CRITERIA = [
    { name: 'Độ uy tín trường (ranking_score)', threshold: "≥ 0.80" },
    { name: 'Độ uy tín giảng viên', threshold: "≥ 0.80" },
    { name: 'Điểm TB bài tập', threshold: "≥ 0.80" },
    { name: 'Tỉ lệ cảm xúc bình luận (sentiment_index)', threshold: "≥ 0.80" },
    { name: 'Độ đa dạng tài nguyên', threshold: "≥ 0.80" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2 style={{ color: level.color }}>
          Chi tiết mức độ: {level.label} <span style={{ fontWeight: 400 }}>({level.desc})</span>
        </h2>
        <div className="criteria-block">
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Tiêu chí đánh giá:</div>
          <ul>
            {CRITERIA.map((c, idx) => (
              <li key={idx}>
                <span style={{ color: "#52b788", fontWeight: "bold" }}>✓</span> {c.name} <span style={{ color: "#888" }}>[{c.threshold}]</span>
              </li>
            ))}
          </ul>
          <div style={{ fontStyle: "italic", fontSize: 15, color: "#888" }}>
            (Ngưỡng cụ thể cho từng mức sao có thể tùy chỉnh)
          </div>
        </div>
        <div className="school-list-block">
          <div style={{ fontWeight: 600, margin: "20px 0 8px 0" }}>Các khóa học/trường thuộc mức độ này:</div>
          <table className="school-table">
            <thead>
              <tr>
                <th>Tên trường</th>
                <th>Điểm trường</th>
                <th>Giảng viên</th>
                <th>Điểm TB BT</th>
                <th>Cảm xúc</th>
                <th>Tài nguyên</th>
              </tr>
            </thead>
            <tbody>
              {data?.schools.map((row, i) => (
                <tr key={i}>
                  <td>{row.name}</td>
                  <td>{row.avg_score}</td>
                  <td>{row.teacher_score}</td>
                  <td>{row.exercises}</td>
                  <td>{row.sentiment_index}</td>
                  <td>{row.diversity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="feature-block" style={{ marginTop: 22, background: "#f2fcf8", borderRadius: 10, padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6, color: level.color }}>Đặc điểm của khóa học ở mức độ này:</div>
          <ul>
            {data?.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
