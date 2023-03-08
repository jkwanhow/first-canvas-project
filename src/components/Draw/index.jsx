import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import drawRectangle from '../../services/drawRectangle';
import clearBoard from '../../services/clearBoard';
import getCanvasMousePos from '../../services/getCanvasMousePos';

export default function Draw(){
    const canvasRef = useCanvas();
    const [mousePosState, setMousePosState] = useState({});
    const mousePos = useRef(null);
    const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    }
    const updateMouseState = () => {
        console.log('triggered')
        setMousePosState(mousePos.current);
    }

    const handleKeyPress = (e) => {
        keypressReducer(e.keyCode, canvasRef)
    }
   
    // Add listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener("mousedown", updateMouseState);
        document.addEventListener("keypress", handleKeyPress)
    }, [])
    // Add rectangle on click
    useEffect(() => {
        if(!objectIsEmpty(mousePosState)){
            drawRectangle(getCanvasMousePos(canvasRef, mousePos.current), canvasRef);
        }
    }, [mousePosState])
    

    return(
    <>
    <div>click to update state of mouse position</div>
    <div>clear the canvas with 'c'</div>
    <div>
        Mouse is at x={mousePosState.x} y={mousePosState.y}
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