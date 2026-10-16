import test from 'node:test';
import assert from 'node:assert/strict';
import {
  penyataToRfDenominator,
  rfDenominatorToPenyataKm,
  calculateRealDistance,
  calculateRelativeDistance,
  calculatePointDistance,
  calculatePolylineDistance,
  evaluateNumericAnswer
} from './geoCalculations.ts';

test('KSSM scale conversions: Penyata to Pecahan Wakilan (RF)', () => {
  // 1 cm mewakili 1 km -> 1:100,000
  assert.equal(penyataToRfDenominator(1), 100000);
  // 1 cm mewakili 2 km -> 1:200,000
  assert.equal(penyataToRfDenominator(2), 200000);
  // 1 cm mewakili 0.5 km -> 1:50,000
  assert.equal(penyataToRfDenominator(0.5), 50000);
});

test('KSSM scale conversions: Pecahan Wakilan (RF) to Penyata km', () => {
  // 1:100,000 -> 1 cm mewakili 1 km
  assert.equal(rfDenominatorToPenyataKm(100000), 1);
  // 1:50,000 -> 1 cm mewakili 0.5 km
  assert.equal(rfDenominatorToPenyataKm(50000), 0.5);
  // 1:200,000 -> 1 cm mewakili 2 km
  assert.equal(rfDenominatorToPenyataKm(200000), 2);
});

test('KSSM distance calculation on map with scale', () => {
  // 5 cm on map with 1:100,000 scale = 5 km = 5,000 m
  const result1 = calculateRealDistance(5, 100000);
  assert.equal(result1.realKm, 5);
  assert.equal(result1.realMeters, 5000);
  assert.ok(result1.steps.length >= 4);

  // 4.2 cm on map with 1:50,000 scale = 4.2 * 0.5 km = 2.1 km
  const result2 = calculateRealDistance(4.2, 50000);
  assert.equal(result2.realKm, 2.1);
  assert.equal(result2.realMeters, 2100);
});

test('KSSM relative distance calculation (masa & kos)', () => {
  // 10 km journey by walking (4 km/h) -> 150 minutes (2 jam 30 minit), cost RM 0
  const walk = calculateRelativeDistance(10, 'jalan_kaki');
  assert.equal(walk.durationMinutes, 150);
  assert.equal(walk.costRM, 0);

  // 10 km journey by bus (25 km/h, base RM 1.00 + RM 0.20/km) -> 24 minutes, cost RM 3.00
  const bus = calculateRelativeDistance(10, 'bas');
  assert.equal(bus.durationMinutes, 24);
  assert.equal(bus.costRM, 3.00);

  // 10 km by car (50 km/h, base RM 3.00 + RM 0.80/km) -> 12 minutes, cost RM 11.00
  const car = calculateRelativeDistance(10, 'kereta');
  assert.equal(car.durationMinutes, 12);
  assert.equal(car.costRM, 11.00);
});

test('Cartographic coordinate distance calculations', () => {
  // Straight 3-4-5 triangle
  const p1 = { x: 0, y: 0 };
  const p2 = { x: 3, y: 4 };
  assert.equal(calculatePointDistance(p1, p2), 5);

  // Polyline distance
  const poly = [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 3, y: 4 }
  ];
  assert.equal(calculatePolylineDistance(poly), 7);
});

test('Student numeric answer evaluation with tolerance', () => {
  // Exact match
  const check1 = evaluateNumericAnswer(5.0, 5.0);
  assert.equal(check1.isCorrect, true);

  // Within 5% tolerance (e.g. 5.1 vs 5.0 is within 2%)
  const check2 = evaluateNumericAnswer('5.1', 5.0, 5);
  assert.equal(check2.isCorrect, true);

  // Outside tolerance
  const check3 = evaluateNumericAnswer('8.5', 5.0, 5);
  assert.equal(check3.isCorrect, false);
});
