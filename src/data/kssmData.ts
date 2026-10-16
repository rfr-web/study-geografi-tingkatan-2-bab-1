/**
 * kssmData.ts
 * Curated educational content strictly adhering to:
 * Buku Teks Geografi Tingkatan 2 KSSM, Bab 1: Skala dan Jarak (ms 2–15)
 */

import { Badge, Flashcard, MapPoint, Question } from '../types/index.ts';

export const APP_INFO = {
  title: 'GeoXplore',
  chapter: 'Bab 1: Skala dan Jarak',
  tagline: 'Teroka Peta, Kuasai Skala dan Jarak!',
  subject: 'Geografi Tingkatan 2 KSSM',
  standardKandungan: '1.1 Skala dan Jarak',
  standardPembelajaran: [
    '1.1.1 Menyatakan maksud skala dan jarak.',
    '1.1.2 Menjelaskan jenis skala dan jenis jarak.',
    '1.1.3 Menunjuk cara menggunakan skala penyata, skala lurus dan pecahan wakilan untuk menentukan jarak sebenar.',
    '1.1.4 Menentukan jarak sebenar berpandukan skala pada peta.'
  ]
};

export const BADGES: Badge[] = [
  {
    id: 'badge_peneroka',
    title: 'Peneroka Peta',
    description: 'Memulakan pengembaraan GeoXplore dan mendaftar profil pembelajaran.',
    iconName: 'Compass',
    requirement: 'Daftar nama dan buka modul pembelajaran.'
  },
  {
    id: 'badge_skala',
    title: 'Pakar Skala',
    description: 'Menguasai ketiga-tiga jenis skala: Skala Lurus, Penyata, dan Pecahan Wakilan.',
    iconName: 'Ruler',
    requirement: 'Lengkapkan Modul 1.1 Skala.'
  },
  {
    id: 'badge_jarak',
    title: 'Jaguh Navigasi',
    description: 'Mampu membezakan jarak mutlak (meter/km) dan jarak relatif (masa/kos).',
    iconName: 'Route',
    requirement: 'Lengkapkan simulasi perjalanan dalam Modul 1.2 Jarak.'
  },
  {
    id: 'badge_juruukur',
    title: 'Juruukur Mahir',
    description: 'Menguasai teknik pembaris, jangka tolok, jalur kertas dan benang.',
    iconName: 'PenTool',
    requirement: 'Selesaikan latihan ukuran lurus dan melengkung dalam Modul 1.3.'
  },
  {
    id: 'badge_kartografer',
    title: 'Kartografer Muda',
    description: 'Berjaya menentukan jarak sebenar lokasi di Peta Topo Pekan Bestari.',
    iconName: 'Map',
    requirement: 'Selesaikan sekurang-kurangnya 3 misi peta dalam Modul 1.4.'
  },
  {
    id: 'badge_kbat',
    title: 'Pemikir KBAT',
    description: 'Menyelesaikan masalah perancangan kos perjalanan dan masa yang paling optimum.',
    iconName: 'Lightbulb',
    requirement: 'Jawab betul soalan KBAT dalam Latihan Pengukuhan.'
  },
  {
    id: 'badge_master',
    title: 'Master Geografi T2',
    description: 'Mencapai skor cemerlang 80% ke atas dalam Cabaran Kuiz Geo-Quest.',
    iconName: 'Award',
    requirement: 'Dapatkan sekurang-kurangnya 8/10 markah dalam Kuiz Geo-Quest.'
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_1',
    term: 'Skala',
    subtopic: '1.1 Skala',
    definition: 'Nisbah jarak di atas peta berbanding dengan jarak sebenar di atas permukaan bumi.',
    example: 'Jika skala ialah 1 cm mewakili 1 km, maka 1 cm di peta = 1 km di bumi.',
    icon: 'Ruler'
  },
  {
    id: 'fc_2',
    term: 'Skala Lurus Mudah',
    subtopic: '1.1 Skala',
    definition: 'Satu garisan lurus yang dibahagikan kepada beberapa bahagian yang sama jaraknya. Setiap bahagian mewakili jarak sebenar di permukaan bumi.',
    example: '0 —— 1 —— 2 —— 3 —— 4 km (setiap segmen 1 cm mewakili 1 km).',
    icon: 'Minus'
  },
  {
    id: 'fc_3',
    term: 'Skala Lurus Penuh',
    subtopic: '1.1 Skala',
    definition: 'Skala lurus yang mempunyai bahagian pecahan yang lebih kecil di sebelah kiri angka sifar (0) untuk mengukur jarak dengan lebih tepat (dalam meter).',
    example: '1000m  500m  0 —— 1 —— 2 —— 3 km',
    icon: 'Split'
  },
  {
    id: 'fc_4',
    term: 'Skala Penyata',
    subtopic: '1.1 Skala',
    definition: 'Skala yang dinyatakan dalam bentuk perkataan atau ayat yang mudah difahami.',
    example: '"1 cm mewakili 1 km" atau "1 cm mewakili 2 km".',
    icon: 'FileText'
  },
  {
    id: 'fc_5',
    term: 'Pecahan Wakilan (Representative Fraction)',
    subtopic: '1.1 Skala',
    definition: 'Skala yang dinyatakan dalam bentuk nisbah atau pecahan tanpa unit kerana kedua-dua bahagian menggunakan unit yang sama (cm).',
    example: '1 : 100,000 (bermaksud 1 cm di peta mewakili 100,000 cm atau 1 km di permukaan bumi).',
    icon: 'Hash'
  },
  {
    id: 'fc_6',
    term: 'Jarak',
    subtopic: '1.2 Jarak',
    definition: 'Jauh di antara satu tempat dengan tempat yang lain.',
    example: 'Jarak antara Rumah Danial dengan SMK Pekan Bestari.',
    icon: 'Milestone'
  },
  {
    id: 'fc_7',
    term: 'Jarak Mutlak',
    subtopic: '1.2 Jarak',
    definition: 'Jarak yang dinyatakan dalam unit tetap seperti meter (m) atau kilometer (km). Nilainya tetap dan tidak berubah mengikut mod pengangkutan atau masa.',
    example: 'Jarak rumah Ali ke sekolah ialah tepat 7 km.',
    icon: 'Lock'
  },
  {
    id: 'fc_8',
    term: 'Jarak Relatif',
    subtopic: '1.2 Jarak',
    definition: 'Jarak yang diukur dan dinyatakan berdasarkan kos (RM) dan masa (minit/jam). Nilainya tidak tetap dan boleh berubah bergantung pada mod pengangkutan serta keadaan lalu lintas.',
    example: 'Masa perjalanan menaiki bas ialah 30 minit (RM 2.00), manakala menaiki kereta ialah 10 minit (RM 6.00).',
    icon: 'Clock'
  },
  {
    id: 'fc_9',
    term: 'Jangka Tolok (Dividers)',
    subtopic: '1.3 Teknik Mengukur',
    definition: 'Alat berkaki dua bermata jarum yang digunakan untuk mengukur jarak lurus antara dua titik pada peta secara tepat.',
    example: 'Kedua-dua mata jarum diletakkan pada titik A dan B, kemudian dipindahkan ke skala lurus atau pembaris.',
    icon: 'Crosshair'
  },
  {
    id: 'fc_10',
    term: 'Kaedah Benang',
    subtopic: '1.3 Teknik Mengukur',
    definition: 'Kaedah menggunakan seutas benang putih untuk mengukur jarak melengkung seperti sungai atau jalan raya yang bengkang-bengkok.',
    example: 'Benang disusur mengikut liku sungai dari hulu ke hilir, ditanda dengan dakwat, kemudian diluruskan pada pembaris.',
    icon: 'Activity'
  },
  {
    id: 'fc_11',
    term: 'Kaedah Jalur Kertas',
    subtopic: '1.3 Teknik Mengukur',
    definition: 'Kaedah menggunakan tepi sehelai kertas lurus untuk menandakan siri segmen kecil sepanjang jalan atau sungai yang melengkung.',
    example: 'Jalur kertas dipusingkan mengikut setiap lengkungan kecil dan ditandakan titik demi titik.',
    icon: 'Scissors'
  },
  {
    id: 'fc_12',
    term: 'Formula Pertukaran Unit Asas',
    subtopic: '1.4 Peta Topo',
    definition: '1 Kilometer (km) = 1,000 Meter (m) = 100,000 Sentimeter (cm).',
    example: 'Oleh itu, 1 cm pada skala 1 : 100,000 bersamaan dengan 100,000 cm = 1 km.',
    icon: 'Calculator'
  }
];

