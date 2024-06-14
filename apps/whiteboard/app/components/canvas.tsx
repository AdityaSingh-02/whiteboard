'use client'
import { AnyNode } from 'postcss';
import React, { useEffect, useRef, useState } from 'react'

const WhiteBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setCurrentColor] = useState<any>('black');
  const [lineWidth, setLineWidth] = useState<any>(3);
  const [drawingAction, setDrawingAction] = useState<any>([]);
  const [currentPath, setCurrentPath] = useState<any>([]);
  const [currentStyle, setCurrentStyle] = useState<any>({ color: 'black', lineWidth: 3 });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 900;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      reDrawPreviousData(ctx);
    }
  }, []);

  const startDrawing = (e) => {
    if (context) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);;
      setDrawing(true);
    }
  }

  const draw = (e) => {
    if (!drawing) return;
    if (context) {
      context.strokeStyle = currentStyle.color;
      context.lineWidth = currentStyle.lineWidth;
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
      setCurrentPath([...currentPath, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
    }
  }

  const endDrawing = () => {
    setDrawing(false);
    context && context.closePath();
    if (currentPath.length > 0) {
      setDrawingAction([...drawingAction, { path: currentPath, style: currentStyle }]);
    }
    setCurrentPath([]);
  }

  const changeColor = (color) => {
    setCurrentColor(color);
    setCurrentStyle({ ...currentStyle, color });
  }

  const changeWidth = (width) => {
    setLineWidth(width);
    setCurrentStyle({ ...currentStyle, lineWidth: width });
  }

  const undo = () => {
    if (drawingAction.length > 0 && canvasRef.current) {
      drawingAction.pop();
      const newCtx:any = canvasRef.current.getContext('2d');
      newCtx.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
      drawingAction.forEach(({ path, style }:any) => {
        newCtx?.beginPath();
        newCtx.strokeStyle = style.color;
        newCtx.lineWidth = style.lineWidth;
        newCtx?.moveTo(path[0].x, path[0].y);
        path.forEach((point) => {
          newCtx?.lineTo(point.x, point.y);
        });
        newCtx?.stroke();
      })``
    }
  }

  const clearDrawing = () => {
    setDrawingAction([]);
    setCurrentPath([]);
    const newCtx = canvasRef.current.getContext('2d');
    newCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  const reDrawPreviousData = (ctx) => {
    drawingAction.forEach(({ path, style }) => {
      ctx.beginPath();
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.lineWidth;
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    })
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
      />
      <div className='flex my-4'>
        <button
          className='bg-red-500 text-white px-4 py-2 mx-2'
          onClick={() => changeColor('red')}
        >
          Red
        </button>
        <button
          className='bg-green-500 text-white px-4 py-2 mx-2'
          onClick={() => changeColor('green')}
        >
          Green
        </button>
        <button
          className='bg-blue-500 text-white px-4 py-2 mx-2'
          onClick={() => changeColor('blue')}
        >
          Blue
        </button>
        <button
          className='bg-black text-white px-4 py-2 mx-2'
          onClick={() => changeColor('black')}
        >
          Black
        </button>
      </div>
    </div>
  )
}

export default WhiteBoard