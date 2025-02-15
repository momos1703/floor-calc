export const getAdjacentVertexes = (squareId: string, vertexPosition: number) => {
      // Отримуємо координати поточної вершини
      const [row, col] = squareId.split('-').map(Number);
      const adjacentSquares = [`${row}-${col}-${vertexPosition}`];

      // Перевіряємо наявність сусідніх вершин у всіх напрямках
      switch (vertexPosition) {
        case 0: // topLeft
          if (row > 0) adjacentSquares.push(`${row - 1}-${col}-3`);
          if (col > 0) adjacentSquares.push(`${row}-${col - 1}-1`);
          if (row > 0 && col > 0) adjacentSquares.push(`${row - 1}-${col - 1}-2`);
          break;
        case 1: // topRight
          if (row > 0) adjacentSquares.push(`${row - 1}-${col}-2`);
          break;
        case 3: // bottomLeft
          if (col > 0) adjacentSquares.push(`${row}-${col - 1}-2`);
          break;
        default:
          break;
      }
      
      return adjacentSquares;
  };