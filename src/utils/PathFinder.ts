import { Verticle, VerticlesArray } from "../types";

export class PathFinder<T> {
  private frontire: VerticlesArray<T> = [];
  private touched: VerticlesArray<T> = [];
  private path: VerticlesArray<T> = [];
  private pathFound = false;

  public loopFuse = 300;

  constructor(
    from: Verticle<T>,
    getNeighbors: (v: Verticle<T>) => Verticle<T>[]
  ) {
    this.frontire = getNeighbors(from);
    this.touched.push(from);
    this.getNeighbors = getNeighbors;
  }

  getNeighbors: (v: Verticle<T>) => Verticle<T>[] = null;

  iterationStep() {
    const newFrontire: VerticlesArray<T> = [];

    this.frontire.forEach(frontireItem =>
      this.getNeighbors(frontireItem).forEach(neighbor => {
        if (!this.touched.includes(neighbor)) {
          newFrontire.push(neighbor);
        }
      })
    );

    this.touched.push(...this.frontire);
    this.frontire = newFrontire;
  }

  calculate() {
    let iterationCount = 0;

    while (this.frontire.length > 0) {
      console.info("current step frontire:", this.frontire);
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
