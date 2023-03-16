export default function drawRectangle(position, canvasRef){
    const canvas = canvasRef.current;
    const ctx = canvas.ctx
    ctx.fillStyle = '#000000'
    ctx.fillRect(position.x, position.y, 10, 10)
}