import React from "react";
import { Ttodo } from "../lib/types";
import { observer } from "mobx-react";

const MemoList = ({ todoList }: { todoList: Ttodo[] }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid black",
        height: "100%",
        overflow: "scroll",
      }}
    >
      최근 메모<hr></hr>
      {todoList.map((item) => (
        <div style={{ color: item.bgColor }}>
          {item.msg
            ? item.msg.length > 15
              ? item.msg.substring(0, 15) + "..."
              : item.msg
            : "내용 없음"}
          <div style={{ color: item.bgColor }}>
            {item.category ? "#" + item.category : null}
          </div>
          <div>{new Date(item.date).toDateString()}</div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default observer(MemoList);
