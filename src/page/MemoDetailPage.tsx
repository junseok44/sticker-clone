import React, { useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";

const MemoDetailPage = () => {
  const params = useParams();
  const store = useOutletContext();

  useEffect(() => {
    console.log(store);
  }, []);

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
      <div>
        {params.category ? "#" + params.category : "loading..."}
        <button>메모 작성</button>
        <Link to={"/"}>돌아가기</Link>
      </div>
      <input placeholder={`${params.category}에서 찾아보기..`}></input>
      <div style={{ width: "100%", border: "1px solid black", height: "100%" }}>
        메모들
      </div>
    </div>
  );
};

export default MemoDetailPage;
