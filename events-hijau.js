// =====================================================================
//  LEVEL HIJAU: "Tante Lina di Parung Panjang" (Lintas Rangkasbitung)
//  Format event sama persis dengan events.js (lihat penjelasan di atas file itu).
//  Rute: Parung Panjang → Jatake → Serpong → Kebayoran → Palmerah → Tanah Abang, tanpa transit.
//  Last mile ke kantor dipakai bareng level Bogor (segmen terakhir di events.js).
//  Flag khusus level ini: laa (lotre awal), bekalBerat, rebutan
//  stamina: -10 di segmen = stamina berkurang otomatis tiap lewat segmen itu (berdiri lama, kereta padat)
// =====================================================================

LEVEL.push({
  id: "hijau",
  nama: "Lintas Rangkasbitung",
  warna: "#1f9d55",
  judul: "🟢 Tante Lina di Parung Panjang",
  ringkas: "Lintas hijau, langsung tanpa transit. Kelihatannya gampang. Kepadatan murni dari Parung Panjang sampai Tanah Abang.",
  intro: [
    "Minggu ini kamu numpang di rumah Tante Lina di Parung Panjang. Parung Panjang → Serpong → Kebayoran → Palmerah → Tanah Abang. Gak ada transit.",
    "Kedengarannya gampang. Roker lintas hijau cuma senyum pahit.",
  ],
  bekal: "Bekal dari Tante Lina: satu kopi sachet (+25 stamina, sekali pakai). Dan kemungkinan besar, rantang.",
  start: 6 * 60 + 41,   // rumah Tante Lina deket stasiun; disetel biar peluang menang ~25%
  lotreJudul: "Kereta dari Rangkasbitung mendekati Parung Panjang. Rangkaian apa yang datang?",
  rangkaian: [
    { nama: "KRL 8 gerbong", pendek: "8 gerbong", flag: "sf8", peluang: 0.75,
      desc: "Standar lintas hijau: 8 gerbong. Rangkaian 12 gerbong baru ditargetkan 2027. Sampai saat itu: sabar." },
    { nama: "KRL 10 gerbong", pendek: "10 gerbong", peluang: 0.25,
      desc: "Sepuluh gerbong! Dua gerbong ekstra. Di lintas hijau, ini dihitung keberuntungan." },
  ],
  kondisi: [
    { flag: "hujan", peluang: 0.4,
      ya: "🌧️ Cuaca: hujan deras. Parkiran Parung Panjang udah jadi kolam.",
      tidak: "☀️ Cuaca: cerah. Satu hal yang berjalan lancar hari ini." },
    { flag: "laa", peluang: 0.35,
      ya: "⚡ Info lintas: tadi subuh ada gangguan listrik aliran atas di sekitar Serpong. Katanya udah pulih. Katanya.",
      tidak: null },
  ],

  // Mentor lintas hijau, muncul sekali di salah satu segmen 2–4.
  mentor: [
    {
      maksSeg: 1,
      teks: "Ibu-ibu berkerudung, tas kain, berdiri tegak tanpa pegangan. Bu Yati, 15 tahun naik dari Parung Panjang. Dia lihat kamu oleng: \"Mas, kalau kereta mau masuk stasiun, kakinya dibuka.\"",
      pilihan: [
        { label: "\"Selebar apa, Bu?\"", tag: "cerdik", set: "tipsRem", efek: { stamina: 5 },
          hasil: "\"Selebar bahu. Lutut jangan dikunci. Badan ikut kereta.\" Kamu coba. Kamu berdiri kayak Bu Yati. Hampir." },
        { label: "Senyum, pegangan makin kencang", tag: "pasrah", efek: { stamina: -5 },
          hasil: "Bu Yati angkat bahu. Kereta ngerem. Kamu oleng. Bu Yati tidak." },
      ],
    },
    {
      teks: "Bu Yati, roker Parung Panjang 15 tahun, lihat kamu berdiri pas di tengah pintu. \"Nanti di Pondok Ranji jangan di tengah gitu, Mas. Kedorong keluar.\"",
      pilihan: [
        { label: "\"Terus di mana, Bu?\"", tag: "cerdik", set: "tipsDorong", efek: {},
          hasil: "\"Pinggir, nempel tiang. Arus orang lewat tengah. Kamu jadi batu, bukan daun.\" Filosofis juga Bu Yati." },
        { label: "\"Aman, Bu, saya kuat\"", tag: "nekat", efek: { sabar: -5 },
          hasil: "Bu Yati cuma bilang \"oh\". Oh yang panjang. Oh yang tahu sesuatu." },
      ],
    },
    {
      teks: "Bu Yati, roker Parung Panjang 15 tahun, ngintip ID card kantormu. \"Kantor deket Tanah Abang? Keluar stasiun jangan ikut arus ke jalan raya, Mas.\"",
      pilihan: [
        { label: "\"Lewat mana, Bu?\"", tag: "cerdik", set: "jalanPintas", efek: {},
          hasil: "\"Belok ke gang samping ruko kain. Tembus belakang gedung-gedung kantor.\" Kamu simpan di Notes HP." },
        { label: "\"Saya pakai maps aja, Bu\"", tag: "cuek", efek: { sabar: -5 },
          hasil: "\"Maps gak tahu gang itu, Mas.\" Bu Yati benar, tapi kamu udah terlanjur gengsi." },
      ],
    },
  ],

  segmen: [
    {
      nama: "Peron Parung Panjang", pendek: "PRP", waktu: 4, ambil: 1,
      event: [
        {
          wajib: true,
          teks: "Subuh di rumah Tante Lina. Di meja: rantang tiga susun, rendang, sambal, kerupuk satu plastik besar. \"Bawa semua ya, Dim. Kamu kurusan.\"",
          pilihan: [
            { label: "Bawa semua", tag: "pahlawan", set: "bekalBerat", efek: { sabar: 10 },
              hasil: "Ranselmu sekarang seberat galon. Tante Lina senyum puas. Kamu gak bakal lapar sampai Kamis." },
            { label: "Bawa rendangnya aja", tag: "cerdik", efek: { sabar: -10 },
              hasil: "\"Kerupuknya gak dibawa? Ya udah...\" Nada \"ya udah\" versi tante. Ransel ringan, hati berat." },
            { label: "Makan di tempat, cepet-cepet", tag: "nekat", efek: { jam: 6, stamina: 20 },
              hasil: "Rendang dua potong, nasi sepiring, dalam enam menit. Kamu berangkat kenyang dan sedikit terlambat." },
          ],
        },
        {
          wajib: true,
          teks: "Stasiun Parung Panjang. Antreannya legendaris: dari gate sampai pinggir jalan. Ada bapak-bapak yang bawa kursi lipat sendiri.",
          pilihan: [
            { label: "Antre manis", tag: "pasrah", efek: { jam: 6, sabar: -10 },
              hasil: "Kamu maju selangkah tiap 20 detik. Bapak kursi lipat maju sambil duduk. Dia menang." },
            { label: "Lewat pintu samping deket parkiran", tag: "cerdik", efek: { jam: 2 },
              hasil: "Pintunya kebuka. Kamu masuk dari samping dengan muka tanpa dosa.",
              gagal: { peluang: 0.5, efek: { jam: 9, sabar: -15 },
                hasil: "Pintu sampingnya ditutup jam segini. Kamu balik ke ujung antrean, yang sekarang lebih panjang." } },
            { label: "Ngobrol sama bapak kursi lipat", tag: "pahlawan", efek: { jam: 6, sabar: 10 },
              hasil: "Namanya Pak Udin, 12 tahun naik dari Parung Panjang. Antrean kerasa lebih cepat kalau ada yang diajak ngobrol." },
          ],
        },
        {
          syarat: "hujan",
          teks: "Hujan deras. Jalan ke stasiun jadi sungai cokelat. Sepatu kerjamu adalah satu-satunya sepatu kerjamu.",
          pilihan: [
            { label: "Lepas sepatu, nyeker", tag: "cerdik", efek: { jam: 3, stamina: -5 },
              hasil: "Sepatu di tangan, kaki di genangan. Sampai stasiun, kamu pakai sepatu lagi di depan gate. Sepatu selamat, martabat tidak." },
            { label: "Terobos aja", tag: "nekat", efek: { sabar: -15 },
              hasil: "Kaus kakimu sekarang menampung kira-kira setengah gelas air. Tiap langkah: crut." },
            { label: "Naik ojek sampai depan gate", tag: "pasrah", efek: { jam: 2, sabar: -5 },
              hasil: "Abang ojek lewat genangan dengan kecepatan penuh. Kamu kering. Orang di trotoar tidak." },
          ],
        },
        {
          notif: { dari: "Tante Lina", teks: "Dim rantangnya jgn lupa dibalikin ya. Yg ijo punya Bu RT. Yg merah punya Tante. Jgn ketuker." },
          teks: "Baru sampai stasiun, HP getar.",
          pilihan: [
            { label: "Balas \"Siap, Tan 🙏\"", tag: "pahlawan", efek: { sabar: 5 },
              hasil: "Tante Lina bales stiker \"Hati-hati di jalan\" pakai efek glitter. Hati adem." },
            { label: "Read doang", tag: "cuek", efek: { sabar: -10 },
              hasil: "Lima menit kemudian: \"Dim?\" Lalu foto rantang ijo. Lalu: \"INI PUNYA BU RT YA.\"" },
          ],
        },
        {
          teks: "Abang kopi keliling di depan gate: \"Kopi, Mas? Tiga ribu! Panas!\"",
          pilihan: [
            { label: "Beli satu, minum sebelum tap in", tag: "nekat", efek: { jam: 3, stamina: 10 },
              hasil: "Kopi sachet seduhan termos. Panas, manis, dan diminum sambil lari. Lidahmu kebakar, matamu melek." },
            { label: "Gak usah, buru-buru", tag: "cerdik", efek: {},
              hasil: "Kamu lewat. Abang kopi udah ngelayanin orang berikutnya. Dunia tetap berputar." },
          ],
        },
        {
          wajib: true,
          teks: "Peron penuh. Kereta dari Rangkasbitung datang tiap beberapa menit, tapi udah penuh dari sananya. Petugas bilang ada kereta yang berangkat dari Parung Panjang, kosong, \"sebentar lagi\".",
          pilihan: [
            { label: "Ikut rebutan kereta dari Rangkasbitung", tag: "nekat", set: "rebutan", efek: {},
              hasil: "Kamu maju ke garis kuning. Udah tiga kereta lewat penuh. Yang keempat masuk." },
            { label: "Tunggu kereta yang berangkat dari sini", tag: "pasrah", efek: { jam: 12, stamina: 25 },
              hasil: "Dua belas menit kemudian keretanya datang kosong. Kamu dapat duduk dekat jendela. Kaki senang, jam tangan sedih.",
              gagal: { peluang: 0.4, efek: { jam: 20, stamina: 20, sabar: -10 },
                hasil: "\"Mohon maaf, perjalanan kereta dari Parung Panjang dibatalkan.\" Kamu nunggu yang berikutnya. Dua puluh menit hilang, tapi tetap dapat duduk." } },
          ],
        },
        {
          syarat: "rebutan", minigame: "pintu",
          teks: "Kereta keempat dari Rangkasbitung masuk. Isinya udah penuh sampai kaca. Tiap pintu ada antrean orang yang sama putus asanya.",
          menang: { tag: "nekat", efek: { stamina: -15 },
            hasil: "Kamu masuk! Separuh badan di dalam, separuh lagi didorong masuk sama petugas. Pintu nutup. Kamu resmi bagian dari kereta ini." },
          kalah: { efek: { jam: 8, sabar: -20 },
            hasil: "Kereta keempat jalan tanpa kamu. Yang kelima delapan menit lagi. Kamu mulai paham kenapa Pak Udin bawa kursi lipat." },
        },
      ],
    },

    {
      nama: "Cicayur – Cisauk", pendek: "CSK", waktu: 12, ambil: 1, stamina: -10,
      event: [
        {
          syarat: "bekalBerat",
          teks: "Rantang Tante Lina di ranselmu. Tiap kereta goyang, kerupuknya bunyi \"kresek\". Penumpang sebelah mulai melirik ke arah bau rendang.",
          pilihan: [
            { label: "Peluk ransel di depan", tag: "cerdik", efek: { stamina: -15 },
              hasil: "Ransel di dada, rantang aman. Tanganmu pegal kayak gendong bayi gemuk." },
            { label: "Biarin di punggung", tag: "pasrah", efek: { stamina: -5, sabar: -10 },
              hasil: "Rantangnya nyodok mas di belakang tiap stasiun. Dia gak protes. Dia cuma napas lebih keras." },
            { label: "Bagi kerupuk buat dibawa pulang", tag: "pahlawan", efek: { stamina: -5, sabar: 10 },
              hasil: "Satu plastik kerupuk habis dibagi satu gerbong. Ransel lebih ringan, kamu punya 12 teman baru. Tante Lina gak perlu tahu." },
          ],
        },
        {
          wajib: true,
          teks: "Kereta berhenti di stasiun yang kelihatan masih baru banget. Bapak di sebelahmu panik: \"Lho, ini di mana? Kok ada stasiun?\" Papan namanya: JATAKE.",
          pilihan: [
            { label: "Jelasin: stasiun baru, buka Januari", tag: "cerdik", efek: {},
              hasil: "\"Oh, baru ya...\" Bapaknya ngangguk, lalu nanya ke orang lain buat konfirmasi. Kamu gak dipercaya." },
            { label: "Ikut bingung", tag: "pasrah", efek: { sabar: 5 },
              hasil: "Kalian bingung bareng. Kebingungan yang dibagi itu kebingungan yang ringan." },
            { label: "Foto papan namanya buat story", tag: "cuek", efek: {},
              hasil: "Caption: \"Stasiun apa ini?\" 34 orang reply \"JATAKE BRO\". Internet tahu duluan." },
          ],
        },
        {
          wajib: true, minigame: "rem",
          teks: "Lintas hijau, kecepatan penuh. Masinis ngerem tiap mau masuk stasiun, dan kamu cuma kebagian tali gantungan yang udah dipegang tiga orang.",
          menang: { tag: "cerdik", efek: { stamina: -5 },
            hasil: "Kamu berdiri kokoh. Tiga orang yang pegang tali yang sama ikut selamat karena kamu. Kerja tim." },
          kalah: { efek: { stamina: -15, sabar: -15 },
            hasil: "Kamu oleng, tiga orang di tali yang sama ikut oleng. Efek domino. Semua natap kamu." },
        },
        {
          teks: "Mas-mas di depanmu ngemper di lantai gerbong, alas koran. Kakinya selonjor. Kamu berdiri pakai satu kaki.",
          pilihan: [
            { label: "\"Mas, kakinya...\"", tag: "baper", efek: { sabar: 5 },
              hasil: "Dia ngelipet kaki. Kakimu dapat tempat. Kemenangan kecil.",
              gagal: { peluang: 0.5, efek: { sabar: -15 },
                hasil: "Dia ngelipet kaki lima senti. Lalu tidur. Lalu kakinya selonjor lagi." } },
            { label: "Ikutan ngemper", tag: "nekat", efek: { stamina: 15, sabar: -15 },
              hasil: "Kamu duduk di lantai. Nyaman. Sampai orang mulai nginjek celanamu tiap stasiun." },
            { label: "Berdiri satu kaki", tag: "pasrah", efek: { stamina: -15 },
              hasil: "Kamu berdiri kayak bangau. Yoga gratis, 40 menit." },
          ],
        },
        {
          teks: "Kamu kebagian berdiri di sambungan antar gerbong. Lantainya geser-geser tiap belokan, kayak papan seluncur.",
          pilihan: [
            { label: "Bertahan di sambungan", tag: "nekat", efek: { stamina: -15 },
              hasil: "Kakimu kiri ke kanan, kanan ke kiri. Kamu baru aja olahraga paling melelahkan minggu ini." },
            { label: "Pindah ke dalam gerbong", tag: "cerdik", efek: { stamina: -5, sabar: -10 },
              hasil: "Butuh tiga stasiun buat pindah satu meter. Tapi lantainya diam." },
          ],
        },
        {
          syarat: "hujan", peluang: 0.7,
          teks: "Karet jendela gerbong bocor. Air hujan rembes pelan ke lengan orang-orang yang berdiri di dekatnya. Termasuk kamu.",
          pilihan: [
            { label: "Geser dari jendela", tag: "cerdik", efek: { stamina: -10 },
              hasil: "Kamu geser. Orang yang gantiin posisimu kena. Kalian bertatapan. Hening yang penuh makna." },
            { label: "Tutup pakai tisu", tag: "pahlawan", efek: { sabar: 5 },
              hasil: "Tiga lembar tisu, dijejelin ke karet jendela. Bocornya berhenti. Kamu tukang kereta dadakan." },
            { label: "Pasrah", tag: "pasrah", efek: { sabar: -15 },
              hasil: "Lengan kemejamu sekarang berwarna lebih gelap dari sisanya. Kayak tren fashion yang gagal." },
          ],
        },
      ],
    },

    {
      nama: "Serpong", pendek: "SRP", waktu: 8, ambil: 1, stamina: -10,
      event: [
        {
          syarat: "laa", peluang: 0.85,
          teks: "Antara Serpong dan Rawa Buntu, kereta berhenti mendadak. Lampu mati. AC mati. Hening. \"Mohon maaf, terjadi gangguan listrik aliran atas.\" Lima menit kemudian gerbong mulai kayak sauna.",
          pilihan: [
            { label: "Tenang, atur napas", tag: "cerdik", efek: { jam: 15, stamina: -15 },
              hasil: "Kamu napas pelan-pelan. Lima belas menit kemudian petugas buka pintu dan jendela. Angin masuk. Hidup kembali." },
            { label: "Kipasin diri pakai map dokumen", tag: "nekat", efek: { jam: 15, stamina: -20, sabar: 5 },
              hasil: "Map kontrak jadi kipas. Bu Sri gak perlu tahu kenapa dokumennya lecek." },
            { label: "Ngomel bareng satu gerbong", tag: "baper", efek: { jam: 15, stamina: -10, sabar: -20 },
              hasil: "Ngomel bareng bikin gerbong makin panas. Secara harfiah." },
          ],
        },
        {
          teks: "Udah 40 menit di kereta. Kopi pagi tadi mulai nagih janji. Kamu kebelet.",
          pilihan: [
            { label: "Turun di Serpong, cari toilet", tag: "cerdik", efek: { jam: 10, sabar: 10 },
              hasil: "Toiletnya antre tiga orang. Lega. Kereta berikutnya penuh juga, tapi kamu udah tenang." },
            { label: "Tahan sampai kantor", tag: "pasrah", efek: { sabar: -25 },
              hasil: "Tiap goyangan kereta adalah ujian. Kamu lulus. Sejauh ini." },
          ],
        },
        {
          teks: "Serpong. Kamu kira banyak yang turun. Ternyata banyak yang NAIK. Orang-orang berkemeja rapi masuk dengan teknik yang terlatih.",
          pilihan: [
            { label: "Pertahankan posisi", tag: "nekat", efek: { stamina: -15 },
              hasil: "Kamu jadi tembok. Tembok yang keringetan, tapi tembok." },
            { label: "Ngalah, mundur ke tengah", tag: "pasrah", efek: { stamina: -5, sabar: -10 },
              hasil: "Kamu mundur. Terus mundur. Sekarang kamu di tempat yang gak ada pegangannya." },
            { label: "Geser ke pojok pas ada yang turun", tag: "cerdik", efek: { stamina: -5 },
              hasil: "Satu orang turun, kamu langsung ngisi pojoknya. Refleks roker.",
              gagal: { peluang: 0.4, efek: { stamina: -15 },
                hasil: "Pojoknya udah diisi orang lain sepersekian detik lebih cepat. Kamu malah kejepit di tengah." } },
          ],
        },
        {
          notif: { dari: "Tante Lina", teks: "Dim udah sampe? Rendangnya di rantang paling bawah ya, jgn ketuker sama sambel." },
          teks: "Kereta baru lewat Serpong. HP getar.",
          pilihan: [
            { label: "Bohong: \"Udah, Tan\"", tag: "cuek", efek: { sabar: -15 },
              hasil: "Dua menit kemudian: \"Kok lokasinya di Serpong?\" Tante Lina ternyata pakai fitur share location keluarga." },
            { label: "Jujur: \"Masih di Serpong, Tan\"", tag: "pahlawan", efek: { sabar: 5 },
              hasil: "Tante Lina kirim doa perjalanan sepanjang satu layar. Kamu merasa terlindungi, secara spiritual." },
          ],
        },
      ],
    },

    {
      nama: "Rawa Buntu – Pondok Ranji", pendek: "PDJ", waktu: 14, ambil: 1, stamina: -12,
      event: [
        {
          teks: "Mbak di sebelahmu pegang es kopi susu ukuran literan. Kereta ngerem. Kamu lihat semuanya dalam gerak lambat.",
          pilihan: [
            { label: "Tangkap gelasnya", tag: "pahlawan", efek: { stamina: -5, sabar: 5 },
              hasil: "Tangkapan sempurna. Mbaknya bilang makasih. Kamu merasa kayak kiper timnas.",
              gagal: { peluang: 0.5, efek: { sabar: -20 },
                hasil: "Tanganmu nyenggol tutupnya. Tumpah. Ke sepatumu. Sepatumu sekarang wangi gula aren." } },
            { label: "Menghindar", tag: "cerdik", efek: { stamina: -10 },
              hasil: "Kamu loncat kecil. Es kopi tumpah ke lantai, bukan ke kamu. Bapak di belakangmu gak seberuntung itu." },
            { label: "Pasrah", tag: "pasrah", efek: { sabar: -20 },
              hasil: "Celana kerjamu sekarang punya motif baru: es kopi susu, sedikit gula aren." },
          ],
        },
        {
          teks: "Jurangmangu. Rombongan mahasiswa berkemeja putih celana hitam naik. Semua baca catatan. Gerbong mendadak kayak ruang ujian.",
          pilihan: [
            { label: "Ikut hening", tag: "pasrah", efek: { sabar: 10 },
              hasil: "Gerbong paling sunyi yang pernah kamu naiki. Kamu hampir ketiduran karena damai." },
            { label: "\"Ujian ya, Dek?\"", tag: "baper", efek: { sabar: -5 },
              hasil: "\"Iya, Kak. Maaf, lagi ngapalin.\" Ditolak dengan sopan. Kamu dipanggil Kak. Lagi." },
            { label: "Ngintip catatannya, nostalgia", tag: "cuek", efek: { stamina: -5, sabar: 5 },
              hasil: "Jurnal umum, debit, kredit. Kamu inget kenapa dulu gak ambil akuntansi." },
          ],
        },
        {
          notif: { dari: "Pak Hartono (Bos)", teks: "🎤 Pesan suara (3:12)" },
          teks: "Pak Hartono kirim voice note tiga menit. Headset-mu di ransel, di bawah rantang.",
          pilihan: [
            { label: "Dengerin, HP ditempel ke kuping", tag: "pasrah", efek: { sabar: -15 },
              hasil: "Dua menit pertama: cerita bis kota tahun 1987. Menit ketiga: \"Jangan telat ya.\"" },
            { label: "Balas \"Baik, Pak\" tanpa dengerin", tag: "cuek", efek: { sabar: 5 },
              hasil: "Pak Hartono bales jempol. Aman.",
              gagal: { peluang: 0.4, efek: { sabar: -20 },
                hasil: "Isinya ternyata nanya \"Kamu bawa dokumen kontrak?\". Jawabanmu \"Baik, Pak\" gak nyambung. Dia kirim voice note lagi. Empat menit." } },
          ],
        },
        {
          wajib: true, minigame: "dorong",
          teks: "Pondok Ranji. Kamu berdiri di depan pintu. Yang turun sedikit, yang naik banyak, yang mau naik lebih banyak lagi. Arusnya dua arah, dan kamu di tengah.",
          menang: { tag: "nekat", efek: { stamina: -15 },
            hasil: "Kamu nancep. Pintu nutup. Kamu masih di dalam, dengan muka nempel kaca." },
          kalah: { efek: { jam: 9, sabar: -20 },
            hasil: "Kamu kebawa arus yang turun. Pintu nutup. Kamu sendirian di peron Pondok Ranji, nunggu kereta berikutnya." },
        },
      ],
    },

    {
      nama: "Kebayoran – Palmerah", pendek: "KBY", waktu: 8, ambil: 1, stamina: -8,
      event: [
        {
          wajib: true,
          teks: "Kebayoran. Kamu kegencet pas pintu nutup. Badanmu di dalam, tali ranselmu kejepit di luar. Kereta mulai jalan.",
          pilihan: [
            { label: "Tarik sekuat tenaga", tag: "nekat", efek: { stamina: -15 },
              hasil: "Talinya lepas. Ransel selamat, rantang selamat.",
              gagal: { peluang: 0.4, efek: { stamina: -15, sabar: -20 },
                hasil: "Talinya putus. Ranselnya jatuh ke dalam, rantangnya bunyi \"klontang\". Satu gerbong noleh." } },
            { label: "Biarin sampai Palmerah", tag: "pasrah", efek: { sabar: -10 },
              hasil: "Satu stasiun dengan tali ransel di luar kereta. Ranselmu menikmati angin Jakarta." },
            { label: "Lepas ransel dari bahu, pegang talinya", tag: "cerdik", efek: { stamina: -5 },
              hasil: "Kamu pegang tali erat-erat. Di Palmerah pintu kebuka, ransel kembali ke pelukan." },
          ],
        },
        {
          teks: "Kebayoran. Setengah gerbong turun. Kursi kosong! Tinggal dua stasiun.",
          pilihan: [
            { label: "Duduk", tag: "pasrah", efek: { stamina: 15 },
              hasil: "Duduk enam menit. Kakimu nangis bahagia.",
              gagal: { peluang: 0.3, efek: { jam: 15, stamina: 15 },
                hasil: "Kamu ketiduran. Kebangun, kereta udah balik arah dari Tanah Abang dan berhenti di Palmerah. Kamu nyebrang, balik lagi." } },
            { label: "Tetap berdiri dekat pintu", tag: "cerdik", efek: {},
              hasil: "Duduk berarti tidur, tidur berarti balik ke Rangkasbitung. Kamu tahu diri." },
          ],
        },
        {
          teks: "Palmerah. Mas-mas naik bawa tripod dan tas kamera segede koper. Kaki tripodnya nyodok tulang keringmu.",
          pilihan: [
            { label: "\"Mas, tripodnya...\"", tag: "baper", efek: { sabar: -5 },
              hasil: "\"Eh, sori, Mas.\" Tripodnya pindah. Ke tulang kering orang lain." },
            { label: "Tahan, cuma satu stasiun", tag: "pasrah", efek: { stamina: -5, sabar: -10 },
              hasil: "Satu stasiun. Satu memar. Satu cerita buat makan siang." },
          ],
        },
      ],
    },

    {
      nama: "Tanah Abang", pendek: "THB", waktu: 3, ambil: 0,
      event: [
        {
          wajib: true,
          teks: "Tanah Abang, stasiun terakhir. Pintu kebuka dan seluruh kereta turun bersamaan. Satu kereta penuh, satu arah, satu tangga.",
          pilihan: [
            { label: "Ikut arus", tag: "pasrah", efek: { jam: 4, stamina: -10 },
              hasil: "Kamu kebawa ke tangga paling jauh dari pintu keluar. Arus gak peduli tujuanmu." },
            { label: "Lawan arus ke tangga yang dekat kantor", tag: "nekat", efek: { jam: 1, stamina: -20 },
              hasil: "Kamu nembus arus kayak ikan salmon. Berhasil, dengan memar dan satu sepatu hampir copot." },
            { label: "Tunggu di dalam kereta sampai sepi", tag: "cerdik", efek: { jam: 5, sabar: 10 },
              hasil: "Lima menit kemudian peron sepi. Kamu turun santai kayak orang kaya.",
              gagal: { peluang: 0.3, efek: { jam: 14, sabar: -15 },
                hasil: "Kamu terlalu santai. Pintu nutup, kereta balik arah ke Palmerah. Kamu turun di Palmerah dan naik lagi." } },
          ],
        },
      ],
    },

    SEGMEN[SEGMEN.length - 1],   // Last Mile ke Kantor, sama dengan level Bogor
  ],
});
