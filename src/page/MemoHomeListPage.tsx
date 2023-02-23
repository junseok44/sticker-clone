import { useOutletContext } from "react-router-dom";
import {
  TaddMemo,
  TchangeZIndex,
  TdeleteCategory,
  Ttodo,
  TtodoStore,
} from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/MemoList";
import MemoCategory from "../Components/MemoCategory";
import { useState, useEffect } from "react";
import { useStateWithPromises } from "../lib/hooks";

const MemoHome = () => {
  const { store, addMemo, changeZIndex, deleteCategory } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
    changeZIndex: TchangeZIndex;
    deleteCategory: TdeleteCategory;
  }>();

  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");
  const [searchArray, setSearchArray] = useStateWithPromises<Ttodo[]>([]);

  useEffect(() => {
    setSearchArray(store.todo.filter((item) => item.msg.includes(searchInput)));
  }, [searchInput]);

  const onSearchMemoList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await changeSearchInput(e.target.value);
    // await setSearchArray(
    //   store.todo.filter((item) => item.msg.includes(searchInput))
    // );
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
      <div style={{ display: "flex" }}>
        <h1>스티커 메모</h1>
        <button onClick={() => addMemo("", 20, 20)}>메모 추가</button>
      </div>
      <input placeholder="메모 검색.." onChange={onSearchMemoList}></input>
      <MemoCategory
        store={store}
        deleteCategory={deleteCategory}
      ></MemoCategory>
      {searchInput ? (
        // <div>hello</div>
        <MemoList todoList={searchArray} changeZIndex={changeZIndex}></MemoList>
      ) : (
        <MemoList todoList={store.todo} changeZIndex={changeZIndex}></MemoList>
      )}
    </div>
  );
};

export default observer(MemoHome);
