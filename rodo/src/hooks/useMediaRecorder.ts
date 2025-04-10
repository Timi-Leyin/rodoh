import { useEffect, useRef, useState } from 'react';

const useMediaRecorder = (stream: MediaStream | null) => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (stream) {
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
               
                console.log('Recorded video URL:', url);
            };

            return () => {
                recorder.stream.getTracks().forEach(track => track.stop());
            };
        }
    }, [stream, recordedChunks]);

    const startRecording = () => {
        if (mediaRecorder) {
            setRecordedChunks([]);
            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return { isRecording, startRecording, stopRecording };
};

export default useMediaRecorder;