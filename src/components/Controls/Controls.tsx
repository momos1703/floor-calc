import './Controls.css'

interface ControlsProps {
  totalWidth: number;
  totalHeight: number;
  sideLength: number;
  depth: number;
  onTotalWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTotalHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSideLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDepthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApply: () => void;
  onReset: () => void;
}

export function Controls({
  totalWidth,
  totalHeight,
  sideLength,
  depth,
  onTotalWidthChange,
  onTotalHeightChange,
  onSideLengthChange,
  onDepthChange,
  onApply,
  onReset,
}: ControlsProps) {
  return (
    <div className="controls">
      <div className="controls__field">
        <label>Загальна ширина (мм):</label>
        <input 
          className="controls__input"
          type="number"
          value={totalWidth}
          onChange={onTotalWidthChange}
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
          onChange={onTotalHeightChange}
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
          onChange={onSideLengthChange} 
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
          onChange={onDepthChange}
          min="0"
          step="1"
        />
      </div>
      <button type="button" className="controls__button" onClick={onApply}>
        Застосувати
      </button>
      <button type="button" className="controls__button--reset" onClick={onReset}>
        Х
      </button>
    </div>
  );
}