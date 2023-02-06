import React, { useCallback, useEffect, useState } from "react";
import { TtodoStore } from "./types";
import { toJS } from "mobx";
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

  const changeZIndex = useCallback(
    (id: number) => {
      store.changeZIndex(id);
    },
    [store]
  );

  const editMemo = useCallback(
    (id: number, msg: string) => {
      store.editMemo(id, msg);
    },
    [store]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (movingId !== null) {
        changePos(movingId, e.pageX - 100, e.pageY - 100);
      }
    },
    [movingId, changePos]
  );

  return (
    <div>
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          width: "100%",
          height: "200vh",
        }}
        onMouseMove={onMouseMove}
      >
        <button onClick={addMemo}>addMemo {movingId} </button>
        <button
          onClick={() => {
            store.todo.map((item) => console.log(toJS(item).zIndex));
          }}
        >
          console todo List
        </button>
        {store.todo.map((todo, index) => (
          <Memo
            item={todo}
            index={index}
            setmovingId={setmovingId}
            editMemo={editMemo}
            changeZIndex={changeZIndex}
          ></Memo>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
