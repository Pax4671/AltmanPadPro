import { useRef, useState } from 'react';

export default function AltmanPadPro() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [poem, setPoem] = useState('');

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <h1>AltmanPad Pro</h1>
      <textarea
        value={poem}
        onChange={(e) => setPoem(e.target.value)}
        placeholder="ZINEの言葉を書く..."
        rows={4}
        cols={50}
      />
      <div>
        <label>色:</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <label>太さ:</label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        width={500}
        height={400}
        style={{ border: '1px solid #000', background: '#fff' }}
      />
    </div>
  );
}
