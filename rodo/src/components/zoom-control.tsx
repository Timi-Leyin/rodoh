import React, { useState } from 'react';

const ZoomControls: React.FC = () => {
    const [zoomLevel, setZoomLevel] = useState(1);

    const handleZoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); 
    };

    const handleZoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 1)); 
    };

    return (
        <div className="zoom-controls">
            <button onClick={handleZoomOut}>Zoom Out</button>
            <span>{(zoomLevel * 100).toFixed(0)}%</span>
            <button onClick={handleZoomIn}>Zoom In</button>
        </div>
    );
};

export default ZoomControls;