// src/data/fakeCourses.js

// Sinh ngẫu nhiên số thực trong [0, 5)
function randScore() {
  return parseFloat((Math.random() * 10).toFixed(2));
}

const TEACHER_NAMES = [
  'Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E',
  'Vũ Thị F', 'Đặng Văn G', 'Phan Thị H', 'Bùi Văn I', 'Đỗ Thị K'
];

function randomTeachers() {
  const n = Math.floor(Math.random() * 3) + 1;
  const shuffled = TEACHER_NAMES.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n).map(name => ({ name, avg_score: (Math.random() * 2 + 7).toFixed(2) }));
}

const COURSE_NAMES = [
  'Nhập môn Khoa học Dữ liệu',
  'Lập trình Python cơ bản',
  'Phân tích Dữ liệu với R',
  'Trí tuệ Nhân tạo',
  'Học máy nâng cao',
  'Khai phá Dữ liệu',
  'Thống kê ứng dụng',
  'Xử lý ngôn ngữ tự nhiên',
  'Thị giác máy tính',
  'Quản lý Dự án CNTT'
];
const SCHOOL_NAMES = [
  'Đại học Bách Khoa',
  'Đại học Quốc gia',
  'Đại học Sư phạm',
  'Đại học Kinh tế',
  'Đại học Công nghệ',
  'Đại học FPT',
  'Đại học Ngoại thương',
  'Đại học Khoa học Tự nhiên',
  'Đại học Duy Tân',
  'Đại học Đà Nẵng'
];

// Tạo mảng fakeCourses
export const fakeCourses = Array.from({ length: 50 }, (_, i) => ({
  course_id: `C_${1000 + i}`,
  name: COURSE_NAMES[i % COURSE_NAMES.length],
  school: SCHOOL_NAMES[i % SCHOOL_NAMES.length],
  problem_scores: Array.from(
    { length: Math.floor(Math.random() * 41) + 10 }, // 10–100 phần tử
    () => randScore()
  ),
  sl_vid: Math.floor(Math.random() * 26) + 5, // số video từ 5-30
  teachers: randomTeachers(),
}));

// Ví dụ import và sử dụng trong component
// import { fakeCourses } from './data/fakeCourses';
// <ProblemScoreDistributionPlot courses={fakeCourses} />
