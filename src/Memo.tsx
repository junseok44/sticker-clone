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
  // const onDragHandler = (e: React.DragEvent) => {
  //   e.dataTransfer.dropEffect = "move";
  //   console.log(e.clientX, e.clientY);
  //   changePos(item.date, e.clientX, e.clientY);
  // };
  let isMoving = false;
  const moveAt = (pageX: number, pageY: number) => {
    changePos(item.date, pageX - 100, pageY - 100);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isMoving = true;
    moveAt(e.pageX, e.pageY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    console.log("mouse moving", e.pageX, e.pageY);
    if (isMoving == true) moveAt(e.pageX, e.pageY);
  };
  const onMouseUp = () => {
    isMoving = false;
  };

  return (
    <div
      // draggable={true}
      // onDragEnd={onDragHandler}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
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