export const MAP_LOCATIONS: MapPoint[] = [
  {
    id: 'sk_pekan',
    name: 'SMK Pekan Bestari',
    category: 'institusi',
    x: 160,
    y: 140,
    icon: 'School',
    description: 'Sekolah Menengah Kebangsaan Pekan Bestari. Titik rujukan pendidikan utama.'
  },
  {
    id: 'rumah_danial',
    name: 'Rumah Danial (Kg. Sentosa)',
    category: 'institusi',
    x: 80,
    y: 280,
    icon: 'Home',
    description: 'Kampung Sentosa, kediaman Danial.'
  },
  {
    id: 'hospital',
    name: 'Hospital Daerah',
    category: 'institusi',
    x: 320,
    y: 110,
    icon: 'HeartPulse',
    description: 'Pusat rawatan perubatan utama daerah Pekan Bestari.'
  },
  {
    id: 'masjid',
    name: 'Masjid Jamek Pekan Bestari',
    category: 'institusi',
    x: 250,
    y: 220,
    icon: 'Landmark',
    description: 'Masjid utama di pusat bandar Pekan Bestari.'
  },
  {
    id: 'balai_polis',
    name: 'Balai Polis Pekan Bestari',
    category: 'institusi',
    x: 390,
    y: 230,
    icon: 'Shield',
    description: 'Ibu Pejabat Polis Daerah Pekan Bestari.'
  },
  {
    id: 'stesen_ktm',
    name: 'Stesen Kereta Api Bestari',
    category: 'pengangkutan',
    x: 480,
    y: 130,
    icon: 'Train',
    description: 'Stesen kereta api laluan pantai timur/barat.'
  },
  {
    id: 'jambatan',
    name: 'Jambatan Sungai Jernih',
    category: 'pengangkutan',
    x: 290,
    y: 330,
    icon: 'GitCommit',
    description: 'Jambatan konkrit merentasi Sungai Jernih yang menghubungkan utara dan selatan.'
  },
  {
    id: 'ladang_kelapa_sawit',
    name: 'Ladang Sawit Makmur',
    category: 'pertanian',
    x: 460,
    y: 320,
    icon: 'TreePine',
    description: 'Kawasan perladangan kelapa sawit komersial.'
  },
  {
    id: 'sawah_padi',
    name: 'Sawah Padi Kg. Pinang',
    category: 'pertanian',
    x: 120,
    y: 420,
    icon: 'Wheat',
    description: 'Jelapang padi tradisional berhampiran tebing sungai.'
  },
  {
    id: 'bukit_cerakah',
    name: 'Bukit Cerakah (Stesen Trigonometri)',
    category: 'fizikal',
    x: 490,
    y: 430,
    icon: 'Mountain',
    description: 'Puncak tertinggi (ketinggian 280 meter) dengan garis kontur rapat.'
  }
];

