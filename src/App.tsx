import { useCallback } from "react";
import { TtodoStore } from "./lib/types";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import MemoContainer from "./Components/MemoContainer";

const App = ({ store }: { store: TtodoStore }) => {
  const addMemo = useCallback(
    (category: string, bgColor?: string) => {
      store.addMemo(category, bgColor);
    },
    [store]
  );
  return (
    <div style={{ display: "flex" }}>
      <Outlet context={{ store, addMemo }}></Outlet>
      <MemoContainer store={store}></MemoContainer>
    </div>
  );
};

export default observer(App);
