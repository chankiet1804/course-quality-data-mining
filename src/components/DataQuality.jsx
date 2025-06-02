import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, CheckSquare, Hexagon, Link, Clock, Accessibility, Lightbulb } from 'lucide-react'; // Import all necessary icons
import './DataQuality.css';

function DataQuality() {
  const [hardDimensionsExpanded, setHardDimensionsExpanded] = useState(false);
  const [softDimensionsExpanded, setSoftDimensionsExpanded] = useState(false);

  return (
    <div className="dataquality-container">
      {/* Header */}
      <h1 className="dataquality-header">
        Chất lượng dữ liệu MOOCCubeX
      </h1>
      
      {/* Description */}
      <div className="dataquality-description">
        <p>
          Chất lượng dữ liệu là yếu tố quan trọng quyết định độ tin cậy của các mô hình và phân tích trong nghiên cứu này. 
          Chúng tôi đánh giá chất lượng dữ liệu MOOCCubeX theo nhiều tiêu chí khác nhau để đảm bảo kết quả nghiên cứu 
          chính xác và đáng tin cậy.
        </p>
      </div>

      {/* Data Quality Section */}
      <div className="dataquality-quality-section">
        {/* Section Header */}
        <div className="dataquality-section-header">
          <Database className="dataquality-section-icon" />
          <h2 className="dataquality-section-title">Chất lượng dữ liệu</h2>
        </div>

        {/* Hard Dimensions */}
        <div className="dataquality-border-bottom">
          <button
            onClick={() => setHardDimensionsExpanded(!hardDimensionsExpanded)}
            className="dataquality-dimension-button"
          >
            <span className="dataquality-dimension-title">Hard Dimensions</span>
            {hardDimensionsExpanded ? (
              <ChevronDown className="dataquality-chevron" />
            ) : (
              <ChevronRight className="dataquality-chevron" />
            )}
          </button>
          
          {hardDimensionsExpanded && (
            <div className="dataquality-dimension-content">
              {/* 1. Completeness */}
              <div className="dataquality-detailed-section">
                <h3>1. Độ đầy đủ (Completeness)</h3>
                
                <div className="dataquality-subsection">
                  <h4>a. Định nghĩa:</h4>
                  <p>
                    Độ đầy đủ (Completeness) là mức độ dữ liệu được cung cấp đầy đủ, không thiếu giá trị quan trọng (như NaN hoặc giá trị trống). 
                    Dữ liệu đầy đủ giúp tăng độ chính xác và hiệu quả cho các mô hình phân tích và dự đoán. 
                    Thiếu dữ liệu có thể gây sai lệch kết quả, vì vậy cần đo lường và cải thiện độ đầy đủ trong quá trình xử lý dữ liệu.
                  </p>
                </div>

                <div className="dataquality-subsection">
                  <h4>b. Công thức:</h4>
                  <div className="dataquality-formula-section">
                    <strong>- Completeness theo Object</strong>
                    <p>Là tỷ lệ các giá trị không bị thiếu (NaN hoặc None) so với tổng số thuộc tính. Giá trị hoàn chỉnh 100% khi không có dữ liệu bị thiếu.</p>
                    <div className="dataquality-formula">
                      <em>Completeness(O) = (Số lượng thuộc tính không bị thiếu / Tổng số thuộc tính) × 100%</em>
                    </div>
                    
                    <strong>- Completeness toàn bộ dataset</strong>
                    <p>Completeness trung bình trên tất cả các objects với m là số lượng object.</p>
                    <div className="dataquality-formula">
                      <em>Completeness = Σ (i=1 đến m) Completeness (O_i) / m</em>
                    </div>
                  </div>
                </div>

                <div className="dataquality-subsection">
                  <h4>c. Kết quả:</h4>
                  <ul>
                    <li>Completeness theo Object</li>
                    <li>Completeness theo toàn bộ dataset</li>
                  </ul>
                </div>
              </div>

              {/* 2. Consistency */}
              <div className="dataquality-detailed-section">
                <h3>2. Tính nhất quán (Consistency)</h3>
                
                <div className="dataquality-subsection">
                  <h4>a. Định nghĩa:</h4>
                  <p>
                    Tính nhất quán: Dữ liệu phải đồng nhất giữa các nguồn và hệ thống khác nhau, không có xung đột hoặc trùng lặp. 
                    Ý tưởng đo lường: Được tính bằng tỷ lệ giữa số lượng điều kiện hợp lệ và tổng số điều kiện cần kiểm tra.
                  </p>
                </div>

                <div className="dataquality-subsection">
                  <h4>b. Công thức:</h4>
                  <div className="dataquality-formula-section">
                    <strong>- Consistency theo Object</strong>
                    <p>Là tỷ lệ giữa số lượng điều kiện hợp lệ trong object và tổng số điều kiện cần kiểm tra. Các loại kiểm tra tính hợp lệ cơ bản:</p>
                    <ul>
                      <li><strong>Miền giá trị (Domain Range):</strong> Giá trị nằm trong một khoảng nhất định</li>
                      <li><strong>Dữ liệu không rỗng (Non-null):</strong> Không được để trống</li>
                      <li><strong>Loại dữ liệu (Data Type):</strong> Phải thuộc kiểu dữ liệu nhất định</li>
                      <li><strong>Ràng buộc logic (Logical Constraints):</strong> Giá trị phải thỏa mãn một điều kiện logic</li>
                      <li><strong>Tính duy nhất (Uniqueness):</strong> Giá trị không trùng lặp trong tập dữ liệu</li>
                      <li><strong>Tính khóa ngoại (Foreign Key Integrity):</strong> Giá trị phải tồn tại trong một danh sách hợp lệ.</li>
                    </ul>
                    <p>Tính Consistency (tính nhất quán) đánh giá mức độ dữ liệu không mâu thuẫn và tuân theo các quy tắc logic.</p>
                    <div className="dataquality-formula">
                      <em>Consistency(O) = (Số lượng điều kiện hợp lệ / Tổng số điều kiện cần kiểm tra) × 100%</em>
                    </div>
                    
                    <strong>- Consistency toàn bộ dataset</strong>
                    <p>Consistency trung bình trên tất cả các objects với m là số lượng object.</p>
                    <div className="dataquality-formula">
                      <em>Consistency = Σ (i=1 đến m) Consistency (O_i) / m</em>
                    </div>
                  </div>
                </div>

                <div className="dataquality-subsection">
                  <h4>c. Kết quả:</h4>
                  <ul>
                    <li>Consistency theo Object</li>
                    <li>Consistency theo toàn bộ dataset</li>
                  </ul>
                </div>
              </div>

              {/* 3. Timeliness */}
              <div className="dataquality-detailed-section">
                <h3>3. Timeliness</h3>
                
                <div className="dataquality-subsection">
                  <h4>a. Định nghĩa:</h4>
                  <p>
                    Tính kịp thời: Dữ liệu phải được cập nhật và phản ánh tình hình hiện tại, không bị lỗi thời. 
                    Ý tưởng đo lường: Đo lường mức độ dữ liệu có sẵn đúng thời điểm cần thiết để sử dụng.
                  </p>
                </div>

                <div className="dataquality-subsection">
                  <h4>b. Công thức:</h4>
                  <div className="dataquality-formula-section">
                    <strong>- Timeliness theo Object</strong>
                    <p>Là tỷ lệ dữ liệu cập nhật đúng hạn.</p>
                    <div className="dataquality-formula">
                      <em>Timeliness(O) = (Số lần cập nhật đúng hạn / Tổng số lần cập nhật) × 100%</em>
                    </div>
                    
                    <strong>- Timeliness toàn bộ dataset</strong>
                    <p>Timeliness trung bình trên tất cả các objects với m là số lượng object.</p>
                    <div className="dataquality-formula">
                      <em>Timeliness = Σ (i=1 đến m) Timeliness (O_i) / m</em>
                    </div>
                  </div>
                </div>

                <div className="dataquality-subsection">
                  <h4>c. Kết quả:</h4>
                  <p>Đang được tính toán...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Soft Dimensions */}
        <div>
          <button
            onClick={() => setSoftDimensionsExpanded(!softDimensionsExpanded)}
            className="dataquality-dimension-button"
          >
            <span className="dataquality-dimension-title">Soft Dimensions</span>
            {softDimensionsExpanded ? (
              <ChevronDown className="dataquality-chevron" />
            ) : (
              <ChevronRight className="dataquality-chevron" />
            )}
          </button>
          
          {softDimensionsExpanded && (
            <div className="dataquality-dimension-content">
              {/* Research Note */}
              <div className="dataquality-research-note">
                <p>
                  <strong>Nghiên cứu về phương pháp đo lường Accuracy gián tiếp khi không có ground truth:</strong> Trong lĩnh vực DQ, ta có:
                </p>
              </div>

              <div className="dataquality-dimension-grid">
                <div className="dataquality-dimension-card">
                  <CheckSquare className="dataquality-card-icon dataquality-icon-green" />
                  <h4>Accuracy (Độ chính xác)</h4>
                  <p>Dữ liệu phải phản ánh đúng thực tế, không có lỗi, sai sót hoặc thông tin sai lệch.</p>
                </div>
                <div className="dataquality-dimension-card">
                  <Hexagon className="dataquality-card-icon dataquality-icon-blue" />
                  <h4>Reliability (Độ Tin Cậy)</h4>
                  <p>Đo lường mức độ đáng tin và ổn định của dữ liệu, đảm bảo rằng dữ liệu phản ánh đúng thực tế.</p>
                </div>
                <div className="dataquality-dimension-card">
                  <Link className="dataquality-card-icon dataquality-icon-purple" />
                  <h4>Relevance (Độ Liên Quan)</h4>
                  <p>Đánh giá mức độ dữ liệu phù hợp với mục tiêu phân tích hoặc dự đoán.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quality Metrics Summary */}
      <div className="dataquality-summary">
        <h3>Tổng quan chất lượng dữ liệu</h3>
        <div className="dataquality-metrics-grid">
          <div className="dataquality-metric">
            <div className="dataquality-metric-value blue">98.22%</div>
            <div className="dataquality-metric-label">Completeness</div>
          </div>
          <div className="dataquality-metric">
            <div className="dataquality-metric-value green">92.3%</div>
            <div className="dataquality-metric-label">Consistency</div>
          </div>
          <div className="dataquality-metric">
            <div className="dataquality-metric-value orange">40.53%</div>
            <div className="dataquality-metric-label">Timeliness</div>
          </div>
          <div className="dataquality-metric">
            <div className="dataquality-metric-value red">63.82%</div>
            <div className="dataquality-metric-label">Accuracy</div>
          </div>
          <div className="dataquality-metric">
            <div className="dataquality-metric-value purple">65%</div>
            <div className="dataquality-metric-label">Reliability</div>
          </div>
          <div className="dataquality-metric">
            <div className="dataquality-metric-value light-purple">67%</div>
            <div className="dataquality-metric-label">Relevance</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataQuality;