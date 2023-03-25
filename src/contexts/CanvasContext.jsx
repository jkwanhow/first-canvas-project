import React, {useRef, createContext, useContext} from 'react';

const CanvasContext = createContext({canvas: null, preview: null, actions: null});

export function CanvasProvider({children}){

    const canvasRef = useRef(null);
    const previewRef = useRef(null);
    const actionsRef = useRef({});

    return(
    <CanvasContext.Provider value={{canvas:canvasRef, preview:previewRef, actions: actionsRef}}>
        {children}
    </CanvasContext.Provider>
    )
}

export const useCanvas = () => {
    return useContext(CanvasContext);
}