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
      
      <Button 
        variant={isRecording ? 'danger' : 'primary'}
        className='min-w-full' 
        onClick={isRecording ? stopCapture : captureMedia}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      {isRecording && (
        <div className="mt-4 text-center text-sm text-gray-300 animate-pulse">
          Recording in progress...
        </div>
      )}
    </div>
  );
}
