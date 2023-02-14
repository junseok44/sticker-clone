import React, { useCallback, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Ttodo, TtodoStore } from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/MemoList";

const MemoHome = () => {
  const { store, addMemo } = useOutletContext<{
    store: TtodoStore;
    addMemo: (category: string) => void;
  }>();

  const [cgInput, setcgInput] = useState<string>("");

  const addCategory = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      store.addCategory(cgInput);
      setcgInput("");
    },
    [store, cgInput]
  );

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
        <h1>메모</h1>
        <button onClick={() => addMemo("general")}>메모 추가</button>
      </div>
      <form onSubmit={addCategory}>
        <input
          placeholder="카테고리 추가.."
          value={cgInput}
          onChange={(e) => {
            setcgInput(e.target.value);
          }}
        ></input>
      </form>
      <input placeholder="메모 검색.."></input>
      <div>
        카테고리
        <div
          style={{
            width: "100%",
            minHeight: "3rem",
            border: "1px solid black",
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            gridAutoRows: "2rem",
          }}
        >
          {store.category.map((cat) => (
            <Link to={`category/${cat}`}>#{cat}</Link>
          ))}
        </div>
      </div>
      <MemoList todoList={store.todo}></MemoList>
    </div>
  );
};

export default observer(MemoHome);
