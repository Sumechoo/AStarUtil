import React, { useMemo, useState } from "react";
import "./styles.css";
import { VerticlesArray, Verticle } from "./types";
import { PathMatrix, BASE_2D } from "./components/PathMatrix";
import { PathFinder } from "./utils/PathFinder";
import { getNeighbors1D } from "./utils/aStar";

const totalItems = Math.pow(BASE_2D, 2);
const itemIds = [];
itemIds.length = totalItems;
itemIds.fill(" ");
const items = itemIds.map((item, id) => ({ id } as Verticle<number>));

export default function App() {
  const [start, setStart] = useState<Verticle<number>>(items[24]);
  const path = useMemo<VerticlesArray<number>>(() => {
    const finder = new PathFinder(start, items[78], getNeighbors1D(items));

    return finder.calculate();
  }, [start]);

  return <PathMatrix setStart={setStart} path={path} items={items} />;
}
