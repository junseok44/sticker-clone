import React, { useCallback, useState } from "react";
import { TtodoStore } from "./types";
import { observer } from "mobx-react";
import Memo from "./Memo";

const App = ({ store }: { store: TtodoStore }) => {
  const [input, setInput] = useState<string>("");

  const addMemo = useCallback(() => {
    store.addMemo();
  }, [store]);

  const changePos = useCallback(
    (id: number, xPos: number, yPos: number) => {
      store.changePosition(id, xPos, yPos);
    },
    [store]
  );

  return (
    <div>
      <button onClick={addMemo}>addMemo</button>
      <div style={{ position: "relative" }}>
        {store.todo.map((todo, index) => (
          <Memo item={todo} index={index} changePos={changePos}></Memo>
        ))}
      </div>
    </div>
  );
};

export default observer(App);
