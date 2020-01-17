import { Verticle } from "../types";

export function findPath(
  // verticles: Array<Verticle>,
  // canGo: (from: Verticle, to: Verticle) => boolean,
  getNeighbours: (of: Verticle) => Array<Verticle>,
  from: Verticle,
  to: Verticle
) {
  let touched: Verticle[] = [from, ...getNeighbours(from)];
  let frontire: Verticle[] = getNeighbours(from);

  const path: Verticle[] = [];

  try {
    frontire.forEach(frontireMember => {
      getNeighbours(frontireMember).forEach(neighbour => {
        if (!touched.includes(neighbour)) {
          touched.push(neighbour);
          neighbour.cameFrom = frontireMember;

          console.info(frontire.map(v => v.id));
        } else {
          frontire.push(neighbour);
        }

        frontire = frontire.slice(frontire.indexOf(frontireMember));
      });
    });
  } catch (e) {
    console.warn(e);
  }

  return path;
}

const verticles = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(id => ({ id } as Verticle));
const getNeighbours = (of: Verticle) => {
  console.info("getting neighs at ", of.id);

  const { id } = of;
  const ns: Verticle[] = [verticles[id - 1], verticles[id + 1]];

  return ns;
};

export function runTest() {
  console.info("tried to run");
  const path = findPath(getNeighbours, verticles[3], verticles[7]);

  console.info(path);
}
