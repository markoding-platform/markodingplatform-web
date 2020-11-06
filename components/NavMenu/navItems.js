const navItems = [
	{
		id: 0,
		text: 'Pengumuman',
		link: 'to',
		withBadge: true,
	},
	{
		id: 1,
		text: 'Beranda',
		link: 'to',
		withBadge: false,
	},
	{
		id: 2,
		text: 'Ide Solusi',
		link: 'to',
		withBadge: false,
	},
	{
		id: 3,
		text: 'Kelas Online',
		link: 'to',
		withBadge: false,
	},
	{
		id: 4,
		text: 'Leaderboard',
		link: 'to',
		withBadge: false,
	},
	{
		id: 5,
		text: 'Chat',
		link: 'to',
		withBadge: false,
	},
	{
		id: 6,
		text: 'Direktori',
		link: 'to',
		withBadge: false,
		children: [
			{
				id: 0,
				text: 'Siswa',
				link: 'to',
				withBadge: false,
			},
			{
				id: 1,
				text: 'Guru',
				link: 'to',
				withBadge: false,
			},
			{
				id: 2,
				text: 'Kakak Mentor',
				link: 'to',
				withBadge: false,
			},
		],
	},
	{
		id: 7,
		text: 'Setting',
		link: 'to',
		withBadge: false,
	},
	{
		id: 8,
		text: 'Follow US',
		link: 'to',
		withBadge: false,
	},
];

export default navItems;
