import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFakeCourseDetail } from '../data/getFakeCourseDetail';
import { fakeCourses } from '../data/filteredCourse';
import { commentByLabel } from '../data/commentByLabel';
import CommentPieChart from '../components/CommentPieChart';
import ScoreDistributionPlot from '../components/ScoreDistributionPlot';
import CourseStudentLineChart from '../components/CourseStudentLineChart';
import './css/CourseDetail.css';

export default function CourseDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const courseId = params.get('id');

  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseId) {
      const data = getFakeCourseDetail(courseId);

      // Supplement student history with random values if missing or empty
      data.students = (data.students || []).map(student => {
        let history = student.history;
        if (!Array.isArray(history) || history.length === 0) {
          const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 scores
          history = Array.from({ length: count }, () => (Math.random() * 1.9 + 0.1).toFixed(2));
        }
        return {
          ...student,
          history,
        };
      });

      setCourse(data);
    }
  }, [courseId]);

  if (courseId) {
    if (!course) return <div>Loading...</div>;
    const boundedStar = Math.min(Math.max(course.star, 1), 5);
    const commentPieData = commentByLabel[boundedStar] || commentByLabel[1];

    return (
      <main className="course-detail-main">
        <div className="course-detail-container">
          <button onClick={() => navigate(-1)} className="course-detail-back-btn">
            <span className="course-detail-back-icon">←</span> Quay lại danh sách
          </button>

          <div className="course-detail-card">
            <div className="course-detail-header">
              <h2 className="course-detail-title">{course.name}</h2>
            </div>

            <div className="course-detail-row">
              <span className="course-detail-row-icon">#️⃣</span>
              <span className="course-detail-row-label">Mã khóa học:</span>
              <span className="course-detail-row-value">{course.course_id}</span>
            </div>
            <div className="course-detail-row">
              <span className="course-detail-row-icon">ℹ️</span>
              <span className="course-detail-row-label">About:</span>
              <span className="course-detail-about-text">{course.about ? course.about : <span style={{color:'#aaa'}}>Chưa cập nhật</span>}</span>
            </div>
            <div className="course-detail-row">
              <span className="course-detail-row-icon">🏷️</span>
              <span className="course-detail-row-label">Field:</span>
              <span>{course.name}</span>
            </div>
            <div className="course-detail-row">
              <span className="course-detail-row-icon">📺</span>
              <span className="course-detail-row-label">Số video:</span>
              <span>{course.sl_vid || course.videos || 0}</span>
            </div>
            <div className="course-detail-row">
              <span className="course-detail-row-icon">⭐</span>
              <span className="course-detail-row-label">Số sao:</span>
              <span>{typeof course.star === 'number' ? boundedStar : 'N/A'}</span>
            </div>
          </div>

          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Tỉ lệ cảm xúc bình luận (Label {boundedStar} sao)</h3>
            <CommentPieChart data={commentPieData} title={`Tỉ lệ cảm xúc bình luận (${boundedStar} sao)`} />
          </section>

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
                        <td className="course-detail-score">
                          {s.history && s.history.length > 0 ? s.history.join(' ; ') : <span style={{ color: '#aaa' }}>Không có dữ liệu</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Không có dữ liệu học sinh.</p>
            )}
          </section>

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

          <section className="course-detail-section">
            <h3 className="course-detail-section-title">Phân bố điểm các bài tập</h3>
            <ScoreDistributionPlot courses={[course]} />
          </section>

          <section className="course-detail-section">
            <CourseStudentLineChart data={course.studentTimeSeries} title="Phân bố số lượng học viên theo thời gian" />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="content">
      <h2 className="course-list-section-title">
        <span className="course-list-section-title-icon">📚</span>
        Danh sách khóa học
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {fakeCourses.map(course => {
          const school = course.school || course.school_name || 'Trường Đại học Demo';
          const scores = (course.problem_scores || []).filter(s => typeof s === 'number');
          const rawStar = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) * 5 : null;
          const star = rawStar ? Math.min(Math.max(Math.round(rawStar), 1), 5) : 'N/A';
          return (
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
              <h3>{course.name}</h3>
              <p><b>School:</b> {school}</p>
              <p><b>Số bài tập:</b> {course.problem_scores?.length || 0}</p>
              <p><b>Số video:</b> {course.sl_vid || course.videos || 0}</p>
              <p><b>Số sao:</b> {star} <span style={{color:'#FFD700', fontSize:'1.1em', marginLeft:4}}>⭐</span></p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
