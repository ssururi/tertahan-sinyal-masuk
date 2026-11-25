// =====================================================================
//  KONTEN GAME "TERTAHAN SINYAL MASUK" — edit di sini, gak perlu buka index.html
// ---------------------------------------------------------------------
//  Segmen : nama, pendek (label progress bar), waktu (menit tempuh normal),
//           ambil (berapa event acak diundi), event[]
//           Event yang kepilih tampil sesuai URUTAN di file ini.
//  Event  : teks, notif? {dari, teks}, pilihan[]
//           wajib: true        -> selalu muncul
//           syarat: "flag"     -> muncul kalau flag itu udah nyala (lihat daftar flag di bawah)
//           peluang: 0.5       -> (bareng syarat) cuma 50% kemungkinan muncul
//           minigame: "pintu" | "rem" | "dorong" | "turun" -> pakai menang/kalah (+kecepetan buat "turun")
//  Pilihan: label, tag, efek {jam, stamina, sabar}, hasil, set?, gagal?
//           jam = menit tambahan (minus = lebih cepat), stamina/sabar = naik/turun (maks 100)
//           set: "flag"        -> nyalain flag buat event berikutnya
//           gagal: { peluang: 0.4, efek, hasil } -> 40% kemungkinan ini yang kejadian
//  Tag    : pahlawan, nekat, cerdik, pasrah, cuek, baper (nentuin julukan di akhir)
//  Flag   : inka, sf8, hujan (dari lotre awal), ranselBelakang, kursiIbu, puraTidur, ngantuk,
//           bahu, siaga, jalurBekasi, tipsPintu, tipsRem, tipsDorong, jalanPintas (tips dari mentor)
//  Level  : tiap file konten manggil LEVEL.push({...}) di paling bawah. Level hijau ada di events-hijau.js.
//  Di teks hasil mini-game "turun", {stasiun} diganti nama stasiun tempat kamu turun.
// =====================================================================

// Lotre di awal game. Jumlah peluang rangkaian = 1.
const RANGKAIAN = [
  { nama: "KRL eks-Jepang 12 gerbong", pendek: "12 gerbong", peluang: 0.45,
    desc: "Dua belas gerbong. Pintu aman. Satu doa terkabul." },
  { nama: "KRL 8 gerbong", pendek: "8 gerbong", flag: "sf8", peluang: 0.25,
    desc: "Delapan gerbong di jam sibuk. Penumpang jatah 12 gerbong bakal dijejelin ke 8. Matematika yang kejam." },
  { nama: "KRL INKA", pendek: "INKA", flag: "inka", peluang: 0.30,
    desc: "Rangkaian INKA. Pintunya terkenal suka ngambek di stasiun padat. Siap-siap." },
];
const PELUANG_HUJAN = 0.4;

const JULUKAN = {
  pahlawan: "Pahlawan Kursi Prioritas",
  nekat: "Atlet Rebutan Pintu",
  cerdik: "Suhu KRL Junior",
  pasrah: "Penganut Aliran Pasrah",
  cuek: "Master Pura-Pura Tidur",
  baper: "Roker Gampang Kesulut",
};

// Pak Darto muncul sekali per perjalanan, di awal salah satu segmen 2–4.
// maksSeg: tips cuma ditawarin kalau masih berguna (segmen ke-berapa paling telat, mulai dari 0).
const PAK_DARTO = [
  {
    teks: "Bapak beruban, tas selempang lusuh, berdiri tanpa pegangan padahal kereta goyang. Pak Darto, 20 tahun jadi roker lintas Bogor. Dia ngelirik lanyard kantormu: \"Baru ya, Mas? Transit Manggarai?\"",
    pilihan: [
      { label: "\"Iya, Pak. Ada tips?\"", tag: "cerdik", set: "tipsPintu", efek: { sabar: 5 },
        hasil: "\"Kalau naik yang dari Bekasi, antre di pintu paling kanan. Orang numpuk di tengah, padahal kanan paling cepet.\" Kamu catat di kepala." },
      { label: "Senyum sopan, pasang headset", tag: "cuek", efek: {},
        hasil: "Pak Darto ngangguk, lalu merem sambil berdiri. Legenda gak maksa." },
    ],
  },
  {
    maksSeg: 1,
    teks: "Pak Darto, roker 20 tahun, dari tadi liatin kamu oleng tiap kereta ngerem. \"Kakinya salah, Mas.\"",
    pilihan: [
      { label: "\"Gimana yang bener, Pak?\"", tag: "cerdik", set: "tipsRem", efek: { stamina: 5 },
        hasil: "\"Kaki selebar bahu, lutut agak ditekuk, badan ikut arah kereta. Jangan dilawan.\" Kamu coba. Ajaib." },
      { label: "\"Aman, Pak, udah biasa\"", tag: "nekat", efek: { sabar: -5 },
        hasil: "Kereta ngerem. Kamu nubruk Pak Darto. Dia gak bergeser satu senti pun." },
    ],
  },
  {
    teks: "Pak Darto, roker 20 tahun, ngintip ID card kantormu. \"Kantor deket Tanah Abang? Jangan lewat jalan raya, Mas.\"",
    pilihan: [
      { label: "\"Terus lewat mana, Pak?\"", tag: "cerdik", set: "jalanPintas", efek: {},
        hasil: "\"Keluar, belok ke gang samping ruko kain. Tembus belakang gedungmu.\" Kamu simpan di Notes HP." },
      { label: "\"Jalan raya kan aman, Pak\"", tag: "pasrah", efek: { sabar: -5 },
        hasil: "Pak Darto ketawa kecil. Ketawa orang yang tahu sesuatu." },
    ],
  },
];

