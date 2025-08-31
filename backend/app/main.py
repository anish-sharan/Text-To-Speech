from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
import torch
import soundfile as sf
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load SpeechT5 model and processor
processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts")
vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan")

# Placeholder speaker embeddings (replace with actual embeddings for custom voice)
speaker_embeddings = torch.randn(1, 512)

class TextInput(BaseModel):
    text: str


origins = [
    "http://localhost:5173",  # vite dev
    "http://localhost:5174",  # react dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tts")
async def text_to_speech(input: TextInput):
    try:
        # Process text
        inputs = processor(text=input.text, return_tensors="pt")
        # Generate speech
        with torch.no_grad():
            speech = model.generate_speech(inputs["input_ids"], speaker_embeddings, vocoder=vocoder)
        # Save audio to temporary file
        output_path = "output.wav"
        sf.write(output_path, speech.numpy(), samplerate=16000)
        return FileResponse(output_path, media_type="audio/wav", filename="output.wav")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("shutdown")
def cleanup():
    # Clean up temporary files
    if os.path.exists("output.wav"):
        os.remove("output.wav")