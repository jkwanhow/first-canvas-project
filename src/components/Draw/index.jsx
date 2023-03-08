import React, {useEffect, useRef, useState} from 'react';
import { useCanvas } from '../../contexts/CanvasContext';

export default function Draw(){
    const [mousePosState, setMousePosState] = useState({});
    const mousePos = useRef(null);
    const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    }
    const updateMouseState = (e) => {
        console.log('triggered')
        setMousePosState({x: e.clientX, y:e.clientY});
    }
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener("mousedown", updateMouseState);
    }, [])

    return(
    <>
    <div>click to update state of mouse position</div>
    <div>
        Mouse is at x={mousePosState.x} y={mousePosState.y}
    </div>
    </>
    )
}