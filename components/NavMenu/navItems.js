const navItems = [
  {
    id: 0,
    text: 'Pengumuman',
    link: '/announcement',
    withBadge: true,
  },
  {
    id: 1,
    text: 'Beranda',
    link: '/',
    withBadge: false,
  },
  {
    id: 2,
    text: 'Event Terdekat',
    link: '/event',
    withBadge: false,
  },
  {
    id: 3,
    text: 'Ide Solusi',
    link: '/idea',
    withBadge: false,
  },
  {
    id: 4,
    text: 'Kelas Online',
    link: '/course',
    withBadge: false,
  },
  {
    id: 5,
    text: 'Blog',
    link: '/blog',
    withBadge: false,
  },
  {
    id: 6,
    text: 'Leaderboard',
    link: '/leaderboards',
    withBadge: false,
  },
  {
    id: 7,
    text: 'Tanya Jawab',
    link: '/question',
    withBadge: false,
    children: [],
  },
  {
    id: 8,
    text: 'Chat',
    link: '/chat',
    withBadge: false,
  },
  {
    id: 9,
    text: 'Direktori',
    link: '/directory',
    withBadge: false,
    children: [
      {
        id: 0,
        text: 'Siswa',
        link: '/directory/students',
        withBadge: false,
      },
      {
        id: 1,
        text: 'Guru',
        link: '/directory/teachers',
        withBadge: false,
      },
      {
        id: 2,
        text: 'Kakak Mentor',
        link: '/directory/mentors',
        withBadge: false,
      },
    ],
  },
];

export default navItems;
