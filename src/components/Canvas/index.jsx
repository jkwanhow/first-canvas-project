import React, {useEffect} from 'react';
import '../../assets/app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const canvasRef = useCanvas();  
    //Store the click function in the ref

    useEffect(() => {
        canvasRef.current['ctx'] = canvasRef.current.getContext("2d");
        canvasRef.current['initialiseAction'] = (position, canvasRef) => {console.log('intial action intialiser');};
        canvasRef.current['performAction'] = (position, canvasRef) => {console.log('performing action');};
        canvasRef.current['endAction'] = (position, canvasRef) => {console.log('action ending');};
        }, [])
    return (
        <canvas ref={canvasRef} {...props} width={1000} height={500} id="canvas"/>
    )
}

export default Canvas