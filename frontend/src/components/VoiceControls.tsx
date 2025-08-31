import React from 'react';
import { User, Gauge, Music, Volume2 } from 'lucide-react';

interface VoiceControlsProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  rate: number;
  onRateChange: (rate: number) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  voices,
  selectedVoice,
  onVoiceChange,
  rate,
  onRateChange,
  pitch,
  onPitchChange,
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <User className="h-5 w-5 text-indigo-400" />
        Voice Settings
      </h2>

      {/* Voice Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Select Voice
        </label>
        <select
          value={selectedVoice?.name || ''}
          onChange={(e) => {
            const voice = voices.find(v => v.name === e.target.value);
            if (voice) onVoiceChange(voice);
          }}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name} className="bg-slate-800">
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Speed Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Gauge className="h-4 w-4 text-indigo-400" />
            Speed
          </label>
          <span className="text-sm text-indigo-300 font-medium">{rate.toFixed(1)}x</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none transition-all duration-200"
            style={{ width: `${((rate - 0.5) / 1.5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Slow</span>
          <span>Normal</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Pitch Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Music className="h-4 w-4 text-purple-400" />
            Pitch
          </label>
          <span className="text-sm text-purple-300 font-medium">{pitch.toFixed(1)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => onPitchChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none transition-all duration-200"
            style={{ width: `${((pitch - 0.5) / 1.5) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Low</span>
          <span>Normal</span>
          <span>High</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Volume2 className="h-4 w-4 text-emerald-400" />
            Volume
          </label>
          <span className="text-sm text-emerald-300 font-medium">{Math.round(volume * 100)}%</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg pointer-events-none transition-all duration-200"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Mute</span>
          <span>Max</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;