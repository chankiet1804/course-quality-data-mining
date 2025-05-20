// src/screens/ExperimentResults.jsx
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import './css/ExperimentResults.css'; // Đảm bảo bạn có file CSS này

// --- DỮ LIỆU GIẢ MẠO (FAKE DATA) ---
const modelsData = [
  {
    id: "rf",
    name: "Random Forest Classifier",
    iconUrl: "https://via.placeholder.com/50/007BFF/FFFFFF?Text=RF", // Placeholder icon
    introduction: "Random Forest là một thuật toán học máy có giám sát thuộc nhóm ensemble learning. Nó xây dựng nhiều cây quyết định trong quá trình huấn luyện và output lớp là mode của các lớp (phân loại) hoặc dự đoán trung bình (hồi quy) của các cây riêng lẻ.",
    reasoning: "Được chọn vì khả năng xử lý tốt cả dữ liệu số và dữ liệu hạng mục, ít bị overfitting hơn so với một cây quyết định đơn lẻ, và có thể cung cấp ước tính về tầm quan trọng của feature.",
    prosCons: "Ưu điểm: Hiệu suất cao trên nhiều loại dữ liệu, không nhạy cảm với việc scaling dữ liệu, xử lý tốt giá trị thiếu. Nhược điểm: Có thể chậm với số lượng cây lớn, mô hình khó diễn giải hơn.",
    features: [
      { name: "AverageRating", description: "Điểm đánh giá trung bình của khóa học (1-5 sao)", type: "Numeric (float)", reason: "Phản ánh chất lượng tổng thể cảm nhận bởi người dùng." },
      { name: "CommentLength", description: "Độ dài của bình luận (số ký tự)", type: "Numeric (integer)", reason: "Bình luận dài hơn có thể chứa nhiều thông tin cảm xúc hơn hoặc chi tiết hơn." },
      { name: "SentimentScoreLexicon", description: "Điểm cảm xúc từ lexicon (ví dụ: VADER, -1 đến 1)", type: "Numeric (float)", reason: "Feature được tính toán trước dựa trên từ điển cảm xúc, cung cấp tín hiệu trực tiếp." },
      { name: "CourseCategory", description: "Danh mục của khóa học (ví dụ: 'IT', 'Business')", type: "Categorical", reason: "Cảm xúc và nội dung bình luận có thể khác nhau giữa các loại khóa học." },
      { name: "IsVerifiedPurchase", description: "Người bình luận đã mua khóa học hay chưa", type: "Boolean", reason: "Bình luận từ người mua đã xác minh có thể đáng tin cậy hơn."}
    ],
    results: {
      accuracy: 0.853,
      macroF1: 0.821,
      weightedF1: 0.845,
      recall: { positive: 0.88, negative: 0.80, neutral: 0.75 },
      precision: { positive: 0.86, negative: 0.78, neutral: 0.72 },
    },
    remarks: "Random Forest Classifier cho thấy hiệu suất tốt trên tập dữ liệu này, đặc biệt trong việc xác định các bình luận tích cực. Mô hình này phù hợp khi cần độ chính xác cao và có thể chấp nhận được việc mô hình phức tạp hơn một chút. Để cải thiện thêm, có thể thử nghiệm với việc tinh chỉnh siêu tham số (hyperparameter tuning) hoặc sử dụng các kỹ thuật feature engineering phức tạp hơn.",
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Feature+Importance+RF",
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+RF"
  },
  {
    id: "lr",
    name: "Logistic Regression",
    iconUrl: "https://via.placeholder.com/50/28A745/FFFFFF?Text=LR", // Placeholder icon
    introduction: "Logistic Regression là một mô hình thống kê tuyến tính được sử dụng cho bài toán phân loại nhị phân (và có thể mở rộng cho đa lớp). Nó dự đoán xác suất một đối tượng thuộc về một lớp nhất định.",
    reasoning: "Được chọn vì tính đơn giản, dễ diễn giải, huấn luyện nhanh và hiệu quả trên các tập dữ liệu có mối quan hệ tuyến tính.",
    prosCons: "Ưu điểm: Dễ triển khai và diễn giải, hiệu quả tính toán cao. Nhược điểm: Giả định mối quan hệ tuyến tính giữa các feature và log-odds, có thể không hoạt động tốt với các mối quan hệ phức tạp.",
    features: [
      { name: "CommentLength", description: "Độ dài của bình luận (số ký tự)", type: "Numeric (integer)", reason: "Đã được chuẩn hóa (standardized) để phù hợp với mô hình tuyến tính." },
      { name: "SentimentScoreLexicon", description: "Điểm cảm xúc từ lexicon", type: "Numeric (float)", reason: "Feature quan trọng cho việc dự đoán cảm xúc." },
      { name: "AverageWordLength", description: "Độ dài trung bình của từ trong bình luận", type: "Numeric (float)", reason: "Có thể liên quan đến sự phức tạp hoặc phong cách viết." },
      { name: "PunctuationCount", description: "Số lượng dấu câu trong bình luận", type: "Numeric (integer)", reason: "Dấu câu như '!' có thể chỉ ra cảm xúc mạnh."}
    ],
    results: {
      accuracy: 0.782,
      macroF1: 0.755,
      weightedF1: 0.778,
      recall: { positive: 0.80, negative: 0.72, neutral: 0.69 },
      precision: { positive: 0.79, negative: 0.70, neutral: 0.67 },
    },
    remarks: "Logistic Regression cung cấp một baseline tốt và dễ hiểu. Mặc dù độ chính xác thấp hơn Random Forest, nó vẫn hữu ích cho việc nhanh chóng đánh giá hoặc khi cần một mô hình có thể diễn giải được. Kết quả có thể được cải thiện bằng cách thêm các feature tương tác hoặc đa thức.",
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Coefficients+LR", // Coefficients for LR
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+LR"
  },
  {
    id: "bert",
    name: "BERT-base (fine-tuned)",
    iconUrl: "https://via.placeholder.com/50/FFC107/000000?Text=BERT", // Placeholder icon
    introduction: "BERT (Bidirectional Encoder Representations from Transformers) là một mô hình ngôn ngữ dựa trên kiến trúc Transformer, được huấn luyện trước trên một lượng lớn dữ liệu văn bản. Nó có khả năng hiểu ngữ cảnh sâu sắc.",
    reasoning: "Được chọn vì khả năng vượt trội trong các tác vụ NLP, đặc biệt là phân loại văn bản, nhờ vào việc hiểu ngữ nghĩa và ngữ cảnh hai chiều của từ.",
    prosCons: "Ưu điểm: Độ chính xác rất cao, hiểu biết sâu về ngôn ngữ. Nhược điểm: Yêu cầu tài nguyên tính toán lớn cho việc huấn luyện và fine-tuning, mô hình lớn, khó diễn giải hơn các mô hình truyền thống.",
    features: [
      { name: "RawCommentText", description: "Toàn bộ nội dung văn bản của bình luận", type: "Text", reason: "BERT xử lý trực tiếp văn bản thô, học các biểu diễn feature từ đó." },
      // BERT không dùng features truyền thống theo cách các model khác, nó tự học từ text.
      // Tuy nhiên, có thể có các metadata features đi kèm nếu cần.
      { name: "MaxSeqLength", description: "Độ dài tối đa của chuỗi đầu vào (ví dụ: 128 tokens)", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."}
    ],
    results: {
      accuracy: 0.925,
      macroF1: 0.910,
      weightedF1: 0.922,
      recall: { positive: 0.94, negative: 0.90, neutral: 0.88 },
      precision: { positive: 0.93, negative: 0.89, neutral: 0.87 },
    },
    remarks: "BERT-base sau khi fine-tuning cho thấy hiệu suất vượt trội nhất trên tập dữ liệu này, thể hiện khả năng hiểu sâu sắc ngữ nghĩa của bình luận. Mặc dù đòi hỏi nhiều tài nguyên hơn, đây là lựa chọn tốt nhất khi ưu tiên độ chính xác. Các kỹ thuật như attention visualization có thể giúp hiểu phần nào quyết định của mô hình.",
    // BERT thường không có "feature importance" theo kiểu truyền thống, nhưng có thể có attention maps
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Attention+Viz+BERT",
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+BERT"
  }
];

// Dữ liệu cho biểu đồ so sánh chung
const comparisonChartData = modelsData.map(model => ({
  name: model.name,
  Accuracy: model.results.accuracy * 100, // nhân 100 để hiển thị %
  'Macro F1': model.results.macroF1 * 100,
  'Weighted F1': model.results.weightedF1 * 100,
}));


export default function ExperimentResults() {
  const [selectedModelId, setSelectedModelId] = useState(modelsData[0].id);
  const currentModel = modelsData.find(model => model.id === selectedModelId);

  if (!currentModel) {
    return <div>Lỗi: Không tìm thấy mô hình!</div>;
  }

  // Dữ liệu cho Radar Chart của model đang chọn
  const radarChartDataSelectedModel = [
    { subject: 'Accuracy', value: currentModel.results.accuracy * 100, fullMark: 100 },
    { subject: 'Macro F1', value: currentModel.results.macroF1 * 100, fullMark: 100 },
    { subject: 'Weighted F1', value: currentModel.results.weightedF1 * 100, fullMark: 100 },
    { subject: 'Recall (+)', value: currentModel.results.recall.positive * 100, fullMark: 100 },
    { subject: 'Precision (+)', value: currentModel.results.precision.positive * 100, fullMark: 100 },
  ];

  return (
    <div className="experiment-results-container">
      <h1>Kết quả thực nghiệm các mô hình</h1>

      <div className="model-selector card">
        <h3>Chọn mô hình để xem chi tiết:</h3>
        {modelsData.map(model => (
          <button
            key={model.id}
            onClick={() => setSelectedModelId(model.id)}
            className={`model-select-button ${selectedModelId === model.id ? 'active' : ''}`}
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* Phần A & B: Tên mô hình và Giới thiệu */}
      <section className="model-intro-section card">
        <div className="model-header">
          <h2>{currentModel.name}</h2>
          {currentModel.iconUrl && <img src={currentModel.iconUrl} alt={`${currentModel.name} logo`} className="model-icon" />}
        </div>
        <p><strong>Giới thiệu:</strong> {currentModel.introduction}</p>
        <p><strong>Lý do chọn:</strong> {currentModel.reasoning}</p>
        {currentModel.prosCons && <p><strong>Ưu/Nhược điểm:</strong> {currentModel.prosCons}</p>}
      </section>

      {/* Phần C: Đầu vào (Features) */}
      <section className="features-section card">
        <h3>C. Đầu vào (Features) sử dụng cho mô hình</h3>
        {currentModel.features.length > 0 ? (
            <div className="features-table-wrapper">
                <table>
                <thead>
                    <tr>
                    <th>Tên Feature</th>
                    <th>Mô tả</th>
                    <th>Kiểu dữ liệu</th>
                    <th>Lý do chọn/Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {currentModel.features.map(feature => (
                    <tr key={feature.name}>
                        <td title={`Tooltip cho ${feature.name}: ${feature.description}`}>{feature.name}</td>
                        <td>{feature.description}</td>
                        <td>{feature.type}</td>
                        <td>{feature.reason}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        ) : (
            <p>Mô hình này (ví dụ: BERT) xử lý đầu vào văn bản thô và tự học các features, không yêu cầu định nghĩa features truyền thống.</p>
        )}
      </section>

      {/* Phần D: Kết quả thực nghiệm (cho model đang chọn) */}
      <section className="results-section card">
        <h3>D. Kết quả thực nghiệm chi tiết: {currentModel.name}</h3>
        <div className="metrics-display">
            <div className="metrics-main">
                <h4>Các độ đo chính:</h4>
                <ul>
                    <li><strong>Accuracy:</strong> {currentModel.results.accuracy.toFixed(3)}</li>
                    <li><strong>Macro F1-score:</strong> {currentModel.results.macroF1.toFixed(3)}</li>
                    <li><strong>Weighted F1-score:</strong> {currentModel.results.weightedF1.toFixed(3)}</li>
                </ul>
            </div>
            <div className="metrics-per-class">
                <h4>Recall (theo lớp):</h4>
                <ul>
                    {Object.entries(currentModel.results.recall).map(([key, value]) => (
                    <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.toFixed(3)}</li>
                    ))}
                </ul>
                <h4>Precision (theo lớp):</h4>
                <ul>
                    {Object.entries(currentModel.results.precision).map(([key, value]) => (
                    <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.toFixed(3)}</li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="charts-individual">
            <h4>Đánh giá tổng quan (Radar Chart) - {currentModel.name}</h4>
            <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartDataSelectedModel}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]}/>
                <Radar name={currentModel.name} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
            </RadarChart>
            </ResponsiveContainer>
        </div>
      </section>

      {/* Phần D - So sánh chung các model */}
      <section className="comparison-section card">
        <h3>So sánh các mô hình</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="Accuracy" fill="#8884d8" />
            <Bar dataKey="Macro F1" fill="#82ca9d" />
            <Bar dataKey="Weighted F1" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </section>


      {/* Phần E: Nhận xét (cho model đang chọn) */}
      <section className="remarks-section card">
        <h3>E. Nhận xét về {currentModel.name}</h3>
        <p>{currentModel.remarks}</p>
        <div className="visualizations">
          {currentModel.featureImportanceImageUrl && (
            <div>
              <h4>Biểu đồ quan trọng của Feature / Hệ số / Attention (Ví dụ):</h4>
              <img src={currentModel.featureImportanceImageUrl} alt={`Feature Importance for ${currentModel.name}`} className="remarks-image" />
            </div>
          )}
          {currentModel.rocCurveImageUrl && (
            <div>
              <h4>Đường cong ROC (Ví dụ):</h4>
              <img src={currentModel.rocCurveImageUrl} alt={`ROC Curve for ${currentModel.name}`} className="remarks-image" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}