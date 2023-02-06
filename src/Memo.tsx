import React from "react";
import { Ttodo } from "./types";
import { observer } from "mobx-react";

const Memo = ({
  item,
  index,
  setmovingId,
  editMemo,
}: {
  item: Ttodo;
  index: number;
  setmovingId: React.Dispatch<React.SetStateAction<number | null>>;
  editMemo: (id: number, msg: string) => void;
}) => {
  // const onDragHandler = (e: React.DragEvent) => {
  //   e.dataTransfer.dropEffect = "move";
  //   console.log(e.clientX, e.clientY);
  //   changePos(item.date, e.clientX, e.clientY);
  // };
  let isMoving = false;

  const onMouseDown = () => {
    setmovingId(item.date);
  };
  const onMouseUp = () => {
    setmovingId(null);
  };

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    editMemo(item.date, e.target.value);
  };

  return (
    <div
      // draggable={true}
      // onDragEnd={onDragHandler}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        left: item.x,
        top: item.y,
      }}
    >
      <h1>this is memo {index}</h1>
      <textarea value={item.msg} onChange={onChangeMemo}></textarea>
    </div>
  );
};

export default observer(Memo);