export const EXERCISE_QUESTIONS: Question[] = [
  {
    id: 1,
    subtopic: '1.1',
    type: 'mcq',
    question: 'Apakah maksud skala dalam geografi?',
    options: [
      'Jarak fizikal sebenar yang diukur menggunakan pita pengukur di bumi.',
      'Nisbah jarak di atas peta berbanding dengan jarak sebenar di atas permukaan bumi.',
      'Ukuran masa yang diambil untuk bergerak dari satu tempat ke tempat lain.',
      'Perbezaan ketinggian antara bukit dengan lembah sungai.'
    ],
    correctAnswer: 'Nisbah jarak di atas peta berbanding dengan jarak sebenar di atas permukaan bumi.',
    explanation: 'Mengikut Buku Teks Geografi Tingkatan 2 KSSM muka surat 4, skala ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di atas permukaan bumi.',
    difficulty: 'Mudah'
  },
  {
    id: 2,
    subtopic: '1.1',
    type: 'mcq',
    question: 'Pecahan wakilan 1 : 100,000 membawa maksud:',
    options: [
      '1 cm di peta mewakili 100 meter di permukaan bumi.',
      '1 cm di peta mewakili 1 kilometer di permukaan bumi.',
      '1 meter di peta mewakili 100 kilometer di permukaan bumi.',
      '1 km di peta mewakili 100,000 km di permukaan bumi.'
    ],
    correctAnswer: '1 cm di peta mewakili 1 kilometer di permukaan bumi.',
    explanation: '1 km = 1,000 m = 100,000 cm. Maka 1 : 100,000 bermaksud 1 cm di atas peta bersamaan dengan 100,000 cm iaitu 1 km di atas bumi.',
    difficulty: 'Mudah'
  },
  {
    id: 3,
    subtopic: '1.2',
    type: 'mcq',
    question: 'Antara berikut, yang manakah merupakan contoh jarak mutlak?',
    options: [
      'Tambang bas dari Ipoh ke Taiping ialah RM 12.00.',
      'Masa perjalanan kereta api ETS dari Kuala Lumpur ke Butterworth ialah 4 jam.',
      'Jarak dari Pekan A ke Pekan B ialah 25 kilometer.',
      'Masa berjalan kaki ke perpustakaan ialah 15 minit.'
    ],
    correctAnswer: 'Jarak dari Pekan A ke Pekan B ialah 25 kilometer.',
    explanation: 'Jarak mutlak dinyatakan dalam unit tetap seperti meter (m) atau kilometer (km). Tambang (RM) dan masa (minit/jam) adalah jarak relatif.',
    difficulty: 'Mudah'
  },
  {
    id: 4,
    subtopic: '1.2',
    type: 'mcq',
    question: 'Mengapakah jarak relatif dari rumah ke tempat kerja boleh berbeza antara waktu pagi dengan waktu tengah malam?',
    options: [
      'Bumi telah mengembang pada waktu tengah hari.',
      'Keadaan kesesakan lalu lintas pada waktu pagi meningkatkan masa perjalanan.',
      'Jarak fizikal kilometer berkurang pada waktu tengah malam.',
      'Pemandu memandu lebih perlahan pada waktu malam.'
    ],
    correctAnswer: 'Keadaan kesesakan lalu lintas pada waktu pagi meningkatkan masa perjalanan.',
    explanation: 'Jarak relatif diukur berdasarkan masa dan kos. Walaupun jarak mutlaknya (km) kekal sama, kesesakan lalu lintas pada waktu puncak pagi menambah masa perjalanan.',
    difficulty: 'Sederhana'
  },
  {
    id: 5,
    subtopic: '1.3',
    type: 'mcq',
    question: 'Alat manakah yang paling sesuai digunakan untuk mengukur jarak sungai atau jalan raya yang bengkang-bengkok di atas peta?',
    options: [
      'Jangka tolok dan pembaris lurus',
      'Benang putih dan jalur kertas',
      'Pita pengukur besi',
      'Jangka sudut'
    ],
    correctAnswer: 'Benang putih dan jalur kertas',
    explanation: 'Untuk mengukur jarak melengkung seperti sungai atau jalan raya bengkang-bengkok, benang atau jalur kertas digunakan kerana ia boleh dilenturkan mengikut liku lengkungan.',
    difficulty: 'Sederhana'
  },
  {
    id: 6,
    subtopic: '1.3',
    type: 'calculation',
    question: 'Jarak antara Hospital dengan Balai Polis di atas peta ialah 6 cm. Sekiranya skala peta ialah 1 cm mewakili 2 km, berapakah jarak sebenar di permukaan bumi?',
    options: [
      '3 km',
      '8 km',
      '12 km',
      '18 km'
    ],
    correctAnswer: '12 km',
    explanation: 'Langkah pengiraan:\nJarak peta = 6 cm\nSkala: 1 cm = 2 km\nJarak sebenar = 6 cm × 2 km = 12 km.',
    difficulty: 'Sederhana'
  },
  {
    id: 7,
    subtopic: '1.4',
    type: 'calculation',
    question: 'Jika skala peta ialah 1 : 50,000 dan jarak jalan raya lurus diukur ialah 8 cm, hitungkan jarak sebenar jalan raya tersebut dalam unit kilometer (km):',
    options: [
      '2 km',
      '4 km',
      '5 km',
      '40 km'
    ],
    correctAnswer: '4 km',
    explanation: 'Skala 1 : 50,000 bermaksud 1 cm mewakili 50,000 cm = 0.5 km (500 meter).\nJarak sebenar = 8 cm × 0.5 km = 4.0 km.',
    difficulty: 'Sederhana'
  },
  {
    id: 8,
    subtopic: 'kbat',
    type: 'mcq',
    question: 'KBAT: Danial mempunyai wang saku RM 2.00 dan perlu sampai ke kelas tuisyen sejauh 6 km dalam masa 20 minit. Mod pengangkutan manakah yang paling sesuai?',
    options: [
      'Berjalan kaki (Percuma, mengambil masa 90 minit)',
      'Basikal sendiri (Percuma, mengambil masa 24 minit)',
      'Bas awam (Tambang RM 1.50, mengambil masa 15 minit)',
      'Teksi (Tambang RM 7.00, mengambil masa 8 minit)'
    ],
    correctAnswer: 'Bas awam (Tambang RM 1.50, mengambil masa 15 minit)',
    explanation: 'Analisis KBAT:\n- Teksi cepat (8 minit) tetapi kos RM 7.00 melebihi bajet Danial (RM 2.00).\n- Berjalan kaki terlalu lambat (90 minit).\n- Basikal mengambil masa 24 minit (terlewat 4 minit).\n- Bas awam berharga RM 1.50 (dalam bajet) dan mengambil masa 15 minit (menepati syarat < 20 minit).',
    difficulty: 'Sukar (KBAT)'
  }
];

