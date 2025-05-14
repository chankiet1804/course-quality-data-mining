import React from 'react';
import {
  FiArchive,
  FiBook,
  FiUsers,
  FiGlobe,
  FiDatabase,
  FiBarChart2,
  FiList
} from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const members = [
    'Thành viên 1', 'Thành viên 2', 'Thành viên 3',
    'Thành viên 4', 'Thành viên 5', 'Thành viên 6',
    'Thành viên 7'
  ];

  const fields = [
    { key: 'course_id',       desc: 'Mã định danh của khóa học (string)' },
    { key: 'name',            desc: 'Tên của khóa học' },
    { key: 'about',           desc: 'Mô tả tổng quát về nội dung khóa học' },
    { key: 'comments',        desc: 'Danh sách các bình luận từ học viên' },
    { key: 'school_name',     desc: 'Tên trường cung cấp khóa học' },
    { key: 'problem_scores',  desc: 'Danh sách điểm trung bình các bài tập' },
    { key: 'teacher_history', desc: 'Lịch sử giảng dạy của giảng viên kèm avg_score' },
    { key: 'sl_ex',           desc: 'Số lượng bài tập (exercises)' },
    { key: 'sl_vid',          desc: 'Số lượng video giảng dạy' },
    { key: 'student',         desc: 'Danh sách học viên kèm history của mỗi người' }
  ];

  const cards = [
    {
      title: 'Giới thiệu đề tài',
      icon: <FiBook />,
      color: '#5B8FF9',
      content: (
        <p>
          Trong thời đại số hóa hiện nay, học trực tuyến đã trở thành xu hướng tất yếu...
        </p>
      )
    },
    {
      title: 'Nhóm thực hiện',
      icon: <FiUsers />,
      color: '#61DDAA',
      content: (
        <ul>
          {members.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Bối cảnh bài toán',
      icon: <FiGlobe />,
      color: '#F6BD16',
      content: (
        <p>
          Sự phát triển nhanh chóng của các nền tảng học trực tuyến như MOOCs...
        </p>
      )
    },
    {
      title: 'Đầu vào của bài toán',
      icon: <FiDatabase />,
      color: '#FF7F50',
      content: (
        <table className="input-table">
          <thead>
            <tr>
              <th>Trường</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.key}>
                <td><code>{f.key}</code></td>
                <td>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  ];

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2 className="sidebar-title"><FiArchive /> Menu</h2>
        <ul className="sidebar-list">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              <FiArchive /> Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/dataset" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FiBook /> Phân tích Dataset
            </NavLink>
          </li>
          <li>
            <NavLink to="/results" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FiBarChart2 /> Kết quả Thực nghiệm
            </NavLink>
          </li>
          <li>
            <NavLink to="/detail" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FiList /> Chi tiết Khóa học
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="content">
        <header className="home-header">
          <div className="home-header-title">
            <FiArchive className="header-icon" />
            <h1>Hệ thống Dự đoán Chất lượng Khóa học</h1>
          </div>
          <p className="home-header-subtitle">
            Phân tích và đánh giá chất lượng khóa học thông qua dữ liệu học viên
          </p>
        </header>

        {/* Cards Grid for Homepage */}
        <div className="card-grid">
          {cards.map((c, i) => (
            <section key={i} className="card">
              <div className="card-header" style={{ borderLeftColor: c.color }}>
                <span className="card-icon" style={{ backgroundColor: c.color + '22' }}>
                  {React.cloneElement(c.icon, { color: c.color, size: '1.5em' })}
                </span>
                <h2 style={{ color: c.color }}>{c.title}</h2>
              </div>
              <div className="card-content">
                {c.content}
              </div>
            </section>
          ))}
        </div>

        {/* Render nested route components here */}
        <Outlet />
      </main>
    </div>
  );
}
