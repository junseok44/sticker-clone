import React, { useState, useEffect } from "react";
import { Ttodo } from "./types";
import { observer } from "mobx-react";

const Memo = ({
  item,
  index,
  setmovingId,
  editMemo,
  changeZIndex,
}: {
  item: Ttodo;
  index: number;
  setmovingId: React.Dispatch<React.SetStateAction<number | null>>;
  editMemo: (id: number, msg: string) => void;
  changeZIndex: (id: number) => void;
}) => {
  const [memoInput, setmemoInput] = useState<string>(item.msg);

  useEffect(() => {
    editMemo(item.date, memoInput);
  }, [memoInput]);

  const onMouseDown = () => {
    setmovingId(item.date);
  };
  const onMouseUp = () => {
    setmovingId(null);
  };

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmemoInput(e.target.value);
    // 여기서 setmemoInput을 하지만 값이 바뀌는건 나중에 된다.
  };

  return (
    <div
      // draggable={true}
      // onDragEnd={onDragHandler}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={() => changeZIndex(item.date)}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        left: item.x,
        top: item.y,
        zIndex: item.zIndex,
      }}
    >
      <h1>this is memo {index}</h1>
      <textarea value={memoInput} onChange={onChangeMemo}></textarea>
    </div>
  );
};

export default observer(Memo);
