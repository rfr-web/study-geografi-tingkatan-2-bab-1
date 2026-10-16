/**
 * GeoQuestQuiz.tsx
 * Cabaran Kuiz Gamifikasi Geo-Quest (Bab 1: Skala dan Jarak)
 */

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Timer,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Flame,
  Zap,
  Lightbulb
} from 'lucide-react';
import { GEOQUEST_QUESTIONS } from '../data/kssmData.ts';
import confetti from 'canvas-confetti';

interface GeoQuestProps {
  onCompleteQuiz: (score: number) => void;
  onNavigateNext: () => void;
  studentName: string;
}

export const GeoQuestQuiz: React.FC<GeoQuestProps> = ({
  onCompleteQuiz,
  onNavigateNext,
  studentName
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Lifelines
  const [usedFiftyFifty, setUsedFiftyFifty] = useState<boolean>(false);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [showHintText, setShowHintText] = useState<boolean>(false);

  const currentQ = GEOQUEST_QUESTIONS[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < GEOQUEST_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setEliminatedOptions([]);
      setShowHintText(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 1 : 0);
      onCompleteQuiz(finalScore);

      if (finalScore >= 7) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
    setUsedFiftyFifty(false);
    setUsedHint(false);
    setEliminatedOptions([]);
    setShowHintText(false);
  };

  // 50:50 Lifeline
  const handleUseFiftyFifty = () => {
    if (usedFiftyFifty || isAnswerSubmitted) return;
    setUsedFiftyFifty(true);

    const incorrectOptions = (currentQ.options || []).filter(
      (opt) => opt !== currentQ.correctAnswer
    );
    // Eliminate 2 random incorrect options
    const toEliminate = incorrectOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  // Hint Lifeline
  const handleUseHint = () => {
    if (usedHint || isAnswerSubmitted) return;
    setUsedHint(true);
    setShowHintText(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Gamifikasi Geo-Quest</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cabaran Kuiz Geo-Quest
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Buktikan kecekapan anda dan raih lencana berprestij "Master Geografi T2".
            </p>
          </div>

          <div className="flex items-center gap-3">
            {streak > 1 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold animate-pulse">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Streak: {streak}x!</span>
              </div>
            )}
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono">
              Mata: <strong className="text-amber-400 font-bold">{score}</strong> / {GEOQUEST_QUESTIONS.length}
            </div>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        /* Active Quiz Screen */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress bar & Question Tracker */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">
                Soalan {currentIndex + 1} daripada {GEOQUEST_QUESTIONS.length}
              </span>
              <span className="font-mono text-slate-500">
                {Math.round(((currentIndex) / GEOQUEST_QUESTIONS.length) * 100)}% Lengkap
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / GEOQUEST_QUESTIONS.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Lifelines Bar */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Bantuan Talian Hayat (Lifelines):</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={usedFiftyFifty || isAnswerSubmitted}
                onClick={handleUseFiftyFifty}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  usedFiftyFifty
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 shadow-2xs'
                }`}
              >
                50:50 {usedFiftyFifty ? '(Digunakan)' : ''}
              </button>

              <button
                disabled={usedHint || isAnswerSubmitted}
                onClick={handleUseHint}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  usedHint
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border border-sky-300 text-sky-900 hover:bg-sky-50 shadow-2xs'
                }`}
              >
                Petunjuk {usedHint ? '(Digunakan)' : ''}
              </button>
            </div>
          </div>

          {/* Hint disclosure */}
          {showHintText && (
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong>Petunjuk Guru:</strong> Perhatikan perkaitan antara formula skala dengan pertukaran unit asas: 1 km = 1,000 meter = 100,000 cm.
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Subtopik {currentQ.subtopic} · {currentQ.difficulty}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options?.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === opt;
              const isEliminated = eliminatedOptions.includes(opt);
              const isCorrectAnswer = opt === currentQ.correctAnswer;

              let style = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';

              if (isEliminated) {
                style = 'bg-slate-100 border-slate-200 text-slate-400 opacity-40 line-through cursor-not-allowed';
              } else if (isSelected && !isAnswerSubmitted) {
                style = 'bg-amber-50 border-amber-400 text-amber-950 font-semibold ring-2 ring-amber-300';
              } else if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                } else {
                  style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isEliminated || isAnswerSubmitted}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Submission and Feedback */}
          {!isAnswerSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-900 font-bold text-xs shadow-md transition-all"
              >
                Hantar Jawapan
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div
                className={`p-4 rounded-xl text-xs space-y-1.5 ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-rose-200 text-rose-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {selectedOption === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tahniah, Jawapan Anda Tepat!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Jawapan Kurang Tepat.</span>
                    </>
                  )}
                </div>
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>
                    {currentIndex + 1 < GEOQUEST_QUESTIONS.length
                      ? 'Soalan Seterusnya'
                      : 'Lihat Keputusan Penuh'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-500 shadow-md">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Keputusan Cabaran Geo-Quest
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Syabas, {studentName || 'Pelajar Hebat'}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Anda telah menamatkan kesemua 10 soalan cabaran Bab 1: Skala dan Jarak.
            </p>
          </div>

          {/* Big Score Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white max-w-sm mx-auto shadow-inner space-y-2">
            <div className="text-xs text-slate-400 uppercase">Skor Keseluruhan:</div>
            <div className="text-5xl font-black font-mono text-amber-400">
              {score} / 10
            </div>
            <div className="text-xs font-semibold text-emerald-400">
              {score >= 8
                ? 'Tahap Penguasaan: Cemerlang (Pakar Geografi)'
                : score >= 5
                ? 'Tahap Penguasaan: Baik (Pengembara Berbakat)'
                : 'Tahap Penguasaan: Teruskan Usaha (Ulang Kaji)'}
            </div>
          </div>

          {/* Badge Unlocked Notification if Score >= 8 */}
          {score >= 8 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 max-w-md mx-auto text-amber-950 flex items-center gap-3 text-left">
              <Award className="w-8 h-8 text-amber-600 shrink-0" />
              <div className="text-xs">
                <strong>Lencana Dibuka: Master Geografi T2!</strong>
                <p className="text-slate-600 mt-0.5">
                  Tahniah kerana mencapai markah 80%+ dalam Cabaran Geo-Quest. Lencana ini kini terpapar pada profil dan sijil anda.
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cuba Kuiz Sekali Lagi</span>
            </button>

            <button
              onClick={onNavigateNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Lihat Sijil & Glosari</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
