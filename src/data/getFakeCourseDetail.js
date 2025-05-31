import { fakeCourses } from './filteredCourse';

export function getFakeCourseDetail(courseId) {
  const course = fakeCourses.find(c => c.course_id === courseId) || fakeCourses[0];

  if (!course) {
    return null;
  }

  const comments = (course.comments || []).slice(0, 6).map((c, i) => ({
    user: `User ${i + 1}`,
    text: typeof c === 'string' ? c : c.text || '',
    sentiment: ['Tích cực', 'Trung lập', 'Tiêu cực'][i % 3],
  }));

  const scoreFromProblems = (course.problem_scores || []).filter(s => typeof s === 'number');
  const avgProblemScore = scoreFromProblems.length > 0
    ? scoreFromProblems.reduce((a, b) => a + b, 0) / scoreFromProblems.length
    : null;

  const star = avgProblemScore ? Math.round(avgProblemScore * 5) : null;

  const weeks = ['03/03', '10/03', '17/03', '24/03', '31/03', '07/04', '14/04', '21/04', '28/04', '05/05'];
  const base = Math.floor(Math.random() * 500) + 100;
  const studentTimeSeries = weeks.map((week, i) => ({
    week,
    students: base + Math.floor(Math.random() * 30) + i * 5
  }));

  return {
    ...course,
    name: course.name || `Khóa học ${course.course_id}`,
    star,
    about: course.about || '',
    field: 'Chưa xác định',
    comments,
    students: (course.student || []).slice(0, 10).map((s, i) => ({
      name: `Học viên ${i + 1}`,
      history: (s.history || []).slice(0, 6).map(h => h.toFixed(2))
    })),
    teachers: (course.teacher_history || []).map(t => ({
      name: t.teacher_name,
      avg_score: t.score_teacher ? t.score_teacher.toFixed(2) : 'N/A'
    })),
    sl_vid: course.sl_vid,
    problem_scores: scoreFromProblems,
    studentTimeSeries
  };
}

export default getFakeCourseDetail;
