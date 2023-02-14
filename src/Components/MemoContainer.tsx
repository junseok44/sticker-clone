import { toJS } from "mobx";
import React, { useState, useCallback } from "react";
import Memo from "./Memo";
import { TmovingObj, TtodoStore } from "../lib/types";
import { observer } from "mobx-react";

const MemoContainer = ({ store }: { store: TtodoStore }) => {
  const [movingObj, setmovingObj] = useState<TmovingObj | null>(null);
  const [currentMemoId, setcurrentMemoId] = useState<number | null>(null);

  const addMemo = useCallback(() => {
    store.addMemo("hello this is");
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
        // console.log("moving", e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        // FIXME e.nativeEvent.offsetX e.nativeEvent.offsetY가 계속 바뀐다.
        // e를 보내는게 컨테이너였다가 헤더였다가.. 그러니까 e의 인식이.
        e.stopPropagation();

        changePos(
          movingObj.id,
          e.nativeEvent.pageX - 290 - movingObj.offsetX,
          e.nativeEvent.pageY - movingObj.offsetY
        );

        // FIXME 일단은 200만큼만 뺏다. 그런데 다른 방법이 없나?

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
        width: "75%",
        height: "100vh",
      }}
      onClick={() => {
        // 모든 focus 해제하기.
        setcurrentMemoId(null);
      }}
      onMouseMove={(e: React.MouseEvent) => {
        onMouseMove(e);
      }}
    >
      <button onClick={addMemo}>
        addMemo {movingObj?.id} {currentMemoId}
      </button>
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
          currentMemoId={currentMemoId}
          setcurrentMemoId={setcurrentMemoId}
          key={index}
          item={todo}
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

export default observer(MemoContainer);
