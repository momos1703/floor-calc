import React, { useState, useCallback } from 'react';
import './Grid.css';
import Square from '../Square/Square';
import { Controls } from '../Controls/Controls';
import { calculateVolume } from '../../utils/calculateVolume';
import { getAdjacentVertexes } from '../../utils/getAdjacentVertexes';

interface VertexData {
    [vertexId: string]: number[];
}

const initialSquareSideLength = 1000;
const initialSideLength = 3000;
const initialSquareQTY = 3;
const initialDepth = 0;

function Grid() {
  const [rows, setRows] = useState<number>(initialSquareQTY);
  const [cols, setCols] = useState<number>(initialSquareQTY);
  const [depth, setDepth] = useState<number>(initialDepth);
  const [sideLength, setSideLength] = useState<number>(initialSquareSideLength);
  const [totalWidth, setTotalWidth] = useState<number>(initialSideLength);
  const [totalHeight, setTotalHeight] = useState<number>(initialSideLength);
  const [calcResult, setCalcResult] = useState<number>(0);

  const initializeVertexData = useCallback((rows: number, cols: number, sideLength: number): VertexData => {
      const data: VertexData = {};
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            data[`${i}-${j}`] = [
              ...new Array(4).fill(initialDepth, 0),
              sideLength, 
              sideLength,
            ];
          }
      }
      return data;
  }, []);
  
  const [vertexData, setVertexData] = useState<VertexData>(() => (
    initializeVertexData(initialSquareQTY, initialSquareQTY, initialSquareSideLength))
  );

  const handleTotalWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalWidth(parseInt(e.target.value, 10) || 1000);
  }, []);

  const handleTotalHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalHeight(parseInt(e.target.value, 10) || 1000);
  }, []);
  
  const handleDepthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDepth = parseInt(e.target.value, 10) || 0;
    setDepth(newDepth);
  }, []);

  const handleUserData = useCallback(() => {
    // Розрахунок кількості повних квадратів
    const fullCols = Math.floor(totalWidth / sideLength);
    const fullRows = Math.floor(totalHeight / sideLength);
  
    // Розрахунок розміру останніх квадратів
    const remainderWidth = totalWidth % sideLength;
    const remainderHeight = totalHeight % sideLength;
  
    // Оновлюємо розміри сітки
    const newRows = remainderHeight > 0 ? fullRows + 1 : fullRows;
    const newCols = remainderWidth > 0 ? fullCols + 1 : fullCols;
  
    // Створюємо нові дані для всіх квадратів
    const newVertexData: VertexData = {};
    
    // Ініціалізуємо дані для всіх квадратів
    for (let i = 0; i < newRows; i++) {
      for (let j = 0; j < newCols; j++) {
        const squareId = `${i}-${j}`;
        const isLastCol = j === fullCols;
        const isLastRow = i === fullRows;
        
        newVertexData[squareId] = [
          depth, depth, depth, depth, // вершини
          isLastCol ? remainderWidth : sideLength,  // ширина
          isLastRow ? remainderHeight : sideLength, // висота
        ];
      }
    }
  
    // Оновлюємо стани
    setRows(newRows);
    setCols(newCols);
    setVertexData(newVertexData);
  }, [totalWidth, totalHeight, sideLength, depth]);

  const handleVertexChange = useCallback((
    squareId: string, 
    vertexPosition: number, 
    newValue: number,
  ) => {
    setVertexData(prevData => {
      const updatedData = { ...prevData };
      const adjacentVertexes = getAdjacentVertexes(squareId, vertexPosition);
    
      // Оновлюємо значення у всіх спільних вершинах
      adjacentVertexes.forEach(vertex => {
        const [row, col, pos] = vertex.split('-').map(Number);
        if (!updatedData[`${row}-${col}`]) {
          updatedData[`${row}-${col}`] = [0, 0, 0, 0, sideLength, sideLength];
        }
        updatedData[`${row}-${col}`][pos] = newValue;
      });
      
      return updatedData;
    });
  }, [sideLength]);

    const handleSideLengthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSideLength(parseInt(e.target.value, 10) || 50);
    }, []);
  

  const calculateTotalVolume = () => {
    let totalVolume = 0;
    
    Object.entries(vertexData).forEach(([, values]) => {
      const [topLeft, topRight, bottomRight, bottomLeft, width, height] = values;
      const squareVolume = calculateVolume(width, height, [topLeft, topRight, bottomRight, bottomLeft]);
      totalVolume += squareVolume;
    });
    
    return totalVolume;
  };

  const handleCalculation = () => {
    const totalVolume = calculateTotalVolume();
    setCalcResult(totalVolume);
  }

  const resetUserData = () => {
    setTotalWidth(initialSideLength);
    setTotalHeight(initialSideLength);
    setSideLength(initialSquareSideLength);
    setDepth(initialDepth);
    setCalcResult(0);
    setRows(initialSquareQTY);
    setCols(initialSquareQTY);
    setVertexData(initializeVertexData(initialSquareQTY, initialSquareQTY, initialSquareSideLength));
  };

    return (
      <div className="grid-container">
        {/* <div className="controls">
            <div className="controls__field">
              <label>Загальна ширина (мм):</label>
              <input 
                className="controls__input"
                type="number"
                value={totalWidth}
                onChange={handleTotalWidthChange}
                min="1000"
                step={100}
              />
            </div>
            <div className="controls__field">
              <label>Загальна висота (мм):</label>
              <input 
                className="controls__input"
                type="number"
                value={totalHeight}
                onChange={handleTotalHeightChange}
                min="1000"
                step={100}
              />
          </div>
          <div className="controls__field">
              <label>Довжина сторони (мм):</label>
              <input 
                className="controls__input"  
                type="number" 
                value={sideLength} 
                onChange={handleSideLengthChange} 
                min="500"
                step="500"
              />
            </div>
            <div className="controls__field">
              <label>Середня глибина (мм):</label>
              <input 
                className="controls__input"  
                type="number" 
                value={depth}
                onChange={handleDepthChange}
                min="0"
                step="1"
              />
            </div>
            <button 
              type="button"
              className="controls__button"
              onClick={handleUserData}
            >
              Застосувати
            </button>
            <button 
              type="button"
              className="controls__button--reset"
              onClick={resetUserData}
            >
              Х
            </button>
        </div> */}
            <Controls
              totalWidth={totalWidth}
              totalHeight={totalHeight}
              sideLength={sideLength}
              depth={depth}
              onTotalWidthChange={handleTotalWidthChange}
              onTotalHeightChange={handleTotalHeightChange}
              onSideLengthChange={handleSideLengthChange}
              onDepthChange={handleDepthChange}
              onApply={handleUserData}
              onReset={resetUserData}
            />
            <div className="grid"
              style={{gridTemplateColumns: `repeat(${cols}, auto)`}}>
                {Array.from({ length: rows }).map((_, row) => (
                    Array.from({ length: cols }).map((_, col) => (
                      <Square
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        vertexData={vertexData}
                        gridSize={{rows, cols}}
                        onVertexChange={handleVertexChange}
                      />
                    )))
                )}
        </div>
        <div className="calculation-container">
          {calcResult > 0 && <p>{`${calcResult.toFixed(2)} куб. м`}</p>}
          <button
            type='button' 
            tabIndex={
              ((rows - 1) * (cols + 1)) + (cols + 1) * 2 + 1
            } 
            onClick={handleCalculation}
          >
            Розрахувати
          </button>
        </div>
      </div>
    );
}

export default Grid;