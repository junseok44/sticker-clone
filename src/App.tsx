import React, { useCallback, useState } from "react";
import { TtodoStore } from "./types";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Memo from "./Memo";

const App = ({ store }: { store: TtodoStore }) => {
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
        changePos(movingId, e.pageX - 100, e.pageY - 10);
        // FIXME 이부분도 100이 아니라 스티커 메모 사이즈의 절반만큼이 되어야하는데..
        // 그럼 이거를 sotre clas
        store.changeZIndex(movingId);
      }
    },
    [movingId, changePos]
  );

  const changeSize = useCallback(
    (id: number, width: number, height: number) => {
      store.changeSize(id, width, height);
    },
    [store]
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
            setmovingId={setmovingId}
            editMemo={editMemo}
            changeZIndex={changeZIndex}
            changeSize={changeSize}
          ></Memo>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
