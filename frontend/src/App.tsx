import React, { useState, useEffect, useCallback } from "react";
import { Volume2, Mic, Zap } from "lucide-react";
import TextInput from "./components/TextInput";
import PlaybackControls from "./components/PlaybackControls";
import SpeakingIndicator from "./components/SpeakingIndicator";

function App() {
  const [text, setText] = useState(
    "Welcome to VoiceSync! Enter your text here and convert it to natural-sounding speech with our advanced text-to-speech technology."
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async () => {
    if (!text.trim()) return;

    try {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);

      // Call FastAPI backend
      const response = await fetch("http://localhost:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("TTS request failed");

      // Get audio as blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Play audio
      const audio = new Audio(url);
      setAudioRef(audio);

      audio.onplay = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(0);
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(0);
      };

      audio.play();
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [text]);

  const pause = useCallback(() => {
    if (audioRef) {
      audioRef.pause();
      setIsPaused(true);
    }
  }, [audioRef]);

  const resume = useCallback(() => {
    if (audioRef) {
      audioRef.play();
      setIsPaused(false);
    }
  }, [audioRef]);

  const stop = useCallback(() => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
    }
  }, [audioRef]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  // Track playback progress
  useEffect(() => {
    if (audioRef && isPlaying) {
      const interval = setInterval(() => {
        if (audioRef.duration > 0) {
          setProgress((audioRef.currentTime / audioRef.duration) * 100);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [audioRef, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="min-h-screen backdrop-blur-sm bg-black/10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VoiceSync</h1>
                <p className="text-sm text-gray-300">
                  Advanced Text-to-Speech Platform
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Text Input Section */}
            <div className="lg:col-span-2">
              <TextInput text={text} onChange={setText} isPlaying={isPlaying} />

              {/* Playback Controls */}
              <div className="mt-6">
                <PlaybackControls
                  isPlaying={isPlaying}
                  isPaused={isPaused}
                  onPlayPause={handlePlayPause}
                  onStop={stop}
                  progress={progress}
                />
              </div>
            </div>

            {/* Controls Section */}
            <div className="space-y-6">
              <SpeakingIndicator isActive={isPlaying && !isPaused} />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-300 text-sm">
                Instant text-to-speech conversion with minimal latency for
                seamless experience.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Volume2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                High Quality
              </h3>
              <p className="text-gray-300 text-sm">
                Crystal clear audio output with natural pronunciation.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
