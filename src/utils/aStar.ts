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

  function pushIfValid(v: Verticle<number>) {
    const mod = targetIndex % BASE_2D;
    const tmod = mod + 1;
    const bmod = mod - 1;
    const isModValid = bmod >= -0 && tmod <= BASE_2D;

    if (v && !v.isSolid && isModValid) {
      vArray.push(v);
    }
  }

  pushIfValid(leftNeighbor);
  pushIfValid(rightNeighbor);
  pushIfValid(topNeighbor);
  pushIfValid(bottomNeighbor);

  return vArray;
};
