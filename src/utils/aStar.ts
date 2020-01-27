import { Verticle, VerticlesArray } from "../types";
import { PathFinder } from "./PathFinder";

const verticles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
  id => ({ id } as Verticle<number>)
);

const getNeighbors = (v: Verticle<number>) => {
  const vArray: VerticlesArray<number> = [];
  const targetId = v.id;

  const leftNeighbor = verticles.find(item => item.id === targetId - 1);
  const rightNeighbor = verticles.find(item => item.id === targetId + 1);

  if (leftNeighbor) vArray.push(leftNeighbor);
  if (rightNeighbor) vArray.push(rightNeighbor);

  return vArray;
};

const pathFinder = new PathFinder<number>(verticles[4], getNeighbors);

export function runTest() {
  pathFinder.calculate();
}
