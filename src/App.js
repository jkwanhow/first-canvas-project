import logo from './logo.svg';
import { CanvasProvider } from './contexts/CanvasContext';
import Canvas from './components/Canvas';
import Draw from './components/Draw';

function App() {
  return (
    <CanvasProvider>
      <Canvas />
      <Draw />
    </CanvasProvider>
    
  );
}

export default App;
