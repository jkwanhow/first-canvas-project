export default function useRectangle(canvasRef){
    const context = canvas.getContext('2d');
    context.fillStyle = '#000000'
    context.fillRect(200, 0, 100, 100)
}