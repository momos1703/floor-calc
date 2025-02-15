import React, { useCallback } from 'react';
import './VertexInput.css';

interface VertexInputProps {
  squareId: string;
  value: number;
  vertexPosition: number;
  tabIndex?: number;
  onChange: (squareId: string, vertexPosition: number, newValue: number) => void;
}

function VertexInput({ squareId: squareId, value, vertexPosition, tabIndex, onChange }: VertexInputProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+(e.target.value))) return;

    onChange(squareId, vertexPosition, +(e.target.value));
  }, [onChange, squareId, vertexPosition]);

  return (
    <input
      type="number"
      className="vertex-input"
      value={value}
      onChange={handleChange}
      tabIndex={tabIndex}
      min={0}
    />
  );
}

export default VertexInput;