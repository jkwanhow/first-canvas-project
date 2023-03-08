export default function drawRectangle(position, canvasRef){
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#000000'
    context.fillRect(position.x, position.y, 10, 10)
}