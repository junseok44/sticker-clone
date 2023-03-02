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

  // param에서 name 찾아서 store에서 그 카테고리가 존재하는지 대조.
  useEffect(() => {
    const currentCat = store.category.find(
      (cat) => cat.name === params.category
    );
    if (currentCat) setCategory(currentCat);
  }, []);

  const onDeleteCategory = useCallback(() => {
    if (category) {
      store.deleteCategory(category.name);
    }
  }, [params, store]);

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
              <button
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
              </button>
            </div>
          </div>
          <Memo_Search
            todoArray={store.todo.filter(
              (item) => item.category === category.name
            )}
            setSearchArray={setSearchedCategoryArr}
          ></Memo_Search>
          {searchedCategoryArr ? (
            <MemoList
              todoList={searchedCategoryArr}
              changeZIndex={changeZIndex}
            ></MemoList>
          ) : (
            <MemoList
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
