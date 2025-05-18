import React from 'react';
import './DashboardSection.css';

const features = [
  { key: 'course_id', desc: 'Mã định danh của khóa học (string)', numRate: '0' },
  { key: 'name', desc: 'Tên của khóa học', numRate: '0' },
  { key: 'about', desc: 'Mô tả tổng quát về nội dung khóa học', numRate: '243' },
  { key: 'field', desc: 'Lĩnh vực của khóa học', numRate: '243' },
  { key: 'comments', desc: 'Danh sách bình luận từ học viên', numRate: '1078' },
  { key: 'school_name', desc: 'Tên trường cung cấp khóa học', numRate: '84' },
  { key: 'problem_scores', desc: 'Danh sách điểm trung bình các bài tập', numRate: '2008' },
  { key: 'teachers', desc: 'Danh sách giảng viên và điểm uy tín', numRate: '102' },
  { key: 'students', desc: 'Danh sách học viên và điểm các khóa học trong lịch sử', numRate: '32' },
  { key: 'sl_ex', desc: 'Số lượng bài tập', numRate: '0' },
  { key: 'sl_vid', desc: 'Số lượng video giảng dạy', numRate: '0' }
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
            <th>Số lượng thiếu</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td><code>{f.key}</code></td>
              <td>{f.desc}</td>
              <td>{f.numRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