export const GEOQUEST_QUESTIONS: Question[] = [
  {
    id: 101,
    subtopic: '1.1',
    type: 'mcq',
    question: 'Apakah perbezaan utama antara skala lurus mudah dan skala lurus penuh?',
    options: [
      'Skala lurus mudah berwarna hitam putih, skala lurus penuh berwarna-warni.',
      'Skala lurus penuh mempunyai bahagian pecahan yang lebih kecil di sebelah kiri angka sifar (0).',
      'Skala lurus mudah menggunakan perkataan, skala lurus penuh menggunakan pecahan.',
      'Skala lurus penuh tidak mempunyai unit kilometer.'
    ],
    correctAnswer: 'Skala lurus penuh mempunyai bahagian pecahan yang lebih kecil di sebelah kiri angka sifar (0).',
    explanation: 'Skala lurus penuh mempunyai pecahan kecil di kiri 0 (biasanya dalam meter seperti 500m, 1000m) untuk bacaan yang lebih jitu.',
    difficulty: 'Sederhana'
  },
  {
    id: 102,
    subtopic: '1.1',
    type: 'mcq',
    question: 'Tukarkan skala penyata "1 cm mewakili 3 km" kepada bentuk pecahan wakilan:',
    options: [
      '1 : 3,000',
      '1 : 30,000',
      '1 : 300,000',
      '1 : 3,000,000'
    ],
    correctAnswer: '1 : 300,000',
    explanation: '1 km = 100,000 cm. Oleh itu, 3 km = 3 × 100,000 cm = 300,000 cm. Pecahan wakilan ialah 1 : 300,000.',
    difficulty: 'Sederhana'
  },
  {
    id: 103,
    subtopic: '1.2',
    type: 'mcq',
    question: 'Antara pernyataan berikut, yang manakah BENAR mengenai jarak relatif?',
    options: [
      'Jarak relatif sentiasa diukur dalam unit kilometer dan meter.',
      'Jarak relatif tidak dipengaruhi oleh tambang pengangkutan atau kesesakan jalan.',
      'Jarak relatif dinilai berdasarkan pertimbangan kos dan masa perjalanan.',
      'Jarak relatif sentiasa sama nilainya dengan jarak mutlak.'
    ],
    correctAnswer: 'Jarak relatif dinilai berdasarkan pertimbangan kos dan masa perjalanan.',
    explanation: 'Jarak relatif tidak tetap dan diukur berdasarkan kos (RM) dan masa (jam/minit).',
    difficulty: 'Mudah'
  },
  {
    id: 104,
    subtopic: '1.3',
    type: 'mcq',
    question: 'Semasa menggunakan jangka tolok untuk mengukur jarak lurus di atas peta, langkah seterusnya ialah:',
    options: [
      'Membengkokkan jarum jangka tolok mengikut bentuk jalan raya.',
      'Memindahkan jarak bukaan mata jarum ke atas skala lurus atau pembaris untuk membaca nilai.',
      'Mendarabkan bukaan jarum dengan 360 darjah.',
      'Menulis nombor terus di atas peta.'
    ],
    correctAnswer: 'Memindahkan jarak bukaan mata jarum ke atas skala lurus atau pembaris untuk membaca nilai.',
    explanation: 'Kedua-dua mata jarum diletakkan pada titik A dan B, kemudian tanpa mengubah bukaan, dipindahkan ke skala lurus atau pembaris untuk menentukan jarak.',
    difficulty: 'Sederhana'
  },
  {
    id: 105,
    subtopic: '1.3',
    type: 'calculation',
    question: 'Panjang sebatang sungai diukur menggunakan benang ialah 9.5 cm. Jika skala peta ialah 1 cm mewakili 1 km, apakah jarak sebenar sungai tersebut?',
    options: [
      '0.95 km',
      '9.5 km',
      '95 km',
      '950 meter'
    ],
    correctAnswer: '9.5 km',
    explanation: 'Jarak peta = 9.5 cm. Skala: 1 cm = 1 km. Jarak sebenar = 9.5 cm × 1 km = 9.5 km.',
    difficulty: 'Mudah'
  },
  {
    id: 106,
    subtopic: '1.4',
    type: 'calculation',
    question: 'Jarak di atas peta antara Stesen Kereta Api dengan Masjid ialah 4 cm. Diberi skala peta ialah 1 : 200,000. Berapakah jarak sebenar dalam km?',
    options: [
      '2 km',
      '4 km',
      '8 km',
      '16 km'
    ],
    correctAnswer: '8 km',
    explanation: 'Skala 1 : 200,000 bermaksud 1 cm = 2 km (200,000 cm = 2 km). Maka 4 cm × 2 km = 8 km.',
    difficulty: 'Sederhana'
  },
  {
    id: 107,
    subtopic: '1.4',
    type: 'mcq',
    question: 'Apakah kelebihan utama peta yang mempunyai skala berbanding pelan lakaran tanpa skala?',
    options: [
      'Peta berskala membolehkan pengguna mengira jarak sebenar di bumi dengan tepat.',
      'Peta berskala mempunyai warna yang lebih terang.',
      'Peta berskala tidak memerlukan petunjuk simbol.',
      'Peta berskala hanya boleh dilukis oleh jurutera.'
    ],
    correctAnswer: 'Peta berskala membolehkan pengguna mengira jarak sebenar di bumi dengan tepat.',
    explanation: 'Skala adalah komponen penting peta geografi yang membolehkan penukaran nisbah ukuran peta kepada jarak sebenar di atas permukaan bumi.',
    difficulty: 'Sederhana'
  },
  {
    id: 108,
    subtopic: 'kbat',
    type: 'mcq',
    question: 'KBAT: Encik Razak perlu menghantar dokumen penting dari Pekan Bestari ke Bandar Seri dalam tempoh 30 minit (jarak 20 km). Beliau ada pilihan menaiki motosikal pada waktu hujan lebat atau kereta melalui lebuh raya bertol (RM 4.50). Apakah keputusan geografi terbaik?',
    options: [
      'Menaiki motosikal kerana tidak perlu membayar tol walaupun berisiko kemalangan dan lewat akibat hujan.',
      'Berjalan kaki kerana paling jimat kos.',
      'Menaiki kereta melalui lebuh raya bertol kerana lebih selamat, terlindung daripada hujan dan tiba tepat pada masanya walaupun ada kos tol.',
      'Menunggu sehingga hari esok.'
    ],
    correctAnswer: 'Menaiki kereta melalui lebuh raya bertol kerana lebih selamat, terlindung daripada hujan dan tiba tepat pada masanya walaupun ada kos tol.',
    explanation: 'Dalam pertimbangan jarak relatif, masa dan keselamatan adalah faktor kritikal selain daripada kos wang ringgit.',
    difficulty: 'Sukar (KBAT)'
  },
  {
    id: 109,
    subtopic: '1.1',
    type: 'mcq',
    question: 'Jika 2 cm di atas peta mewakili 1 km di permukaan bumi, apakah skala penyata yang setara?',
    options: [
      '1 cm mewakili 0.5 km (atau 500 meter)',
      '1 cm mewakili 2 km',
      '1 cm mewakili 100 meter',
      '1 cm mewakili 4 km'
    ],
    correctAnswer: '1 cm mewakili 0.5 km (atau 500 meter)',
    explanation: '2 cm = 1 km, maka bahagi kedua-dua belah dengan 2: 1 cm = 0.5 km (500 meter).',
    difficulty: 'Sederhana'
  },
  {
    id: 110,
    subtopic: '1.4',
    type: 'calculation',
    question: 'Di atas peta berskala 1 : 100,000, panjang lintasan landasan kereta api diukur sebagai 12.4 cm. Berapakah jarak sebenar lintasan itu dalam meter?',
    options: [
      '1,240 meter',
      '12,400 meter',
      '124,000 meter',
      '1,240,000 meter'
    ],
    correctAnswer: '12,400 meter',
    explanation: '1 cm mewakili 1 km = 1,000 meter.\n12.4 cm mewakili 12.4 km.\n12.4 km × 1,000 meter = 12,400 meter.',
    difficulty: 'Sukar (KBAT)'
  }
];
