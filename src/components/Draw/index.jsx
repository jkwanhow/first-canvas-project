import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import drawRectangle from '../../services/drawRectangle';
import clearBoard from '../../services/clearBoard';
import getCanvasMousePos from '../../services/getCanvasMousePos';
import { initialiseFreeFromDraw, performFreeFromAction } from '../../services/drawFreeForm';

export default function Draw(){
    const canvasRef = useCanvas();
    //const [mousePosState, setMousePosState] = useState({});
    const mouseStatus = useRef(null);
    const handleMouseMove = (e) => {
        //console.log(`${e.clientX}, ${e.clientY}`)
        mouseStatus.current = {...mouseStatus.current, position: {x: e.clientX, y: e.clientY} };
        if(mouseStatus.current.isDown){
            performFreeFromAction(mouseStatus.current.position, canvasRef);
            //drawRectangle(getCanvasMousePos(canvasRef, mouseStatus.current.position), canvasRef);
        }
    }
    const handleMouseDown = () => {
        console.log('triggered')
        mouseStatus.current = { ...mouseStatus.current, isDown: true };
        initialiseFreeFromDraw(mouseStatus.current.position, canvasRef);
        //drawRectangle(getCanvasMousePos(canvasRef, mouseStatus.current.position), canvasRef);
        
        //setMousePosState(mousePos.current);
    }

    const handleMouseUp = () => {
        console.log("mouse up clear interval");
        //clearInterval(mouseStatus.current.intervalTaskId);
        mouseStatus.current = { ...mouseStatus.current, isDown: false}
        canvasRef.current.ctx.closePath();
    }

    const handleKeyPress = (e) => {
        keypressReducer(e.keyCode, canvasRef)
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
    <div>click to update state of mouse position</div>
    <div>clear the canvas with 'c'</div>
    <div>
        
    </div>
    </>
    )
}

const keypressReducer = (keyCode, canvasRef) => {
    // Check which was was pressed using ASCII value
    switch (keyCode) {
        case 99: {
            console.log("c was pressed");
            clearBoard(canvasRef);
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