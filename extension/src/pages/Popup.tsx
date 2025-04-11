import { useEffect, useState } from 'react';
import "./Popup.css";
import Header from '../components/header';
import Button from '../components/button';
import useMediaCapture from '../hooks/useMediaCapture';

export default function() {
  const { isRecording, captureMedia, stopCapture } = useMediaCapture();
  const [recordingTime, setRecordingTime] = useState(0);

  console.log(isRecording)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      setRecordingTime(0);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-white min-w-[300px]'>
      <Header/>
      
      <div className='flex items-center flex-col justify-center mx-auto rounded-md bg-gray-800/50 backdrop-blur-sm p-4 mt-4 w-[95%] h-[200px] transition-all duration-300 hover:bg-gray-800/70'>
        <div className={`relative ${isRecording ? 'animate-pulse' : ''}`}>
          <h3 className='text-5xl'>🌶️</h3>
          {isRecording && (
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </div>
          )}
        </div>

        <p className='mt-4 text-gray-400 text-center'>
          {isRecording 
            ? `Recording in progress... ${formatTime(recordingTime)}`
            : 'Click the button below to start recording'
          }
        </p>

        <div className='mt-4 flex gap-2'>
          <Button 
            variant={isRecording ? 'danger' : 'primary'}
            size="lg"
            onClick={isRecording ? stopCapture : captureMedia}
          >
            {isRecording ? 'Stop' : 'Record'} 
          </Button>

        </div>
      </div>

      {/* {isRecording && (
        <div className="mt-4 text-center text-xs text-gray-400">
          Press <kbd className="px-2 py-1 bg-gray-700 rounded">⌘ + Shift + X</kbd> to stop recording
        </div>
      )} */}
    </div>
  );
}
