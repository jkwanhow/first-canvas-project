import { clearBoard } from "./clearBoard";

export function selectRectangle(canvasRef){
    const canvas = canvasRef.current;
    const ctx = canvas.ctx;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
}

export function initialiseRectangle(position, canvasRef){
    const canvas = canvasRef.current;
    canvas.positions = {startingPosition: position};
}

export function performRectangleAction(position, canvasRef, previewRef){
    const canvas = previewRef.current;
    const ctx = canvas.ctx;
    clearBoard(previewRef);
    const startPosition = canvasRef.current.positions.startingPosition;
    const differenceFromStart = calculateTravel(startPosition, position);
    ctx.strokeRect(startPosition.x, startPosition.y, -differenceFromStart.x, -differenceFromStart.y);
}

export function drawRectangle(position, canvasRef, previewRef){
    clearBoard(previewRef);
    const canvas = canvasRef.current;
    const ctx = canvas.ctx;
    const startPosition = canvas.positions.startingPosition;
    const differenceFromStart = calculateTravel(startPosition, position);
    ctx.strokeRect(startPosition.x, startPosition.y, -differenceFromStart.x, -differenceFromStart.y);
}

function calculateTravel(oldPosition, newPosition){
    return {x: oldPosition.x - newPosition.x, y: oldPosition.y - newPosition.y};
}