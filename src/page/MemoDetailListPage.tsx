import React, { useEffect, useCallback, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import {
  TaddMemo,
  Tcategory,
  TchangeZIndex,
  Ttodo,
  TtodoStore,
} from "../lib/types";
import { observer } from "mobx-react";
import MemoList from "../Components/Memo_List";
import Memo_Search from "../Components/Memo_Search";
import { useStateWithPromises } from "../lib/hooks";
import { Button, ButtonGroup } from "@mui/material";
import { StyledLink } from "../Components/Category/Category_List_Item";

const MemoDetailPage = () => {
  const params = useParams();
  const { store, addMemo, changeZIndex } = useOutletContext<{
    store: TtodoStore;
    addMemo: TaddMemo;
    changeZIndex: TchangeZIndex;
  }>();
  const [category, setCategory] = useState<Tcategory | null>();

  const [searchedCategoryArr, setSearchedCategoryArr] = useStateWithPromises<
    Ttodo[] | null
  >(null);
  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");

  // param에서 name 찾아서 store에서 그 카테고리가 존재하는지 대조.
  useEffect(() => {
    console.log(params);
    const currentCat = store.category.find((cat) => cat.id === params.category);
    if (currentCat) setCategory(currentCat);
  }, []);

  const onDeleteCategory = useCallback(() => {
    if (category) {
      store.deleteCategory(category.id);
    }
  }, [category, store]);

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
      }}
    >
      {category ? (
        <>
          <div>
            <div style={{ display: "flex" }}>
              {"#" + category.name}
              <div
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  borderRadius: "50%",
                  backgroundColor: category.bgColor,
                  marginRight: "0.3rem",
                }}
              ></div>
            </div>
            <div>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  style={{ fontSize: "0.8rem" }}
                  onClick={() =>
                    addMemo(category.name, 20, 20, category.bgColor)
                  }
                >
                  메모작성
                </Button>
                <Button
                  style={{ fontSize: "0.8rem" }}
                  onClick={onDeleteCategory}
                >
                  <StyledLink to="/"> 카테고리 삭제</StyledLink>
                </Button>
                <Button style={{ fontSize: "0.8rem" }}>
                  <StyledLink to="/"> 돌아가기 </StyledLink>
                </Button>
              </ButtonGroup>
              {/* <button
                onClick={() => addMemo(category.name, 20, 20, category.bgColor)}
              >
                이 태그로 메모작성
              </button>
              <button onClick={onDeleteCategory}>
                <Link style={{ color: "red" }} to={"/"}>
                  카테고리 삭제
                </Link>
              </button>
              <button>
                <Link to={"/"}>돌아가기</Link>
              </button> */}
            </div>
          </div>
          <Memo_Search
            onSearchMemoList={onSearchMemoList}
            searchInput={searchInput}
            todoArray={store.todo.filter(
              (item) => item.category === category.name
            )}
            setSearchArray={setSearchedCategoryArr}
          ></Memo_Search>
          {searchedCategoryArr && searchInput ? (
            <MemoList
              title="검색 결과"
              todoList={searchedCategoryArr}
              changeZIndex={changeZIndex}
            ></MemoList>
          ) : (
            <MemoList
              title="카테고리 내 메모"
              todoList={store.todo.filter(
                (todo) => todo.category == category.name
              )}
              changeZIndex={changeZIndex}
            ></MemoList>
          )}
        </>
      ) : (
        <div>
          no category
          <button>
            <Link to={"/"}>돌아가기</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(MemoDetailPage);