const SEGMEN = [
  {
    nama: "Peron Bogor", pendek: "BOO", waktu: 5, ambil: 1,
    event: [
      {
        wajib: true,
        teks: "Stasiun Bogor, pagi buta. Antrean tap-in udah mengular sampai Taman Topi. Separuh Kota Bogor ternyata kerja di Jakarta.",
        pilihan: [
          { label: "Antre manis", tag: "pasrah", efek: { jam: 5, sabar: -5 },
            hasil: "Depanmu bapak-bapak sarapan lontong sambil jalan. Belakangmu mbak-mbak voice note ke pacarnya. Lima menit penuh pelajaran hidup." },
          { label: "Gate paling pojok, kok sepi?", tag: "cerdik", efek: { jam: 1 },
            hasil: "Sepi karena orang belum tahu. Tit. Lolos. Pak satpam ngangguk kecil: respect.",
            gagal: { peluang: 0.5, efek: { jam: 7, sabar: -10 },
              hasil: "Sepi karena rusak. Layar: KARTU TIDAK TERBACA. Kamu balik ke antrean. Dari belakang." } },
          { label: "Nyelip dikit di antara ibu-ibu", tag: "nekat", efek: { jam: 1, stamina: -5 },
            hasil: "Lolos pakai teknik \"permisi, Bu, permisi\" tanpa nunggu jawaban.",
            gagal: { peluang: 0.5, efek: { jam: 4, sabar: -20 },
              hasil: "\"MAS. ANTRE.\" Satu antrean noleh barengan kayak paduan suara. Kamu mundur pelan-pelan." } },
        ],
      },
      {
        syarat: "hujan",
        teks: "Hujan deras dari subuh. Atap peron Bogor bocor pas di atas tempatmu nunggu. Ember petugas di sebelahmu udah penuh.",
        pilihan: [
          { label: "Pindah ke ujung peron yang kering", tag: "cerdik", efek: { stamina: -5, jam: 2 },
            hasil: "Kering. Tapi jauh dari tangga, dan semua orang punya ide yang sama." },
          { label: "Buka payung di peron", tag: "nekat", efek: { sabar: -10 },
            hasil: "\"Mas, payungnya!\" Tetesan dari payungmu jatuh ke tiga orang di sebelah. Sekarang kamu kering, mereka dendam." },
          { label: "Tahan, nanti juga kering di kereta", tag: "pasrah", efek: { sabar: -15 },
            hasil: "Pundak kirimu basah. Di kereta nanti gak kering. Di kereta nanti lembap." },
        ],
      },
      {
        syarat: "sf8",
        teks: "\"Kereta yang akan masuk di jalur 3 adalah KRL 8 gerbong.\" Kamu udah nunggu di posisi gerbong 10. Keretanya berhenti 50 meter di depan.",
        pilihan: [
          { label: "Lari ke depan", tag: "nekat", efek: { stamina: -15 },
            hasil: "Kamu sprint bareng 200 orang lain yang nasibnya sama. Masuk gerbong 8 dengan napas habis." },
          { label: "Jalan santai, kereta gak bakal ninggal", tag: "pasrah", efek: { stamina: -5 },
            hasil: "Masinisnya nungguin. Hari ini dia baik.",
            gagal: { peluang: 0.55, efek: { jam: 8, sabar: -15 },
              hasil: "Pintu nutup pas kamu tinggal lima langkah. Kereta jalan. Kamu nunggu kereta berikutnya, kali ini berdiri di posisi yang benar." } },
        ],
      },
      {
        teks: "Tit-tot. Gate nolak kamu. Layar: SALDO TIDAK MENCUKUPI. Kemarin saldonya kepake bayar tol abangmu.",
        pilihan: [
          { label: "Isi ulang di loket", tag: "pasrah", efek: { jam: 6, sabar: -5 },
            hasil: "Antre loket, top up, antre gate lagi. Di kepalamu, Pak Hartono: \"Saya dulu naik bis kota...\"" },
          { label: "Top up via m-banking, berdiri di depan gate", tag: "cerdik", efek: { jam: 2 },
            hasil: "Sinyal kuat, saldo masuk, tit, lolos. Orang di belakangmu tepuk tangan dalam hati.",
            gagal: { peluang: 0.5, efek: { jam: 7, sabar: -15 },
              hasil: "Aplikasi minta update. 214 MB. Sinyal: E. Orang di belakangmu mulai bersenandung kesal." } },
        ],
      },
      {
        teks: "Ada dua kereta di peron. Jalur 3: penuh sesak, berangkat sekarang. Jalur 5: kosong melompong, \"segera diberangkatkan\". Roker tahu, \"segera\" itu bisa 5 menit, bisa 20.",
        pilihan: [
          { label: "Naik yang penuh, berangkat sekarang", tag: "nekat", efek: { stamina: -15 },
            hasil: "Berangkat on time. Kamu berdiri dari Bogor. Masih 16 stasiun lagi." },
          { label: "Naik yang kosong, incer duduk", tag: "cerdik", efek: { jam: 9, stamina: 20 },
            hasil: "Dapat duduk dekat jendela! Keretanya baru jalan 9 menit kemudian. Kaki bilang worth it, jam tangan bilang nggak." },
        ],
      },
      {
        teks: "Kamu jalan ke ujung peron. Gerbong paling ujung kelihatan lega banget. Kok bisa, ya?",
        pilihan: [
          { label: "Masuk, rezeki gak ke mana", tag: "nekat", efek: {}, hasil: "",
            gagal: { peluang: 1, efek: { jam: 3, sabar: -20 },
              hasil: "Stiker pink di mana-mana. Itu gerbong khusus wanita. Petugas: \"Mas. Salah gerbong.\" Seratus pasang mata nganterin kamu keluar." } },
          { label: "Curiga. Pindah ke gerbong sebelahnya", tag: "cerdik", efek: { stamina: -10 },
            hasil: "Insting roker kamu mulai tumbuh. Itu gerbong wanita. Kamu selamat, tapi gerbong sebelahnya penuh sesak." },
        ],
      },
      {
        notif: { dari: "Ibu", teks: "Mas nanti pulang mampir Cibinong ya ambil rengginang di Bude. Naik yg ke Nambo. Jgn lupa. Jgn lupa." },
        teks: "Baru masuk gerbong, HP getar.",
        pilihan: [
          { label: "Balas \"Siap, Bu 🙏\"", tag: "pahlawan", efek: { sabar: 5 },
            hasil: "Ibu bales stiker bunga \"Selamat Pagi\" resolusi 144p. Hati adem." },
          { label: "Read doang", tag: "cuek", efek: { sabar: -10 },
            hasil: "Centang biru. 30 detik kemudian: \"Kok cuma di-read?\" Lalu: \"Mas?\" Lalu: \"MAS.\"" },
        ],
      },
    ],
  },

  {
    nama: "Bojonggede – Citayam", pendek: "BJD", waktu: 15, ambil: 1,
    event: [
      {
        wajib: true,
        teks: "Bojonggede. Pintu kebuka dan penumpang masuk kayak ombak Pantai Selatan. Ranselmu masih di punggung.",
        pilihan: [
          { label: "Pindahin ransel ke depan", tag: "cerdik", efek: { stamina: -10 },
            hasil: "Ransel di dada, dompet aman, ruang lebih lega. Etika roker level dasar: lulus." },
          { label: "Tahan posisi, ransel biarin di belakang", tag: "nekat", set: "ranselBelakang", efek: { stamina: -10 },
            hasil: "Kamu jadi tembok hidup di depan pintu. Ranselmu jadi bantal tiga orang di belakang." },
          { label: "Mundur ke tengah, ransel tetap di punggung", tag: "pasrah", set: "ranselBelakang", efek: { sabar: -10 },
            hasil: "Kamu terjepit di antara ketiak dan ransel orang. Ranselmu sendiri? Entah di mana sekarang." },
        ],
      },
      {
        syarat: "sf8",
        teks: "Penumpang Bojonggede yang biasa kebagi ke 12 gerbong sekarang masuk ke 8. Kakimu udah gak napak lantai. Kamu berdiri karena ditopang orang.",
        pilihan: [
          { label: "Pasrah ngambang", tag: "pasrah", efek: { stamina: -10, sabar: -10 },
            hasil: "Kamu bergerak ke mana pun arus bergerak. Kayak plankton, tapi pakai kemeja kerja." },
          { label: "Teriak \"PENUH, PAK!\"", tag: "baper", efek: { stamina: -15 },
            hasil: "Petugas peron: \"Masih muat, masih muat!\" Dia ngedorong satu orang lagi masuk. Orang itu nempel ke kamu." },
          { label: "Atur napas, dada dikembangin", tag: "cerdik", efek: { stamina: -10 },
            hasil: "Teknik bertahan hidup KRL: ambil napas pas kereta ngerem, waktu semua orang condong ke depan." },
        ],
      },
      {
        wajib: true, minigame: "rem",
        teks: "Masinis lagi semangat: ngerem, ngegas, ngerem lagi. Kamu cuma dapat tali gantungan di ujung jari.",
        menang: { tag: "cerdik", efek: { stamina: -5 },
          hasil: "Kamu berdiri kokoh kayak roker 10 tahun. Mbak di sebelah ngelirik kagum. Mungkin." },
        kalah: { efek: { stamina: -15, sabar: -15 },
          hasil: "Kamu oleng dan nubruk bapak-bapak. \"Pegangan, Mas!\" Iya, Pak. Itu masalahnya." },
      },
      {
        wajib: true,
        teks: "Mas di depanmu pegangan dua tangan: kiri ke hand strap, kanan ke hand strap. Pose salib. Mukamu pas di antara dua keteknya. Dua-duanya aktif.",
        pilihan: [
          { label: "Tahan napas, nunduk", tag: "pasrah", efek: { sabar: -20 },
            hasil: "Kamu nunduk sampai Citayam. Ketek kiri, ketek kanan, kamu di tengah. Kayak roti lapis yang gak pernah minta dibuat." },
          { label: "Putar badan 180 derajat", tag: "cerdik", efek: { stamina: -10 },
            hasil: "Kamu muter pelan-pelan di ruang 30 senti. Sekarang di depanmu punggung orang. Kemewahan.",
            gagal: { peluang: 0.45, efek: { stamina: -10, sabar: -15 },
              hasil: "Kamu muter. Sekarang di depanmu ketek orang lain. Yang ini pakai jaket. Lebih parah." } },
          { label: "\"Mas, satu tangan aja bisa?\"", tag: "baper", efek: { sabar: 5 },
            hasil: "\"Oh, maaf, Mas.\" Dia nurunin satu tangan. Setengah masalah selesai.",
            gagal: { peluang: 0.5, efek: { sabar: -20 },
              hasil: "Dia natap kamu, lalu pegangan makin kencang. Dua-duanya. Ketiaknya makin terbuka." } },
        ],
      },
      {
        syarat: "hujan", peluang: 0.7,
        teks: "Mbak di sebelahmu masukin payung basah yang gak dilipet rapi. Ujungnya nempel ke celanamu. Tiap kereta goyang, rembesannya naik ke lutut.",
        pilihan: [
          { label: "Geser kaki", tag: "cerdik", efek: { stamina: -5 },
            hasil: "Kakimu pindah lima senti. Payungnya ikut pindah lima senti. Kayak jodoh.",
            gagal: { peluang: 0.5, efek: { stamina: -5, sabar: -10 },
              hasil: "Gak ada ruang buat geser. Kakimu cuma bisa pasrah, dan celanamu makin gelap." } },
          { label: "\"Mbak, payungnya...\"", tag: "baper", efek: { sabar: 5 },
            hasil: "Dia minta maaf dan masukin payungnya ke plastik. Ada orang baik di lintas Bogor.",
            gagal: { peluang: 0.4, efek: { sabar: -10 },
              hasil: "Dia minta maaf, lalu mindahin payungnya... ke celana orang lain. Masalah didelegasikan." } },
          { label: "Pasrah, celana basah", tag: "pasrah", efek: { sabar: -15 },
            hasil: "Celana kerjamu sekarang dua warna: atas kering, bawah gelap. Fashion." },
        ],
      },
      {
        teks: "Kereta melambat, lalu berhenti di tengah sawah. \"Mohon maaf, terjadi gangguan persinyalan antara Bojonggede dan Citayam.\" Satu gerbong menghela napas barengan.",
        pilihan: [
          { label: "Ngeluh di grup WA trainee", tag: "baper", efek: { jam: 8, sabar: -5 },
            hasil: "Rara bales: \"Semangat ya! Aku udah di kantor 😊\". Rara ini manusia apa bukan sih." },
          { label: "Merem, terima nasib", tag: "pasrah", efek: { jam: 8, stamina: 5 },
            hasil: "Kamu tidur berdiri sambil pegang hand strap. Skill roker tingkat menengah: terbuka." },
          { label: "Cek X, cari tahu ada apa", tag: "cerdik", efek: { jam: 8, sabar: 5 },
            hasil: "Info resmi: \"gangguan persinyalan\". Reply-nya: 2.000 orang yang juga lagi berhenti di sawah. Kamu gak sendirian." },
        ],
      },
      {
        teks: "Mbak di depanmu pakai eyeliner sambil berdiri. Keretanya lagi goyang. Kamu ikut deg-degan tiap ngerem.",
        pilihan: [
          { label: "Jadi tembok buat dia", tag: "pahlawan", efek: { stamina: -15 },
            hasil: "Kamu nahan dorongan dari belakang. Eyeliner-nya simetris sempurna. Kamu merasa jadi bagian dari karya seni." },
          { label: "Pura-pura gak lihat", tag: "cuek", efek: {},
            hasil: "Kereta ngerem. Terdengar \"YAH\" pelan dari depan. Kamu tetap gak lihat." },
          { label: "\"Mbak, abis Citayam jalurnya lurus\"", tag: "cerdik", efek: { sabar: 5 },
            hasil: "Dia nunggu. Lurus. Garisnya sempurna. Kamu baru sadar kamu hafal geometri lintas Bogor." },
        ],
      },
      {
        syarat: "inka",
        teks: "Rangkaian INKA beraksi. Di Citayam, pintu gerbong 5 gagal nutup. Buka. Tutup. Buka. Petugas teriak: \"Mundur! Jangan nyender pintu!\"",
        pilihan: [
          { label: "Bantu ngarahin penumpang mundur", tag: "pahlawan", efek: { jam: 5, stamina: -10 },
            hasil: "Kamu jadi asisten petugas dadakan. Pintu nutup di percobaan ketiga. Gak ada yang tepuk tangan, tapi kamu tahu." },
          { label: "Diam, pasrah", tag: "pasrah", efek: { jam: 7, sabar: -10 },
            hasil: "Buka. Tutup. Buka. Tutup. Tujuh kali. Kereta di belakang ikut tertahan. Satu lintas Bogor menderita bareng kamu." },
          { label: "Rekam buat konten", tag: "cuek", efek: { jam: 7, sabar: 5 },
            hasil: "Videomu dapat 12 views. Satu akun bot, satu lagi Ibu." },
        ],
      },
    ],
  },

  {
    nama: "Depok – UI", pendek: "DP", waktu: 12, ambil: 1,
    event: [
      {
        wajib: true,
        teks: "Depok. Setengah gerbong turun. Ajaib, kamu dapat duduk! Dua stasiun kemudian, ibu hamil naik dan berdiri persis di depanmu. Pin \"Ibu Hamil\" di tasnya kelihatan jelas.",
        pilihan: [
          { label: "Kasih kursi", tag: "pahlawan", set: "kursiIbu", efek: { stamina: -15, sabar: 10 },
            hasil: "\"Makasih ya, Mas.\" Kakimu langsung protes, tapi hati adem. Bapak di kursi sebelah ngangguk ke arahmu." },
          { label: "Pura-pura tidur", tag: "cuek", set: "puraTidur", efek: { stamina: 10, sabar: -10 },
            hasil: "Kamu merem. Tapi kamu tahu. Dia tahu. Satu gerbong tahu.",
            gagal: { peluang: 0.5, efek: { stamina: -5, sabar: -20 },
              hasil: "Petugas nyamperin: \"Mas, mohon kursinya.\" Kamu berdiri di bawah tatapan satu gerbong. Ibu itu ngelihatin mukamu agak lama." } },
          { label: "Colek mas yang duduk di kursi prioritas", tag: "baper", efek: { sabar: -5 },
            hasil: "Mas-nya bangun, ngasih kursi. Kamu tetap duduk dan entah kenapa merasa menang.",
            gagal: { peluang: 0.4, efek: { stamina: -10, sabar: -15 },
              hasil: "Mas-nya: \"Kenapa gak Mas aja?\" Skakmat. Kalian berdua akhirnya berdiri." } },
        ],
      },
      {
        syarat: "kursiIbu", peluang: 0.6,
        teks: "UI. Bapak di kursi sebelah yang tadi lihat kamu ngasih kursi bangun mau turun. Dia nepuk bahumu dan nunjuk kursinya.",
        pilihan: [
          { label: "Duduk, rezeki anak baik", tag: "pahlawan", efek: { stamina: 20 },
            hasil: "Kamu duduk. Hari ini karma lebih cepat dari KRL." },
          { label: "Kasih ke nenek di sebelah", tag: "pahlawan", efek: { stamina: -5, sabar: 15 },
            hasil: "Bapak tadi geleng-geleng kepala, terharu. Kamu calon orang suci lintas Bogor." },
        ],
      },
      {
        syarat: "inka",
        teks: "\"Mohon maaf, rangkaian mengalami gangguan pintu. Seluruh penumpang dimohon pindah ke rangkaian pengganti.\" Selamat, kamu dioper. Kursimu (kalau ada) resmi hilang.",
        pilihan: [
          { label: "Lari duluan ke rangkaian pengganti", tag: "nekat", efek: { jam: 6, stamina: -20 },
            hasil: "Kamu sprint kayak atlet SEA Games. Dapat tempat berdiri yang layak. Paru-parumu minta cuti." },
          { label: "Jalan santai, toh semua juga pindah", tag: "pasrah", efek: { jam: 8, sabar: -15 },
            hasil: "Kamu masuk paling akhir. Posisi: nempel di pintu, pipi di kaca. Pemandangannya bagus, sih." },
          { label: "Tunggu kereta berikutnya", tag: "cerdik", efek: { jam: 14, stamina: 10 },
            hasil: "Kamu duduk di bangku peron sambil nonton orang berjuang. Kereta berikutnya datang. Penuh juga. Tapi kamu udah istirahat." },
        ],
      },
      {
        teks: "Ibu-ibu di sebelahmu video call pakai speaker sama grup arisannya. Topiknya: menantu. Volumenya: maksimal.",
        pilihan: [
          { label: "Tegur sopan", tag: "baper", efek: { sabar: -10 },
            hasil: "\"Maaf, Bu, suaranya...\" Dia ngangguk, lalu bilang ke HP: \"Ini ada mas-mas negur.\" Sekarang satu arisan ngeliatin kamu." },
          { label: "Dengerin aja, lumayan", tag: "cuek", efek: { sabar: -5 },
            hasil: "Ternyata menantunya gak salah. Kamu pengen ikut komentar. Kamu menahan diri, dan itu melelahkan." },
          { label: "Pindah ke ujung gerbong", tag: "cerdik", efek: { stamina: -15 },
            hasil: "\"Geser dikit, Mas... geser...\" Lima menit nyelip. Ujung gerbong. Sunyi. Damai." },
        ],
      },
      {
        teks: "Depok Baru. Rombongan mahasiswa naik bawa maket dari stik es krim buat tugas. Sudut maketnya nyodok pinggangmu.",
        pilihan: [
          { label: "\"Dek, maketnya...\"", tag: "baper", efek: { sabar: -5 },
            hasil: "\"Maaf, Kak!\" Mereka geser. Kamu dipanggil Kak. Mendadak kamu merasa tua." },
          { label: "Bantuin pegangin maketnya", tag: "pahlawan", efek: { stamina: -10, sabar: 5 },
            hasil: "Kamu jagain maket gedung 12 lantai sampai UI. Mereka turun sambil bilang makasih. Semoga lulus, adik-adik." },
          { label: "Biarin", tag: "pasrah", efek: { sabar: -15 },
            hasil: "Maket nyodok tiap kereta ngerem. Sampai UI. Pinggangmu sekarang hafal bentuk maket itu." },
        ],
      },
    ],
  },

  {
    nama: "Pasar Minggu – Tebet", pendek: "PSM", waktu: 16, ambil: 1,
    event: [
      {
        wajib: true,
        teks: "Pasar Minggu. Banyak yang turun, ada satu kursi kosong. Pantes kosong: AC di atasnya netes. Pelan, tapi pasti.",
        pilihan: [
          { label: "Tetap duduk", tag: "pasrah", efek: { stamina: 20, sabar: -15 },
            hasil: "Tes. Tes. Bahu kirimu basah, tapi kakimu bahagia. Di Duren Kalibata rembesannya makin deras, kamu nyerah dan berdiri dekat pintu." },
          { label: "Berdiri aja", tag: "cerdik", efek: { stamina: -5 },
            hasil: "Kamu berdiri dekat pintu, kering dan bermartabat. Kursinya diambil bapak-bapak yang langsung kena tetes di ubun-ubun." },
        ],
      },
      {
        teks: "Gerbong mulai lega. AC dingin, goyangan kereta kayak ayunan bayi. Matamu berat banget.",
        pilihan: [
          { label: "Tidur bentar", tag: "pasrah", set: "ngantuk", efek: { stamina: 15 },
            hasil: "Tidur 7 menit paling berkualitas minggu ini. Kamu bangun dengan iler di lengan baju dan kepala masih berkabut." },
          { label: "Tahan melek, scroll HP", tag: "cuek", efek: { sabar: -10 },
            hasil: "40 video kucing kemudian, kamu melek tapi otakmu kosong." },
          { label: "Pasang alarm \"MANGGARAI!!!\"", tag: "cerdik", set: "siaga", efek: { stamina: 5 },
            hasil: "Tidur ayam dengan pengaman. Cara roker profesional." },
        ],
      },
      {
        teks: "Mbak di depanmu nyender di tiang pegangan. Seluruh punggung, seluruh tiang. Tiga orang di sekitarnya gak dapat pegangan. Kereta mulai ngerem.",
        pilihan: [
          { label: "\"Mbak, tiangnya buat bareng ya\"", tag: "baper", efek: { sabar: 5 },
            hasil: "Dia geser sambil minta maaf. Dunia masih punya harapan.",
            gagal: { peluang: 0.5, efek: { sabar: -20 },
              hasil: "Dia ngelirik, pasang headset. Kamu ngomong sama angin." } },
          { label: "Kuda-kuda, tanpa pegangan", tag: "nekat", efek: { stamina: -20 },
            hasil: "Kereta ngerem mendadak. Kamu oleng, tapi tetap berdiri. Core strength naik satu level." },
          { label: "Pegangan ke rak bagasi atas", tag: "cerdik", efek: { stamina: -10 },
            hasil: "Tanganmu terangkat kayak lagi absen. Pegal, tapi aman." },
        ],
      },
      {
        teks: "Ibu di sebelahmu buka kotak bekal pelan-pelan. Nasi uduk. Semur jengkol. Satu gerbong langsung tahu.",
        pilihan: [
          { label: "Diam, tahan lapar", tag: "pasrah", efek: { stamina: -10, sabar: -5 },
            hasil: "Perutmu bunyi. Keras. Ibu itu dengar dan nutup kotaknya sedikit lebih rapat." },
          { label: "Panggil petugas", tag: "baper", efek: { sabar: 5 },
            hasil: "Petugas: \"Bu, mohon tidak makan di kereta.\" Ibu itu natap kamu. Kamu baru dapat musuh seumur hidup." },
          { label: "\"Bu, kayaknya enak ya\"", tag: "nekat", efek: { stamina: 15 },
            hasil: "Ibu ketawa dan ngasih bakwan dari kotak kedua. Rezeki anak soleh.",
            gagal: { peluang: 0.6, efek: { sabar: -15 },
              hasil: "Ibu nutup kotak bekal pelan. Pelan sekali. Sambil natap matamu." } },
        ],
      },
      {
        notif: { dari: "Pak Hartono (Bos)", teks: "Dimas, meeting dimajukan jam 08.00 tepat ya. Saya dulu naik bis kota, tidak pernah telat." },
        teks: "HP getar di saku. Notif dari orang yang paling gak kamu harapkan.",
        pilihan: [
          { label: "Balas \"Siap, Pak! 🙏\"", tag: "pasrah", efek: { sabar: -15 },
            hasil: "Centang biru. Gak dibalas. Kamu natap layar 30 detik, berharap ada \"sip\"." },
          { label: "Screenshot ke grup trainee", tag: "baper", efek: { sabar: 10 },
            hasil: "Grup langsung rame. Ada yang kirim foto bis kota tahun 1987 dengan caption \"Pak Hartono muda\". Kamu ketawa sampai dilirik." },
          { label: "Read doang, fokus berdiri", tag: "cuek", efek: { sabar: -5 },
            hasil: "Strategi bertahan hidup: notif yang gak dibuka itu gak ada. Tapi kamu tetap kepikiran." },
        ],
      },
      {
        notif: { dari: "Ibu", teks: "📞 Memanggil..." },
        teks: "Gerbong lagi padat-padatnya, tanganmu kejepit di antara dua ransel. HP di saku getar terus.",
        pilihan: [
          { label: "Angkat, ngomong kenceng", tag: "pahlawan", efek: { sabar: -10 },
            hasil: "\"UDAH SAMPAI BELUM, MAS?\" \"BELUM, BU. MASIH PASAR MINGGU.\" \"KOK LAMA?\" Satu gerbong nunggu jawabanmu." },
          { label: "Reject, WA \"lg di krl bu\"", tag: "cuek", efek: { sabar: -10 },
            hasil: "Ibu bales: \"Kok di-reject? 😢\". Lalu: \"Ya udah.\" Pakai titik. Rasa bersalah naik dua level." },
        ],
      },
      {
        teks: "Mbak di sebelahmu tidur sambil berdiri. Kepalanya pelan-pelan mendarat di bahumu. Kelihatan capek banget. Kamu harus turun di Manggarai.",
        pilihan: [
          { label: "Biarin, kasihan", tag: "pahlawan", set: "bahu", efek: { sabar: 5 },
            hasil: "Bahumu resmi jadi bantal. Kamu gak berani gerak. Masalahnya, sekarang kamu juga gak bisa lihat papan info." },
          { label: "Geser pelan-pelan", tag: "cerdik", efek: { stamina: -5 },
            hasil: "Kamu geser milimeter demi milimeter. Dia pindah ke bahu orang lain tanpa bangun. Profesional." },
          { label: "Batuk kenceng", tag: "baper", set: "bahu", efek: { sabar: -5 },
            hasil: "Dia bangun kaget, natap kamu, lalu tidur lagi. Di bahumu. Kamu kalah." },
        ],
      },
      {
        syarat: "hujan", peluang: 0.7,
        teks: "Hujan bikin genangan di jalur antara Pasar Minggu dan Duren Kalibata. Kereta jalan pelan banget, kayak lagi ngarungin sungai.",
        pilihan: [
          { label: "Lihat ke luar jendela", tag: "pasrah", efek: { jam: 7, sabar: 5 },
            hasil: "Air cokelat, motor mogok, anak kecil main perahu kertas. Jakarta pagi hari, versi banjir." },
          { label: "Kabarin kantor bakal telat", tag: "cerdik", efek: { jam: 7 },
            hasil: "Bu Sri bales: \"Noted.\" Satu kata. Gak ada emoji. Kamu gak tahu itu artinya baik atau buruk." },
          { label: "Ngedumel ke penumpang sebelah", tag: "baper", efek: { jam: 7, sabar: -10 },
            hasil: "Penumpang sebelah ikut ngedumel. Lima menit kemudian satu gerbong ngedumel bareng. Solidaritas yang gak menyelesaikan apa-apa." },
        ],
      },
      {
        wajib: true,
        teks: "Antara Duren Kalibata dan Cawang, kereta berhenti. \"Mohon maaf, kereta tertahan menunggu sinyal masuk Manggarai.\" Manggarai masih tiga stasiun lagi. Antreannya udah sampai sini.",
        pilihan: [
          { label: "Hitung domba", tag: "pasrah", efek: { jam: 7, sabar: 5 },
            hasil: "Domba ke-412. Kereta jalan. Domba ke-200 sempat kamu kasih nama: Hartono." },
          { label: "Siap-siap di dekat pintu", tag: "cerdik", set: "siaga", efek: { jam: 7, stamina: -5 },
            hasil: "Kamu nyelip ke dekat pintu biar gampang turun di Manggarai. Penumpang lain ngelakuin hal yang sama. Kalian semua siap. Keretanya belum." },
          { label: "Ketuk-ketuk kaca dengan gelisah", tag: "baper", efek: { jam: 7, sabar: -15 },
            hasil: "Gak ngubah apa pun. Tapi lega. Lalu malu." },
        ],
      },
      {
        wajib: true, minigame: "dorong",
        teks: "Cawang. Kamu berdiri pas di depan pintu. Yang mau turun banyak, yang mau naik lebih banyak. Arus dari belakang mulai ngedorong kamu keluar.",
        menang: { tag: "nekat", efek: { stamina: -15 },
          hasil: "Kamu nancep kayak tiang listrik. Orang-orang turun lewat kiri-kananmu. Pintu nutup, kamu masih di dalam." },
        kalah: { efek: { jam: 9, sabar: -20 },
          hasil: "Kamu kedorong keluar sampai peron. Pas mau masuk lagi, pintu nutup tepat di depan hidungmu. Kereta jalan. Kamu sendirian di Cawang." },
      },
      {
        wajib: true, minigame: "turun",
        teks: "Kereta jalan lagi dari Cawang. Papan info di gerbong mati, suara pengumuman kresek-kresek, dan kereta berhenti-berhenti karena antre masuk Manggarai. Pencet TURUN pas kereta berhenti di Manggarai.",
        menang: { tag: "cerdik", efek: {},
          hasil: "\"...Manggarai.\" Kamu loncat keluar tepat waktu. Pintu nutup di belakangmu. Keren, walau gak ada yang lihat." },
        kecepetan: { efek: { jam: 9, sabar: -10 },
          hasil: "Kamu turun di {stasiun}. Pintu nutup, kereta pergi tanpa kamu. Kereta berikutnya sembilan menit lagi." },
        kalah: { efek: { jam: 15, sabar: -15 },
          hasil: "\"...{stasiun}.\" Kamu kebablasan. Nyebrang peron, balik ke Manggarai. Selamat datang di lingkaran setan lintas Bogor." },
      },
    ],
  },

  {
    nama: "Transit Manggarai", pendek: "MRI", waktu: 6, ambil: 0,
    event: [
      {
        wajib: true,
        teks: "Transit Manggarai. Kamu naik eskalator, ambil jalur kanan yang buat jalan. Bapak di depanmu berdiri diam di kanan. Dia pakai tongkat, dan satu kakinya pakai penyangga. Dari belakang: \"Mas, kanan buat jalan!\" Ke kamu.",
        pilihan: [
          { label: "Tegur, suruh dia jalan", tag: "baper", efek: { sabar: -25 },
            hasil: "\"Pak, kanan buat jalan...\" Bapaknya noleh pelan dan ngangkat tongkatnya sedikit. \"Maaf, Mas, kaki saya gak bisa buru-buru.\" Dia geser susah payah ke kiri. Kamu lewat. Cepat. Tapi sisa eskalator itu jadi yang terpanjang dalam hidupmu." },
          { label: "Diam di belakangnya", tag: "pahlawan", efek: { jam: 4, sabar: 5 },
            hasil: "Kamu berdiri diam dan pasang badan ke belakang: \"Sabar, Mas.\" Orang-orang ngedumel. Sampai atas, bapaknya nepuk lenganmu: \"Makasih ya, Nak.\" Empat menit yang gak kamu sesali." },
        ],
      },
      {
        syarat: "ranselBelakang", peluang: 0.5,
        teks: "Sampai atas, ranselmu kerasa enteng. Resletingnya kebuka. Ransel yang dari Bojonggede kamu biarin di punggung.",
        pilihan: [
          { label: "Cek isi ransel, panik", tag: "pasrah", efek: { jam: 2, sabar: -25 },
            hasil: "Dompet aman. Charger hilang. Roti bekal dari Ibu juga hilang. Siapa yang nyopet roti?" },
          { label: "Lapor petugas", tag: "cerdik", efek: { jam: 7, sabar: -10 },
            hasil: "Petugas nyatat dengan serius: 1 charger, 1 roti sobek. \"Lain kali ranselnya di depan, Mas.\" Iya, Pak." },
        ],
      },
      {
        wajib: true,
        teks: "Peron transit. Ada dua cara ke Tanah Abang. Jalur 1: kereta feeder Manggarai–Angke, berangkat dari sini, masih kosong, pasti dapat duduk. Jadwal berangkatnya: misteri. Jalur 2: kereta dari Bekasi lewat Tanah Abang. Lebih sering lewat, tapi udah penuh sejak Bekasi.",
        pilihan: [
          { label: "Jalur 1: duduk manis ke Angke", tag: "pasrah", efek: { jam: 6, stamina: 25 },
            hasil: "Keretanya kosong, kamu dapat duduk dekat jendela. Berangkat enam menit kemudian. Nikmat, tapi jam terus jalan.",
            gagal: { peluang: 0.55, efek: { jam: 16, stamina: 25 },
              hasil: "Kamu dapat duduk. Lalu nunggu. Lalu nunggu lagi. \"Mohon maaf, kereta tujuan Angke masih menunggu persilangan.\" Berangkat 16 menit kemudian. Kakimu segar, kariermu tidak." } },
          { label: "Jalur 2: kereta dari Bekasi", tag: "nekat", set: "jalurBekasi", efek: { jam: 1 },
            hasil: "Keretanya udah kelihatan masuk. Isinya penuh sampai kaca. Siap-siap rebutan." },
        ],
      },
      {
        syarat: "jalurBekasi", minigame: "pintu",
        teks: "Kereta dari Bekasi masuk peron. Jam puncak. Tiap pintu punya antrean, dan pintunya bakal nutup sebentar lagi.",
        menang: { tag: "nekat", efek: { stamina: -15 },
          hasil: "Kamu masuk! Kegencet di sambungan pintu, tapi MASUK." },
        kalah: { efek: { jam: 7, sabar: -15 },
          hasil: "Pintu nutup di depan mukamu. Kamu nunggu kereta Bekasi berikutnya, dengan sisa martabat." },
      },
    ],
  },

  {
    nama: "Sudirman – Tanah Abang", pendek: "THB", waktu: 8, ambil: 1,
    event: [
      {
        syarat: "jalurBekasi",
        teks: "Sudirman. Setengah gerbong turun: orang-orang bawa tumbler, lanyard, dan muka meeting jam 9. Kursi kosong di mana-mana!",
        pilihan: [
          { label: "Duduk, walau cuma 2 stasiun", tag: "pasrah", efek: { stamina: 10 },
            hasil: "Duduk empat menit. Paling nikmat seumur hidup.",
            gagal: { peluang: 0.35, efek: { jam: 11, stamina: 10 },
              hasil: "Kamu ketiduran 4 menit dan bangun di Duri. DURI. Nyebrang peron, balik ke Tanah Abang." } },
          { label: "Tetap berdiri dekat pintu", tag: "cerdik", efek: {},
            hasil: "Kamu tahu diri: duduk berarti tidur, tidur berarti Duri." },
        ],
      },
      {
        teks: "Pintu nutup di Karet. Tali ranselmu kejepit di luar.",
        pilihan: [
          { label: "Tarik sekuat tenaga", tag: "nekat", efek: { stamina: -10 },
            hasil: "Talinya lepas. Ransel selamat, harga diri juga.",
            gagal: { peluang: 0.4, efek: { stamina: -10, sabar: -20 },
              hasil: "Talinya putus. Ransel selamat, harga diri tidak." } },
          { label: "Minta tolong penumpang sebelah", tag: "cerdik", efek: { sabar: -5 },
            hasil: "Dua orang bantu narik. Kerja sama roker, indah, walau kamu malu." },
          { label: "Biarin, toh nanti kebuka", tag: "pasrah", efek: { sabar: -15 },
            hasil: "Di Tanah Abang pintu kebuka, ransel bebas. Kamu udah terlalu capek untuk peduli." },
        ],
      },
      {
        teks: "Tanah Abang. Semua penumpang turun barengan. Kamu bukan manusia lagi, kamu bagian dari arus.",
        pilihan: [
          { label: "Ikut arus", tag: "pasrah", efek: { jam: 3, stamina: -5 },
            hasil: "Kamu kebawa sampai tangga yang salah. Tapi setidaknya keluar." },
          { label: "Lawan arus ke tangga yang benar", tag: "nekat", efek: { stamina: -20 },
            hasil: "Kamu nembus arus kayak ikan salmon. Berhasil, dengan memar." },
          { label: "Tunggu reda di pinggir", tag: "cerdik", efek: { jam: 4, sabar: 5 },
            hasil: "Empat menit kemudian peron lengang. Kamu jalan santai kayak orang kaya." },
        ],
      },
      {
        teks: "Tanah Abang. Eskalator ke pintu keluar: mati. Tangganya: panjang. Penumpangnya: semua orang.",
        pilihan: [
          { label: "Lari naik tangga", tag: "nekat", efek: { stamina: -20 },
            hasil: "Kamu sampai atas dengan napas kayak abis lari 5K. Betis kananmu gemetar sendiri." },
          { label: "Ikut arus pelan", tag: "pasrah", efek: { jam: 4, stamina: -5 },
            hasil: "Satu anak tangga per tiga detik. Di anak tangga ke-27, kamu sempat merenungkan pilihan hidup." },
          { label: "Cari lift", tag: "cerdik", efek: { jam: 2 },
            hasil: "Liftnya kosong! Kamu naik sendirian sambil ngerasa sedikit bersalah.",
            gagal: { peluang: 0.5, efek: { jam: 6, sabar: -10 },
              hasil: "Liftnya ada. Antreannya juga: kursi roda, ibu bawa stroller, dan kamu. Kamu tahu diri, balik ke tangga." } },
        ],
      },
    ],
  },

  {
    nama: "Last Mile ke Kantor", pendek: "🏢", waktu: 6, ambil: 1,
    event: [
      {
        teks: "Antrean tap out Tanah Abang panjang sampai tangga. Gate ujung kosong, tapi lampunya kedip-kedip.",
        pilihan: [
          { label: "Antre biasa", tag: "pasrah", efek: { jam: 5 },
            hasil: "Lima menit yang kerasa lima jam." },
          { label: "Coba gate yang kedip-kedip", tag: "cerdik", efek: { jam: 1 },
            hasil: "Tit! Lolos. Kadang hidup memihakmu.",
            gagal: { peluang: 0.5, efek: { jam: 7, sabar: -15 },
              hasil: "KARTU TIDAK TERBACA. Kamu balik ke antrean, dari belakang." } },
        ],
      },
      {
        syarat: "jalanPintas",
        teks: "Kamu inget tips roker senior tadi: keluar, belok ke gang samping ruko kain.",
        pilihan: [
          { label: "Ikutin jalan pintas", tag: "cerdik", efek: { jam: -4 },
            hasil: "Gang sempit, ada kucing, ada abang kopi keliling. Tembus belakang gedungmu. Hemat empat menit. Roker senior memang legenda." },
          { label: "Lewat jalan biasa aja", tag: "pasrah", efek: {},
            hasil: "Kamu ragu sama gang sempit. Lewat jalan raya kayak rakyat biasa." },
        ],
      },
      {
        syarat: "hujan",
        teks: "Keluar stasiun, hujan makin deras. Kantor masih 600 meter. Anak-anak ojek payung udah siaga: \"Payung, Mas? Lima ribu!\"",
        pilihan: [
          { label: "Sewa ojek payung", tag: "pahlawan", efek: { jam: 4, sabar: 5 },
            hasil: "Kamu jalan di bawah payung, adik ojek payung hujan-hujanan di sebelahmu. Kamu kasih sepuluh ribu. Rasa bersalah tetap ada." },
          { label: "Lari nerobos", tag: "nekat", efek: { jam: 2, stamina: -10, sabar: -15 },
            hasil: "Sampai kantor basah kuyup. Satpam ngasih tisu dengan tatapan iba." },
          { label: "Tunggu reda di minimarket", tag: "pasrah", efek: { jam: 11, sabar: 5 },
            hasil: "Hujan reda 11 menit kemudian. Kamu udah beli roti, kopi, dan permen yang gak kamu butuhkan." },
        ],
      },
      {
        teks: "Keluar stasiun, ojek pangkalan nyapa: \"Kantor, Mas? Deket kok, lewat sini.\"",
        pilihan: [
          { label: "Naik ojek", tag: "nekat", efek: { jam: 8, sabar: -10 },
            hasil: "\"Deket\" versi abang ojek: muter lewat Jati Baru, kena macet. Rp25 ribu." },
          { label: "Jalan kaki", tag: "pasrah", efek: { jam: 5, stamina: -10 },
            hasil: "Lima menit jalan kaki. Keringat mulai tembus ke kemeja." },
        ],
      },
      {
        teks: "Trotoar depan stasiun penuh pengunjung pasar. Pedagang nawarin: \"Gamis, Mas! Tiga seratus!\"",
        pilihan: [
          { label: "Nyelip lincah", tag: "nekat", efek: { jam: 2, stamina: -15 },
            hasil: "Kamu zigzag di antara karung belanjaan. Lolos." },
          { label: "Ikut arus pelan", tag: "pasrah", efek: { jam: 6 },
            hasil: "Ritme pasar Tanah Abang gak bisa dilawan." },
          { label: "Beli satu buat Ibu", tag: "pahlawan", efek: { jam: 5, sabar: 10 },
            hasil: "Ibu pasti senang. Telat dikit, tapi anak berbakti." },
        ],
      },
      {
        teks: "Lobi kantor. Antrean lift panjang. Kantormu di lantai 23. Tangga darurat di pojok.",
        pilihan: [
          { label: "Antre lift", tag: "pasrah", efek: { jam: 5 },
            hasil: "Lima menit natap angka lantai. Di dalam lift: 18 orang dan satu bau gorengan." },
          { label: "Naik tangga darurat", tag: "nekat", efek: { jam: 2, stamina: -30 },
            hasil: "Lantai 23. Kamu sampai dengan muka kayak abis disiram. Tapi cepat." },
          { label: "Nyelip ke lift yang udah penuh", tag: "baper", efek: { jam: 1, sabar: -15 },
            hasil: "Tiiit. Kelebihan muatan. Semua orang lihat kamu. Kamu keluar, lalu masuk lagi pas ada yang turun di lantai 2." },
        ],
      },
      {
        syarat: "puraTidur", peluang: 0.8,
        teks: "Pintu lift kebuka. Di dalam: ibu hamil dari kereta tadi. Dia senyum. Di lehernya, ID card: \"Sri, Human Resources\".",
        pilihan: [
          { label: "Senyum, pura-pura gak kenal", tag: "cuek", efek: { sabar: -20 },
            hasil: "\"Tidurnya nyenyak tadi, Mas?\" Pintu lift nutup. 23 lantai terpanjang dalam hidupmu." },
          { label: "Minta maaf", tag: "pahlawan", efek: { sabar: -10 },
            hasil: "\"Maaf, Bu, tadi saya... capek.\" Bu Sri ngangguk pelan dan nyatat sesuatu di HP-nya. Kamu gak akan pernah tahu apa." },
        ],
      },
    ],
  },
];

LEVEL.push({
  id: "bogor",
  nama: "Lintas Bogor",
  warna: "#e23b3b",
  judul: "🔴 Rumah Ortu di Bogor",
  ringkas: "Lintas Bogor, transit Manggarai di jam puncak. Rangkaian INKA, 8 gerbong, dan sinyal masuk Manggarai.",
  intro: [
    "Minggu ini kamu pulang ke rumah Ortu di Bogor. Bogor → Depok → transit Manggarai → Tanah Abang.",
  ],
  bekal: "Bekal dari Ibu: satu kopi sachet (+25 stamina, sekali pakai).",
  start: 6 * 60 + 15,
  lotreJudul: "Kereta masuk peron Bogor. Rangkaian apa yang kamu dapat?",
  rangkaian: RANGKAIAN,
  kondisi: [
    { flag: "hujan", peluang: PELUANG_HUJAN,
      ya: "🌧️ Cuaca: hujan deras. Payung basah, celana lembap, dan genangan menantimu.",
      tidak: "☀️ Cuaca: cerah. Satu hal yang berjalan lancar hari ini." },
  ],
  mentor: PAK_DARTO,
  segmen: SEGMEN,
});
