import { Verticle, VerticlesArray } from "../types";
import { PathFinder } from "./PathFinder";

const verticles = [10, 51, 22, 43233, 4, 5, 666, 7, 8, 9, 10, 11, 12].map(
  id => ({ id } as Verticle<number>)
);

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

const pathFinder = new PathFinder<number>(
  verticles[1],
  verticles[9],
  getNeighbors1D(verticles)
);

export function runTest() {
  pathFinder.loopFuse = 12;

  const path = pathFinder.calculate();

  console.info("path after iteration:", path);
}
