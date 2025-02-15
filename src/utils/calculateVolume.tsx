export const calculateVolume = (Lx: number, Ly: number, depth: number[]) => {
  const A = Lx * Ly;
  const h_avg = (depth[0] * Lx + depth[1] * Ly + depth[2] * Lx + depth[3] * Ly) / (2 * (Lx + Ly));
  return (A * h_avg) / 1e9;
};