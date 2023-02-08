import React, { useCallback, useState } from "react";
import { TmovingObj, TtodoStore } from "./types";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Memo from "./Memo";

const App = ({ store }: { store: TtodoStore }) => {
  const [movingObj, setmovingObj] = useState<TmovingObj | null>(null);

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
      if (movingObj !== null) {
        e.stopPropagation();
        changePos(
          movingObj.id,
          e.pageX - movingObj.offsetX,
          e.pageY - movingObj.offsetY
        );

        store.changeZIndex(movingObj.id);
      }
    },
    [movingObj, changePos]
  );

  const changeSize = useCallback(
    (id: number, width: number | undefined, height: number | undefined) => {
      if (width && height) {
        store.changeSize(id, width, height);
      }
    },
    [store]
  );

  const deleteMemo = useCallback((id: number) => {
    store.deleteMemo(id);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        width: "100%",
        height: "200vh",
      }}
    >
      <button onClick={addMemo}>addMemo {movingObj?.id} </button>
      <button
        onClick={() => {
          console.log(
            store.todo.map((item) => {
              return toJS(item);
            })
          );
        }}
      >
        console todo List
      </button>
      {store.todo.map((todo, index) => (
        <Memo
          key={index}
          item={todo}
          index={index}
          setmovingObj={setmovingObj}
          editMemo={editMemo}
          deleteMemo={deleteMemo}
          addMemo={addMemo}
          changeZIndex={changeZIndex}
          changeSize={changeSize}
          onMouseMove={onMouseMove}
        ></Memo>
      ))}
    </div>
  );
};

export default observer(App);
