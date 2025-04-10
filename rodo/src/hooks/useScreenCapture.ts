import { useEffect, useState } from 'react';

const useScreenCapture = () => {
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    const startCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            setMediaStream(stream);
        } catch (error) {
            console.error('Error starting screen capture:', error);
        }
    };

    const stopCapture = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    useEffect(() => {
        return () => {
            stopCapture();
        };
    }, []);

    return { mediaStream, startCapture, stopCapture };
};

export default useScreenCapture;