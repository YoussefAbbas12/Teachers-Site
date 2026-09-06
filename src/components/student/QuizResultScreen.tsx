import React, { useEffect, useRef } from 'react';
import { AppScreen } from '../../types';

interface QuizResultScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }[] = [];

    const colors = ['#2563eb', '#004ac6', '#40c2fd', '#4edea3', '#f59e0b', '#ec4899'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * -300,
        r: Math.random() * 6 + 3,
        d: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -20;
        }
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kinetic Academy Quiz Score',
        text: 'لقد حصلت على 90% في اختبار مفردات الوحدة الأولى على منصة Kinetic Academy! 🎉',
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('تم نسخ نتيجة الاختبار للمشاركة! 🎉');
    }
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col relative overflow-hidden">
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        width={420}
        height={300}
        className="absolute top-0 left-0 right-0 w-full pointer-events-none z-10"
      />

      {/* Top action header */}
      <header className="pt-safe px-margin-mobile h-16 flex items-center justify-between z-20">
        <button
          onClick={() => onNavigate('unit-details')}
          aria-label="Close"
          className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        <button
          onClick={handleShare}
          aria-label="Share result"
          className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-margin-mobile pb-8 z-20 gap-stack-lg">
        {/* Celebration Title Card */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-lg shadow-primary/25 mb-4 animate-bounce">
            <span
              className="material-symbols-outlined text-[44px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              trophy
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-extrabold text-on-surface">
            Outstanding Job, Ahmed! 🎉
          </h1>
          <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
            You've mastered this vocabulary set with flying colors!
          </p>
        </div>

        {/* Big Score Hero Card */}
        <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-md border border-surface-container-low flex flex-col items-center gap-4 text-center">
          {/* Circular SVG Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-surface-container-high"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={264}
                strokeDashoffset={264 * (1 - 0.9)}
                strokeLinecap="round"
                fill="transparent"
                className="text-primary-container transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-on-surface tracking-tight">90%</span>
              <span className="text-[11px] font-bold text-on-surface-variant">18/20 Correct</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-bold text-xs">
              +120 XP
            </span>
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-bold text-xs">
              Top 5% Today 🚀
            </span>
          </div>
        </div>

        {/* Performance Metrics Bento Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-tertiary font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Correct</span>
            </div>
            <span className="text-xl font-bold text-on-surface">18 Qs</span>
            <span className="text-[10px] text-on-surface-variant">90% Accuracy</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-error font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">cancel</span>
              <span>To Review</span>
            </div>
            <span className="text-xl font-bold text-on-surface">2 Qs</span>
            <span className="text-[10px] text-on-surface-variant">Targeted review ready</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-secondary font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span>Duration</span>
            </div>
            <span className="text-xl font-bold text-on-surface">04:32</span>
            <span className="text-[10px] text-on-surface-variant">Avg 13s per question</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Mastery</span>
            </div>
            <span className="text-xl font-bold text-on-surface">Mastered</span>
            <span className="text-[10px] text-on-surface-variant">Goal exceeded (&gt;80%)</span>
          </div>
        </div>

        {/* Badges Earned Section */}
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-low flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-amber-500">military_tech</span>
              Badges Earned
            </span>
            <span className="text-[11px] text-primary font-bold">3 New</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="px-3 py-2 rounded-xl bg-surface-container-low flex items-center gap-2 shrink-0 border border-surface-container">
              <span className="text-lg">⚡</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface">Fast Learner</span>
                <span className="text-[10px] text-on-surface-variant">+30 XP</span>
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-surface-container-low flex items-center gap-2 shrink-0 border border-surface-container">
              <span className="text-lg">🔥</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface">Streak Master</span>
                <span className="text-[10px] text-on-surface-variant">+40 XP</span>
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-surface-container-low flex items-center gap-2 shrink-0 border border-surface-container">
              <span className="text-lg">📚</span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface">Vocabulary Ace</span>
                <span className="text-[10px] text-on-surface-variant">+50 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Mastery Boost */}
        <div className="rounded-2xl bg-primary-fixed/30 p-4 border border-primary-fixed flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-on-primary-fixed">
            <span>Unit 1: Transportation Mastery</span>
            <span className="text-primary font-black">+9% Boost</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/70 overflow-hidden">
            <div className="h-full bg-primary-container rounded-full" style={{ width: '74%' }}></div>
          </div>
          <span className="text-[11px] text-on-surface-variant">Unit overall: 65% → 74%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => onNavigate('review-answers')}
            className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-[0.99]"
            type="button"
          >
            <span>Review Answers</span>
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
          </button>

          <button
            onClick={() => onNavigate('unit-details')}
            className="w-full h-12 rounded-xl bg-surface-container-high text-on-surface font-label-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all cursor-pointer active:scale-[0.99]"
            type="button"
          >
            <span>Back to Unit Details</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="text-xs text-primary font-bold py-2 hover:underline text-center cursor-pointer"
            type="button"
          >
            Retake quiz to aim for 100% (2 items wrong)
          </button>
        </div>
      </main>
    </div>
  );
};
