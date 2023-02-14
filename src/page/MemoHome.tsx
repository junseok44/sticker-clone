import React, { useCallback } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TtodoStore } from "../lib/types";

const MemoHome = () => {
  const store = useOutletContext<TtodoStore>();

  const addMemo = useCallback(() => {
    store.addMemo("general");
  }, [store]);

  const addTags = useCallback(() => {}, []);
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

        <button onClick={addMemo}>메모 추가</button>
        <button>태그 추가</button>
      </div>

      <input placeholder="메모 검색.."></input>
      <div
        style={{
          width: "100%",
          border: "1px solid black",
          display: "grid",
          gridTemplateColumns: "repeat(2, 2fr)",
          gridAutoRows: "2rem",
        }}
      >
        <Link to="category/프로그래밍">프로그래밍</Link>
        <Link to="category/게임스터디">게임스터디</Link>
        <Link to="category/생각">생각</Link>
        <Link to="category/할일들">할일들</Link>
      </div>
      <div style={{ width: "100%", border: "1px solid black", height: "100%" }}>
        최근 메모
      </div>
    </div>
  );
};

export default MemoHome;
