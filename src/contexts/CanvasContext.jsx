import React, {useRef, createContext, useContext} from 'react';

const CanvasContext = createContext({canvas: null, preview: null});

export function CanvasProvider({children}){

    const canvasRef = useRef(null);
    const previewRef = useRef(null)

    return(
    <CanvasContext.Provider value={{canvas:canvasRef, preview:previewRef}}>
        {children}
    </CanvasContext.Provider>
    )
}

export const useCanvas = () => {
    return useContext(CanvasContext);
}