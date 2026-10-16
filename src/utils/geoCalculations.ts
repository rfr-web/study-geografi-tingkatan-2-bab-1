/**
 * geoCalculations.ts
 * Pure logic calculations for Malaysian KSSM Form 2 Geography, Chapter 1: Skala dan Jarak
 */

export interface ScaleDefinition {
  type: 'lurus' | 'penyata' | 'pecahan_wakilan';
  rfDenominator: number; // e.g. 100000 for 1:100,000
  penyataKm: number; // e.g. 1 for "1 cm mewakili 1 km"
  label: string;
}

export interface TravelMode {
  id: string;
  name: string;
  icon: string;
  speedKmh: number; // average speed in km/h
  baseCostRM: number; // base fare
  costPerKmRM: number; // cost per km
  description: string;
}

export const TRAVEL_MODES: TravelMode[] = [
  {
    id: 'jalan_kaki',
    name: 'Berjalan Kaki',
    icon: 'Footprints',
    speedKmh: 4, // 4 km/h (15 min per km)
    baseCostRM: 0,
    costPerKmRM: 0,
    description: 'Kos sifar (percuma), tetapi mengambil masa yang paling panjang.'
  },
  {
    id: 'basikal',
    name: 'Basikal',
    icon: 'Bike',
    speedKmh: 15,
    baseCostRM: 0,
    costPerKmRM: 0,
    description: 'Sihat dan percuma, sederhana pantas untuk jarak dekat.'
  },
  {
    id: 'motosikal',
    name: 'Motosikal',
    icon: 'Bike',
    speedKmh: 45,
    baseCostRM: 0.50,
    costPerKmRM: 0.15,
    description: 'Jimat kos petrol dan pantas mengelak kesesakan lalu lintas.'
  },
  {
    id: 'kereta',
    name: 'Kereta / Teksi',
    icon: 'Car',
    speedKmh: 50,
    baseCostRM: 3.00,
    costPerKmRM: 0.80,
    description: 'Pantas dan selesa, namun kos bahan api dan tambang lebih tinggi.'
  },
  {
    id: 'bas',
    name: 'Bas Awam',
    icon: 'Bus',
    speedKmh: 25, // includes stops
    baseCostRM: 1.00,
    costPerKmRM: 0.20,
    description: 'Kos tambang berpatutan, mengambil masa sederhana kerana berhenti di perhentian.'
  }
];

/**
 * Convert km in Penyata scale (e.g. 1 cm mewakili X km) to RF denominator (1 : Y)
 * Formula: 1 km = 100,000 cm. So Y = X * 100,000
 */
export function penyataToRfDenominator(kmPerCm: number): number {
  if (kmPerCm <= 0) return 100000;
  return Math.round(kmPerCm * 100000);
}

/**
 * Convert RF denominator (e.g. 50,000) to Penyata representation (1 cm mewakili X km)
 */
export function rfDenominatorToPenyataKm(denominator: number): number {
  if (denominator <= 0) return 1;
  return denominator / 100000;
}

/**
 * Calculate Real Ground Distance from Map Distance (in cm) and Scale
 * KSSM Rule: Jarak Sebenar (km) = (Jarak Atas Peta (cm) * Pecahan Denominator) / 100,000
 */
export function calculateRealDistance(
  mapDistanceCm: number,
  scaleDenominator: number
): {
  realKm: number;
  realMeters: number;
  steps: string[];
} {
  const safeMapCm = Math.max(0, mapDistanceCm);
  const totalCmOnGround = safeMapCm * scaleDenominator;
  const realMeters = totalCmOnGround / 100;
  const realKm = totalCmOnGround / 100000;

  const penyataKm = scaleDenominator / 100000;
  const steps: string[] = [
    `Jarak di atas peta diukur: ${safeMapCm.toFixed(2)} cm`,
    `Skala peta: 1 : ${scaleDenominator.toLocaleString('ms-MY')} (atau 1 cm mewakili ${penyataKm} km)`,
    `Langkah 1: Darabkan jarak peta dengan skala: ${safeMapCm.toFixed(2)} cm × ${penyataKm} km`,
    `Langkah 2: ${safeMapCm.toFixed(2)} × ${penyataKm} = ${realKm.toFixed(2)} km`,
    `Kesimpulan: Jarak sebenar di atas bumi ialah ${realKm.toFixed(2)} km (bersamaan ${(realMeters).toLocaleString('ms-MY')} meter).`
  ];

  return {
    realKm: Number(realKm.toFixed(3)),
    realMeters: Math.round(realMeters),
    steps
  };
}

/**
 * Calculate Relative Distance (Masa & Kos) for a given absolute distance in km
 */
export function calculateRelativeDistance(
  distanceKm: number,
  modeId: string
): {
  durationMinutes: number;
  durationFormatted: string;
  costRM: number;
  costFormatted: string;
  mode: TravelMode;
} {
  const mode = TRAVEL_MODES.find(m => m.id === modeId) || TRAVEL_MODES[0];
  const safeKm = Math.max(0.1, distanceKm);

  // Time in hours = distance / speed
  const hours = safeKm / mode.speedKmh;
  const minutes = Math.round(hours * 60);

  let durationFormatted = '';
  if (minutes < 60) {
    durationFormatted = `${minutes} minit`;
  } else {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    durationFormatted = m > 0 ? `${h} jam ${m} minit` : `${h} jam`;
  }

  // Cost = baseCost + (costPerKm * distance)
  const cost = mode.baseCostRM + (mode.costPerKmRM * safeKm);
  const costFormatted = cost === 0 ? 'Percuma (RM 0.00)' : `RM ${cost.toFixed(2)}`;

  return {
    durationMinutes: minutes,
    durationFormatted,
    costRM: Number(cost.toFixed(2)),
    costFormatted,
    mode
  };
}

/**
 * Calculate Euclidean straight distance between two coordinate points
 */
export function calculatePointDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate curved path distance along a series of points
 */
export function calculatePolylineDistance(points: Array<{ x: number; y: number }>): number {
  if (points.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += calculatePointDistance(points[i], points[i + 1]);
  }
  return total;
}

/**
 * Check student numeric answer with a reasonable margin of tolerance (+-5%)
 */
export function evaluateNumericAnswer(
  studentInput: string | number,
  expectedValue: number,
  tolerancePercent: number = 5
): { isCorrect: boolean; difference: number; feedback: string } {
  const parsed = typeof studentInput === 'number' ? studentInput : parseFloat(String(studentInput).replace(',', '.').trim());
  if (isNaN(parsed)) {
    return {
      isCorrect: false,
      difference: Infinity,
      feedback: 'Sila masukkan angka yang sah.'
    };
  }

  const diff = Math.abs(parsed - expectedValue);
  const maxAllowedDiff = (expectedValue * tolerancePercent) / 100;
  const isCorrect = diff <= Math.max(0.1, maxAllowedDiff);

  let feedback = '';
  if (isCorrect) {
    feedback = `Tepat sekali! Jawapan sebenar ialah ${expectedValue}.`;
  } else if (parsed > expectedValue) {
    feedback = `Jawapan anda (${parsed}) sedikit tinggi. Jawapan tepat ialah ${expectedValue}.`;
  } else {
    feedback = `Jawapan anda (${parsed}) sedikit rendah. Jawapan tepat ialah ${expectedValue}.`;
  }

  return {
    isCorrect,
    difference: diff,
    feedback
  };
}
