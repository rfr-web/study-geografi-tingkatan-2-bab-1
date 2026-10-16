/**
 * Subtopic3MeasurementTechniques.tsx
 * Modul 1.3 Menentukan Jarak Sebenar Menggunakan Skala (Buku Teks Geografi Tingkatan 2 KSSM, ms 9-11)
 */

import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  ArrowRight,
  Crosshair,
  Ruler,
  Scissors,
  Activity,
  Award,
  HelpCircle,
  Lightbulb,
  RotateCcw
} from 'lucide-react';
import { calculateRealDistance } from '../utils/geoCalculations.ts';
import confetti from 'canvas-confetti';

interface Subtopic3Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigateNext: () => void;
}

export const Subtopic3MeasurementTechniques: React.FC<Subtopic3Props> = ({
  onComplete,
  isCompleted,
  onNavigateNext
}) => {
  // Measurement Mode: 'straight' vs 'curved'
  const [measurementMode, setMeasurementMode] = useState<'straight' | 'curved'>('straight');

  // Straight measurement state
  const [straightTool, setStraightTool] = useState<'pembaris' | 'jangka_tolok' | 'jalur_kertas'>('pembaris');
  const [straightDistanceCm, setStraightDistanceCm] = useState<number>(6.5);
  const [scaleDenominator, setScaleDenominator] = useState<number>(100000); // 1:100,000

  // Curved measurement state (River Simulation)
  const [curvedStep, setCurvedStep] = useState<number>(0);
  const riverWaypoints = [
    { x: 50, y: 140, label: 'Hulu Sungai (Puncak)' },
    { x: 120, y: 90, label: 'Liku 1' },
    { x: 210, y: 150, label: 'Liku 2' },
    { x: 300, y: 80, label: 'Liku 3' },
    { x: 400, y: 130, label: 'Liku 4' },
    { x: 500, y: 90, label: 'Liku 5' },
    { x: 590, y: 150, label: 'Muara Sungai' }
  ];

  // Quick Check State
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const straightResult = calculateRealDistance(straightDistanceCm, scaleDenominator);
  // Total river string equivalent length = 9.2 cm
  const riverTotalCm = 9.2;
  const curvedResult = calculateRealDistance(riverTotalCm, scaleDenominator);

  const handleMarkComplete = () => {
    onComplete();
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Breadcrumb & Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Subtopik 1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1.3 Menentukan Jarak Sebenar Menggunakan Skala
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kuasai teknik mengukur jarak lurus dan jarak melengkung menggunakan alat geografi yang betul.
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

      {/* 2 Kategori Kaedah Ukuran Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kaedah Jarak Lurus */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                1. Pengukuran Jarak Lurus
              </h3>
              <span className="text-xs text-sky-600">Jalan raya lurus, landasan api, garisan titik ke titik</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">a) Pembaris:</strong>
              Letakkan angka '0' pembaris tepat pada titik permulaan, kemudian baca nilai sentimeter (cm) pada titik akhir.
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">b) Jangka Tolok:</strong>
              Letakkan kedua-dua hujung jarum pada titik mula dan titik akhir. Pindahkan bukaan jarum ke pembaris atau skala lurus tanpa mengubah bukaannya.
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">c) Jalur Kertas:</strong>
              Gunakan tepi lurus sehelai kertas. Tandakan titik A dan B dengan pensel, kemudian ukur jaraknya di atas pembaris.
            </div>
          </div>
        </div>

        {/* Kaedah Jarak Melengkung */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                2. Pengukuran Jarak Melengkung
              </h3>
              <span className="text-xs text-amber-600">Sungai berliku-liku, pantai berteluk, jalan berbukit</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200">
              <strong className="text-amber-950 block mb-1">a) Kaedah Benang (Sangat Popular KSSM):</strong>
              Ikatkan simpul atau tandakan dakwat pada hujung benang. Susur benang rapat mengikut liku sungai atau jalan. Tandakan titik akhir, kemudian regangkan benang pada pembaris.
            </div>

            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200">
              <strong className="text-amber-950 block mb-1">b) Kaedah Jalur Kertas Melengkung:</strong>
              Tandakan titik permulaan pada tepi kertas. Pusingkan jalur kertas mengikut lengkungan kecil demi lengkungan kecil sambil menandakan setiap selekoh.
            </div>

            <div className="p-2.5 bg-white border border-amber-200 rounded-md text-[11px] text-amber-800">
              Petua Geografi: Benang mestilah ditegangkan dengan rata semasa mengukur di atas pembaris agar bacaan tidak ralat.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Virtual Measurement Lab */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-amber-600" />
              <span>Makmal Simulasi Ukuran Maya GeoXplore</span>
            </h2>
            <p className="text-xs text-slate-500">
              Lakukan praktikal pengukuran jarak lurus atau liku sungai melengkung.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setMeasurementMode('straight')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                measurementMode === 'straight'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simulasi Jarak Lurus
            </button>
            <button
              onClick={() => setMeasurementMode('curved')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                measurementMode === 'curved'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simulasi Benang (Melengkung)
            </button>
          </div>
        </div>

        {/* MODE A: STRAIGHT DISTANCE SIMULATOR */}
        {measurementMode === 'straight' && (
          <div className="space-y-6">
            {/* Tool Selection for straight */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Pilih Alat Ukuran:</span>
                {[
                  { id: 'pembaris', label: 'Pembaris', icon: Ruler },
                  { id: 'jangka_tolok', label: 'Jangka Tolok', icon: Crosshair },
                  { id: 'jalur_kertas', label: 'Jalur Kertas', icon: Scissors }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setStraightTool(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-medium transition-all ${
                      straightTool === t.id
                        ? 'bg-sky-50 border-sky-400 text-sky-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Scale Chooser */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Skala Peta:</span>
                <select
                  value={scaleDenominator}
                  onChange={(e) => setScaleDenominator(Number(e.target.value))}
                  className="px-2.5 py-1 text-xs rounded-md bg-white border border-slate-300 text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  <option value={50000}>1 : 50,000 (1 cm = 0.5 km)</option>
                  <option value={100000}>1 : 100,000 (1 cm = 1.0 km)</option>
                  <option value={200000}>1 : 200,000 (1 cm = 2.0 km)</option>
                </select>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="p-6 rounded-xl bg-slate-900 text-white relative overflow-hidden">
              <div className="text-xs text-sky-300 font-mono mb-2 flex justify-between">
                <span>Titik A: Rumah Danial (Kg. Sentosa)</span>
                <span>Titik B: SMK Pekan Bestari</span>
              </div>

              <div className="relative py-8 select-none">
                {/* SVG Visualizer */}
                <svg viewBox="0 0 700 130" className="w-full max-w-[700px] mx-auto">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="650" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50" y1="65" x2="650" y2="65" stroke="#334155" strokeWidth="1" />
                  <line x1="50" y1="110" x2="650" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Straight measured line */}
                  {/* Start Point A at x=80, End Point B at x = 80 + straightDistanceCm * 50 */}
                  <line
                    x1="80"
                    y1="65"
                    x2={80 + straightDistanceCm * 50}
                    y2="65"
                    stroke="#38bdf8"
                    strokeWidth="4"
                  />

                  {/* Marker Point A */}
                  <circle cx="80" cy="65" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                  <text x="80" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    A (0 cm)
                  </text>

                  {/* Marker Point B */}
                  <circle
                    cx={80 + straightDistanceCm * 50}
                    cy="65"
                    r="7"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={80 + straightDistanceCm * 50}
                    y="45"
                    fill="#34d399"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    B ({straightDistanceCm.toFixed(1)} cm)
                  </text>

                  {/* Virtual Tool Overlay */}
                  {straightTool === 'pembaris' && (
                    <g transform="translate(80, 85)">
                      <rect x="0" y="0" width={straightDistanceCm * 50 + 40} height="26" fill="#f8fafc" rx="3" stroke="#cbd5e1" />
                      {Array.from({ length: Math.ceil(straightDistanceCm) + 1 }).map((_, i) => (
                        <g key={i} transform={`translate(${i * 50}, 0)`}>
                          <line x1="0" y1="0" x2="0" y2="14" stroke="#0f172a" strokeWidth="1.5" />
                          <text x="0" y="22" fill="#0f172a" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Mono">
                            {i}
                          </text>
                        </g>
                      ))}
                    </g>
                  )}

                  {straightTool === 'jangka_tolok' && (
                    <g>
                      {/* Divider Needle Arms meeting at top */}
                      <circle cx={(80 + (80 + straightDistanceCm * 50)) / 2} cy="10" r="4" fill="#fbbf24" />
                      <line
                        x1={(80 + (80 + straightDistanceCm * 50)) / 2}
                        y1="10"
                        x2="80"
                        y2="63"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                      />
                      <line
                        x1={(80 + (80 + straightDistanceCm * 50)) / 2}
                        y1="10"
                        x2={80 + straightDistanceCm * 50}
                        y2="63"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                      />
                    </g>
                  )}

                  {straightTool === 'jalur_kertas' && (
                    <g transform="translate(70, 85)">
                      <rect x="0" y="0" width={straightDistanceCm * 50 + 20} height="20" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="10" y1="0" x2="10" y2="20" stroke="#b45309" strokeWidth="2" />
                      <line x1={straightDistanceCm * 50 + 10} y1="0" x2={straightDistanceCm * 50 + 10} y2="20" stroke="#b45309" strokeWidth="2" />
                      <text x="10" y="-4" fill="#fef08a" fontSize="10" textAnchor="middle">Tanda A</text>
                      <text x={straightDistanceCm * 50 + 10} y="-4" fill="#fef08a" fontSize="10" textAnchor="middle">Tanda B</text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Slider to adjust distance */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Laraskan Jarak Ukuran Peta:</span>
                  <span className="font-mono text-sky-400 font-bold">{straightDistanceCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={straightDistanceCm}
                  onChange={(e) => setStraightDistanceCm(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Mathematical Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                  Keputusan Jarak Sebenar di Bumi:
                </span>
                <div className="text-2xl font-extrabold text-sky-950 font-mono">
                  {straightResult.realKm} km
                  <span className="text-xs text-sky-700 font-normal ml-2">
                    ({straightResult.realMeters.toLocaleString('ms-MY')} meter)
                  </span>
                </div>
                <div className="text-xs text-sky-800 font-mono mt-1">
                  Formula: {straightDistanceCm.toFixed(1)} cm × {(scaleDenominator / 100000)} km = {straightResult.realKm} km.
                </div>
              </div>

              <div className="text-right text-xs text-slate-500">
                Alat: <strong className="capitalize text-slate-800">{straightTool.replace('_', ' ')}</strong>
                <br />
                Ketepatan: Jitu (Sesuai Garisan Lurus)
              </div>
            </div>
          </div>
        )}

        {/* MODE B: CURVED DISTANCE (BENANG) SIMULATOR */}
        {measurementMode === 'curved' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <p className="text-slate-600">
                Klik butang <strong>"Susur Benang Seterusnya"</strong> untuk menelusuri liku Sungai Jernih dari Hulu ke Muara.
              </p>
              <button
                onClick={() => setCurvedStep(0)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Semula</span>
              </button>
            </div>

            {/* River SVG Stage */}
            <div className="p-6 rounded-xl bg-slate-900 text-white relative">
              <div className="flex justify-between text-xs text-amber-300 font-mono mb-2">
                <span>Sungai Jernih (Liku Melengkung)</span>
                <span>Kemajuan Benang: {curvedStep} / {riverWaypoints.length - 1} Segmen</span>
              </div>

              <div className="py-4 select-none">
                <svg viewBox="0 0 650 200" className="w-full max-w-[650px] mx-auto">
                  {/* Background Winding River Path */}
                  <path
                    d="M 50 140 Q 120 40 210 150 T 400 130 T 590 150"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50 140 Q 120 40 210 150 T 400 130 T 590 150"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />

                  {/* Thread Layer (drawn based on curvedStep) */}
                  {curvedStep > 0 && (
                    <path
                      d={
                        curvedStep === 1
                          ? "M 50 140 Q 85 90 120 90"
                          : curvedStep === 2
                          ? "M 50 140 Q 120 40 210 150"
                          : curvedStep === 3
                          ? "M 50 140 Q 120 40 210 150 Q 255 115 300 80"
                          : curvedStep === 4
                          ? "M 50 140 Q 120 40 210 150 T 400 130"
                          : curvedStep === 5
                          ? "M 50 140 Q 120 40 210 150 T 400 130 Q 450 110 500 90"
                          : "M 50 140 Q 120 40 210 150 T 400 130 T 590 150"
                      }
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="4"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Waypoint Markers */}
                  {riverWaypoints.map((wp, idx) => {
                    const isReached = idx <= curvedStep;
                    return (
                      <g key={idx} transform={`translate(${wp.x}, ${wp.y})`}>
                        <circle
                          r={idx === 0 || idx === riverWaypoints.length - 1 ? "8" : "5"}
                          fill={isReached ? "#f59e0b" : "#475569"}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          y={idx % 2 === 0 ? 22 : -14}
                          textAnchor="middle"
                          fill={isReached ? "#fef3c7" : "#64748b"}
                          fontSize="10"
                          fontFamily="IBM Plex Mono"
                        >
                          {idx === 0 ? 'Hulu (A)' : idx === riverWaypoints.length - 1 ? 'Muara (B)' : `Liku ${idx}`}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Action controller */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  {curvedStep === 0 && 'Benang bersedia di Hulu Sungai.'}
                  {curvedStep > 0 && curvedStep < riverWaypoints.length - 1 && `Benang sedang disusur rapat mengikut liku ${curvedStep}...`}
                  {curvedStep === riverWaypoints.length - 1 && 'Selesai! Benang telah sampai ke Muara dan ditandakan dakwat.'}
                </div>

                {curvedStep < riverWaypoints.length - 1 ? (
                  <button
                    onClick={() => setCurvedStep((prev) => Math.min(riverWaypoints.length - 1, prev + 1))}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-xs transition-all shadow-sm"
                  >
                    Susur Benang Seterusnya →
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400 font-bold">
                      ✓ Benang Diluruskan Pada Pembaris
                    </span>
                    <button
                      onClick={() => setCurvedStep(0)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs"
                    >
                      Ulang Eksperimen
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Straightened River Measurement Results */}
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    Panjang Benang yang Diregangkan di Pembaris:
                  </span>
                  <div className="text-2xl font-extrabold text-amber-950 font-mono">
                    {riverTotalCm} cm
                  </div>
                </div>

                <div className="text-sm sm:text-right">
                  <span className="text-xs text-slate-600 block">Jarak Sebenar Sungai Jernih:</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-mono">
                    {curvedResult.realKm} km ({curvedResult.realMeters.toLocaleString('ms-MY')} meter)
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-700 pt-2 border-t border-amber-200/60">
                <strong>Langkah Pengiraan:</strong> Panjang benang (9.2 cm) × Skala (1 cm mewakili 1 km) = <strong>9.2 km</strong> di atas permukaan bumi.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Uji Minda Segera Subtopik 1.3 */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-bold">
            Uji Minda Segera: Subtopik 1.3
          </h2>
        </div>

        <p className="text-sm text-slate-700 font-medium">
          Mengapakah pembaris lurus TIDAK sesuai digunakan secara terus untuk mengukur panjang sungai berliku-liku di atas peta?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'A', text: 'Pembaris akan memadam dakwat pada peta topografi.' },
            { id: 'B', text: 'Pembaris lurus tidak dapat dibengkokkan mengikut liku sungai, menyebabkan ukuran menjadi kurang tepat.', correct: true },
            { id: 'C', text: 'Unit pembaris hanya dalam inci.' },
            { id: 'D', text: 'Sungai di atas peta sentiasa bergerak.' }
          ].map((opt) => {
            const isSelected = selectedQuiz === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setSelectedQuiz(opt.id);
                  setShowFeedback(true);
                }}
                className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                  isSelected
                    ? opt.correct
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                      : 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="font-bold mr-2 text-slate-400">{opt.id}.</span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div
            className={`p-3.5 rounded-lg text-xs leading-relaxed ${
              selectedQuiz === 'B'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}
          >
            {selectedQuiz === 'B' ? (
              <div>
                <strong>Tepat Sekali!</strong> Pembaris bersifat tegar (kaku) dan hanya sesuai untuk jarak lurus. Untuk jarak melengkung seperti sungai, <strong>benang</strong> atau <strong>jalur kertas bersegmen</strong> wajib digunakan.
              </div>
            ) : (
              <div>
                <strong>Kurang tepat.</strong> Jawapan yang betul ialah <strong>B</strong>. Pembaris yang tegar tidak mampu mengikut liku lengkungan sungai, maka ralat ukuran akan berlaku.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Seterusnya: <strong>Subtopik 1.4 Makmal Peta Topo</strong>
        </div>
        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Teruskan ke 1.4 Makmal Peta</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
