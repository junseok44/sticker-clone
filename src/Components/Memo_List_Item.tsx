import React from "react";
import styled from "styled-components";
import { TchangeZIndex, Ttodo } from "../lib/types";
import { observer } from "mobx-react";

const MemoListItemContainer = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const Memo_List_Item = ({
  item,
  changeZIndex,
}: {
  item: Ttodo;
  changeZIndex?: TchangeZIndex;
}) => {
  return (
    <MemoListItemContainer
      color={item.bgColor}
      onClick={() => {
        if (changeZIndex) changeZIndex(item.date);
      }}
    >
      {item.msg
        ? item.msg.length > 15
          ? item.msg.substring(0, 15) + "..."
          : item.msg
        : "내용 없음"}
      <div>{item.category ? "#" + item.category : null}</div>
      <div>{new Date(item.date).toDateString()}</div>
      <hr></hr>
    </MemoListItemContainer>
  );
};

export default observer(Memo_List_Item);
