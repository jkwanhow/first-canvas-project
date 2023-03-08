import React, {useRef, useEffect} from 'react';
import '../../app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const canvasRef = useCanvas();
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = '#000000'
        context.fillRect(0, 0, 100, 100)
    })
    

    return (
        <canvas ref={canvasRef} {...props} id="canvas"/>
    )
}

export default Canvas