export interface Verticle<T> {
  id: T;
  cameFrom?: Verticle<T>;
}

export type NeighborsGetter<T> = (v: Verticle<T>) => Verticle<T>[];

export type VerticlesArray<T> = Array<Verticle<T>>;
