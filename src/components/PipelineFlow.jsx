import React from 'react';
import './PipelineFlow.css'; // nhớ tạo file CSS bên dưới

const steps = [
  { title: 'Thu thập dữ liệu', description: 'Thu thập các dữ liệu có liên quan đến bài toán từ bộ dataset MOOCubeX' },
  { title: 'Phân tích thống kê', description: 'Tính toán các thống kê cơ bản, trực quan hóa phân bố dữ liệu.' },
  { title: 'Đánh giá chất lượng', description: 'Đo completeness, accuracy, consistency để kiểm định dữ liệu.' },
  { title: 'Tiền xử lý dữ liệu', description: 'Lọc, chuẩn hóa và xử lý giá trị null từ tập dữ liệu gốc.' },
  { title: 'Xây dựng mô hình', description: 'Huấn luyện các mô hình phân lớp dự đoán nhãn cho các khóa học' },
  { title: 'Đánh giá kết quả', description: 'So sánh độ chính xác và rút ra kết luận về chất lượng mô hình.' },
];

export default function PipelineFlow() {
  return (
    <div className="pipeline-container">
      <h2 className="pipeline-title">Pipeline thực hiện đề tài</h2>
      <div className="pipeline-steps">
        {steps.map((step, index) => (
          <div className="pipeline-step" key={index}>
            <div className="circle">Bước {index + 1}</div>
            {index < steps.length - 1 && <div className="line" />}
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
