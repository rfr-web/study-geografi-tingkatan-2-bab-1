/**
 * Header.tsx
 * Top Bar adhering to Top Bar Contract and responsive mobile ergonomics
 */

import React, { useState } from 'react';
import { ActiveTab, StudentProfile } from '../types/index.ts';
import { Compass, Award, UserCheck, Menu, X, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  student: StudentProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  student
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; num?: string }[] = [
    { id: 'dashboard', label: 'Halaman Utama' },
    { id: 'subtopic1', label: '1.1 Skala', num: '1.1' },
    { id: 'subtopic2', label: '1.2 Jarak', num: '1.2' },
    { id: 'subtopic3', label: '1.3 Teknik Mengukur', num: '1.3' },
    { id: 'subtopic4', label: '1.4 Makmal Peta', num: '1.4' },
    { id: 'exercises', label: 'Latihan' },
    { id: 'geoquest', label: 'Cabaran Kuiz' },
    { id: 'glossary', label: 'Glosari & Sijil' }
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md py-1 shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
              <Compass className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white leading-tight">
                GeoXplore
              </div>
              <div className="text-[11px] font-medium text-emerald-400 tracking-wide uppercase">
                Geografi T2 KSSM
              </div>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation Links (Clean single line) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-1.5 text-sm font-medium"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap text-xs font-medium ${
                    isActive
                      ? 'bg-sky-500 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Student Profile / Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSelectTab('dashboard')}
              title={`Murid: ${student.name || 'Belum Daftar'} | ${student.unlockedBadges.length} Lencana`}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors text-xs text-slate-200"
            >
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[110px] truncate font-medium">
                  {student.name || 'Pelajar'}
                </span>
              </div>
              <div className="flex items-center gap-1 pl-2 border-l border-slate-700 text-amber-400">
                <Award className="w-3.5 h-3.5" />
                <span className="font-mono text-xs">{student.unlockedBadges.length}</span>
              </div>
            </button>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka Menu Modul"
              className="xl:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-sky-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Horizontal Sub-Bar on Tablets / Medium screens */}
        <div className="hidden md:flex xl:hidden items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-800/80 text-xs font-medium no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-900/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
            <span>Pilih Modul Pembelajaran Bab 1:</span>
            <span className="text-amber-400 font-mono">
              {student.unlockedBadges.length} Lencana
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-500 text-white font-bold shadow-xs'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Pelajar: <strong className="text-white">{student.name}</strong> ({student.className})</span>
            <button
              onClick={() => handleSelectTab('dashboard')}
              className="text-sky-400 font-semibold"
            >
              Ubah Profil
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
