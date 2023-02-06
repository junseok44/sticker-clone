import React, { useState, useEffect } from "react";
import { Ttodo } from "./types";
import { observer } from "mobx-react";
import { useResizeDetector } from "react-resize-detector";

const Memo = ({
  item,
  index,
  setmovingId,
  editMemo,
  changeZIndex,
  changeSize,
}: {
  item: Ttodo;
  index: number;
  setmovingId: React.Dispatch<React.SetStateAction<number | null>>;
  editMemo: (id: number, msg: string) => void;
  changeZIndex: (id: number) => void;
  changeSize: (id: number, width: number, height: number) => void;
}) => {
  const [memoInput, setmemoInput] = useState<string>(item.msg);

  const { width, height, ref } = useResizeDetector();

  useEffect(() => {
    changeSize(item.date, width as number, height as number);
    // FIXME 여기 고치기. width의 default값>?
  }, [width, height]);

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

  const onResizeDiv = () => {
    console.log("resizing");
  };

  return (
    <div
      onClick={() => changeZIndex(item.date)}
      onResize={onResizeDiv}
      ref={ref}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        left: item.x,
        top: item.y,
        zIndex: item.zIndex,
        resize: "both",
        overflow: "auto",
      }}
    >
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{
          width: "100%",
          height: "10%",
        }}
      >
        this is memo {index} {width} {height}
      </div>
      <textarea value={memoInput} onChange={onChangeMemo}></textarea>
    </div>
  );
};

export default observer(Memo);
