import React from 'react';
import './css/DatasetOverview.css';
import frameworkImg from '../assets/framework.png';

export default function DatasetOverview() {
  return (
    <div className="overview-container">
    <div className="dataset-overview">
      <header className="overview-header">
        <h2>Bộ Dữ Liệu MOOCCubeX</h2>
        <div className="section-title-underline"></div>
        <p>
          <strong>MOOCCubeX</strong> là một kho dữ liệu quy mô lớn được phát triển bởi Nhóm Kỹ thuật Tri thức Đại học Thanh Hoa (THU-KEG), hỗ trợ nghiên cứu về học tập thích ứng, phân tích học tập và khám phá tri thức trong các khóa học trực tuyến mở rộng rãi (MOOCs).
        </p>
      </header>

      <div className="card-box">
        <section className="overview-section">
          <h3>📊 Thống Kê Tổng Quan</h3>
          <ul>
            <li><strong>4,216</strong> khóa học</li>
            <li><strong>230,263</strong> video</li>
            <li><strong>358,265</strong> bài tập</li>
            <li><strong>637,572</strong> khái niệm chi tiết</li>
            <li><strong>3,330,294</strong> sinh viên</li>
            <li><strong>296 triệu+</strong> hành vi học tập</li>
          </ul>
        </section>
      </div>

      <div className="card-box">
        <section className="overview-section">
          <h3>🧠 Đặc Điểm Nổi Bật</h3>
          <ul>
            <li><strong>Độ phủ cao:</strong> Bao gồm tài nguyên MOOC đa dạng và dữ liệu hành vi học tập, luyện tập, thảo luận của sinh viên.</li>
            <li><strong>Quy mô lớn:</strong> Lớn hơn so với các kho dữ liệu giáo dục mở khác, hỗ trợ mô hình học sâu với yêu cầu dữ liệu cao.</li>
            <li><strong>Trung tâm khái niệm:</strong> Dữ liệu dị thể được tổ chức theo khái niệm chi tiết, giúp tài nguyên liên quan hơn và dễ dàng biểu diễn, tìm kiếm, mô hình hóa.</li>
          </ul>
        </section>
      </div>

      <div className="card-box">
        <section className="overview-section">
          <h3>🧩 Thành Phần Dữ Liệu</h3>
          <ul>
            <li><strong>course.json:</strong> Thông tin khóa học</li>
            <li><strong>video.json:</strong> Thông tin video</li>
            <li><strong>exercise.json:</strong> Thông tin bài tập</li>
            <li><strong>concept.json:</strong> Khái niệm chi tiết</li>
            <li><strong>user.json:</strong> Thông tin người dùng</li>
            <li><strong>user-video.json:</strong> Hành vi xem video của người dùng</li>
            <li><strong>user-exercise.json:</strong> Hành vi làm bài tập của người dùng</li>
            <li><strong>user-comment.json:</strong> Bình luận của người dùng</li>
          </ul>
        </section>
      </div>

      <div className="card-box">
        <section className="overview-section">
            <h3>🛠️ Framework của Dataset</h3>
            <div>
                Dữ liệu <b>MOOCubeX</b> được xây dựng dựa trên <b>2 phần chính</b>:
                <ul style={{ margin: "10px 0 0 22px", fontSize: "1.09rem" }}>
                    <li>
                    <b style={{ color: "#223b67" }}>
                        Thông tin khóa học (<span style={{ fontWeight: 500 }}>Course Resource</span>)
                    </b>
                    </li>
                    <li>
                    <b style={{ color: "#223b67" }}>
                        Hành vi người học (<span style={{ fontWeight: 500 }}>Student Behaviour</span>)
                    </b>
                    </li>
                </ul>
            </div>
            <div style={{ textAlign: "center" }}>
            <img
                src={frameworkImg}
                alt="Dataset Framework"
                style={{
                width: "92%",
                maxWidth: 560,
                margin: "20px auto",
                display: "block",
                borderRadius: 12,
                boxShadow: "0 2px 16px #a7b3f222"
                }}
            />
            <div style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
                Sơ đồ kiến trúc framework của bộ dữ liệu MOOCCubeX
            </div>
            </div>
        </section>
        </div>

      <div className="card-box">
        <section className="overview-section">
          <h3>🔗 Tài Nguyên Liên Quan</h3>
          <ul>
            <li><a href="https://github.com/THU-KEG/MOOCCubeX" target="_blank" rel="noopener noreferrer">GitHub chính thức</a></li>
            <li><a href="https://dl.acm.org/doi/10.1145/3459637.3482010" target="_blank" rel="noopener noreferrer">Bài báo CIKM 2021</a></li>
          </ul>
        </section>
      </div>
    </div>
    </div>
  );
}
