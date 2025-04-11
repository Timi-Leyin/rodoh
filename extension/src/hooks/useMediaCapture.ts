import { useState } from 'react';

interface MediaCaptureHook {
  isRecording: boolean;
  captureMedia: () => Promise<void>;
  stopCapture: () => void;
}

const useMediaCapture = (): MediaCaptureHook => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const captureMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
          displaySurface: "monitor",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      
      recorder.onstop = () => {
        const recording = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(recording);
        const a = document.createElement('a');
        a.href = url;
        a.download = `screen-recording-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error capturing media:', error);
      setIsRecording(false);
      throw error;
    }
  };

  const stopCapture = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  return { isRecording, captureMedia, stopCapture };
};

export default useMediaCapture;