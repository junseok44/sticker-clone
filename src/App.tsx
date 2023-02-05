import React, { useCallback, useState } from "react";
import { TtodoStore } from "./types";
import { observer } from "mobx-react";
import Memo from "./Memo";

const App = ({ store }: { store: TtodoStore }) => {
  const [input, setInput] = useState<string>("");
  const [movingId, setmovingId] = useState<number | null>(null);
  const addMemo = useCallback(() => {
    store.addMemo();
  }, [store]);

  const changePos = useCallback(
    (id: number, xPos: number, yPos: number) => {
      store.changePosition(id, xPos, yPos);
    },
    [store]
  );
  const onMouseMove = (e: React.MouseEvent) => {
    console.log("mouse moving", e.pageX, e.pageY);
    // 여기서 대상 객체의 위치를 변경해야함.
    if (movingId !== null) {
      changePos(movingId, e.pageX - 100, e.pageY - 100);
    }
  };

  return (
    <div>
      <button onClick={addMemo}>addMemo {movingId} </button>
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          width: "100%",
          height: "200vh",
        }}
        onMouseMove={onMouseMove}
      >
        {store.todo.map((todo, index) => (
          <Memo item={todo} index={index} setmovingId={setmovingId}></Memo>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
