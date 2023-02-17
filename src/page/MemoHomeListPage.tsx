import { useOutletContext } from "react-router-dom";
import { TaddMemo, TtodoStore } from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/MemoList";
import MemoCategory from "../Components/MemoCategory";

const MemoHome = () => {
  const { store, addMemo } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
  }>();

  return (
    <div
      style={{
        width: "25%",
        height: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex" }}>
        <h1>스티커 메모</h1>
        <button onClick={() => addMemo("", 20)}>메모 추가</button>
      </div>
      <input placeholder="메모 검색.."></input>
      <MemoCategory store={store}></MemoCategory>
      <MemoList todoList={store.todo}></MemoList>
    </div>
  );
};

export default observer(MemoHome);
