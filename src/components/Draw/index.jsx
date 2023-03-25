import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import {selectRectangle, initialiseRectangle, performRectangleAction, drawRectangle} from '../../services/drawRectangle';
import { clearBoard } from '../../services/clearBoard';
import getCanvasMousePos from '../../services/getCanvasMousePos';
import { initialiseFreeFromDraw, performFreeFromAction, selectFreeFormDraw } from '../../services/drawFreeForm';

export default function Draw(){
    const {canvas, preview, actions} = useCanvas();

    const mouseStatus = useRef(null);
    const handleMouseMove = (e) => {

        mouseStatus.current = {...mouseStatus.current, position: {x: e.clientX, y: e.clientY} };
        if(mouseStatus.current.isDown){
            actions.current.performAction(mouseStatus.current.position, canvas, preview);

        }
    }
    const handleMouseDown = () => {
        mouseStatus.current = { ...mouseStatus.current, isDown: true };
        actions.current.initialiseAction(mouseStatus.current.position, canvas, preview);
 
    }

    const handleMouseUp = () => {
        mouseStatus.current = { ...mouseStatus.current, isDown: false}
        actions.current.endAction(mouseStatus.current.position, canvas, preview);

    }

    const handleKeyPress = (e) => {
        dispatchKeypressAction(e.keyCode, actions, canvas, preview)
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

const dispatchKeypressAction = (keyCode, actionsRef, canvasRef, previewRef) => {
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
            actionsRef.current.initialiseAction = (position, ref) => { initialiseFreeFromDraw(position, ref)};
            actionsRef.current.performAction = (position, ref) => { performFreeFromAction(position, ref)};
            actionsRef.current.endAction = (position, ref) => {canvasRef.current.ctx.closePath()};
            break;
        }
        case 110: {
            console.log("f key was pressed");
            actionsRef.current['initialiseAction'] = (position, canvasRef) => { console.log('intial action intialiser'); };
            actionsRef.current['performAction'] = (position, canvasRef) => { console.log('performing action'); };
            actionsRef.current['endAction'] = (position, canvasRef) => { console.log('action ending'); };
            break;
        }
        case 114: {
            selectRectangle(canvasRef);
            selectRectangle(previewRef);
            actionsRef.current['initialiseAction'] = (position, canvasRef) => { initialiseRectangle(position, canvasRef); };
            actionsRef.current['performAction'] = (position, canvasRef, previewRef) => { performRectangleAction(position, canvasRef, previewRef); };
            actionsRef.current['endAction'] = (position, canvasRef, previewRef) => { drawRectangle(position, canvasRef, previewRef); };
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