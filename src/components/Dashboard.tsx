/**
 * Dashboard.tsx
 * Halaman Utama GeoXplore – Bab 1: Skala dan Jarak
 */

import React, { useState } from 'react';
import { ActiveTab, StudentProfile } from '../types/index.ts';
import { APP_INFO, BADGES } from '../data/kssmData.ts';
import {
  Compass,
  MapPin,
  Ruler,
  Route,
  PenTool,
  Map,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Trophy,
  Save,
  Check
} from 'lucide-react';

interface DashboardProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  setActiveTab: (tab: ActiveTab) => void;
  onSaveProfile: (name: string, className: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  student,
  setActiveTab,
  onSaveProfile
}) => {
  const [tempName, setTempName] = useState(student.name);
  const [tempClass, setTempClass] = useState(student.className);
  const [savedNotification, setSavedNotification] = useState(false);

  React.useEffect(() => {
    setTempName(student.name);
    setTempClass(student.className);
  }, [student.name, student.className]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(tempName, tempClass);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleResetToDefault = () => {
    const defaultName = 'Rayyan Firdaus bin Rohaizad';
    const defaultClass = '2 Cemerlang';
    setTempName(defaultName);
    setTempClass(defaultClass);
    onSaveProfile(defaultName, defaultClass);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Calculate overall completion percentage
  const subtopicKeys: (keyof StudentProfile['completedSubtopics'])[] = [
    'subtopic1',
    'subtopic2',
    'subtopic3',
    'subtopic4',
    'exercises',
    'geoquest'
  ];
  const completedCount = subtopicKeys.filter(
    (k) => student.completedSubtopics[k]
  ).length;
  const progressPercent = Math.round((completedCount / subtopicKeys.length) * 100);

  // Determine next subtopic to learn
  const getNextDestination = (): { tab: ActiveTab; label: string } => {
    if (!student.completedSubtopics.subtopic1) {
      return { tab: 'subtopic1', label: 'Mula 1.1: Skala' };
    }
    if (!student.completedSubtopics.subtopic2) {
      return { tab: 'subtopic2', label: 'Teruskan 1.2: Jarak' };
    }
    if (!student.completedSubtopics.subtopic3) {
      return { tab: 'subtopic3', label: 'Teruskan 1.3: Teknik Mengukur' };
    }
    if (!student.completedSubtopics.subtopic4) {
      return { tab: 'subtopic4', label: 'Teruskan 1.4: Makmal Peta' };
    }
    if (!student.completedSubtopics.exercises) {
      return { tab: 'exercises', label: 'Uji Minda & Latihan' };
    }
    if (!student.completedSubtopics.geoquest) {
      return { tab: 'geoquest', label: 'Cabaran Kuiz Geo-Quest' };
    }
    return { tab: 'glossary', label: 'Ulang Kaji & Sijil Pencapaian' };
  };

  const nextDest = getNextDestination();

  const subtopics = [
    {
      id: 'subtopic1' as ActiveTab,
      num: '1.1',
      title: 'Skala',
      desc: 'Kuasai maksud skala, skala lurus (mudah & penuh), skala penyata dan pecahan wakilan.',
      icon: Ruler,
      color: 'from-sky-500 to-blue-600',
      isCompleted: student.completedSubtopics.subtopic1,
      badgeName: 'Pakar Skala'
    },
    {
      id: 'subtopic2' as ActiveTab,
      num: '1.2',
      title: 'Jarak',
      desc: 'Bandingkan jarak mutlak (meter/km) dan jarak relatif berdasarkan kos dan masa perjalanan.',
      icon: Route,
      color: 'from-emerald-500 to-teal-600',
      isCompleted: student.completedSubtopics.subtopic2,
      badgeName: 'Jaguh Navigasi'
    },
    {
      id: 'subtopic3' as ActiveTab,
      num: '1.3',
      title: 'Menentukan Jarak Sebenar Menggunakan Skala',
      desc: 'Kuasai teknik mengukur jarak lurus (pembaris, jangka tolok, jalur kertas) dan melengkung (benang).',
      icon: PenTool,
      color: 'from-amber-500 to-orange-600',
      isCompleted: student.completedSubtopics.subtopic3,
      badgeName: 'Juruukur Mahir'
    },
    {
      id: 'subtopic4' as ActiveTab,
      num: '1.4',
      title: 'Menentukan Jarak Sebenar pada Peta',
      desc: 'Makmal Peta Topo Pekan Bestari: ukur jarak antara lokasi dan selesaikan masalah peta sebenar.',
      icon: Map,
      color: 'from-indigo-500 to-sky-700',
      isCompleted: student.completedSubtopics.subtopic4,
      badgeName: 'Kartografer Muda'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-6 sm:p-10 shadow-xl border border-slate-700/50">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md">
                KSSM Geografi Tingkatan 2
              </span>
              <span>·</span>
              <span className="text-slate-300">Buku Teks ms 2–15</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {APP_INFO.title}
              <span className="block text-sky-400 text-2xl sm:text-3xl lg:text-4xl mt-1">
                {APP_INFO.chapter}
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Selamat datang ke platform eksplorasi interaktif! Kuasai kemahiran membaca skala, mengira jarak mutlak dan relatif, menggunakan benang dan jangka tolok, serta merungkai rahsia peta geografi.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab(nextDest.tab)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{nextDest.label}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('exercises')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Latihan Pengukuhan</span>
              </button>
            </div>
          </div>

          {/* Student Profile & Progress Card */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Profil Murid & Status
                </h2>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                {progressPercent}% Siap
              </span>
            </div>

            {/* Form Name & Class */}
            <form onSubmit={handleSave} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nama Murid
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Contoh: Rayyan Firdaus bin Rohaizad"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tingkatan / Kelas
                </label>
                <input
                  type="text"
                  value={tempClass}
                  onChange={(e) => setTempClass(e.target.value)}
                  placeholder="Contoh: 2 Cemerlang"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    {savedNotification ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Disimpan!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Profil</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    title="Set semula ke Rayyan Firdaus bin Rohaizad (2 Cemerlang)"
                    className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    Set Semula Asal
                  </button>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Skor Terbaik: {student.quizHighScore}/10</span>
                </div>
              </div>
            </form>

            {/* Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-700">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>Kemajuan Pembelajaran Bab 1</span>
                <span className="font-mono text-emerald-400 font-semibold">{completedCount} / 6 Modul</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtopics Cards Section (1.1 - 1.4) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Subtopik Pembelajaran KSSM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih subtopik di bawah untuk meneroka konsep dan menjalankan simulasi interaktif.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Standard Kandungan: <strong className="text-slate-800">{APP_INFO.standardKandungan}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subtopics.map((sub) => {
            const Icon = sub.icon;
            return (
              <div
                key={sub.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                          Subtopik {sub.num}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {sub.title}
                        </h3>
                      </div>
                    </div>

                    {sub.isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selesai
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Belum Selesai</span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {sub.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lencana: {sub.badgeName}</span>
                  </div>

                  <button
                    onClick={() => setActiveTab(sub.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Teroka Modul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Objectives & Pedagogical Framework */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-50 border border-slate-200/80 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">
              Standard Pembelajaran (DSKP Geografi T2)
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Di akhir bab ini, murid berupaya mencapai objektif pembelajaran berikut:
          </p>

          <div className="space-y-2.5">
            {APP_INFO.standardPembelajaran.map((sp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/60 text-xs sm:text-sm text-slate-700"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{sp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Achievement Grid */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900">
                Koleksi Lencana
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {student.unlockedBadges.length} / {BADGES.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Selesaikan modul dan cabaran kuiz untuk membuka lencana kejuaraan anda.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {BADGES.map((b) => {
              const isUnlocked = student.unlockedBadges.includes(b.id);
              return (
                <div
                  key={b.id}
                  title={`${b.title}: ${b.description}`}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    isUnlocked
                      ? 'bg-amber-50/70 border-amber-300 text-amber-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="w-7 h-7 mx-auto rounded-full flex items-center justify-center bg-white shadow-xs mb-1">
                    <Sparkles
                      className={`w-4 h-4 ${
                        isUnlocked ? 'text-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] font-bold truncate">{b.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {isUnlocked ? 'Terbuka' : 'Terkunci'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
