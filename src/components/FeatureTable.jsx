import React from 'react';
import './DashboardSection.css';

const features = [
  { key: 'course_id', desc: 'Mã định danh của khóa học (string)', missingRate: '0%' },
  { key: 'name', desc: 'Tên của khóa học', missingRate: '0%' },
  { key: 'about', desc: 'Mô tả tổng quát về nội dung khóa học', missingRate: '3%' },
  { key: 'comments', desc: 'Danh sách bình luận từ học viên', missingRate: '1%' },
  { key: 'school_name', desc: 'Tên trường cung cấp khóa học', missingRate: '4%' },
  { key: 'problem_scores', desc: 'Danh sách điểm trung bình các bài tập', missingRate: '18%' },
  { key: 'teacher_history', desc: 'Lịch sử giảng dạy + avg_score', missingRate: '0%' },
  { key: 'sl_ex', desc: 'Số lượng bài tập', missingRate: '0%' },
  { key: 'sl_vid', desc: 'Số lượng video giảng dạy', missingRate: '0%' },
  { key: 'student', desc: 'Danh sách học viên kèm lịch sử học', missingRate: '2%' }
];

export default function FeatureTable() {
  return (
    <section className="feature-table-section">
      <h2>Chi tiết các trường dữ liệu</h2>
      <table className="feature-table">
        <thead>
          <tr>
            <th>Tên trường</th>
            <th>Mô tả</th>
            <th>Tỉ lệ thiếu (%)</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td><code>{f.key}</code></td>
              <td>{f.desc}</td>
              <td>{f.missingRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
