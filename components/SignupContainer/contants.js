export const ACCOUNT_TYPE = ['siswa', 'mentor', 'guru', 'supporter'];

export const LIST_FORM = {
  siswa: [
    {
      key: 'schoolDegree',
      as: 'dropdown',
      label: 'Jenjang',
      required: true,
    },
    {
      key: 'typeSchool',
      as: 'dropdown',
      label: 'Tipe',
      required: true,
    },
    {
      key: 'grade',
      as: 'dropdown',
      label: 'Kelas',
      required: true,
    },
    {
      key: 'province',
      as: 'dropdown',
      label: 'Provinsi',
      required: true,
    },
    {
      key: 'city',
      as: 'dropdown',
      label: 'Kota/Kabupaten',
      required: true,
    },
    {
      key: 'schoolName',
      as: 'textfield',
      label: 'Nama Instansi Pendidikan',
      required: true,
    },
  ],
  guru: [
    {
      key: 'schoolDegree',
      as: 'dropdown',
      label: 'Jenjang',
      required: true,
    },
    {
      key: 'typeSchool',
      as: 'dropdown',
      label: 'Tipe',
      required: true,
    },
    {
      key: 'province',
      as: 'dropdown',
      label: 'Provinsi',
      required: true,
    },
    {
      key: 'city',
      as: 'dropdown',
      label: 'Kota/Kabupaten',
      required: true,
    },
    {
      key: 'schoolName',
      as: 'textfield',
      label: 'Nama Instansi Pendidikan',
      required: true,
    },
    {
      key: 'subject',
      as: 'textfield',
      label: 'Mata Pelajaran yang diajarkan',
      required: true,
    },
    {
      key: 'position',
      as: 'textfield',
      label: 'Jabatan',
      required: true,
    },
    {
      key: 'degree',
      as: 'textfield',
      label: 'Jenjang pendidikan terakhir',
      required: true,
    },
    {
      key: 'yearOfExperience',
      as: 'dropdown',
      label: 'Sudah mengajar sejak tahun',
      required: true,
    },
  ],
};
