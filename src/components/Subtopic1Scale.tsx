/**
 * Subtopic1Scale.tsx
 * Modul 1.1 Skala (Buku Teks Geografi Tingkatan 2 KSSM, ms 4-6)
 */

import React, { useState } from 'react';
import {
  Ruler,
  CheckCircle2,
  ArrowRight,
  Calculator,
  HelpCircle,
  Lightbulb,
  Award,
  BookOpen
} from 'lucide-react';
import {
  penyataToRfDenominator,
  rfDenominatorToPenyataKm,
  calculateRealDistance
} from '../utils/geoCalculations.ts';
import confetti from 'canvas-confetti';

interface Subtopic1Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigateNext: () => void;
}

export const Subtopic1Scale: React.FC<Subtopic1Props> = ({
  onComplete,
  isCompleted,
  onNavigateNext
}) => {
  // Interactive Scale Explorer State
  const [selectedPenyataKm, setSelectedPenyataKm] = useState<number>(1);
  const [mapInputCm, setMapInputCm] = useState<number>(4.5);

  // Quick Check State
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  const rfDenominator = penyataToRfDenominator(selectedPenyataKm);
  const calculationResult = calculateRealDistance(mapInputCm, rfDenominator);

  const handleMarkComplete = () => {
    onComplete();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback safe
    }
  };

  const scalePresets = [
    { label: '1 cm mewakili 0.5 km', km: 0.5, rf: '1 : 50,000' },
    { label: '1 cm mewakili 1 km', km: 1.0, rf: '1 : 100,000' },
    { label: '1 cm mewakili 2 km', km: 2.0, rf: '1 : 200,000' },
    { label: '1 cm mewakili 5 km', km: 5.0, rf: '1 : 500,000' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Breadcrumb & Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Subtopik 1.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1.1 Skala
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Memahami nisbah jarak peta kepada jarak sebenar dan menguasai 3 jenis skala utama.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Modul Telah Dikuasai</span>
              </span>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Tandakan Selesai & Tebus Lencana</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Definisi Skala Card */}
      <section className="bg-gradient-to-r from-sky-50 via-white to-slate-50 border border-sky-100 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Ruler className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              Apakah yang Dimaksudkan dengan Skala?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Skala</strong> ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di atas permukaan bumi.
            </p>
            <div className="p-3 bg-white border border-sky-200 rounded-lg text-xs text-sky-950 font-mono">
              Formula: Skala = Jarak di Atas Peta ÷ Jarak Sebenar di Permukaan Bumi
            </div>
          </div>
        </div>
      </section>

      {/* 3 Jenis Skala Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          3 Jenis Skala dalam Geografi KSSM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Skala Lurus */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Skala Lurus
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garisan lurus yang dibahagikan kepada pecahan yang sama jaraknya. Terbahagi kepada dua jenis:
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">a) Skala Lurus Mudah:</span>
                <span className="text-slate-600">Garisan lurus berpetak seragam tanpa pecahan kecil di kiri 0.</span>
                <div className="mt-1 font-mono text-[11px] text-sky-700">
                  0 —— 1 —— 2 —— 3 —— 4 km
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800 block">b) Skala Lurus Penuh:</span>
                <span className="text-slate-600">Mempunyai pecahan lebih kecil (meter) di sebelah kiri angka sifar (0) untuk bacaan jitu.</span>
                <div className="mt-1 font-mono text-[11px] text-sky-700">
                  1000m  500m  0 —— 1 —— 2 —— 3 km
                </div>
              </div>
            </div>
          </div>

          {/* 2. Skala Penyata */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Skala Penyata
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skala yang dinyatakan dalam bentuk perkataan atau ayat yang mudah difahami oleh pembaca.
            </p>

            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg space-y-1.5 text-xs">
              <span className="font-semibold text-emerald-900 block">Contoh KSSM:</span>
              <div className="font-mono text-emerald-800">· "1 cm mewakili 1 km"</div>
              <div className="font-mono text-emerald-800">· "1 cm mewakili 2 km"</div>
              <p className="text-slate-600 pt-1 text-[11px]">
                Bermaksud: 1 cm panjang yang diukur pada peta mewakili 1 km jarak fizikal sebenar di bumi.
              </p>
            </div>
          </div>

          {/* 3. Pecahan Wakilan */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Pecahan Wakilan (RF)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skala yang dinyatakan dalam bentuk nisbah atau pecahan tanpa unit kerana kedua-duanya menggunakan unit yang sama (cm).
            </p>

            <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-lg space-y-1.5 text-xs">
              <span className="font-semibold text-amber-900 block">Contoh KSSM:</span>
              <div className="font-mono text-amber-900 font-bold">1 : 100,000</div>
              <p className="text-slate-600 pt-1 text-[11px]">
                1 cm di peta = 100,000 cm di bumi.
                <br />
                Kerana 100,000 cm = 1,000 m = 1 km, maka 1 : 100,000 sama nilainya dengan "1 cm mewakili 1 km".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scale Visualizer & Converter */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Penukar & Visualizer Skala Interaktif GeoXplore
            </h2>
          </div>
          <span className="text-xs text-slate-400">Eksplorasi Langsung</span>
        </div>

        {/* Preset Buttons */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Pilih Skala Peta (Preset KSSM):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scalePresets.map((preset) => {
              const isSelected = selectedPenyataKm === preset.km;
              return (
                <button
                  key={preset.km}
                  onClick={() => setSelectedPenyataKm(preset.km)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-300/40 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">{preset.label}</div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    RF {preset.rf}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live SVG Visual Scale Bars (Skala Lurus Mudah & Skala Lurus Penuh) */}
        <div className="space-y-4 p-5 rounded-xl bg-slate-900 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-slate-300">
            <span className="font-semibold text-emerald-400">
              Visualisasi Garisan Skala Lurus Penuh (Buku Teks ms 4):
            </span>
            <span className="font-mono text-sky-300">
              Skala Semasa: 1 cm mewakili {selectedPenyataKm} km (1 : {rfDenominator.toLocaleString('ms-MY')})
            </span>
          </div>

          {/* SVG Rendering */}
          <div className="overflow-x-auto py-2">
            <svg viewBox="0 0 700 110" className="w-full max-w-[700px] mx-auto text-slate-200 select-none">
              {/* Left side: Sub-divisions (meters) */}
              <rect x="50" y="45" width="100" height="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="150" y="45" width="100" height="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Sub-division ticks on the left */}
              <line x1="50" y1="40" x2="50" y2="64" stroke="#ffffff" strokeWidth="2" />
              <line x1="100" y1="42" x2="100" y2="62" stroke="#94a3b8" strokeWidth="1" />
              <line x1="150" y1="40" x2="150" y2="64" stroke="#ffffff" strokeWidth="2" />
              <line x1="200" y1="42" x2="200" y2="62" stroke="#94a3b8" strokeWidth="1" />
              <line x1="250" y1="36" x2="250" y2="68" stroke="#38bdf8" strokeWidth="3" />

              {/* Sub-division labels */}
              <text x="50" y="32" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="IBM Plex Mono">
                {Math.round(selectedPenyataKm * 1000)}m
              </text>
              <text x="150" y="32" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="IBM Plex Mono">
                {Math.round(selectedPenyataKm * 500)}m
              </text>
              <text x="250" y="30" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="13" fontFamily="IBM Plex Mono">
                0
              </text>

              {/* Main kilometer segments to the right */}
              <rect x="250" y="45" width="100" height="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="350" y="45" width="100" height="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="450" y="45" width="100" height="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="550" y="45" width="100" height="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Major kilometer ticks */}
              <line x1="350" y1="40" x2="350" y2="64" stroke="#ffffff" strokeWidth="2" />
              <line x1="450" y1="40" x2="450" y2="64" stroke="#ffffff" strokeWidth="2" />
              <line x1="550" y1="40" x2="550" y2="64" stroke="#ffffff" strokeWidth="2" />
              <line x1="650" y1="40" x2="650" y2="64" stroke="#ffffff" strokeWidth="2" />

              {/* Major labels */}
              <text x="350" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="IBM Plex Mono">
                {selectedPenyataKm}
              </text>
              <text x="450" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="IBM Plex Mono">
                {selectedPenyataKm * 2}
              </text>
              <text x="550" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="IBM Plex Mono">
                {selectedPenyataKm * 3}
              </text>
              <text x="650" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="IBM Plex Mono">
                {selectedPenyataKm * 4} km
              </text>

              {/* Helper legend */}
              <text x="150" y="85" textAnchor="middle" fill="#38bdf8" fontSize="10">
                ← Pecahan Kecil (Meter)
              </text>
              <text x="450" y="85" textAnchor="middle" fill="#38bdf8" fontSize="10">
                Pecahan Utama (Kilometer) →
              </text>
            </svg>
          </div>
        </div>

        {/* Real Distance Interactive Calculator Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Kalkulator Jarak Sebenar:</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Masukkan Jarak di Atas Peta (cm):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={mapInputCm}
                  onChange={(e) => setMapInputCm(parseFloat(e.target.value) || 0)}
                  className="w-32 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-slate-600">cm</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              Cuba ubah jarak di atas untuk melihat bagaimana perkiraan dibuat secara automatik.
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500">Hasil Pengiraan Jarak Sebenar:</div>
            <div className="text-2xl font-extrabold text-sky-600 font-mono">
              {calculationResult.realKm} km
              <span className="text-sm text-slate-500 font-normal ml-2">
                ({calculationResult.realMeters.toLocaleString('ms-MY')} meter)
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Langkah Pengiraan KSSM:
              </span>
              {calculationResult.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-600 font-mono">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Uji Minda Segera Subtopik 1.1 */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <h2 className="text-lg font-bold">
            Uji Minda Segera: Subtopik 1.1
          </h2>
        </div>

        <p className="text-sm text-slate-700 font-medium">
          Diberi skala penyata ialah <strong>"1 cm mewakili 2 km"</strong>. Apakah pecahan wakilan yang setaraf dengannya?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { label: 'A', text: '1 : 2,000' },
            { label: 'B', text: '1 : 20,000' },
            { label: 'C', text: '1 : 200,000', correct: true },
            { label: 'D', text: '1 : 2,000,000' }
          ].map((opt) => {
            const isSelected = selectedQuizAnswer === opt.text;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  setSelectedQuizAnswer(opt.text);
                  setShowQuizResult(true);
                }}
                className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                  isSelected
                    ? opt.correct
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="font-bold mr-2 text-slate-400">{opt.label}.</span>
                <span className="font-mono">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {showQuizResult && (
          <div
            className={`p-3.5 rounded-lg text-xs leading-relaxed ${
              selectedQuizAnswer === '1 : 200,000'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}
          >
            {selectedQuizAnswer === '1 : 200,000' ? (
              <div>
                <strong>Tepat Sekali!</strong> 1 km = 100,000 cm. Oleh itu, 2 km = 200,000 cm. Pecahan wakilan ialah <strong>1 : 200,000</strong>.
              </div>
            ) : (
              <div>
                <strong>Cuba Lagi!</strong> Ingat formula asas: 1 km = 100,000 cm. Maka 2 km = 2 × 100,000 = 200,000 cm (Pilihan C).
              </div>
            )}
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Seterusnya: <strong>Subtopik 1.2 Jarak</strong>
        </div>
        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Teruskan ke 1.2 Jarak</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
