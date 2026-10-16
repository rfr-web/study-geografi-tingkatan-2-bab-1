/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, StudentProfile } from './types/index.ts';
import { BADGES } from './data/kssmData.ts';
import { Header } from './components/Header.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { Subtopic1Scale } from './components/Subtopic1Scale.tsx';
import { Subtopic2Distance } from './components/Subtopic2Distance.tsx';
import { Subtopic3MeasurementTechniques } from './components/Subtopic3MeasurementTechniques.tsx';
import { Subtopic4MapLab } from './components/Subtopic4MapLab.tsx';
import { ExercisesModule } from './components/ExercisesModule.tsx';
import { GeoQuestQuiz } from './components/GeoQuestQuiz.tsx';
import { GlossaryAndTools } from './components/GlossaryAndTools.tsx';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'geoxplore_t2_student_profile';

export const DEFAULT_STUDENT_NAME = 'Rayyan Firdaus bin Rohaizad';
export const DEFAULT_STUDENT_CLASS = '2 Cemerlang';

const INITIAL_PROFILE: StudentProfile = {
  name: DEFAULT_STUDENT_NAME,
  className: DEFAULT_STUDENT_CLASS,
  completedSubtopics: {
    subtopic1: false,
    subtopic2: false,
    subtopic3: false,
    subtopic4: false,
    exercises: false,
    geoquest: false
  },
  unlockedBadges: ['badge_peneroka'],
  quizHighScore: 0,
  totalExercisesCompleted: 0
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate old default or placeholder to Rayyan Firdaus bin Rohaizad
        if (!parsed.name || parsed.name === 'Danial Haikal') {
          parsed.name = DEFAULT_STUDENT_NAME;
        }
        if (!parsed.className || parsed.className === '2 Amanah') {
          parsed.className = DEFAULT_STUDENT_CLASS;
        }
        return parsed;
      }
    } catch {
      // safe fallback
    }
    return INITIAL_PROFILE;
  });

  // Check URL parameters (e.g. ?autostart=1 or ?tab=subtopic1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab | null;
    if (tabParam && ['dashboard', 'subtopic1', 'subtopic2', 'subtopic3', 'subtopic4', 'exercises', 'geoquest', 'glossary'].includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (params.get('autostart') === '1') {
      setActiveTab('subtopic1');
    }
  }, []);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    } catch {
      // safe fallback
    }
  }, [student]);

  const unlockBadge = (badgeId: string) => {
    setStudent((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId]
      };
    });
  };

  const handleSaveProfile = (name: string, className: string) => {
    setStudent((prev) => ({
      ...prev,
      name: name.trim() || 'Murid GeoXplore',
      className: className.trim() || 'Tingkatan 2'
    }));
  };

  const handleCompleteSubtopic1 = () => {
    setStudent((prev) => ({
      ...prev,
      completedSubtopics: { ...prev.completedSubtopics, subtopic1: true }
    }));
    unlockBadge('badge_skala');
  };

  const handleCompleteSubtopic2 = () => {
    setStudent((prev) => ({
      ...prev,
      completedSubtopics: { ...prev.completedSubtopics, subtopic2: true }
    }));
    unlockBadge('badge_jarak');
  };

  const handleCompleteSubtopic3 = () => {
    setStudent((prev) => ({
      ...prev,
      completedSubtopics: { ...prev.completedSubtopics, subtopic3: true }
    }));
    unlockBadge('badge_juruukur');
  };

  const handleCompleteSubtopic4 = () => {
    setStudent((prev) => ({
      ...prev,
      completedSubtopics: { ...prev.completedSubtopics, subtopic4: true }
    }));
    unlockBadge('badge_kartografer');
  };

  const handleCompleteExercises = () => {
    setStudent((prev) => ({
      ...prev,
      completedSubtopics: { ...prev.completedSubtopics, exercises: true }
    }));
    unlockBadge('badge_kbat');
  };

  const handleCompleteQuiz = (finalScore: number) => {
    setStudent((prev) => ({
      ...prev,
      quizHighScore: Math.max(prev.quizHighScore, finalScore),
      completedSubtopics: { ...prev.completedSubtopics, geoquest: true }
    }));
    if (finalScore >= 8) {
      unlockBadge('badge_master');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            student={student}
            setStudent={setStudent}
            setActiveTab={setActiveTab}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {activeTab === 'subtopic1' && (
          <Subtopic1Scale
            onComplete={handleCompleteSubtopic1}
            isCompleted={student.completedSubtopics.subtopic1}
            onNavigateNext={() => setActiveTab('subtopic2')}
          />
        )}

        {activeTab === 'subtopic2' && (
          <Subtopic2Distance
            onComplete={handleCompleteSubtopic2}
            isCompleted={student.completedSubtopics.subtopic2}
            onNavigateNext={() => setActiveTab('subtopic3')}
          />
        )}

        {activeTab === 'subtopic3' && (
          <Subtopic3MeasurementTechniques
            onComplete={handleCompleteSubtopic3}
            isCompleted={student.completedSubtopics.subtopic3}
            onNavigateNext={() => setActiveTab('subtopic4')}
          />
        )}

        {activeTab === 'subtopic4' && (
          <Subtopic4MapLab
            onComplete={handleCompleteSubtopic4}
            isCompleted={student.completedSubtopics.subtopic4}
            onNavigateNext={() => setActiveTab('exercises')}
          />
        )}

        {activeTab === 'exercises' && (
          <ExercisesModule
            onComplete={handleCompleteExercises}
            isCompleted={student.completedSubtopics.exercises}
            onNavigateNext={() => setActiveTab('geoquest')}
          />
        )}

        {activeTab === 'geoquest' && (
          <GeoQuestQuiz
            studentName={student.name}
            onCompleteQuiz={handleCompleteQuiz}
            onNavigateNext={() => setActiveTab('glossary')}
          />
        )}

        {activeTab === 'glossary' && (
          <GlossaryAndTools student={student} />
        )}
      </main>

      {/* Quiet, Professional Educational Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">GeoXplore</span>
            <span>·</span>
            <span>Geografi Tingkatan 2 KSSM (Bab 1: Skala dan Jarak)</span>
          </div>
          <div>
            Kurikulum Standard Sekolah Menengah (KSSM) · Kementerian Pendidikan Malaysia
          </div>
        </div>
      </footer>
    </div>
  );
}
