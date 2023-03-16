export function initialiseFreeFromDraw(position, canvasRef){
    console.log('initialise free form')
    const canvas = canvasRef.current;
    const ctx = canvas.ctx;
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(position.x, position.y)
}

export function performFreeFromAction(position, canvasRef){
    canvasRef.current.ctx.lineTo(position.x, position.y);
    canvasRef.current.ctx.stroke();
}