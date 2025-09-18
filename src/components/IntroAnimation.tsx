import React, { useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 1500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="relative select-none">
        <div className="absolute inset-0 blur-3xl opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%),_radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.35),transparent_50%)]" />
        <div className="relative flex flex-col items-center justify-center">
          <div className="mb-4 inline-flex items-center justify-center w-24 h-24 rounded-3xl brand-gradient shadow-2xl animate-scale-in" aria-hidden />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 animate-fade-in">
            Saksham ERP
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600 animate-fade-in" style={{animationDelay: '150ms' as unknown as string}}>
            Smart Campus Management
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scale-in { animation: scale-in 600ms ease-out both; }
        .animate-fade-in { animation: fade-in 600ms ease-out both; }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
