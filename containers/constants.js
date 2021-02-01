export const WORKBOOK_IDEA_URL =
  'https://docs.google.com/presentation/d/1UyT8hdSid2V32WBp3KZK14SvWuB3IqVE8u9pR0lVQH0/edit?usp=sharing ';
export const tAndCLink =
  'https://docs.google.com/document/d/1FMGCtIdrBfxJhxt2PCFwSz7dEixi-LFs5Zu59Ryscwk/edit?usp=sharing';
export const ACCOUNT_TYPE = ['student', 'mentor', 'teacher', 'supporter'];
export const ACCOUNT_TYPE_ENUM = {
  student: 'Siswa',
  mentor: 'Mentor',
  teacher: 'Guru',
  supporter: 'Suporter',
};
export const LIST_FORM = {
  student: [
    {
      key: 'schoolGradeName',
      as: 'dropdown',
      label: 'Jenjang',
      required: true,
      columns: '6',
    },
    {
      key: 'schoolTypeName',
      as: 'dropdown',
      label: 'Tipe',
      required: true,
      columns: '6',
    },
    {
      key: 'className',
      as: 'textfield',
      label: 'Kelas',
      required: true,
      columns: '12',
    },
    {
      key: 'provinceName',
      as: 'dropdown',
      label: 'Provinsi',
      required: true,
      columns: '6',
    },
    {
      key: 'cityName',
      as: 'dropdown',
      label: 'Kota/Kabupaten',
      required: true,
      columns: '6',
    },
    {
      key: 'schoolName',
      as: 'dropdown',
      label: 'Nama Instansi Pendidikan',
      required: true,
      columns: '12',
    },
  ],
  teacher: [
    {
      key: 'schoolGradeName',
      as: 'dropdown',
      label: 'Jenjang',
      required: true,
      columns: '6',
    },
    {
      key: 'schoolTypeName',
      as: 'dropdown',
      label: 'Tipe',
      required: true,
      columns: '6',
    },
    {
      key: 'provinceName',
      as: 'dropdown',
      label: 'Provinsi',
      required: true,
      columns: '6',
    },
    {
      key: 'cityName',
      as: 'dropdown',
      label: 'Kota/Kabupaten',
      required: true,
      columns: '6',
    },
    {
      key: 'schoolName',
      as: 'dropdown',
      label: 'Nama Instansi Pendidikan',
      required: true,
      columns: '12',
    },
    {
      key: 'expertise',
      as: 'textfield',
      label: 'Mata Pelajaran yang diajarkan',
      required: true,
      columns: '12',
    },
    {
      key: 'workingPosition',
      as: 'textfield',
      label: 'Jabatan',
      required: true,
      columns: '12',
    },
    {
      key: 'lastEducationGradeName',
      as: 'dropdown',
      label: 'Jenjang pendidikan terakhir',
      required: true,
      columns: '12',
    },
    {
      key: 'startTeachingYear',
      as: 'textfield',
      label: 'Sudah mengajar sejak tahun',
      required: true,
      columns: '12',
    },
  ],
  mentor: [
    {
      key: 'workingPosition',
      as: 'textfield',
      label: 'Jabatan',
      required: true,
      columns: '12',
    },
    {
      key: 'companyName',
      as: 'textfield',
      label: 'Nama Organisasi/Perusahaan tempat bekerja saat ini',
      required: true,
      columns: '12',
    },
    {
      key: 'lastEducationGradeName',
      as: 'dropdown',
      label: 'Jenjang pendidikan terakhir',
      required: true,
      columns: '12',
    },
    {
      key: 'expertise',
      as: 'textfield',
      label: 'Bidang keahlian yang bisa diajarkan',
      required: true,
      columns: '12',
    },
  ],
  supporter: [
    {
      key: 'workingPosition',
      as: 'textfield',
      label: 'Jabatan Pekerjaan',
      required: true,
      columns: '12',
    },
    {
      key: 'companyName',
      as: 'textfield',
      label: 'Nama Organisasi/Perusahaan tempat bekerja saat ini',
      required: true,
      columns: '12',
    },
    {
      key: 'expertise',
      as: 'textfield',
      label: 'Bidang keahlian',
      required: true,
      columns: '12',
    },
    {
      key: 'lastEducationGradeName',
      as: 'dropdown',
      label: 'Jenjang pendidikan terakhir',
      required: true,
      columns: '12',
    },
  ],
};
