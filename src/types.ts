export interface Verticle {
  id: number;
  cameFrom?: Verticle;
}

export interface Graph {
  verticles: Array<Verticle>;
}
