import React from 'react';
import Toolbar from '../components/tool-bar';
import ZoomControls from '../components/zoom-control';
import RecordingPreview from '../components/recording-preview';

const Popup: React.FC = () => {
    return (
        <div>
            <h1>Chrome Screen Recorder</h1>
            <Toolbar />
            <ZoomControls />
            <RecordingPreview />
        </div>
    );
};

export default Popup;