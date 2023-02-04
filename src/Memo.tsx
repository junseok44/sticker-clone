import React from "react";
import { Ttodo } from "./types";
import { observer } from "mobx-react";

const Memo = ({
  item,
  index,
  changePos,
}: {
  item: Ttodo;
  index: number;
  changePos: (id: number, xPos: number, yPos: number) => void;
}) => {
  const onDragHandler = (e: React.DragEvent) => {
    e.dataTransfer.dropEffect = "move";
    console.log(e.clientX, e.clientY);
    changePos(item.date, e.clientX, e.clientY);
  };

  return (
    <div
      draggable={true}
      onDragEnd={onDragHandler}
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        position: "absolute",
        left: item.x,
        top: item.y,
      }}
    >
      <h1>this is memo {index}</h1>
      <textarea></textarea>
    </div>
  );
};

export default observer(Memo);
