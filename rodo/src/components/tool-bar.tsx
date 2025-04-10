import React from 'react';

const Toolbar: React.FC<{ onStart: () => void; onStop: () => void; isRecording: boolean }> = ({ onStart, onStop, isRecording }) => {
    return (
        <div className="toolbar">
            <button onClick={isRecording ? onStop : onStart}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default Toolbar;