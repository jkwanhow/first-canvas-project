import React from 'react';
import '../../assets/app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const canvasRef = useCanvas();  

    return (
        <canvas ref={canvasRef} {...props} width={1000} height={500} id="canvas"/>
    )
}

export default Canvas