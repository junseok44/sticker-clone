import React from "react";
import { Ttodo } from "../lib/types";
import { observer } from "mobx-react";
import { hover } from "@testing-library/user-event/dist/hover";
import styled from "styled-components";

const MemoListItem = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

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
        <MemoListItem color={item.bgColor}>
          {item.msg
            ? item.msg.length > 15
              ? item.msg.substring(0, 15) + "..."
              : item.msg
            : "내용 없음"}
          <div>{item.category ? "#" + item.category : null}</div>
          <div>{new Date(item.date).toDateString()}</div>
          <hr></hr>
        </MemoListItem>
      ))}
    </div>
  );
};

export default observer(MemoList);
