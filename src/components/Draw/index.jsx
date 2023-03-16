import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import drawRectangle from '../../services/drawRectangle';
import clearBoard from '../../services/clearBoard';
import getCanvasMousePos from '../../services/getCanvasMousePos';
import { initialiseFreeFromDraw, performFreeFromAction, selectFreeFormDraw } from '../../services/drawFreeForm';

export default function Draw(){
    const canvasRef = useCanvas();
    //const [mousePosState, setMousePosState] = useState({});
    const mouseStatus = useRef(null);
    const handleMouseMove = (e) => {
        //console.log(`${e.clientX}, ${e.clientY}`)
        mouseStatus.current = {...mouseStatus.current, position: {x: e.clientX, y: e.clientY} };
        if(mouseStatus.current.isDown){
            canvasRef.current.performAction(mouseStatus.current.position, canvasRef);
            //performFreeFromAction(mouseStatus.current.position, canvasRef);
            //drawRectangle(getCanvasMousePos(canvasRef, mouseStatus.current.position), canvasRef);
        }
    }
    const handleMouseDown = () => {
        console.log('triggered')
        mouseStatus.current = { ...mouseStatus.current, isDown: true };
        canvasRef.current.initialiseAction(mouseStatus.current.position, canvasRef);
        //initialiseFreeFromDraw(mouseStatus.current.position, canvasRef);
        //drawRectangle(getCanvasMousePos(canvasRef, mouseStatus.current.position), canvasRef);
        
        //setMousePosState(mousePos.current);
    }

    const handleMouseUp = () => {
        console.log("mouse up clear interval");
        //clearInterval(mouseStatus.current.intervalTaskId);
        mouseStatus.current = { ...mouseStatus.current, isDown: false}
        canvasRef.current.endAction(mouseStatus.current.position, canvasRef);
        //canvasRef.current.ctx.closePath();
    }

    const handleKeyPress = (e) => {
        dispatchKeypressAction(e.keyCode, canvasRef)
    }
   
    // Add listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keypress", handleKeyPress)
    }, [])
    // Add rectangle on click


    return(
    <>
    <div>clear the canvas with 'c'</div>
    <div>
        Press 'f' for pencil/draw freeform
    </div>
    <div>
        Press 'n' to have no tools selected
    </div>
    </>
    )
}

const dispatchKeypressAction = (keyCode, canvasRef) => {
    // Check which was was pressed using ASCII value
    switch (keyCode) {
        case 99: {
            console.log("c was pressed");
            clearBoard(canvasRef);
            break;
        }
        case 102: {
            console.log("f key was pressed");
            selectFreeFormDraw(canvasRef);
            canvasRef.current.initialiseAction = (position, ref) => { initialiseFreeFromDraw(position, ref)};
            canvasRef.current.performAction = (position, ref) => { performFreeFromAction(position, ref)};
            canvasRef.current.endAction = (position, ref) => {canvasRef.current.ctx.closePath()};
            break;
        }
        case 110: {
            console.log("f key was pressed");
            canvasRef.current['initialiseAction'] = (position, canvasRef) => { console.log('intial action intialiser'); };
            canvasRef.current['performAction'] = (position, canvasRef) => { console.log('performing action'); };
            canvasRef.current['endAction'] = (position, canvasRef) => { console.log('action ending'); };
            break;
        }
        default: {
            console.log("a key not assigned was pressed");
        }
    }
}

const objectIsEmpty = (object) => {
    return Object.keys(object).length === 0
}