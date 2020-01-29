import React, { useCallback } from "react";
import { VerticlesArray, Verticle } from "../types";

export const BASE_2D = 15;

interface ButtonProps {
  value: Verticle<number>;
  highlighted?: boolean;
  setStart: (start: Verticle<number>) => void;
}

const PathButton: React.FC<ButtonProps> = props => {
  const { value, highlighted, setStart } = props;

  let backgroundColor = highlighted && "lightcoral";

  if (value.isSolid) {
    backgroundColor = "black";
  }

  const onHoverCallback = useCallback(() => {
    value.cameFrom = undefined;
    setStart(value);
  }, [value, setStart]);

  return (
    <button
      onMouseEnter={onHoverCallback}
      style={{
        color: "rgba(0,0,0,0)",
        width: 30,
        height: 30,
        backgroundColor
      }}
    >
      {value.id}
    </button>
  );
};

interface Props {
  items: VerticlesArray<number>;
  path: VerticlesArray<number>;
  setStart: (start: Verticle<number>) => void;
}

export const PathMatrix: React.FC<Props> = props => {
  const { items, path, setStart } = props;

  return (
    <>
      {items.map((item, index) => {
        const highlighted = path.includes(item);

        return (
          <>
            <PathButton
              setStart={setStart}
              value={item}
              highlighted={highlighted}
            />
            {!((index + 1) % BASE_2D) && <br />}
          </>
        );
      })}
    </>
  );
};
