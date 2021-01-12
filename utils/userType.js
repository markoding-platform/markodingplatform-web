export default function userType(value) {
  if (value === 'students' || value === 'student') {
    return 'Siswa';
  }
  if (value === 'teachers' || value === 'teacher') {
    return 'Guru';
  }
  if (value === 'mentors' || value === 'mentor') {
    return 'Kakak Mentor';
  }
  return 'Supporter';
}
