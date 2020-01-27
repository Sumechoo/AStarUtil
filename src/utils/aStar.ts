import { Verticle } from "../types";
import { PathFinder } from "./PathFinder";

const verticles = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
  id => ({ id } as Verticle<number>)
);

const pathFinder = new PathFinder<number>(verticles[2], () => [verticles[5]]);

export function runTest() {
  pathFinder.calculate();
}
