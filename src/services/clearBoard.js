export function clearBoard(canvasRef){
    const canvas = canvasRef.current;
    const ctx = canvas.ctx;

    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

