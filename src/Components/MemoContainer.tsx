import { toJS } from "mobx";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
  createContext,
} from "react";
import Memo from "./Memo";
import { TaddMemo, TmovingObj, TtodoStore } from "../lib/types";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { todoStore } from "../store";
import MemoAdd from "./MemoAdd";
import ConfirmModal from "./ConfirmModal";

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
  const [isResetModal, setIsResetModal] = useState(false);

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

        if (containerRef.current)
          changePos(
            movingObj.id,
            e.nativeEvent.pageX -
              containerRef.current?.getBoundingClientRect().x -
              movingObj.offsetX,
            e.nativeEvent.pageY - movingObj.offsetY
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
      ref={containerRef}
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
        // 개별 메모 아이템 이동.
        onMouseMove(e);
      }}
    >
      <button onClick={() => setIsAddModal(!isAddModal)}>
        addMemo {movingObj?.id} {currentMemoId}
      </button>
      <button
        onClick={() => {
          console.log(
            store.todo.map((item) => {
              return toJS(item);
            })
          );
          console.log(
            store.category.map((item) => {
              return toJS(item);
            })
          );
        }}
      >
        console todo List
      </button>
      <button onClick={() => setIsResetModal(true)}>
        reset memo
        {isResetModal && (
          <ConfirmModal
            confirmFunction={() => store.resetMemoList()}
            setModalController={setIsResetModal}
          >
            정말 모든 메모를 삭제하시겠습니까?
          </ConfirmModal>
        )}
      </button>
      {isAddModal && (
        <MemoAdd
          category={store.category}
          addMemo={addMemo}
          setIsAddModal={setIsAddModal}
        ></MemoAdd>
      )}

      <StoreContext.Provider value={store}>
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
