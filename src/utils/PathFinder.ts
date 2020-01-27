import { Verticle, VerticlesArray } from "../types";

export class PathFinder<T> {
  private frontire: VerticlesArray<T> = [];
  private touched: VerticlesArray<T> = [];
  private path: VerticlesArray<T> = [];
  private pathFound = false;
  private target: Verticle<T>;

  public loopFuse = 300;

  constructor(
    from: Verticle<T>,
    to: Verticle<T>,
    getNeighbors: (v: Verticle<T>) => Verticle<T>[]
  ) {
    this.target = to;
    this.frontire = [from];
    this.getNeighbors = getNeighbors;
  }

  getNeighbors: (v: Verticle<T>) => Verticle<T>[] = null;

  iterationStep() {
    const newFrontire: VerticlesArray<T> = [];

    this.frontire.forEach(frontireItem =>
      this.getNeighbors(frontireItem).forEach(neighbor => {
        if (neighbor === this.target) {
          this.collectPath(neighbor);
        }

        if (!this.touched.includes(neighbor)) {
          neighbor.cameFrom = frontireItem;
          newFrontire.push(neighbor);
        }
      })
    );

    this.touched.push(...this.frontire);
    this.frontire = newFrontire;
  }

  collectPath(v: Verticle<T>) {
    if (v.cameFrom) {
      this.path.push(v.cameFrom);
      this.collectPath(v.cameFrom);
    }
  }

  calculate() {
    let iterationCount = 0;

    while (this.frontire.length > 0) {
      iterationCount++;
      if (iterationCount > this.loopFuse) {
        console.warn(
          "Looks like there is a infinite loop. Increase loop fuse`s value if path is fine"
        );

        break;
      }

      this.iterationStep();
    }

    return this.path;
  }
}
