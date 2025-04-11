import { useState, useEffect, useRef } from 'react';
import browser from 'webextension-polyfill';
import {MESSAGE_TYPES} from "../enums/messages";

interface MediaCaptureHook {
  isRecording: boolean;
  captureMedia: () => Promise<void>;
  stopCapture: () => Promise<void>;
}

const useMediaCapture = (): MediaCaptureHook => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    browser.runtime.sendMessage({ type: MESSAGE_TYPES.GET_RECORDING_STATE })
        .then(state => setIsRecording(state));

    const handleStorageChange = (changes: { [key: string]: any }) => {
      if (changes.isRecording) {
        setIsRecording(changes.isRecording.newValue);
      }
    };

    browser.storage.onChanged.addListener(handleStorageChange);
    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
      if (mediaRecorderRef.current?.state === 'recording') {
        stopCapture();
      }
    };
  }, []);

  const captureMedia = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true,
      });

      let audioStream: MediaStream | null = null;

      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });
      } catch (err) {
        console.warn('Microphone access denied or failed:', err);
      }

      const tracks = [...displayStream.getVideoTracks()];

      if (audioStream) {
        audioStream.getAudioTracks().forEach((track) => tracks.push(track));
      } else {
        displayStream.getAudioTracks().forEach((track) => tracks.push(track));
      }

      const mixedStream = new MediaStream(tracks);

      const recorder = new MediaRecorder(mixedStream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const recording = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(recording);

        await browser.downloads.download({
          url: url,
          filename: `screen-recording-${Date.now()}.webm`,
          saveAs: true,
        });

        URL.revokeObjectURL(url);
        chunksRef.current = [];

        setIsRecording(false);
        await browser.runtime.sendMessage({
          type: MESSAGE_TYPES.UPDATE_RECORDING_STATE,
          isRecording: false,
        });
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.UPDATE_RECORDING_STATE,
        isRecording: true,
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.UPDATE_RECORDING_STATE,
        isRecording: false,
      });
    }
  };

  const stopCapture = async () => {
    console.log('Attempting to stop capture...');
    try {
      const result = await browser.runtime.sendMessage({ type: 'STOP_RECORDING' });
      console.log('Stop recording message sent, result:', result);

      if (mediaRecorderRef.current?.state === 'recording') {
        const tracks = mediaRecorderRef.current.stream.getTracks();
        mediaRecorderRef.current.stop();
        tracks.forEach(track => track.stop());
        mediaRecorderRef.current = null;
      }

      setIsRecording(false);
      await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.UPDATE_RECORDING_STATE,
        isRecording: false,
      });
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return { isRecording, captureMedia, stopCapture };
};

export default useMediaCapture;
