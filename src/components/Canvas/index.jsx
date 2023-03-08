import React, {useRef, useEffect} from 'react';
import '../../app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const canvasRef = useCanvas();
    useEffect(() => {
        const canvas = canvasRef.current;
    })
    

    return (
        <canvas ref={canvasRef} {...props} id="canvas"/>
    )
}

export default Canvas