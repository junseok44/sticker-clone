import { createContext, useCallback, useEffect } from "react";
import { Ttodo, TtodoStore } from "./lib/types";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import MemoContainer from "./Components/MemoContainer";
import useDeepCompareEffect from "use-deep-compare-effect";

const setFromLocalStorage = (type: "todo" | "category", store: TtodoStore) => {
  const parsedItem = JSON.parse(localStorage.getItem(type) || "");
  if (parsedItem) store[`${type}`] = parsedItem;
};

const App = ({ store }: { store: TtodoStore }) => {
  const addMemo = useCallback(
    (category: string, x: number, y: number, bgColor?: string) => {
      store.addMemo(category, x + 20, y + 20, bgColor);
    },
    [store]
  );

  const changeZIndex = useCallback(
    (id: number) => {
      store.changeZIndex(id);
    },
    [store]
  );

  const deleteCategory = (catId: string) => {
    store.deleteCategory(catId);
  };

  return (
    <div style={{ display: "flex" }}>
      <Outlet
        context={{ store, addMemo, changeZIndex, deleteCategory }}
      ></Outlet>
      <MemoContainer store={store} addMemo={addMemo}></MemoContainer>
    </div>
  );
};

export default observer(App);
