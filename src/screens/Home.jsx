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
import { NavLink, Outlet,Link } from 'react-router-dom';
import './css/Home.css';
import CourseQualityResult from '../components/CourseQualityResult';
import { FiArrowRight } from 'react-icons/fi';
import PipelineFlow from '../components/PipelineFlow';

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
      <>
        <p>Nghiên cứu, đánh giá và khai thác tập dữ liệu học tập từ nền tảng MOOC nhằm xây dựng mô hình dự đoán chất lượng khóa học. Từ đó hỗ trợ nhà quản lý giáo dục điều chỉnh nội dung, tài nguyên giảng dạy và phương pháp tổ chức khóa học một cách kịp thời, phù hợp với nhu cầu và trải nghiệm thực tế của người học.</p>
        
      </>
    )
  },
  {
    title: 'Bộ dữ liệu',
    icon: <FiDatabase />,
    color: '#61DDAA',
    content: (
      <>
        <p>Sử dụng dữ liệu từ MOOCubeX với nhiều đặc trưng về hành vi học tập, tương tác và kết quả của học viên.
Bộ dữ liệu bao gồm hơn 3600 khóa học đến từ nhiều trường đại học, mô tả chi tiết về nội dung khóa học, giảng viên, học viên, bài tập, video, phản hồi và lịch sử học tập – phản ánh toàn diện quá trình dạy và học trên nền tảng trực tuyến.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/dataset-overview" className="detail-link">
            <span className="detail-link-text">Xem chi tiết</span>
            <FiArrowRight />
          </Link>
        </div>
      </>
    )
  },
  {
    title: 'Tính mới của đề tài',
    icon: <FiGlobe />,
    color: '#F6BD16',
    content: (
      <>
        <p>Đề tài không chỉ dừng ở phân tích thống kê, mà còn đi sâu vào đánh giá chất lượng dữ liệu theo nhiều chiều (completeness, accuracy, consistency...) và xây dựng mô hình học máy để dự đoán chất lượng khóa học từ các đặc trưng định lượng và hành vi học viên – hướng tiếp cận chưa được khai thác phổ biến trong các nghiên cứu trước.</p>
        
      </>
    )
  },
  {
    title: 'Mô hình dự đoán',
    icon: <FiDatabase />,
    color: '#FF7F50',
    content: (
      <>
        <p>Sử dụng các mô hình phân loại từ cơ bản đến nâng cao để giải bài toán dự đoán chất lượng khóa học. Việc lựa chọn đa dạng mô hình giúp đánh giá độ phân biệt và tiềm năng khai thác của tập dữ liệu.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/results" className="detail-link">
            <span className="detail-link-text">Xem chi tiết</span>
            <FiArrowRight />
          </Link>
        </div>
      </>
    )
  }
];


  return (
    <>
      {/* Main Content Area */}
      <main className="container">
        <header className="home-header">
          <div className="home-header-title">
            <h2>Tổng quan đề tài</h2>
          </div>
          <div className="section-title-underline"></div>
        </header>

        <div className="card-grid">
          {cards.map((c, i) => (
            <section key={i} className="card">
              <div className="card-header" style={{ borderLeftColor: c.color }}>
                <span className="card-icon" style={{ backgroundColor: c.color + '22' }}>
                  {React.cloneElement(c.icon, { color: c.color, size: '1.8em' })}
                </span>
                <h2 style={{ color: c.color }}>{c.title}</h2>
              </div>
              <div className="card-content">{c.content}</div>
            </section>
          ))}
        </div>


        <div className="section-title-cqi">
          Thang đo chất lượng khóa học
          <span style={{fontWeight: 400, color:'#888', fontSize: '1.55rem'}}>
            (Course Quality Index - <b>CQI</b>)
          </span>
          <div className="section-title-underline"></div>
        </div>
        <div className="cqi-block">
          <div className="cqi-desc">
            CQI là chỉ số tổng hợp dự đoán chất lượng của mỗi khóa học dựa trên 5 tiêu chí chính, cho phép đánh giá khách quan từ nhiều góc độ.
          </div>
          <div className="cqi-formula">
            <b>CQI = w₁ × RSI + w₂ × TSI + w₃ × AEI + w₄ × CSI + w₅ × RDI</b>
            <div style={{ color:'#7c7c88', fontSize: '1rem', marginTop: '4px' }}>
              Trong đó: w₁, w₂, w₃, w₄, w₅ là trọng số các tiêu chí (thiết lập linh hoạt theo bài toán).
            </div>
          </div>
          <div className="cqi-feature-list">
            <div className="cqi-feature-row">
              
              <span className="cqi-feature-abbr">RSI</span>
              <span className="cqi-feature-title">Ranking Score Index</span>
              <span className="cqi-feature-desc">: Đo độ uy tín, xếp hạng của trường tổ chức khóa học.</span>
            </div>
            <div className="cqi-feature-row">
              
              <span className="cqi-feature-abbr">TSI</span>
              <span className="cqi-feature-title">Teacher Score Index</span>
              <span className="cqi-feature-desc">: Đo điểm uy tín/đánh giá của giảng viên phụ trách.</span>
            </div>
            <div className="cqi-feature-row">
              
              <span className="cqi-feature-abbr">AEI</span>
              <span className="cqi-feature-title">Assignment Engagement Index</span>
              <span className="cqi-feature-desc">: Điểm trung bình các bài tập, đo sự tương tác thực tế của học viên.</span>
            </div>
            <div className="cqi-feature-row">
              
              <span className="cqi-feature-abbr">CSI</span>
              <span className="cqi-feature-title">Comment Sentiment Index</span>
              <span className="cqi-feature-desc">: Phân tích tỷ lệ bình luận tích cực/tổng số bình luận của học viên.</span>
            </div>
            <div className="cqi-feature-row">
              
              <span className="cqi-feature-abbr">RDI</span>
              <span className="cqi-feature-title">Resource Diversity Index</span>
              <span className="cqi-feature-desc">: Độ đa dạng tài nguyên (bài tập, video, tài liệu...) trong khóa học.</span>
            </div>
          </div>
        </div>

        <PipelineFlow />

        <Outlet />
      </main>
    </>
  );
}
