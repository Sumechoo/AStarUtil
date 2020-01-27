import { Verticle, VerticlesArray } from "../types";
import { BASE_2D } from "../components/PathMatrix";

export const getNeighbors1D = (verticles: VerticlesArray<number>) => (
  v: Verticle<number>
) => {
  const vArray: VerticlesArray<number> = [];
  const targetIndex = verticles.indexOf(v);

  const leftNeighbor = verticles[targetIndex - 1];
  const rightNeighbor = verticles[targetIndex + 1];

  if (leftNeighbor) vArray.push(leftNeighbor);
  if (rightNeighbor) vArray.push(rightNeighbor);

  return vArray;
};

export const getNeighbors2D = (verticles: VerticlesArray<number>) => (
  v: Verticle<number>
) => {
  const vArray: VerticlesArray<number> = [];
  const targetIndex = verticles.indexOf(v);

  const leftNeighbor = verticles[targetIndex - 1];
  const rightNeighbor = verticles[targetIndex + 1];
  const topNeighbor = verticles[targetIndex + BASE_2D];
  const bottomNeighbor = verticles[targetIndex - BASE_2D];

  if (leftNeighbor) vArray.push(leftNeighbor);
  if (rightNeighbor) vArray.push(rightNeighbor);
  if (topNeighbor) vArray.push(topNeighbor);
  if (bottomNeighbor) vArray.push(bottomNeighbor);

  return vArray;
};
