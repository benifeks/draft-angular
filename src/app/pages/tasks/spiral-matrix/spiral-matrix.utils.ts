export function generateMatrix(size: number): number[][] {
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  let num = 1;
  let top = 0,
    bottom = size - 1;
  let left = 0,
    right = size - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) matrix[top][i] = num++;
    top++;

    for (let i = top; i <= bottom; i++) matrix[i][right] = num++;
    right--;

    for (let i = right; i >= left; i--) matrix[bottom][i] = num++;
    bottom--;

    for (let i = bottom; i >= top; i--) matrix[i][left] = num++;
    left++;
  }

  return matrix;
}

export function animateSpiralFill(
  size: number,
  setMatrix: (m: any[][]) => void
) {
  const matrix = Array.from({ length: size }, () => Array(size).fill('❓'));
  setMatrix(matrix);

  const total = size * size;
  let top = 0,
    bottom = size - 1;
  let left = 0,
    right = size - 1;
  let count = 1;
  const steps: [number, number, number][] = [];

  while (count <= total) {
    for (let i = left; i <= right && count <= total; i++)
      steps.push([top, i, count++]);
    top++;

    for (let i = top; i <= bottom && count <= total; i++)
      steps.push([i, right, count++]);
    right--;

    for (let i = right; i >= left && count <= total; i--)
      steps.push([bottom, i, count++]);
    bottom--;

    for (let i = bottom; i >= top && count <= total; i--)
      steps.push([i, left, count++]);
    left++;
  }

  steps.forEach(([row, col, value], index) => {
    setTimeout(() => {
      matrix[row][col] = value;
      setMatrix(matrix.map((r) => [...r]));
    }, index * 100);
  });
}
