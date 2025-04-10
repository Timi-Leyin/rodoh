import { useState, useEffect } from 'react';

const useZoomPan = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const zoomFactor = 0.1;
        const newScale = Math.min(Math.max(scale - event.deltaY * zoomFactor, 1), 3);
        setScale(newScale);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (event.buttons === 1) { 
            setPosition(prev => ({
                x: prev.x + event.movementX,
                y: prev.y + event.movementY,
            }));
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [scale]);

    return { scale, position };
};

export default useZoomPan;