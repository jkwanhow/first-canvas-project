import React, {useEffect} from 'react';
import '../../assets/app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const { canvas, preview } = useCanvas();  
    //Store the click function in the ref

    useEffect(() => {
        canvas.current['ctx'] = canvas.current.getContext("2d");
        canvas.current['initialiseAction'] = (position, canvas) => {console.log('intial action intialiser');};
        canvas.current['performAction'] = (position, canvas) => {console.log('performing action');};
        canvas.current['endAction'] = (position, canvas) => {console.log('action ending');};

        preview.current['ctx'] = preview.current.getContext("2d");
        preview.current['initialiseAction'] = (position, preview) => { console.log('intial action intialiser'); };
        preview.current['performAction'] = (position, preview) => { console.log('performing action'); };
        preview.current['endAction'] = (position, preview) => { console.log('action ending'); };

        }, [])
    return (
        <>
            <canvas id='preview-canvas' ref={preview} {...props} width={1000} height={500} />
            <canvas id='canvas' ref={canvas} {...props} width={1000} height={500}/>
        </>
    )
}

export default Canvas