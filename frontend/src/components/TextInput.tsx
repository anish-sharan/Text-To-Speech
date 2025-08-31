import React from 'react';
import { FileText } from 'lucide-react';

interface TextInputProps {
  text: string;
  onChange: (text: string) => void;
  isPlaying: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ text, onChange, isPlaying }) => {
  const characterCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-indigo-400" />
        <h2 className="text-xl font-semibold text-white">Your Text</h2>
      </div>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter the text you want to convert to speech..."
          disabled={isPlaying}
          className={`w-full h-48 p-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 ${
            isPlaying ? 'opacity-75 cursor-not-allowed' : 'hover:bg-white/15'
          }`}
          style={{ lineHeight: '1.6' }}
        />
        
        {/* Character/Word Count */}
        <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
          <span className={`px-2 py-1 rounded-md ${
            characterCount > 500 
              ? 'bg-amber-500/20 text-amber-300' 
              : 'bg-white/10 text-gray-300'
          }`}>
            {characterCount} chars
          </span>
          <span className="px-2 py-1 rounded-md bg-white/10 text-gray-300">
            {wordCount} words
          </span>
        </div>
      </div>

      {characterCount > 1000 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-sm text-amber-300">
            <strong>Tip:</strong> Very long texts may be split into multiple speech segments for better performance.
          </p>
        </div>
      )}
    </div>
  );
};

export default TextInput;