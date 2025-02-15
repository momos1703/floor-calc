import VertexInput from '../VertexInput/VertexInput';
import './Square.css';

interface SquareProps {
  row: number;
  col: number;
  vertexData: { [squareId: string]: number[] };
  gridSize: { rows: number; cols: number };
  onVertexChange: (vertexId: string, vertexPosition: number, newValue: number) => void;
}

function Square({ row, col, vertexData, gridSize, onVertexChange }: SquareProps) {
  const vertexPositions = {
    'top-left': 0,
    'top-right': 1,
    'bottom-right': 2,
    'bottom-left': 3,
  };
  const squareId = `${row}-${col}`;
  const lastSquareInRowId = `${row}-${gridSize.cols - 1}`;
  const lastSquareInColId = `${gridSize.rows - 1}-${col}`;
  const lastSquareId = `${gridSize.rows - 1}-${gridSize.cols - 1}`;
  const isLastRow = row === gridSize.rows - 1;

  const renderSizeLabels = () => {
    if (squareId !== '0-0' && 
        squareId !== `0-${gridSize.cols - 1}` && 
        squareId !== `${gridSize.rows - 1}-0`) {
      return null;
    }

    return (
      <>
        {squareId === '0-0' && (
          <>
            <div className='square__size square__size--hor'>
              <br />{vertexData[squareId][4] + ' мм'}
            </div>
            <div className='square__size square__size--vert'>
              <br />{vertexData[squareId][5] + ' мм'}
            </div>
          </>
        )}
        {squareId === `0-${gridSize.cols - 1}` && 
         vertexData[squareId][4] !== vertexData['0-0'][4] && (
          <div className='square__size square__size--hor'>
            <br />{vertexData[squareId][4] + ' мм'}
          </div>
        )}
        {squareId === `${gridSize.rows - 1}-0` && 
         vertexData[squareId][5] !== vertexData['0-0'][4] && (
          <div className='square__size square__size--vert'>
            <br />{vertexData[squareId][5] + ' мм'}
          </div>
        )}
      </>
    );
  };

  const renderVertex = (position: keyof typeof vertexPositions, condition: boolean) => {
    if (!condition) return null;

    return (
      <div className={`vertex ${position.replace('_', '-')}`}>
        <VertexInput
          squareId={squareId}
          value={vertexData[squareId][vertexPositions[position]]}
          vertexPosition={vertexPositions[position]}
          onChange={onVertexChange}
          tabIndex={getTabIndex(vertexPositions[position])}
        />
      </div>
    );
  };


  const getTabIndex = (vertexPosition: number) => {
    const totalColumnsInRow = gridSize.cols;
    const totalTopVerticesInRow = totalColumnsInRow + 1;
    
    // Для не останніх рядів - тільки верхні точки
    if (!isLastRow) {
      // Повертаємо індекс тільки для верхніх точок
      if (vertexPosition === 0 || vertexPosition === 1) {
        return row * totalTopVerticesInRow + col + 1;
      }
      return -1;
    }
    
    // Для останнього ряду
    const totalPreviousVertices = (gridSize.rows - 1) * totalTopVerticesInRow; // всі точки попередніх рядів
    
    if (vertexPosition === 0 || vertexPosition === 1) {
      // Верхні точки останнього ряду
      return totalPreviousVertices + col + vertexPosition + 1;
    }
    
    if (vertexPosition === 3 || vertexPosition === 2) {
      // Нижні точки останнього ряду (спочатку 3, потім 2)
      const totalTopVertices = totalPreviousVertices + totalTopVerticesInRow;
      return totalTopVertices + col + (vertexPosition === 3 ? 0 : 1) + 1;
    }

    return -1;
  };

  const width = vertexData[squareId][4] < 200 ? '110px' : (vertexData[squareId][4] / 5 + 'px');
  const height = vertexData[squareId][5] < 200 ? '110px' : (vertexData[squareId][5] / 5 + 'px');
  
  return (
    <div
      className="square"
      style={{ 
        width: width, 
        height: height,
        border: '1px solid #dee2e6',
        position: 'relative'
      }}
    >
      {renderSizeLabels()}
      {renderVertex('top-left', true)}
      {renderVertex('top-right', lastSquareInRowId === squareId)}
      {renderVertex('bottom-right', lastSquareId === squareId)}
      {renderVertex('bottom-left', lastSquareInColId === squareId)}
    </div>
  );
}

export default Square;