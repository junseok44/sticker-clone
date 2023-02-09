import React from "react";

const MemoHome = () => {
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

        <button>메모 추가</button>
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
        <div>프로그래밍</div>
        <div>게임스터디</div>
        <div>생각</div>
        <div>할일들</div>
      </div>
      <div style={{ width: "100%", border: "1px solid black", height: "100%" }}>
        최근 메모
      </div>
    </div>
  );
};

export default MemoHome;
