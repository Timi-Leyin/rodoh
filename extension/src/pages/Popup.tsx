import { useEffect } from 'react';
import "./Popup.css";
import Header from '../components/header';
import Button from '../components/button';
import useMediaCapture from '../hooks/useMediaCapture';

export default function() {
  const { isRecording, captureMedia, stopCapture } = useMediaCapture();

  return (
    <div className='text-white'>
      <Header/>
      

      <div className='flex items-center flex-col cursor-pointer justify-center mx-auto rounded-md bg-gray-800 p-4 mt-4 w-[95%] h-[200px] '>
          <h3 className={`text-5xl ${isRecording ? 'animate-pulse' : ''}`}>🌶️</h3>
          <p className='mt-2 text-gray-400'>
            {
              isRecording ? 'Recording in progress...' : 'Click the button below to start'
            }
          </p>
      </div>

      <Button 
        variant={isRecording ? 'danger' : 'primary'}
        className='min-w-full mt-3' 
        onClick={isRecording ? stopCapture : captureMedia}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording 🌶️'}
      </Button>

      {isRecording && (
        <div className="mt-4 text-center text-sm text-gray-300 animate-pulse">
          Recording in progress...
        </div>
      )}
    </div>
  );
}
