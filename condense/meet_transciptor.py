import os
import time
import warnings
from threading import Thread

import soundcard as sc
import soundfile as sf
import whisper

from condense.youtube_audio_extractor import get_transcript

warnings.filterwarnings("ignore", category=sc.SoundcardRuntimeWarning)

samplerate = 48000
record_sec = 15


def load_model():
    model = whisper.load_model("base")
    return model


def record(model):
    print("Recording...")
    filename = f"output_{time.time()}.wav"
    try:
        with sc.get_microphone(id=str(sc.default_speaker().name), include_loopback=True).recorder(
            samplerate=samplerate
        ) as mic:
            data = mic.record(numframes=samplerate * record_sec)
            sf.write(file=filename, data=data[:, 0], samplerate=samplerate)
            transcribed_text = get_transcript(model, ".", filename)
            print(transcribed_text)
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        if os.path.exists(filename):
            os.remove(filename)


def main():
    model = load_model()
    while True:
        try:
            thread = Thread(target=record, args=(model,))
            thread.start()
            time.sleep(record_sec)
        except KeyboardInterrupt:
            break


if __name__ == "__main__":
    main()
