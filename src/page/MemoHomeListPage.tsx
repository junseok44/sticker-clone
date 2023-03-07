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
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MemoHome = () => {
  const { store, addMemo, changeZIndex, deleteCategory } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
    changeZIndex: TchangeZIndex;
    deleteCategory: TdeleteCategory;
  }>();

  const [searchArray, setSearchArray] = useStateWithPromises<Ttodo[]>([]);
  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onSearchMemoList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await changeSearchInput(e.target.value);
  };

  return (
    <>
      {!isSidebarOpen ? (
        <IconButton
          onClick={() => setIsSidebarOpen(true)}
          sx={{ margin: "1rem 0rem 0rem 1rem" }}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
      ) : (
        <div
          style={{
            height: "100vh",
            padding: "1rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
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
      )}
    </>
  );
};

export default observer(MemoHome);
