import React from 'react';
import { Play, Pause, Square } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  progress: number;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isPaused,
  onPlayPause,
  onStop,
  progress,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Playback Controls</h3>
      
      {/* Progress Bar */}
      {isPlaying && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Speaking...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPause}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-full text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          {isPlaying && !isPaused ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" />
          )}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>

        <button
          onClick={onStop}
          disabled={!isPlaying}
          className="group relative flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 disabled:bg-white/5 rounded-full text-white disabled:text-gray-500 transition-all duration-200 hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <Square className="h-5 w-5" />
        </button>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 ml-4">
          <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
            isPlaying 
              ? isPaused 
                ? 'bg-amber-400 animate-pulse' 
                : 'bg-emerald-400 animate-pulse'
              : 'bg-gray-500'
          }`} />
          <span className="text-sm text-gray-300">
            {isPlaying 
              ? isPaused 
                ? 'Paused' 
                : 'Speaking'
              : 'Ready'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;