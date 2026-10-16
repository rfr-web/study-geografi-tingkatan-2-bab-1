/**
 * Subtopic2Distance.tsx
 * Modul 1.2 Jarak (Buku Teks Geografi Tingkatan 2 KSSM, ms 7-8)
 */

import React, { useState } from 'react';
import {
  Route,
  CheckCircle2,
  ArrowRight,
  Clock,
  Coins,
  MapPin,
  Award,
  HelpCircle,
  Car,
  Footprints,
  Bike,
  Bus,
  AlertCircle
} from 'lucide-react';
import { TRAVEL_MODES, calculateRelativeDistance } from '../utils/geoCalculations.ts';
import confetti from 'canvas-confetti';

interface Subtopic2Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigateNext: () => void;
}

export const Subtopic2Distance: React.FC<Subtopic2Props> = ({
  onComplete,
  isCompleted,
  onNavigateNext
}) => {
  // Journey Simulator State
  const [selectedDistanceKm, setSelectedDistanceKm] = useState<number>(7);
  const [isPeakHour, setIsPeakHour] = useState<boolean>(false);
  const [selectedModeId, setSelectedModeId] = useState<string>('bas');

  // Quick Check State
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

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

  const getModeIcon = (id: string) => {
    switch (id) {
      case 'jalan_kaki':
        return Footprints;
      case 'basikal':
      case 'motosikal':
        return Bike;
      case 'kereta':
        return Car;
      case 'bas':
        return Bus;
      default:
        return Car;
    }
  };

  // Adjust for peak hour (congestion delays motorized road transport)
  const calculateSimulatedResult = (modeId: string, km: number) => {
    const res = calculateRelativeDistance(km, modeId);
    if (isPeakHour) {
      if (modeId === 'kereta') {
        const delayedMin = Math.round(res.durationMinutes * 1.9);
        return {
          ...res,
          durationMinutes: delayedMin,
          durationFormatted: `${delayedMin} minit (Kesesakan Teruk!)`
        };
      }
      if (modeId === 'bas') {
        const delayedMin = Math.round(res.durationMinutes * 1.7);
        return {
          ...res,
          durationMinutes: delayedMin,
          durationFormatted: `${delayedMin} minit (Kesesakan!)`
        };
      }
      if (modeId === 'motosikal') {
        const delayedMin = Math.round(res.durationMinutes * 1.2);
        return {
          ...res,
          durationMinutes: delayedMin,
          durationFormatted: `${delayedMin} minit (Menyelit trafik)`
        };
      }
    }
    return res;
  };

  const currentModeResult = calculateSimulatedResult(selectedModeId, selectedDistanceKm);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Breadcrumb & Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Subtopik 1.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1.2 Jarak
            </h1>
            <p className="text-xs text-sm text-slate-500 mt-1">
              Memahami perbezaan antara Jarak Mutlak (tetap) dan Jarak Relatif (kos & masa).
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

      {/* Definisi Jarak Card */}
      <section className="bg-gradient-to-r from-emerald-50 via-white to-slate-50 border border-emerald-100 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Route className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              Apakah Maksud Jarak?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Jarak</strong> ialah jauh di antara satu tempat dengan tempat yang lain. Dalam geografi KSSM, jarak terbahagi kepada dua konsep utama: <strong>Jarak Mutlak</strong> dan <strong>Jarak Relatif</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Perbandingan Jarak Mutlak vs Jarak Relatif */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Jarak Mutlak */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Jarak Mutlak</h3>
              <span className="text-xs text-sky-600 font-medium">Tetap & Tidak Berubah</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jarak yang diukur dan dinyatakan dalam <strong>unit tetap</strong> seperti <strong>meter (m)</strong> atau <strong>kilometer (km)</strong>.
          </p>

          <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-800">Ciri-ciri Utama:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Nilai jarak adalah tetap dan tidak berubah.</li>
              <li>Sama nilainya sama ada anda berjalan kaki, berbasikal, atau menaiki kereta.</li>
              <li>Diukur menggunakan alat ukuran fizikal seperti pembaris, jangka tolok, atau odometer.</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-slate-200 font-mono text-[11px] text-sky-800">
              Contoh: Rumah Ali ke SMK Bestari = 7 km (atau 7,000 meter).
            </div>
          </div>
        </div>

        {/* Jarak Relatif */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Jarak Relatif</h3>
              <span className="text-xs text-emerald-600 font-medium">Tidak Tetap (Masa & Kos)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jarak yang diukur dan dinyatakan berdasarkan <strong>masa</strong> (jam/minit) dan <strong>kos</strong> (wang ringgit, RM).
          </p>

          <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-800">Ciri-ciri Utama:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Nilai tidak tetap dan sentiasa boleh berubah.</li>
              <li>Bergantung kepada jenis pengangkutan yang dipilih.</li>
              <li>Dipengaruhi oleh kesesakan lalu lintas dan keadaan cuaca.</li>
            </ul>
            <div className="mt-2 pt-2 border-t border-slate-200 font-mono text-[11px] text-emerald-800">
              Contoh: Menunggang basikal mengambil 25 minit (RM 0.00), menaiki teksi 10 minit (RM 8.00).
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Daily Journey Simulator */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-emerald-600" />
              <span>Simulasi Interaktif: Perjalanan Harian & Jarak Relatif</span>
            </h2>
            <p className="text-xs text-slate-500">
              Uji bagaimana mod pengangkutan dan waktu puncak mempengaruhi masa serta kos perjalanan.
            </p>
          </div>

          {/* Peak Hour Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPeakHour(!isPeakHour)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isPeakHour
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {isPeakHour ? 'Waktu Puncak (Trafik Sesak)' : 'Waktu Biasa (Lancar)'}
            </button>
          </div>
        </div>

        {/* Distance Selection Presets */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Pilih Jarak Mutlak Perjalanan (Kilometer):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { km: 2, label: 'Dekat: Kedai Runcit', detail: '2 km' },
              { km: 7, label: 'Sederhana: SMK Bestari', detail: '7 km' },
              { km: 12, label: 'Jauh: Pusat Bandar', detail: '12 km' },
              { km: 20, label: 'Sangat Jauh: Hospital Daerah', detail: '20 km' }
            ].map((d) => {
              const isSelected = selectedDistanceKm === d.km;
              return (
                <button
                  key={d.km}
                  onClick={() => setSelectedDistanceKm(d.km)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300/40'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">{d.label}</div>
                  <div className="text-xs font-mono text-emerald-700 font-semibold mt-0.5">
                    {d.detail} ({d.km * 1000} m)
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Transport Modes Grid */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Pilih Mod Pengangkutan untuk Diselidiki:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {TRAVEL_MODES.map((mode) => {
              const isSelected = selectedModeId === mode.id;
              const Icon = getModeIcon(mode.id);
              const modeCalc = calculateSimulatedResult(mode.id, selectedDistanceKm);

              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedModeId(mode.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center bg-white/10 mb-1.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-600'}`} />
                  </div>
                  <div className="text-xs font-bold truncate">{mode.name}</div>
                  <div className="text-[11px] font-mono mt-1 opacity-90">
                    {modeCalc.durationMinutes} min
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400">
                    {modeCalc.costFormatted}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparative Analytical Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-slate-900 text-white">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Jarak Mutlak (Tetap)</span>
            <div className="text-2xl font-bold font-mono text-sky-400">
              {selectedDistanceKm} km
            </div>
            <p className="text-xs text-slate-300">
              Bersamaan {(selectedDistanceKm * 1000).toLocaleString('ms-MY')} meter di atas bumi.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Jarak Relatif (Masa)</span>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {currentModeResult.durationFormatted}
            </div>
            <p className="text-xs text-slate-300">
              Kelajuan purata {currentModeResult.mode.speedKmh} km/j.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Jarak Relatif (Kos)</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {currentModeResult.costFormatted}
            </div>
            <p className="text-xs text-slate-300">
              {currentModeResult.mode.description}
            </p>
          </div>
        </div>

        {/* All-Modes Visual Comparison Chart */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Perbandingan Masa Semua Kenderaan untuk Jarak {selectedDistanceKm} km:
          </h3>
          <div className="space-y-2">
            {TRAVEL_MODES.map((m) => {
              const res = calculateSimulatedResult(m.id, selectedDistanceKm);
              // Max width proportional to 200 minutes
              const barWidth = Math.min(100, Math.max(8, (res.durationMinutes / 180) * 100));

              return (
                <div key={m.id} className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>{m.name}</span>
                    <span className="font-mono text-slate-800">
                      {res.durationMinutes} minit · {res.costFormatted}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        m.id === 'jalan_kaki'
                          ? 'bg-rose-500'
                          : m.id === 'basikal'
                          ? 'bg-amber-500'
                          : m.id === 'motosikal'
                          ? 'bg-blue-500'
                          : m.id === 'bas'
                          ? 'bg-emerald-500'
                          : 'bg-indigo-600'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Uji Minda Segera Subtopik 1.2 */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold">
            Uji Minda Segera: Subtopik 1.2
          </h2>
        </div>

        <p className="text-sm text-slate-700 font-medium">
          Mengapakah jarak mutlak rumah Ali ke sekolah sentiasa 7 km, tetapi jarak relatifnya boleh menjadi 15 minit pada hari biasa dan 35 minit pada hari hujan lebat?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              id: 'A',
              text: 'Jarak fizikal bumi memanjang apabila terkena air hujan.'
            },
            {
              id: 'B',
              text: 'Jarak mutlak tetap dalam km, manakala jarak relatif berasaskan masa dipengaruhi oleh kesesakan jalan dan kelajuan perlahan.',
              correct: true
            },
            {
              id: 'C',
              text: 'Pembaris yang digunakan untuk mengukur mengecut pada hari sejuk.'
            },
            {
              id: 'D',
              text: 'Ali menggunakan jalan pintas pada hari hujan.'
            }
          ].map((opt) => {
            const isSelected = quizAnswer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setQuizAnswer(opt.id);
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
              quizAnswer === 'B'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}
          >
            {quizAnswer === 'B' ? (
              <div>
                <strong>Cemerlang!</strong> Jarak mutlak (7 km) tidak akan berubah kerana ia adalah jarak fizikal. Sebaliknya, jarak relatif bergantung kepada masa dan kos yang dipengaruhi faktor luaran seperti cuaca dan trafik.
              </div>
            ) : (
              <div>
                <strong>Kurang tepat.</strong> Jawapan yang betul ialah <strong>B</strong>. Jarak mutlak (km) tidak berubah, manakala jarak relatif mengikut masa sentiasa fleksibel.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Seterusnya: <strong>Subtopik 1.3 Teknik Mengukur</strong>
        </div>
        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Teruskan ke 1.3 Teknik Mengukur</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
