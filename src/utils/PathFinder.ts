import { Verticle, VerticlesArray, NeighborsGetter } from "../types";

export class PathFinder<T> {
  private frontire: VerticlesArray<T> = [];
  private touched: VerticlesArray<T> = [];
  private path: VerticlesArray<T> = [];
  private start: Verticle<T>;
  private target: Verticle<T>;
  private pathFound = false;

  public loopFuse = 300;

  constructor(
    from: Verticle<T>,
    to: Verticle<T>,
    getNeighbors: NeighborsGetter<T>
  ) {
    this.start = from;
    this.target = to;
    this.frontire = [from];
    this.getNeighbors = getNeighbors;
  }

  getNeighbors: NeighborsGetter<T> = null;

  iterationStep() {
    const newFrontire: VerticlesArray<T> = [];

    this.frontire.forEach(frontireItem =>
      this.getNeighbors(frontireItem).forEach(neighbor => {
        if (neighbor === this.target) {
          this.pathFound = true;
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
    if (v.cameFrom && v !== this.start) {
      this.path.push(v.cameFrom);
      this.collectPath(v.cameFrom);
    }
  }

  calculate() {
    let iterationCount = 0;

    this.path = [];
    this.pathFound = false;

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
