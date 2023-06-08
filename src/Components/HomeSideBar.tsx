import React, { useEffect, useRef } from "react";
import MemoList from "../Components/Memo_List";
import MemoCategory from "../Components/Category/Category";
import Memo_Search from "../Components/Memo_Search";
import Button from "@mui/material/Button";
import {
  TaddMemo,
  TchangeZIndex,
  TdeleteCategory,
  Ttodo,
  TtodoStore,
} from "../lib/types";
import { useStateWithPromises } from "../lib/hooks";
import { useOutletContext } from "react-router-dom";
const HomeSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { store, addMemo, changeZIndex, deleteCategory } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
    changeZIndex: TchangeZIndex;
    deleteCategory: TdeleteCategory;
  }>();

  const HomeElement = useRef<HTMLDivElement>(null);

  const handleTurnOff = (e: MouseEvent) => {
    console.log("on");
    // if (!e.target || !HomeElement.current || !isSidebarOpen) {
    //   console.log("no target", isSidebarOpen);
    //   return;
    // }
    // if (!HomeElement.current.contains(e.target as HTMLElement)) {
    //   setIsSidebarOpen(false);
    // }
  };
  useEffect(() => {
    window.addEventListener("click", (e) => handleTurnOff(e));
    return () => {
      console.log("removing");
      window.removeEventListener("click", (e) => handleTurnOff(e));
    };
  }, []);

  const [searchArray, setSearchArray] = useStateWithPromises<Ttodo[]>([]);
  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");

  const onSearchMemoList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await changeSearchInput(e.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        float: "left",
      }}
      ref={HomeElement}
    >
      <div>
        <Button
          variant="contained"
          onClick={() => addMemo("", 20, 20)}
          sx={{ marginRight: "0.5rem" }}
        >
          메모 추가
        </Button>
        <Button variant="outlined" onClick={() => setIsSidebarOpen(false)}>
          메뉴 닫기
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

export default HomeSideBar;
