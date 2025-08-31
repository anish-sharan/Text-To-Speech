import React from 'react';
import { Activity } from 'lucide-react';

interface SpeakingIndicatorProps {
  isActive: boolean;
}

const SpeakingIndicator: React.FC<SpeakingIndicatorProps> = ({ isActive }) => {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 mt-10 ${
      isActive 
        ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
        : 'bg-white/5 border-white/10'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <Activity className={`h-5 w-5 transition-colors duration-300 ${
          isActive ? 'text-emerald-400' : 'text-gray-400'
        }`} />
        <h3 className="text-lg font-semibold text-white">Audio Status</h3>
      </div>

      {/* Waveform Animation */}
      <div className="flex items-center justify-center gap-1 h-16 mb-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-t from-emerald-500 to-emerald-300 animate-pulse' 
                : 'bg-gray-600'
            }`}
            style={{
              height: isActive 
                ? `${Math.random() * 40 + 20}px` 
                : '8px',
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <p className={`text-sm font-medium transition-colors duration-300 ${
          isActive ? 'text-emerald-300' : 'text-gray-400'
        }`}>
          {isActive ? 'Audio is playing...' : 'Audio is ready'}
        </p>
      </div>
    </div>
  );
};

export default SpeakingIndicator;