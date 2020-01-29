import React, { useMemo, useState } from "react";
import "./styles.css";
import { VerticlesArray, Verticle } from "./types";
import { PathMatrix, BASE_2D } from "./components/PathMatrix";
import { PathFinder } from "./utils/PathFinder";
import { getNeighbors2D } from "./utils/aStar";

const totalItems = Math.pow(BASE_2D, 2);
const itemIds = [];
itemIds.length = totalItems;
itemIds.fill(" ");
const items = itemIds.map((item, id) => ({ id } as Verticle<number>));

for (let i = 0; i < 30; i++) {
  items[Math.floor(Math.random() * Math.pow(BASE_2D, 2))].isSolid = true;
}

export default function App() {
  const [start, setStart] = useState<Verticle<number>>(items[24]);
  const path = useMemo<VerticlesArray<number>>(() => {
    const finder = new PathFinder(start, items[25], getNeighbors2D(items));
    items.forEach(item => (item.cameFrom = undefined));

    return finder.calculate();
  }, [start]);

  return <PathMatrix setStart={setStart} path={path} items={items} />;
}
