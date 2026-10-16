/**
 * Subtopic4MapLab.tsx
 * Modul 1.4 Menentukan Jarak Sebenar Berpandukan Skala pada Peta (Buku Teks Geografi Tingkatan 2 KSSM, ms 12-15)
 */

import React, { useState } from 'react';
import {
  Map,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Ruler,
  Compass,
  Award,
  HelpCircle,
  RotateCcw,
  Layers,
  ChevronRight,
  School,
  HeartPulse,
  Landmark,
  Shield,
  Train,
  Home,
  Mountain,
  TreePine,
  Wheat,
  Calculator
} from 'lucide-react';
import { MAP_LOCATIONS } from '../data/kssmData.ts';
import { MapPoint } from '../types/index.ts';
import {
  calculatePointDistance,
  calculateRealDistance,
  penyataToRfDenominator
} from '../utils/geoCalculations.ts';
import confetti from 'canvas-confetti';

interface Subtopic4Props {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigateNext: () => void;
}

interface MapMission {
  id: number;
  title: string;
  pointAId: string;
  pointBId: string;
  expectedCm: number;
  hint: string;
}

const MAP_MISSIONS: MapMission[] = [
  {
    id: 1,
    title: 'Misi 1: Rumah Danial ke SMK Pekan Bestari',
    pointAId: 'rumah_danial',
    pointBId: 'sk_pekan',
    expectedCm: 3.2,
    hint: 'Cari Rumah Danial di sebelah barat daya dan SMK Pekan Bestari di utara.'
  },
  {
    id: 2,
    title: 'Misi 2: Hospital Daerah ke Balai Polis',
    pointAId: 'hospital',
    pointBId: 'balai_polis',
    expectedCm: 2.8,
    hint: 'Kedua-dua institusi terletak di zon tengah dan timur laut Pekan Bestari.'
  },
  {
    id: 3,
    title: 'Misi 3: Balai Polis ke Stesen Kereta Api',
    pointAId: 'balai_polis',
    pointBId: 'stesen_ktm',
    expectedCm: 2.7,
    hint: 'Ukur jarak terus ke Stesen Keretapi Bestari di timur peta.'
  },
  {
    id: 4,
    title: 'Misi 4: SMK Pekan Bestari ke Puncak Bukit Cerakah',
    pointAId: 'sk_pekan',
    pointBId: 'bukit_cerakah',
    expectedCm: 8.8,
    hint: 'Garis rentas panjang dari sekolah ke stesen trigonometri di tenggara.'
  }
];

