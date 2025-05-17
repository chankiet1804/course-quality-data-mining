import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fakeCourses } from '../data/fakeCourses';
import { commentByLabel } from '../data/commentByLabel';
import CommentPieChart from '../components/CommentPieChart';
import ScoreDistributionPlot from '../components/ScoreDistributionPlot';
import './css/CourseDetail.css';

// Hàm giả lập dữ liệu cho demo (sau này thay bằng API call)
function getFakeCourseDetail(courseId) {
  const course = fakeCourses.find(c => c.course_id === courseId) || fakeCourses[0];
  const star = Math.floor(Math.random() * 5) + 1;
  return {
    ...course,
    name: course.name || `Khóa học ${courseId}`,
    star,
    about: course.about || 'Khóa học cung cấp kiến thức nền tảng về khoa học dữ liệu, giúp sinh viên hiểu và ứng dụng các phương pháp phân tích dữ liệu hiện đại.',
    field: course.field || 'Khoa học máy tính',
    comments: [
      { user: 'Nguyễn Văn A', text: 'Khóa học rất hay!', sentiment: 'Tích cực' },
      { user: 'Trần Thị B', text: 'Bình thường.', sentiment: 'Trung lập' },
      { user: 'Lê Văn C', text: 'Khó hiểu quá.', sentiment: 'Tiêu cực' }
    ],
    students: [
      { name: 'Nguyễn Văn A', history: [7.5, 8.0, 9.0] },
      { name: 'Trần Thị B', history: [6.0, 7.0, 7.5] }
    ],
    teachers: [
      { name: 'Thầy A', avg_score: 8.5 },
      { name: 'Cô B', avg_score: 9.0 }
    ]
  };
}

export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const courseId = params.get('id');

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      // Sau này thay bằng API call lấy dữ liệu từ backend
      const data = getFakeCourseDetail(courseId);
      setCourse(data);
    }
  }, [courseId]);

  // Nếu có id, hiển thị chi tiết
  if (courseId) {
    if (!course) return <div>Loading...</div>;
    const commentPieData = commentByLabel[course.star] || commentByLabel[1];
    return (
      <main className="course-detail-main">
        <div className="course-detail-container">
          <button
            onClick={() => navigate(-1)}
            className="course-detail-back-btn"
          >
            <span className="course-detail-back-icon">←</span> Quay lại danh sách
          </button>

          <div className="course-detail-card">
            <div className="course-detail-header">
              <h2 className="course-detail-title">{course.name}</h2>
              <span className="course-detail-stars">
                {Array.from({ length: course.star }, (_, i) => <span key={i}>⭐</span>)}
              </span>
            </div>

            <div className="course-detail-row">
              <span className="course-detail-row-icon">#️⃣</span>
              <span className="course-detail-row-label">Mã khóa học:</span>
              <span className="course-detail-row-value">{course.course_id}</span>
            </div>
            <div className="course-detail-row course-detail-about">
              <span className="course-detail-row-icon">ℹ️</span>
              <span className="course-detail-row-label">About:</span>
              <span className="course-detail-about-text">{course.about ? course.about : <span style={{color:'#aaa'}}>Chưa cập nhật</span>}</span>
            </div>
            <div className="course-detail-row">
              <span className="course-detail-row-icon">🏷️</span>
              <span className="course-detail-row-label">Field:</span>
              <span>{course.field ? course.field : <span style={{color:'#aaa'}}>Chưa cập nhật</span>}</span>
            </div>
          </div>

          {/* Tỉ lệ comment (biểu đồ tròn) */}
          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Tỉ lệ cảm xúc bình luận (Label {course.star} sao)</h3>
            <CommentPieChart data={commentPieData} title={`Tỉ lệ cảm xúc bình luận (${course.star} sao)`} />
          </section>

          {/* Danh sách comment */}
          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Danh sách bình luận</h3>
            <div className="course-detail-comment-list">
              {course.comments.map((c, idx) => {
                let colorClass = 'comment-positive';
                if (c.sentiment === 'Trung lập') colorClass = 'comment-neutral';
                if (c.sentiment === 'Tiêu cực') colorClass = 'comment-negative';
                return (
                  <div key={idx} className={`course-detail-comment-card ${colorClass}`}>
                    <div className="comment-user">{c.user}</div>
                    <div className="comment-text">{c.text}</div>
                    <div className={`comment-sentiment ${colorClass}`}>{c.sentiment}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Danh sách học sinh */}
          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Danh sách học sinh & lịch sử học tập</h3>
            {course.students && course.students.length > 0 ? (
              <div className="course-detail-table-wrap">
                <table className="course-detail-table">
                  <thead>
                    <tr>
                      <th>Tên học sinh</th>
                      <th>Lịch sử điểm các khóa trước</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.students.map((s, idx) => (
                      <tr key={idx} className="course-detail-table-row">
                        <td>{s.name}</td>
                        <td className="course-detail-score">{s.history.join(' ; ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Không có dữ liệu học sinh.</p>
            )}
          </section>

          {/* Danh sách giảng viên */}
          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Danh sách giảng viên & điểm trung bình</h3>
            <div className="course-detail-table-wrap">
              <table className="course-detail-table">
                <thead>
                  <tr>
                    <th>Tên giảng viên</th>
                    <th>Điểm trung bình</th>
                  </tr>
                </thead>
                <tbody>
                  {course.teachers.map((t, idx) => (
                    <tr key={idx} className="course-detail-table-row">
                      <td>{t.name}</td>
                      <td className="course-detail-score">{t.avg_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Biểu đồ phân bố điểm các problem */}
          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Phân bố điểm các bài tập</h3>
            <ScoreDistributionPlot courses={[course]} />
          </section>
        </div>
      </main>
    );
  }

  // Nếu không có id, hiển thị danh sách
  return (
    <main className="content">
      <h2>Danh sách khóa học</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {fakeCourses.slice(0, 8).map(course => (
          <div
            key={course.course_id}
            style={{
              border: '1px solid #eee',
              borderRadius: 8,
              padding: 16,
              width: 300,
              boxShadow: '0 2px 8px #eee',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/detail?id=${course.course_id}`)}
          >
            <h3>{course.name || course.course_id}</h3>
            <p><b>Mã:</b> {course.course_id}</p>
            <p><b>Số bài tập:</b> {course.problem_scores.length}</p>
            {/* Thêm các trường khác nếu có */}
          </div>
        ))}
      </div>
    </main>
  );
}