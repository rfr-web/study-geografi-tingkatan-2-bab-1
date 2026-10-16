/**
 * types/index.ts
 * Type definitions for GeoXplore KSSM Geography Form 2, Chapter 1
 */

export type ActiveTab =
  | 'dashboard'
  | 'subtopic1'
  | 'subtopic2'
  | 'subtopic3'
  | 'subtopic4'
  | 'exercises'
  | 'geoquest'
  | 'glossary';

export interface StudentProfile {
  name: string;
  className: string;
  completedSubtopics: {
    subtopic1: boolean;
    subtopic2: boolean;
    subtopic3: boolean;
    subtopic4: boolean;
    exercises: boolean;
    geoquest: boolean;
  };
  unlockedBadges: string[];
  quizHighScore: number;
  totalExercisesCompleted: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requirement: string;
}

export interface MapPoint {
  id: string;
  name: string;
  category: 'institusi' | 'pengangkutan' | 'fizikal' | 'pertanian';
  x: number;
  y: number;
  icon: string;
  description: string;
}

export interface Question {
  id: number;
  subtopic: '1.1' | '1.2' | '1.3' | '1.4' | 'kbat';
  type: 'mcq' | 'calculation' | 'truefalse';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
  difficulty: 'Mudah' | 'Sederhana' | 'Sukar (KBAT)';
}

export interface Flashcard {
  id: string;
  term: string;
  subtopic: string;
  definition: string;
  example: string;
  icon: string;
}
