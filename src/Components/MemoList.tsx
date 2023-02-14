import React from "react";
import { Ttodo } from "../lib/types";
import { observer } from "mobx-react";

const MemoList = ({ todoList }: { todoList: Ttodo[] }) => {
  return (
    <div style={{ width: "100%", border: "1px solid black", height: "100%" }}>
      최근 메모<hr></hr>
      {todoList.map((item) => (
        <div>
          {item.msg}
          <div>{item.category ? "#" + item.category : null}</div>
          <div>{new Date(item.date).toUTCString()}</div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default observer(MemoList);
