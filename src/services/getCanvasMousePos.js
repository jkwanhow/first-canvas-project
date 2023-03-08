//Credit to https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas for the solution

export default function getCanvasMousePos(canvasRef, truePos){
    const canvas = canvasRef.current;
    var rect = canvas.getBoundingClientRect();
    return {
        x: truePos.x - rect.left,
        y: truePos.y - rect.top
    }
}