import React, { useEffect, useCallback } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { TtodoStore } from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/MemoList";

const MemoDetailPage = () => {
  const params = useParams();
  const { store, addMemo } = useOutletContext<{
    store: TtodoStore;
    addMemo: (category: string) => void;
  }>();

  const onDeleteCategory = useCallback(() => {
    if (params.category) store.deleteCategory(params.category);
  }, [params, store]);

  return (
    // param.category가 없을때의 예외처리.
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
        <div>
          <button
            onClick={() =>
              addMemo(params.category ? params.category : "general")
            }
          >
            메모 작성
          </button>
          <button onClick={onDeleteCategory}>
            <Link style={{ color: "red" }} to={"/"}>
              카테고리 삭제
            </Link>
          </button>
          <button>
            <Link to={"/"}>돌아가기</Link>
          </button>
        </div>
      </div>
      <input placeholder={`${params.category}에서 찾아보기..`}></input>
      <MemoList
        todoList={store.todo.filter((todo) => todo.category == params.category)}
      ></MemoList>
    </div>
  );
};

export default observer(MemoDetailPage);