export const Subtopic4MapLab: React.FC<Subtopic4Props> = ({
  onComplete,
  isCompleted,
  onNavigateNext
}) => {
  // Scale selector: 1 cm = 1 km (1:100,000) or 1 cm = 0.5 km (1:50,000)
  const [scaleKmPerCm, setScaleKmPerCm] = useState<number>(1);
  const rfDenominator = penyataToRfDenominator(scaleKmPerCm);

  // Selected Points on Map
  const [selectedPointA, setSelectedPointA] = useState<MapPoint | null>(MAP_LOCATIONS[1]); // Rumah Danial
  const [selectedPointB, setSelectedPointB] = useState<MapPoint | null>(MAP_LOCATIONS[0]); // SMK Pekan

  // Active mission
  const [activeMissionIndex, setActiveMissionIndex] = useState<number>(0);
  const [missionFeedback, setMissionFeedback] = useState<string | null>(null);

  // Pixel to Centimeter scale: In our 600x500 SVG, 50 SVG pixels = 1 cm
  const PIXELS_PER_CM = 50;

  // Calculate pixel distance and map cm
  const pixelDist =
    selectedPointA && selectedPointB
      ? calculatePointDistance(selectedPointA, selectedPointB)
      : 0;
  const mapDistanceCm = Number((pixelDist / PIXELS_PER_CM).toFixed(1));
  const realDistanceResult = calculateRealDistance(mapDistanceCm, rfDenominator);

  const handlePointClick = (point: MapPoint) => {
    if (!selectedPointA || (selectedPointA && selectedPointB)) {
      setSelectedPointA(point);
      setSelectedPointB(null);
      setMissionFeedback(null);
    } else if (selectedPointA && !selectedPointB) {
      if (point.id === selectedPointA.id) {
        return; // don't pick same point
      }
      setSelectedPointB(point);
      checkCurrentMission(selectedPointA, point);
    }
  };

  const checkCurrentMission = (pA: MapPoint, pB: MapPoint) => {
    const mission = MAP_MISSIONS[activeMissionIndex];
    const isMatch =
      (pA.id === mission.pointAId && pB.id === mission.pointBId) ||
      (pA.id === mission.pointBId && pB.id === mission.pointAId);

    if (isMatch) {
      setMissionFeedback(`Tahniah! Anda berjaya mengukur ${mission.title}. Jarak diukur ialah ${mapDistanceCm} cm bersamaan ${realDistanceResult.realKm} km.`);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {}
    } else {
      setMissionFeedback(`Ukuran dibuat antara ${pA.name} dan ${pB.name}. Untuk menyelesaikan ${mission.title}, pilih lokasi sasaran misi.`);
    }
  };

  const handleApplyMission = (mission: MapMission, index: number) => {
    setActiveMissionIndex(index);
    const pA = MAP_LOCATIONS.find((l) => l.id === mission.pointAId) || null;
    const pB = MAP_LOCATIONS.find((l) => l.id === mission.pointBId) || null;
    setSelectedPointA(pA);
    setSelectedPointB(pB);
    setMissionFeedback(null);
  };

  const handleMarkComplete = () => {
    onComplete();
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  const getLocationIcon = (id: string) => {
    switch (id) {
      case 'sk_pekan':
        return School;
      case 'rumah_danial':
        return Home;
      case 'hospital':
        return HeartPulse;
      case 'masjid':
        return Landmark;
      case 'balai_polis':
        return Shield;
      case 'stesen_ktm':
        return Train;
      case 'bukit_cerakah':
        return Mountain;
      case 'ladang_kelapa_sawit':
        return TreePine;
      case 'sawah_padi':
        return Wheat;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Breadcrumb & Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Subtopik 1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1.4 Menentukan Jarak Sebenar Berpandukan Skala pada Peta
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Makmal Peta Topo Pekan Bestari: Mengukur jarak peta (cm) dan menukar kepada jarak sebenar (km).
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

      {/* Guided Steps Explanation Card */}
      <section className="bg-gradient-to-r from-indigo-50 via-white to-slate-50 border border-indigo-100 rounded-xl p-6">
        <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-600" />
          <span>4 Langkah Piawai KSSM Mengira Jarak pada Peta:</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-xs">
            <span className="font-bold text-indigo-700 block mb-1">Langkah 1:</span>
            Kenal pasti dua titik lokasi pada peta dan sambungkan dengan garisan lurus (atau benang bagi sungai).
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-xs">
            <span className="font-bold text-indigo-700 block mb-1">Langkah 2:</span>
            Ukur jarak antara kedua-dua titik tersebut dalam unit <strong>sentimeter (cm)</strong> menggunakan pembaris.
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-xs">
            <span className="font-bold text-indigo-700 block mb-1">Langkah 3:</span>
            Lihat skala peta (contoh: 1 cm mewakili 1 km atau 1 : 100,000).
          </div>
          <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-xs">
            <span className="font-bold text-indigo-700 block mb-1">Langkah 4:</span>
            Darabkan bacaan cm dengan nilai skala untuk mendapatkan jarak sebenar dalam <strong>kilometer (km)</strong>.
          </div>
        </div>
      </section>

      {/* Main Interactive Map Stage */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
          {/* Map Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Peta Topografi Pekan Bestari</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-sky-700 font-semibold">
                Skala: 1 cm mewakili {scaleKmPerCm} km
              </span>
            </div>

            {/* Scale toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Tukar Skala:</span>
              <button
                onClick={() => setScaleKmPerCm(1)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                  scaleKmPerCm === 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1 cm = 1 km
              </button>
              <button
                onClick={() => setScaleKmPerCm(0.5)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium ${
                  scaleKmPerCm === 0.5
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1 cm = 0.5 km (1:50k)
              </button>
            </div>
          </div>

          {/* Interactive SVG Topo Map */}
          <div className="relative border-2 border-slate-700 rounded-xl overflow-hidden bg-emerald-950/90 aspect-[600/500]">
            <svg
              viewBox="0 0 600 500"
              className="w-full h-full select-none"
              style={{ cursor: 'crosshair' }}
            >
              {/* Map Background Land Cover */}
              <rect width="600" height="500" fill="#f1f5f9" />

              {/* Grid Lines (every 50px = 1 cm on map) */}
              <defs>
                <pattern id="topoGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
                </pattern>
                {/* Forest / Plantation Pattern */}
                <pattern id="palmPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2.5" fill="#15803d" opacity="0.4" />
                </pattern>
                <pattern id="paddyPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="5" y1="15" x2="15" y2="15" stroke="#eab308" strokeWidth="1.5" opacity="0.5" />
                  <line x1="10" y1="5" x2="10" y2="15" stroke="#eab308" strokeWidth="1.5" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="600" height="500" fill="url(#topoGrid)" />

              {/* Agricultural Zones */}
              {/* Palm Oil Plantation in East */}
              <rect x="360" y="270" width="200" height="130" fill="#dcfce7" rx="8" />
              <rect x="360" y="270" width="200" height="130" fill="url(#palmPattern)" rx="8" />
              <text x="460" y="295" fontSize="11" fill="#166534" fontWeight="bold" textAnchor="middle">
                Ladang Sawit Makmur
              </text>

              {/* Paddy Fields in South West */}
              <rect x="50" y="370" width="160" height="100" fill="#fef9c3" rx="8" />
              <rect x="50" y="370" width="160" height="100" fill="url(#paddyPattern)" rx="8" />
              <text x="130" y="395" fontSize="11" fill="#854d0e" fontWeight="bold" textAnchor="middle">
                Sawah Padi Kg. Pinang
              </text>

              {/* Contour Lines around Bukit Cerakah in Southeast */}
              <g stroke="#b45309" strokeWidth="1.5" fill="none" opacity="0.8">
                <ellipse cx="490" cy="430" rx="90" ry="60" strokeDasharray="3 1" />
                <ellipse cx="490" cy="430" rx="65" ry="42" />
                <ellipse cx="490" cy="430" rx="40" ry="25" />
                <ellipse cx="490" cy="430" rx="18" ry="12" />
                <text x="490" y="425" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ▲ 280m
                </text>
              </g>

              {/* Railway Line (North-East to South-West) */}
              <line x1="300" y1="0" x2="600" y2="220" stroke="#0f172a" strokeWidth="3" />
              {/* Railroad ties */}
              <line x1="300" y1="0" x2="600" y2="220" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 6" />
              <text x="560" y="195" fontSize="10" fill="#334155" fontFamily="IBM Plex Mono">
                Landasan Kereta Api
              </text>

              {/* Winding River Sungai Jernih */}
              <path
                d="M 20 180 Q 150 160 220 260 T 290 330 T 430 490"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 180 Q 150 160 220 260 T 290 330 T 430 490"
                fill="none"
                stroke="#2563eb"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <text x="140" y="220" fill="#1e40af" fontSize="11" fontStyle="italic" fontWeight="bold">
                Sungai Jernih ~ ~
              </text>

              {/* Main Road Network */}
              {/* Horizontal road */}
              <line x1="0" y1="230" x2="600" y2="230" stroke="#f97316" strokeWidth="5" />
              <line x1="0" y1="230" x2="600" y2="230" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="5 5" />
              {/* North-South road connecting to school and bridge */}
              <line x1="160" y1="0" x2="160" y2="230" stroke="#f97316" strokeWidth="4" />
              <line x1="290" y1="230" x2="290" y2="400" stroke="#f97316" strokeWidth="4" />

              {/* Concrete Bridge over river */}
              <rect x="282" y="322" width="16" height="16" fill="#475569" stroke="#ffffff" strokeWidth="1" />
              <text x="305" y="335" fill="#0f172a" fontSize="10" fontWeight="bold">
                Jambatan
              </text>

              {/* Active Measurement Line between Point A and Point B */}
              {selectedPointA && selectedPointB && (
                <g>
                  {/* Glowing background line */}
                  <line
                    x1={selectedPointA.x}
                    y1={selectedPointA.y}
                    x2={selectedPointB.x}
                    y2={selectedPointB.y}
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeDasharray="6 3"
                  />
                  {/* Midpoint measurement label badge */}
                  <g
                    transform={`translate(${
                      (selectedPointA.x + selectedPointB.x) / 2
                    }, ${(selectedPointA.y + selectedPointB.y) / 2})`}
                  >
                    <rect
                      x="-45"
                      y="-12"
                      width="90"
                      height="24"
                      fill="#0f172a"
                      rx="4"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="IBM Plex Mono"
                    >
                      {mapDistanceCm} cm
                    </text>
                  </g>
                </g>
              )}

              {/* Location POI Pins */}
              {MAP_LOCATIONS.map((loc) => {
                const isPointA = selectedPointA?.id === loc.id;
                const isPointB = selectedPointB?.id === loc.id;
                const isSelected = isPointA || isPointB;

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${loc.x}, ${loc.y})`}
                    onClick={() => handlePointClick(loc)}
                    className="cursor-pointer transition-all hover:scale-110"
                  >
                    {/* Pulsing ring for selected points */}
                    {isSelected && (
                      <circle
                        r="18"
                        fill="none"
                        stroke={isPointA ? '#0284c7' : '#10b981'}
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    )}

                    {/* Pin Bubble */}
                    <circle
                      r="12"
                      fill={
                        isPointA
                          ? '#0284c7'
                          : isPointB
                          ? '#10b981'
                          : '#ffffff'
                      }
                      stroke={
                        isPointA
                          ? '#ffffff'
                          : isPointB
                          ? '#ffffff'
                          : '#475569'
                      }
                      strokeWidth="2"
                    />

                    {/* Marker Center Symbol */}
                    <circle
                      r="4"
                      fill={
                        isPointA
                          ? '#ffffff'
                          : isPointB
                          ? '#ffffff'
                          : '#0284c7'
                      }
                    />

                    {/* Label Badge */}
                    <rect
                      x={-40}
                      y={15}
                      width={80}
                      height={18}
                      fill="rgba(15, 23, 42, 0.85)"
                      rx="3"
                    />
                    <text
                      x="0"
                      y="27"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="500"
                    >
                      {loc.name.length > 14 ? loc.name.slice(0, 12) + '..' : loc.name}
                    </text>
                  </g>
                );
              })}

              {/* Compass Rose on Top Right */}
              <g transform="translate(540, 50)">
                <circle r="22" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                <polygon points="0,-18 5,-2 0,0" fill="#dc2626" />
                <polygon points="0,-18 -5,-2 0,0" fill="#991b1b" />
                <polygon points="0,18 5,2 0,0" fill="#475569" />
                <polygon points="0,18 -5,2 0,0" fill="#1e293b" />
                <text x="0" y="-22" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
                  U
                </text>
                <text x="0" y="30" textAnchor="middle" fill="#64748b" fontSize="9">
                  S
                </text>
              </g>

              {/* Visual Map Scale Bar at Bottom Left */}
              <g transform="translate(30, 470)">
                <rect x="0" y="-12" width="170" height="24" fill="rgba(255,255,255,0.95)" rx="4" stroke="#94a3b8" />
                {/* 50px = 1 cm */}
                <rect x="10" y="-4" width="50" height="8" fill="#0284c7" />
                <rect x="60" y="-4" width="50" height="8" fill="#0f172a" />
                <rect x="110" y="-4" width="50" height="8" fill="#0284c7" />
                <text x="10" y="10" fontSize="8" fontFamily="IBM Plex Mono">0</text>
                <text x="60" y="10" fontSize="8" fontFamily="IBM Plex Mono">{scaleKmPerCm}</text>
                <text x="110" y="10" fontSize="8" fontFamily="IBM Plex Mono">{scaleKmPerCm * 2}</text>
                <text x="160" y="10" fontSize="8" fontFamily="IBM Plex Mono">{scaleKmPerCm * 3}km</text>
              </g>
            </svg>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Petua: Klik mana-mana 2 ikon lokasi di atas peta untuk mengukur jarak terus.</span>
            <span>Grid: 1 petak = 1 cm pada peta</span>
          </div>
        </div>

        {/* Measurement Calculator & Mission Control (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Measurement Calculation Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-indigo-600" />
                <span>Pengiraan Jarak Peta Semasa</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedPointA(null);
                  setSelectedPointB(null);
                }}
                className="text-[11px] text-slate-400 hover:text-slate-700"
              >
                Kosongkan
              </button>
            </div>

            {selectedPointA && selectedPointB ? (
              <div className="space-y-3">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Titik Awal (A):</span>
                    <strong className="text-sky-700">{selectedPointA.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Titik Akhir (B):</span>
                    <strong className="text-emerald-700">{selectedPointB.name}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 text-white space-y-1">
                  <span className="text-[11px] text-slate-400 block">Jarak Diukur pada Peta:</span>
                  <div className="text-xl font-bold font-mono text-sky-400">
                    {mapDistanceCm} cm
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Jarak Sebenar di Permukaan Bumi:</span>
                    <div className="text-2xl font-extrabold font-mono text-emerald-400">
                      {realDistanceResult.realKm} km
                    </div>
                    <span className="text-xs text-slate-300 font-mono">
                      = {realDistanceResult.realMeters.toLocaleString('ms-MY')} meter
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <span className="font-bold text-slate-700 block">Jalan Kira:</span>
                  <div className="font-mono text-slate-600">
                    {mapDistanceCm} cm × {scaleKmPerCm} km = <strong>{realDistanceResult.realKm} km</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                {selectedPointA
                  ? `Titik A (${selectedPointA.name}) dipilih. Sekarang klik lokasi kedua untuk Titik B.`
                  : 'Klik mana-mana lokasi di atas peta untuk memulakan pengukuran.'}
              </div>
            )}
          </div>

          {/* Guided Map Missions Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Misi Cabaran Peta KSSM</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {activeMissionIndex + 1} / {MAP_MISSIONS.length}
              </span>
            </div>

            <div className="space-y-2">
              {MAP_MISSIONS.map((m, idx) => {
                const isActive = activeMissionIndex === idx;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleApplyMission(m, idx)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="truncate pr-2">{m.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                );
              })}
            </div>

            {missionFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 leading-relaxed">
                {missionFeedback}
              </div>
            )}

            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>Petunjuk Misi:</strong> {MAP_MISSIONS[activeMissionIndex].hint}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Seterusnya: <strong>Uji Minda & Latihan Pengukuhan</strong>
        </div>
        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Menuju ke Latihan Pengukuhan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
