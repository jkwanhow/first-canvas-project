import React, {useEffect} from 'react';
import '../../assets/app.css';
import { useCanvas } from '../../contexts/CanvasContext';
const Canvas = (props) => {
    const { canvas, preview, actions } = useCanvas();  
    //Store the click function in the ref

    useEffect(() => {
        canvas.current['ctx'] = canvas.current.getContext("2d");
        preview.current['ctx'] = preview.current.getContext("2d");
        
        actions.current['initialiseAction'] = (position, canvas, preview) => { console.log('intial action intialiser'); };
        actions.current['performAction'] = (position, canvas, preview) => { console.log('performing action'); };
        actions.current['endAction'] = (position, canvas, preview) => { console.log('action ending'); };

        }, [])
    return (
        <>
            <canvas id='preview-canvas' ref={preview} {...props} width={1000} height={500} />
            <canvas id='canvas' ref={canvas} {...props} width={1000} height={500}/>
        </>
    )
}

export default Canvas