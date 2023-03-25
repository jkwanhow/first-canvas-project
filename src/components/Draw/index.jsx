import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import {selectRectangle, initialiseRectangle, performRectangleAction, drawRectangle} from '../../services/drawRectangle';
import { clearBoard } from '../../services/clearBoard';
import getCanvasMousePos from '../../services/getCanvasMousePos';
import { initialiseFreeFromDraw, performFreeFromAction, selectFreeFormDraw } from '../../services/drawFreeForm';

export default function Draw(){
    const {canvas, preview} = useCanvas();

    const mouseStatus = useRef(null);
    const handleMouseMove = (e) => {

        mouseStatus.current = {...mouseStatus.current, position: {x: e.clientX, y: e.clientY} };
        if(mouseStatus.current.isDown){
            canvas.current.performAction(mouseStatus.current.position, canvas, preview);

        }
    }
    const handleMouseDown = () => {
        console.log('triggered')
        mouseStatus.current = { ...mouseStatus.current, isDown: true };
        canvas.current.initialiseAction(mouseStatus.current.position, canvas, preview);
 
    }

    const handleMouseUp = () => {
        console.log("mouse up clear interval");

        mouseStatus.current = { ...mouseStatus.current, isDown: false}
        canvas.current.endAction(mouseStatus.current.position, canvas, preview);

    }

    const handleKeyPress = (e) => {
        dispatchKeypressAction(e.keyCode, canvas, preview)
    }
   
    // Add listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keypress", handleKeyPress)

        return(() => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mosedown", handleMouseDown);
            document.removeEventListener("keypress", handleKeyPress);
        })
    }, [])



    return(
    <>
    <div>clear the canvas with 'c'</div>
    <div>
        Press 'f' for pencil/draw freeform
    </div>
    <div>
        Press 'r' for the rectangle draw tool
    </div>
    <div>
        Press 'n' to have no tools selected
    </div>
    </>
    )
}

const dispatchKeypressAction = (keyCode, canvasRef, previewRef) => {
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
        case 114: {
            selectRectangle(canvasRef);
            selectRectangle(previewRef);
            canvasRef.current['initialiseAction'] = (position, canvasRef) => { initialiseRectangle(position, canvasRef); };
            canvasRef.current['performAction'] = (position, canvasRef, previewRef) => { performRectangleAction(position, canvasRef, previewRef); };
            canvasRef.current['endAction'] = (position, canvasRef, previewRef) => { drawRectangle(position, canvasRef, previewRef); };
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