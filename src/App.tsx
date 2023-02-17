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
  useEffect(() => {
    setFromLocalStorage("todo", store);
    setFromLocalStorage("category", store);
  }, []);

  // useDeepCompareEffect(() => {
  //   console.log("setting itmes");
  //   localStorage.setItem("todo", JSON.stringify(store.todo));
  //   localStorage.setItem("category", JSON.stringify(store.category));
  // }, [store.category, store.todo]);

  useEffect(() => {
    console.log("setting itmes");

    localStorage.setItem("todo", JSON.stringify(store.todo));
    localStorage.setItem("category", JSON.stringify(store.category));
  }, [store.category, store.todo]);

  const addMemo = useCallback(
    (category: string, x: number, bgColor?: string) => {
      store.addMemo(category, x + 20 * store.todo.length, bgColor);
    },
    [store]
  );
  return (
    <div style={{ display: "flex" }}>
      <Outlet context={{ store, addMemo }}></Outlet>
      <MemoContainer store={store} addMemo={addMemo}></MemoContainer>
    </div>
  );
};

export default observer(App);
