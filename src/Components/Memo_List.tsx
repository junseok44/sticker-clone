import { TchangeZIndex, Ttodo } from "../lib/types";
import { observer } from "mobx-react";
import Memo_List_Item from "./Memo_List_Item";

const MemoList = ({
  todoList,
  changeZIndex,
  title,
}: {
  title: string;
  todoList: Ttodo[];
  changeZIndex?: TchangeZIndex;
}) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid black",
        height: "100%",
        overflow: "scroll",
      }}
    >
      {title}
      <hr></hr>
      {todoList.length !== 0 ? (
        todoList.map((item) => (
          <Memo_List_Item
            key={item.date}
            item={item}
            changeZIndex={changeZIndex}
          ></Memo_List_Item>
        ))
      ) : (
        <div>메모없음</div>
      )}
    </div>
  );
};

export default observer(MemoList);
