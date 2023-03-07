import { toJS } from "mobx";
import React, { useState, useCallback, useRef, createContext } from "react";
import Memo from "../Item/Memo";
import { TaddMemo, TmovingObj, TtodoStore } from "../../lib/types";
import { observer } from "mobx-react";
import MemoAdd from "./Container_addModal";
import ConfirmModal from "../ConfirmModal";
import styled from "styled-components";
import { throttle } from "lodash";
import ModalForm from "../ModalForm";

export const StoreContext = createContext<TtodoStore | null>(null);

const MemoContainer = ({
  store,
  addMemo,
}: {
  store: TtodoStore;
  addMemo: TaddMemo;
}) => {
  // 지금 움직이고 있는 메모 객체에 대한 정보.
  const [movingObj, setmovingObj] = useState<TmovingObj | null>(null);
  // 애니메이션을 위한 현재 선택 메모
  const [currentMemoId, setcurrentMemoId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAddModal, setIsAddModal] = useState<boolean>(false);

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
    (id: number, x: number, y: number, dx: number, dy: number) => {
      store.changePosition(id, x + dx, y + dy);
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

  // 문제. 위치 position 정보를 계속 저장하고 있어야 하는데
  // 다시 position 0 0 에서 시작하니까.

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        // border: "1px solid black",
        height: "100vh",
      }}
      onClick={() => {
        // 모든 focus 해제하기.
        setcurrentMemoId(null);
      }}
      onMouseMove={(e: React.MouseEvent) => {
        // 개별 메모 아이템 이동.
        // onMouseMove(e);
      }}
    >
      {isAddModal && (
        <StoreContext.Provider value={store}>
          <MemoAdd
            category={store.category}
            addMemo={addMemo}
            setIsAddModal={setIsAddModal}
          ></MemoAdd>
        </StoreContext.Provider>
      )}
      {/* <ModalForm title="hello" content="정말 취소?">
        <div>{movingObj?.id}</div>
      </ModalForm> */}
      <StoreContext.Provider value={store}>
        {/* <Draggable className="drag">dfdf</Draggable> */}
        {store.todo.map((todo) => (
          <Memo
            currentMemoId={currentMemoId}
            setcurrentMemoId={setcurrentMemoId}
            key={todo.date}
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
      </StoreContext.Provider>
    </div>
  );
};

export default observer(MemoContainer);
