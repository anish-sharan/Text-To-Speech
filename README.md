VoiceSync: Text-to-Speech Platform
VoiceSync is a modern, user-friendly text-to-speech (TTS) application that converts text or .txt file inputs into high-quality, natural-sounding speech using the SpeechT5 model from Hugging Face. Powered by a FastAPI backend and a React frontend, VoiceSync offers a sleek interface for seamless text-to-speech conversion.

✨ Features

Text-to-Speech Conversion: Enter text or upload .txt files to generate speech.
High-Quality Audio: Leverages SpeechT5 for natural and clear audio output.
Interactive UI: Built with React, featuring a gradient design, playback controls, and a speaking indicator.
Volume Control: Adjust audio playback volume directly in the interface.
File Upload Support: Upload .txt files for batch text processing.
Cross-Platform Compatibility: Optimized for macOS (with MPS support for Apple Silicon) and deployable to cloud platforms.


🛠 Tech Stack

Backend: FastAPI, Python, SpeechT5 (Hugging Face), PyTorch, SentencePiece
Frontend: React, Axios, Lucide-React (icons)
Audio Processing: Soundfile, FFmpeg
Styling: Custom Tailwind CSS-inspired styles


📋 Prerequisites
Before setting up VoiceSync, ensure you have the following installed:

Python 3.8–3.11 (Python 3.13 may have compatibility issues)
Node.js 18+
FFmpeg (required for audio processing)
Homebrew (for macOS users to install FFmpeg)
Optional: Apple Silicon (M1/M2) for MPS acceleration or NVIDIA GPU for CUDA


🚀 Installation
1. Clone the Repository
git clone <repository-url>
cd tts-app

2. Set Up the Backend

Navigate to the backend directory:cd backend


Create and activate a virtual environment:python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies from requirements.txt:pip install -r requirements.txt

Ensure requirements.txt includes:fastapi
uvicorn
transformers
torch
torchaudio
soundfile
numpy
sentencepiece


Install FFmpeg (macOS):brew install ffmpeg


Start the backend server:uvicorn main:app --reload

The backend will be available at http://localhost:8000. Access the API documentation at http://localhost:8000/docs.

3. Set Up the Frontend

Navigate to the frontend directory:cd tts-frontend


Install dependencies:npm install
npm install axios lucide-react


Start the frontend server:npm start

The frontend will be available at http://localhost:5173.


🎮 Usage

Start Both Servers:

Backend: Run uvicorn main:app --reload in the backend directory.
Frontend: Run npm start in the tts-frontend directory.


Access the Application:

Open http://localhost:3000 in your browser.
Text Input: Enter text in the textarea and click the play button to generate and play audio.
File Upload: Upload a .txt file to convert its contents to speech.
Playback Controls: Use play, pause, and stop buttons to control audio playback.
Volume Control: Adjust the volume slider to modify audio loudness.
Download Audio: Save the generated audio as a .wav file.


Test the API Directly:

Text Input:curl -X POST -H "Content-Type: application/json" -d '{"text":"Hello, this is a test."}' http://http://127.0.0.1:8000//tts --output output.wav


File Upload:curl -X POST -F "file=@/path/to/test.txt" http://http://127.0.0.1:8000/tts/file --output output.wav






📂 Project Structure
tts-app/
├── backend/
│   ├── main.py           # FastAPI app with TTS endpoints
│   └── requirements.txt  # Backend dependencies
├── tts-frontend/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Application styles
│   │   ├── components/
│   │   │   ├── TextInput.js          # Text input component
│   │   │   ├── PlaybackControls.js    # Playback control buttons
│   │   │   ├── VoiceControls.js      # Voice and volume settings
│   │   │   └── SpeakingIndicator.js  # Speaking status indicator
└── README.md            # Project documentation


⚙️ Notes

macOS Compatibility: The backend supports MPS for Apple Silicon (M1/M2) or CPU for Intel Macs. Ensure torch is installed correctly for your architecture.
Voice Customization: Currently uses a single SpeechT5 voice. To add multiple voices, generate speaker embeddings with resemblyzer and update main.py.
Limitations: SpeechT5 does not support rate or pitch adjustments. Volume is controlled via the frontend’s audio element.
File Support: Only .txt files are supported for uploads. To add .docx or .pdf support, install python-docx or PyPDF2 and modify main.py.

CORS: The backend includes CORS for http://localhost:51723. Update allow_origins in main.py for deployed environments.

Performance: SpeechT5 is memory-intensive. On macOS, use MPS for Apple Silicon or consider cloud deployment with a GPU for faster inference.



🔮 Future Enhancements

Multiple Voices: Implement speaker embeddings with resemblyzer for voice customization.
Additional File Formats: Support .docx or .pdf uploads with python-docx or PyPDF2.
Audio Processing: Add rate/pitch adjustments using librosa.
Real-Time Streaming: Stream audio responses for low-latency playback.

🙌 Acknowledgments

Hugging Face for the SpeechT5 model and Transformers library
FastAPI for the robust backend framework
React for the flexible frontend framework
Lucide-React for modern icons

## Screenshot

<p align="center">
  <img src="https://github.com/anish-sharan/Text-To-Speech/raw/main/frontend/workings/Screenshot%202025-08-30%20at%205.00.16%E2%80%AFPM.png" alt="App Screenshot" width="600">
</p>


