import React, { useCallback, useState, useRef } from "react";
import { TmovingObj, TtodoStore } from "./lib/types";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Memo from "./Components/Memo";
import MemoHome from "./page/MemoHomeListPage";
import { Outlet } from "react-router-dom";
import MemoContainer from "./Components/MemoContainer";

const App = ({ store }: { store: TtodoStore }) => {
  const addMemo = useCallback(
    (category: string) => {
      store.addMemo(category);
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
