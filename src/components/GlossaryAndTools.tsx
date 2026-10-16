/**
 * GlossaryAndTools.tsx
 * Glosari Kad Imbasan, Kalkulator Pintar & Sijil Pencapaian KSSM
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  Award,
  Printer,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { FLASHCARDS, BADGES, APP_INFO } from '../data/kssmData.ts';
import { StudentProfile } from '../types/index.ts';

interface GlossaryProps {
  student: StudentProfile;
}

export const GlossaryAndTools: React.FC<GlossaryProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'calculator' | 'certificate'>('flashcards');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Unit Converter state
  const [inputVal, setInputVal] = useState<number>(5);
  const [inputUnit, setInputUnit] = useState<'cm' | 'm' | 'km'>('cm');
  const [converterScale, setConverterScale] = useState<number>(100000); // 1:100,000

  const currentCard = FLASHCARDS[cardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  // Unit calculations
  const calculateConverted = () => {
    let meters = 0;
    if (inputUnit === 'cm') meters = inputVal / 100;
    if (inputUnit === 'm') meters = inputVal;
    if (inputUnit === 'km') meters = inputVal * 1000;

    const cm = meters * 100;
    const km = meters / 1000;

    // Ground distance if input was map cm
    const groundKm = (cm * (converterScale / 100000)) / 100; // in km

    return {
      cm: Number(cm.toFixed(2)),
      m: Number(meters.toFixed(2)),
      km: Number(km.toFixed(4)),
      groundKm: Number(((cm * converterScale) / 10000000).toFixed(3))
    };
  };

  const conv = calculateConverted();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Alat Ulang Kaji & Pengiktirafan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Glosari, Kalkulator & Sijil Pencapaian
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ulang kaji istilah penting, buat kiraan pantas dan cetak sijil kejayaan anda.
            </p>
          </div>

          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kad Imbasan
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kalkulator Unit
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'certificate'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sijil Pencapaian
            </button>
          </div>
        </div>
      </div>

      {/* 1. FLASHCARDS TAB */}
      {activeTab === 'flashcards' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Kad {cardIndex + 1} daripada {FLASHCARDS.length}</span>
            <span>Klik kad untuk membalikkan dan melihat takrifan</span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-xl mx-auto h-80 rounded-2xl bg-white border-2 border-slate-200 hover:border-sky-400 cursor-pointer shadow-md transition-all duration-300 p-8 flex flex-col justify-between text-center select-none group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-sky-600 uppercase tracking-wider">
                {currentCard.subtopic}
              </span>
              <span className="flex items-center gap-1 text-[11px] group-hover:text-sky-600">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? 'Pusing ke Hadapan' : 'Pusing ke Takrifan'}
              </span>
            </div>

            {/* Card Content based on flip state */}
            {!isFlipped ? (
              <div className="space-y-3 my-auto">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">
                  Istilah Geografi
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                  {currentCard.term}
                </h3>
                <p className="text-xs text-slate-500">
                  (Klik untuk membaca takrifan rasmi KSSM)
                </p>
              </div>
            ) : (
              <div className="space-y-3 my-auto text-left">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Takrifan KSSM:
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed mt-1">
                    {currentCard.definition}
                  </p>
                </div>

                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-900 space-y-0.5">
                  <span className="font-bold block">Contoh Buku Teks:</span>
                  <p className="text-slate-700">{currentCard.example}</p>
                </div>
              </div>
            )}

            <div className="text-[11px] text-slate-400">
              Kad Imbasan GeoXplore · Tingkatan 2
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevCard}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelum</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Pusing Kad</span>
            </button>

            <button
              onClick={handleNextCard}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all"
            >
              <span>Seterusnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 2. CALCULATOR TAB */}
      {activeTab === 'calculator' && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Kalkulator Pertukaran Unit & Jarak Sebenar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Masukkan Nilai Ukuran:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputVal}
                    onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                  <select
                    value={inputUnit}
                    onChange={(e) => setInputUnit(e.target.value as any)}
                    className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="cm">Sentimeter (cm)</option>
                    <option value="m">Meter (m)</option>
                    <option value="km">Kilometer (km)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Skala Peta Rujukan:
                </label>
                <select
                  value={converterScale}
                  onChange={(e) => setConverterScale(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800"
                >
                  <option value={50000}>1 : 50,000 (1 cm mewakili 0.5 km)</option>
                  <option value={100000}>1 : 100,000 (1 cm mewakili 1.0 km)</option>
                  <option value={200000}>1 : 200,000 (1 cm mewakili 2.0 km)</option>
                  <option value={500000}>1 : 500,000 (1 cm mewakili 5.0 km)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <strong>Formula Kunci KSSM:</strong>
                <div>· 1 Kilometer = 1,000 Meter</div>
                <div>· 1 Meter = 100 Sentimeter</div>
                <div>· 1 Kilometer = 100,000 Sentimeter</div>
              </div>
            </div>

            {/* Results Display */}
            <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4">
              <span className="text-xs text-sky-400 font-bold uppercase tracking-wider block">
                Hasil Penukaran Serentak:
              </span>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Sentimeter (cm):</span>
                  <span className="text-white font-bold text-base">{conv.cm.toLocaleString('ms-MY')} cm</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Meter (m):</span>
                  <span className="text-emerald-400 font-bold text-base">{conv.m.toLocaleString('ms-MY')} m</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Kilometer (km):</span>
                  <span className="text-sky-400 font-bold text-base">{conv.km} km</span>
                </div>
              </div>

              {inputUnit === 'cm' && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs text-amber-300 block">
                    Jika {inputVal} cm ini diukur di atas peta berskala 1 : {converterScale.toLocaleString('ms-MY')}:
                  </span>
                  <div className="text-xl font-extrabold text-amber-400 font-mono mt-1">
                    Jarak Sebenar = {conv.groundKm} km
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. CERTIFICATE TAB */}
      {activeTab === 'certificate' && (
        <section className="space-y-6">
          <div className="flex justify-end no-print">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-all"
            >
              <Printer className="w-4 h-4 text-sky-400" />
              <span>Cetak / Muat Turun Sijil PDF</span>
            </button>
          </div>

          {/* Official Malaysian EdTech Certificate Canvas */}
          <div className="max-w-3xl mx-auto bg-white border-8 border-double border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center text-slate-800">
            {/* Watermark / Decorative Corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-600" />

            <div className="space-y-6 relative z-10">
              {/* Header Crest */}
              <div className="space-y-1">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-slate-500 pt-2">
                  Kementerian Pendidikan Malaysia · Kurikulum Standard Sekolah Menengah
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                  Sijil Pencapaian Pembelajaran
                </h2>
                <div className="text-xs text-sky-700 font-semibold font-mono">
                  PROGRAM PENEROKAAN GEOGRAFI TINGKATAN 2 (GEOXPLORE)
                </div>
              </div>

              <div className="text-xs text-slate-600">
                Dengan ini diperakui bahawa:
              </div>

              {/* Student Name */}
              <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
                <div className="text-2xl sm:text-3xl font-black text-slate-950 capitalize font-serif tracking-wide">
                  {student.name || 'Rayyan Firdaus bin Rohaizad'}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  Kelas / Tingkatan: {student.className || '2 Cemerlang'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                Telah berjaya menamatkan dan menguasai segala standard kandungan serta pentaksiran bagi:
                <br />
                <strong className="text-slate-900 font-bold text-sm">
                  BAB 1: SKALA DAN JARAK (KSSM GEOGRAFI TINGKATAN 2)
                </strong>
                <br />
                termasuk kemahiran mentafsir skala lurus, skala penyata, pecahan wakilan, ukuran benang & jangka tolok, serta pembacaan peta topografi.
              </p>

              {/* Earned Badges Strip */}
              <div className="py-3 border-y border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Lencana Kejuaraan yang Dianugerahkan:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {BADGES.map((b) => {
                    const isUnlocked = student.unlockedBadges.includes(b.id);
                    return (
                      <span
                        key={b.id}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                          isUnlocked
                            ? 'bg-amber-50 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <Award className={`w-3 h-3 ${isUnlocked ? 'text-amber-600' : 'text-slate-300'}`} />
                        <span>{b.title}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Signatures & Verification */}
              <div className="grid grid-cols-2 gap-8 pt-4 max-w-md mx-auto text-xs text-slate-600">
                <div>
                  <div className="font-mono text-slate-900 font-bold">
                    {new Date().toLocaleDateString('ms-MY', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="pt-1 border-t border-slate-400 mt-2">
                    Tarikh Pengiktirafan
                  </div>
                </div>

                <div>
                  <div className="font-serif italic font-bold text-slate-900 text-sm">
                    GeoXplore KSSM
                  </div>
                  <div className="pt-1 border-t border-slate-400 mt-2">
                    Guru Pembimbing / Sistem
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
