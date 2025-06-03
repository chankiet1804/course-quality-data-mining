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
    iconUrl: "https://i0.wp.com/innovationyourself.com/wp-content/uploads/2023/10/Random-Forest-Regression.png?fit=1200%2C600&ssl=1", // Placeholder icon
    introduction: `Logistic Regression là một thuật toán phân lớp (classification) dựa trên hồi quy, thường được sử dụng để dự đoán xác suất một mẫu thuộc vào một lớp cụ thể. Trong bài toán đánh giá chất lượng khóa học, đầu ra có thể là nhị phân (ví dụ: 1 = "tốt", 0 = "không tốt") hoặc đa lớp (ví dụ: "tốt", "trung bình", "kém").`,
    reasoning: "Được chọn vì khả năng xử lý tốt cả dữ liệu số và dữ liệu hạng mục, ít bị overfitting hơn so với một cây quyết định đơn lẻ, và có thể cung cấp ước tính về tầm quan trọng của feature.",
    prosCons: "Ưu điểm: Hiệu suất cao trên nhiều loại dữ liệu, không nhạy cảm với việc scaling dữ liệu, xử lý tốt giá trị thiếu. Nhược điểm: Có thể chậm với số lượng cây lớn, mô hình khó diễn giải hơn.",
    features: [
      { name: "teacher_history", description: "Danh sách các giảng viên và lịch sử giảng dạy trước đây của họ, bao gồm thông tin về các khóa học từng giảng dạy và điểm trung bình của những khóa học đó.", type: "Numeric (float)", reason: "Phản ánh chất lượng tổng thể cảm nhận bởi người dùng." },
      { name: "comments", description: "Danh sách các bình luận từ học viên trong khóa học.", type: "Numeric (integer)", reason: "Bình luận dài hơn có thể chứa nhiều thông tin cảm xúc hơn hoặc chi tiết hơn." },
      { name: "student", description: "Danh sách các học viên tham gia khóa học, cùng với lịch sử học tập của từng học viên (bao gồm điểm trung bình và tỷ lệ hoàn thành các khóa học trước đó).", type: "Numeric (float)", reason: "Feature được tính toán trước dựa trên từ điển cảm xúc, cung cấp tín hiệu trực tiếp." },
      { name: "school_name", description: "Tên trường cung cấp khóa học"},
      { name: "problem_scores", description: "Danh sách các điểm trung bình đạt được từ các bài tập (problem) trong khóa học"},
      { name: "school_name", description: "Tên trường học"},
      { name: "sl_ex", description: "Số lượng bài tập (exercises) trong khóa học"},
      { name: "sl_vid", description: "Số lượng video giảng dạy trong khóa học"},
      { name: "name", description: "Tên khóa học"},
      { name: "about", description: "Mô tả tổng quát về nội dung khóa học"},
    ],
    results: {
      accuracy: 0.6382,
      macroF1: 0.48,
      weightedF1: 0.61,
      recall: { macro_avg: 0.42, weighted_avg: 0.86 },
      precision: { macro_avg: 0.53, weighted_avg: 0.72 },
    },
    remarks: "Random Forest Classifier cho thấy hiệu suất tốt trên tập dữ liệu này, đặc biệt trong việc xác định các bình luận tích cực. Mô hình này phù hợp khi cần độ chính xác cao và có thể chấp nhận được việc mô hình phức tạp hơn một chút. Để cải thiện thêm, có thể thử nghiệm với việc tinh chỉnh siêu tham số (hyperparameter tuning) hoặc sử dụng các kỹ thuật feature engineering phức tạp hơn.",
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Feature+Importance+RF",
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+RF"
  },
  {
    id: "lr",
    name: "Logistic Regression",
    iconUrl: "https://zd-brightspot.s3.us-east-1.amazonaws.com/wp-content/uploads/2022/04/11040521/46-4-e1715636469361.png", // Placeholder icon
    introduction: "Logistic Regression là một mô hình thống kê tuyến tính được sử dụng cho bài toán phân loại nhị phân (và có thể mở rộng cho đa lớp). Nó dự đoán xác suất một đối tượng thuộc về một lớp nhất định.",
    reasoning: "Được chọn vì tính đơn giản, dễ diễn giải, huấn luyện nhanh và hiệu quả trên các tập dữ liệu có mối quan hệ tuyến tính.",
    prosCons: "Ưu điểm: Dễ triển khai và diễn giải, hiệu quả tính toán cao. Nhược điểm: Giả định mối quan hệ tuyến tính giữa các feature và log-odds, có thể không hoạt động tốt với các mối quan hệ phức tạp.",
    features: [
      { name: "teacher_history", description: "Tính điểm trung bình (teacher_avg_score) và số lượng (teacher_count), bỏ None." },
      { name: "comments", description: "Tính sentiment (comment_avg_sentiment) và độ dài (avg_comment_length) bằng SnowNLP, giới hạn 300 bình luận." },
      { name: "student_history", description: "Tính điểm trung bình (student_avg_score), độ lệch chuẩn (student_score_std), số lượng (student_count), bỏ None." },
      { name: "engagement_score", description: "(comment_count * (sentiment + 1)), teacher_quality (score * log1p(count)), content_richness (length * (sentiment + 1)). Xử lý văn bản bằng jieba và TF-IDF."}
    ],
    results: {
      accuracy: 0.5007,
      macroF1: 0.49,
      weightedF1: 0.5,
      recall: { macro_avg: 0.51, weighted_avg: 0.50 },
      precision: { macro_avg: 0.49, weighted_avg: 0.51 },
    },
    remarks: "Logistic Regression cung cấp một baseline tốt và dễ hiểu. Mặc dù độ chính xác thấp hơn Random Forest, nó vẫn hữu ích cho việc nhanh chóng đánh giá hoặc khi cần một mô hình có thể diễn giải được. Kết quả có thể được cải thiện bằng cách thêm các feature tương tác hoặc đa thức.",
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Coefficients+LR", // Coefficients for LR
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+LR"
  },
  {
    id: "xgboost",
    name: "XGBoost",
    iconUrl: "https://www.appliedaicourse.com/blog/wp-content/uploads/2025/01/XGBoost-Algorithm.webp", // Placeholder icon
    introduction: "XGBoost là một thuật toán học máy thuộc về thể loại học tập tổng hợp, cụ thể là khuôn khổ tăng cường độ dốc. Nó sử dụng cây quyết định làm trình học cơ sở và sử dụng các kỹ thuật chính quy hóa để tăng cường khái quát hóa mô hình. XGBoost nổi tiếng với hiệu quả tính toán, cung cấp khả năng xử lý hiệu quả, phân tích tầm quan trọng của tính năng sâu sắc và xử lý liền mạch các giá trị bị thiếu. Đây là thuật toán phù hợp cho nhiều tác vụ, bao gồm hồi quy, phân loại và xếp hạng.",
    reasoning: "Được chọn vì khả năng vượt trội trong các tác vụ NLP, đặc biệt là phân loại văn bản, nhờ vào việc hiểu ngữ nghĩa và ngữ cảnh hai chiều của từ.",
    prosCons: "Ưu điểm: Độ chính xác rất cao, hiểu biết sâu về ngôn ngữ. Nhược điểm: Yêu cầu tài nguyên tính toán lớn cho việc huấn luyện và fine-tuning, mô hình lớn, khó diễn giải hơn các mô hình truyền thống.",
    features: [
      { name: "teacher_history ", description: "điểm trung bình, số lượng giáo viên", type: "Text", reason: "BERT xử lý trực tiếp văn bản thô, học các biểu diễn feature từ đó." },
      { name: "comments ", description: "sentiment, độ dài", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "student_history", description: "thống kê điểm số", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "engagement_score ", description: "Feature mới", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "teacher_quality ", description: "Feature mới", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "content_richness ", description: "Feature mới", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."}
    ],
    results: {
      accuracy: 0.33,
      macroF1: 0.2,
      weightedF1: 0.3,
      recall: { macro_avg: 0.20, weighted_avg: 0.33 },
      precision: { macro_avg: 0.21, weighted_avg: 0.29 },
    },
    remarks: "Hiệu quả tiềm năng: XGBoost có thể rất hiệu quả trên bộ dữ liệu này, đặc biệt khi xử lý các đặc trưng số và thống kê. Để tận dụng tối đa, cần trích xuất các đặc trưng có ý nghĩa từ dữ liệu văn bản (ví dụ: TF-IDF của tên, mô tả, bình luận; độ dài trung bình bình luận; số lượng bình luận tiêu cực/tích cực dựa trên phân tích cảm xúc) và các đặc trưng từ danh sách (ví dụ: điểm trung bình từ problem_scores, sl_ex, sl_vid, điểm trung bình của giảng viên, tỷ lệ hoàn thành của học viên). Nếu kỹ thuật trích xuất đặc trưng tốt, XGBoost có thể đạt hiệu suất cao do khả năng học các mối quan hệ phức tạp giữa các đặc trưng và khả năng chống overfitting. Hạn chế: Bản thân XGBoost không trực tiếp hiểu được ngữ nghĩa sâu của văn bản hoặc các mối quan hệ tuần tự trong bình luận/mô tả. Hiệu quả của nó sẽ bị giới hạn bởi chất lượng của quá trình kỹ thuật đặc trưng (feature engineering).",
    // BERT thường không có "feature importance" theo kiểu truyền thống, nhưng có thể có attention maps
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Attention+Viz+BERT",
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+BERT"
  },
  {
    id: "TextCNN+Dense",
    name: "TextCNN + Dense",
    iconUrl: "https://www.researchgate.net/profile/Robert-Mercer-2/publication/334836767/figure/fig1/AS:787101767442435@1564671093889/Multichannel-TextCNN-Architecture-filter-1-filter-2-and-filter-3-indicate.ppm", // Placeholder icon
    introduction: "CNN là một loại mạng nơ-ron sâu được thiết kế để tự động và thích nghi học các đặc trưng không gian từ dữ liệu đầu vào thông qua việc sử dụng các bộ lọc (filters) hoặc kernel. Khác với mạng nơ-ron truyền thống (Fully Connected Network - FCN) yêu cầu làm phẳng dữ liệu đầu vào (ví dụ: biến ảnh 2D thành vector 1D), CNN giữ nguyên cấu trúc không gian của dữ liệu, giúp mạng hiểu rõ hơn về mối quan hệ cục bộ giữa các điểm ảnh.",
    // reasoning: "Được chọn vì khả năng vượt trội trong các tác vụ NLP, đặc biệt là phân loại văn bản, nhờ vào việc hiểu ngữ nghĩa và ngữ cảnh hai chiều của từ.",
    // prosCons: "Ưu điểm: Độ chính xác rất cao, hiểu biết sâu về ngôn ngữ. Nhược điểm: Yêu cầu tài nguyên tính toán lớn cho việc huấn luyện và fine-tuning, mô hình lớn, khó diễn giải hơn các mô hình truyền thống.",
    features: [
      { name: "course_id", description: "Mã định danh khóa học", type: "Text", reason: "BERT xử lý trực tiếp văn bản thô, học các biểu diễn feature từ đó." },
      { name: "school_name", description: "Tên trường học", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "problem_scores", description: "Điểm số bài tập.", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "sl_ex", description: "Số lượng bài tập đã hoàn thành", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "sl_vid", description: "Số lượng video đã xem", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "teacher_scores", description: "Điểm đánh giá từ giáo viên", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "student_scores", description: "Điểm đánh giá từ học sinh", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."}
    ],
    results: {
      accuracy: 0.57,
      macroF1: 0.46,
      weightedF1: 0.56,
      recall: { macro_avg: 0.46, weighted_avg: 0.57 },
      precision: { macro_avg: 0.49, weighted_avg: 0.55 },
    },
    remarks: "Hiệu quả tiềm năng: TextCNN + Dense sẽ rất phù hợp để xử lý các trường dữ liệu văn bản như name, about, và đặc biệt là comments. Nó có khả năng nắm bắt các cụm từ quan trọng, cảm xúc, hoặc chủ đề chính từ các đoạn văn bản này. Sau khi xử lý văn bản, đầu ra của TextCNN có thể được kết hợp với các đặc trưng số/có cấu trúc khác (từ problem_scores, sl_ex, sl_vid, v.v.) trước khi đưa vào lớp Dense cuối cùng để đưa ra dự đoán chất lượng khóa học. Sự kết hợp này có thể mang lại hiệu suất mạnh mẽ. Hạn chế: TextCNN có thể không nắm bắt tốt các phụ thuộc dài hạn trong các đoạn văn bản rất dài (ví dụ: một bình luận rất chi tiết), và không xử lý tốt dữ liệu số/có cấu trúc một cách trực tiếp mà cần thêm các lớp xử lý riêng biệt hoặc kỹ thuật kết hợp đặc trưng.",
    // BERT thường không có "feature importance" theo kiểu truyền thống, nhưng có thể có attention maps
    featureImportanceImageUrl: "https://via.placeholder.com/400x250/E8E8E8/000000?Text=Attention+Viz+BERT",
    rocCurveImageUrl: "https://via.placeholder.com/400x250/D8D8D8/000000?Text=ROC+Curve+BERT"
  },
  {
    id: "BiLSTM+Dense",
    name: "BiLSTM + Dense",
    iconUrl: "https://pub.mdpi-res.com/electronics/electronics-10-01808/article_deploy/html/images/electronics-10-01808-g005.png?1627467289", // Placeholder icon
    introduction: "Mô hình BiLSTM + Dense là một kiến trúc mạng nơ-ron mạnh mẽ, thường được sử dụng trong các tác vụ xử lý ngôn ngữ tự nhiên (NLP) như phân loại văn bản, dịch máy, nhận dạng thực thể có tên, và phân tích cảm xúc. Mô hình này kết hợp sức mạnh của mạng Bi-directional Long Short-Term Memory (BiLSTM) trong việc học các phụ thuộc dài hạn và ngữ cảnh từ cả hai hướng của chuỗi dữ liệu, với khả năng của lớp Dense (Fully Connected) trong việc học các biểu diễn cấp cao và đưa ra dự đoán cuối cùng.",
    reasoning: "Được chọn vì khả năng vượt trội trong các tác vụ NLP, đặc biệt là phân loại văn bản, nhờ vào việc hiểu ngữ nghĩa và ngữ cảnh hai chiều của từ.",
    prosCons: "Ưu điểm: Độ chính xác rất cao, hiểu biết sâu về ngôn ngữ. Nhược điểm: Yêu cầu tài nguyên tính toán lớn cho việc huấn luyện và fine-tuning, mô hình lớn, khó diễn giải hơn các mô hình truyền thống.",
    features: [
      { name: "name", description: "Tên khóa học", type: "Text", reason: "BERT xử lý trực tiếp văn bản thô, học các biểu diễn feature từ đó." },
      { name: "about", description: "Mô tả tổng quát về nội dung khóa học", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "comments", description: "Danh sách các bình luận từ học viên", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "sl_ex", description: "Số lượng bài tập", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "sl_vid", description: "Số lượng video giảng dạy", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "problem_scores", description: "Điểm trung bình từ các bài tập", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "teacher_history", description: "Lịch sử giảng viên", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},
      { name: "student", description: "Lịch sử học tập của sinh viên", type: "Hyperparameter", reason: "Ảnh hưởng đến hiệu suất và tài nguyên tính toán."},

    ],
    results: {
      accuracy: 0.51,
      macroF1: 0.4,
      weightedF1: 0.51,
      recall: { macro_avg: 0.40, weighted_avg: 0.51 },
      precision: { macro_avg: 0.41, weighted_avg: 0.52 },
    },
    remarks: "Hiệu quả tiềm năng: Tương tự như TextCNN, BiLSTM + Dense cũng rất mạnh mẽ trong việc xử lý các trường văn bản như name, about, và comments. Thậm chí, nó có thể vượt trội hơn TextCNN trong việc nắm bắt các phụ thuộc ngữ nghĩa phức tạp và dài hạn trong bình luận hoặc mô tả khóa học, nơi mà thứ tự từ và ngữ cảnh rộng là quan trọng. Các đầu ra từ BiLSTM này cũng cần được kết hợp với các đặc trưng số/có cấu trúc khác để tạo ra một biểu diễn toàn diện cho việc phân loại cuối cùng. Hạn chế: Quá trình huấn luyện BiLSTM thường chậm hơn TextCNN, đặc biệt với các chuỗi văn bản dài. Tương tự TextCNN, nó cũng cần một cơ chế để kết hợp hiệu quả với các đặc trưng số/có cấu trúc khác của khóa học.",
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
    { subject: 'Recall (+)', value: currentModel.results.recall.macro_avg * 100, fullMark: 100 },
    { subject: 'Precision (+)', value: currentModel.results.precision.macro_avg * 100, fullMark: 100 },
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
        {/* <p><strong>Lý do chọn:</strong> {currentModel.reasoning}</p> */}
        {/* {currentModel.prosCons && <p><strong>Ưu/Nhược điểm:</strong> {currentModel.prosCons}</p>} */}
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
                    {/* <th>Kiểu dữ liệu</th> */}
                    {/* <th>Lý do chọn/Ghi chú</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentModel.features.map(feature => (
                    <tr key={feature.name}>
                        <td title={`Tooltip cho ${feature.name}: ${feature.description}`}>{feature.name}</td>
                        <td>{feature.description}</td>
                        {/* <td>{feature.type}</td> */}
                        {/* <td>{feature.reason}</td> */}
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
                <h4>Recall:</h4>
                <ul>
                    {Object.entries(currentModel.results.recall).map(([key, value]) => (
                    <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.toFixed(3)}</li>
                    ))}
                </ul>
                <h4>Precision:</h4>
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
        {/* <div className="visualizations">
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
        </div> */}
      </section>
    </div>
  );
}