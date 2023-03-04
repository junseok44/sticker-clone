import { useOutletContext } from "react-router-dom";
import {
  TaddMemo,
  TchangeZIndex,
  TdeleteCategory,
  Ttodo,
  TtodoStore,
} from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/Memo_List";
import MemoCategory from "../Components/Category/Category";
import { useState, useEffect } from "react";
import { useStateWithPromises } from "../lib/hooks";
import Memo_Search from "../Components/Memo_Search";
import Button from "@mui/material/Button";

const MemoHome = () => {
  const { store, addMemo, changeZIndex, deleteCategory } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
    changeZIndex: TchangeZIndex;
    deleteCategory: TdeleteCategory;
  }>();

  const [searchArray, setSearchArray] = useStateWithPromises<Ttodo[]>([]);
  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");

  const onSearchMemoList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await changeSearchInput(e.target.value);
  };

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
        <Button variant="outlined" onClick={() => addMemo("", 20, 20)}>
          메모 추가
        </Button>
      </div>
      <Memo_Search
        searchInput={searchInput}
        todoArray={store.todo}
        setSearchArray={setSearchArray}
        onSearchMemoList={onSearchMemoList}
      ></Memo_Search>
      <MemoCategory
        store={store}
        deleteCategory={deleteCategory}
      ></MemoCategory>
      {searchInput ? (
        <MemoList
          title="검색 결과"
          todoList={searchArray}
          changeZIndex={changeZIndex}
        ></MemoList>
      ) : (
        <MemoList
          title="모든 메모"
          todoList={store.todo}
          changeZIndex={changeZIndex}
        ></MemoList>
      )}
    </div>
  );
};

export default observer(MemoHome);
