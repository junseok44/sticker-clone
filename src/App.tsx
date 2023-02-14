import React, { useCallback, useState, useRef } from "react";
import { TmovingObj, TtodoStore } from "./lib/types";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import Memo from "./Components/Memo";
import MemoHome from "./page/MemoHome";
import { Outlet } from "react-router-dom";
import MemoContainer from "./Components/MemoContainer";

const App = ({ store }: { store: TtodoStore }) => {
  return (
    <div style={{ display: "flex" }}>
      <Outlet context={store}></Outlet>
      <MemoContainer store={store}></MemoContainer>
    </div>
  );
};

export default observer(App);
