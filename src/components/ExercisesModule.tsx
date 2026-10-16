/**
 * ExercisesModule.tsx
 * Latihan Pengukuhan Format KSSM Geografi Tingkatan 2 (Bab 1)
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { EXERCISE_QUESTIONS } from '../data/kssmData.ts';
import confetti from 'canvas-confetti';

interface ExercisesProps {
  onComplete: () => void;
  isCompleted: boolean;
  onNavigateNext: () => void;
}

export const ExercisesModule: React.FC<ExercisesProps> = ({
  onComplete,
  isCompleted,
  onNavigateNext
}) => {
  const [filterSubtopic, setFilterSubtopic] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [questionId: number]: boolean }>({});

  const filteredQuestions = EXERCISE_QUESTIONS.filter((q) => {
    if (filterSubtopic === 'all') return true;
    return q.subtopic === filterSubtopic;
  });

  const handleSelectOption = (questionId: number, option: string) => {
    if (submittedQuestions[questionId]) return; // lock once submitted
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleCheckAnswer = (questionId: number) => {
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    // check if all answered
    const totalAnswered = Object.keys(submittedQuestions).length + 1;
    if (totalAnswered >= EXERCISE_QUESTIONS.length) {
      onComplete();
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    }
  };

  const handleResetExercises = () => {
    setUserAnswers({});
    setSubmittedQuestions({});
  };

  // Score count
  const correctCount = EXERCISE_QUESTIONS.filter((q) => {
    return submittedQuestions[q.id] && userAnswers[q.id] === q.correctAnswer;
  }).length;

  const totalSubmitted = Object.keys(submittedQuestions).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
              <span>Bab 1: Skala dan Jarak</span>
              <span>·</span>
              <span>Pentaksiran Bilik Darjah (PBD)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latihan Pengukuhan KSSM
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Uji pemahaman dan kemahiran mengira jarak serta menyelesaikan soalan KBAT.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono">
              Skor: <strong className="text-emerald-400 font-bold">{correctCount}</strong> / {totalSubmitted} Terjawab
            </div>
            {totalSubmitted > 0 && (
              <button
                onClick={handleResetExercises}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Semula</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Tapis:
        </span>
        {[
          { id: 'all', label: 'Semua Soalan (8)' },
          { id: '1.1', label: '1.1 Skala' },
          { id: '1.2', label: '1.2 Jarak' },
          { id: '1.3', label: '1.3 Teknik Mengukur' },
          { id: '1.4', label: '1.4 Peta Topo' },
          { id: 'kbat', label: 'KBAT' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterSubtopic(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              filterSubtopic === tab.id
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, index) => {
          const isSubmitted = submittedQuestions[q.id];
          const selectedOpt = userAnswers[q.id];
          const isCorrect = selectedOpt === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-6 shadow-sm transition-all ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300'
                    : 'border-rose-300'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold border border-sky-100">
                    Subtopik {q.subtopic.toUpperCase()}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">Tahap: {q.difficulty}</span>
                </div>

                {isSubmitted && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Jawapan Tepat (+1)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Kurang Tepat</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {q.options?.map((opt, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = selectedOpt === opt;
                  const isAnswer = opt === q.correctAnswer;

                  let optClass = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700';
                  if (isSelected && !isSubmitted) {
                    optClass = 'bg-sky-50 border-sky-400 text-sky-950 font-semibold ring-1 ring-sky-300';
                  } else if (isSubmitted) {
                    if (isAnswer) {
                      optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected && !isAnswer) {
                      optClass = 'bg-rose-50 border-rose-400 text-rose-950';
                    } else {
                      optClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optClass}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {letter}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action and Explanation */}
              {!isSubmitted ? (
                <button
                  disabled={!selectedOpt}
                  onClick={() => handleCheckAnswer(q.id)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  Semak Jawapan
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl text-xs space-y-1.5 ${
                    isCorrect
                      ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/80 border border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Penerangan & Langkah Penyelesaian KSSM:</span>
                  </div>
                  <p className="whitespace-pre-line leading-relaxed text-slate-700">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Seterusnya: <strong>Cabaran Kuiz Geo-Quest</strong>
        </div>
        <button
          onClick={onNavigateNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Menuju ke Cabaran Geo-Quest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
