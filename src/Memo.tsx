import React, { useState, useEffect } from "react";
import { TmovingObj, Ttodo } from "./types";
import { observer } from "mobx-react";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import { palette } from "./palette";

const MemoContainer = styled.div<{
  width: number;
  height: number;
  left: number;
  top: number;
  zIndex: number;
}>`
  box-sizing: border-box;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  min-width: 200px;
  min-height: 200px;
  background-color: white;
  border: 1px solid ${palette.grey};
  position: absolute;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  z-index: ${(props) => props.zIndex};
  resize: both;
  overflow: auto;
  padding: 3rem 1rem 3rem;
  border-radius: 5px;
  overflow: hidden;
`;

const Memo_Header = styled.div`
  width: 100%;
  height: 2rem;
  background-color: ${palette.grey};
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
`;

const Memo_Text = styled.textarea`
  all: unset;
  resize: none;
  width: 100%;
  overflow-x: none;
  height: 100%;
  font-size: 0.8rem;
  line-height: 1rem;
`;

const Memo_Footer = styled.div`
  width: 100%;
  height: 2rem;
  border-top: 1px solid ${palette.grey};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Header_left = styled.div`
  height: 100%;
`;
const Header_right = styled.div`
  display: flex;
  height: 100%;
`;

const Header_Btn = styled.button`
  all: unset;
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`;

const Memo = ({
  item,
  setmovingObj,
  editMemo,
  deleteMemo,
  addMemo,
  changeZIndex,
  changeSize,
  onMouseMove,
}: {
  item: Ttodo;
  index: number;
  setmovingObj: React.Dispatch<React.SetStateAction<TmovingObj | null>>;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  addMemo: () => void;
  changeZIndex: (id: number) => void;
  changeSize: (
    id: number,
    width: number | undefined,
    height: number | undefined
  ) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) => {
  const [memoInput, setmemoInput] = useState<string>(item.msg);

  // 인풋 바뀔때 store에 있는 msg업데이트.
  useEffect(() => {
    editMemo(item.date, memoInput);
  }, [memoInput]);

  // 사이즈 바뀔때마다 store 있는 item 업데이트.
  const { width, height, ref } = useResizeDetector<HTMLDivElement>();
  useEffect(() => {
    changeSize(item.date, width, height);
  }, [width, height]);

  // header에 클릭했을때 movingObj가 등록된다.
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("set Ids");
    setmovingObj({
      id: item.date,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  };
  const onMouseUp = () => {
    setmovingObj(null);
  };

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmemoInput(e.target.value);
  };

  const onClickBtn = () => {
    console.log("clicked");
  };

  return (
    <MemoContainer
      width={item.width}
      height={item.height}
      top={item.y}
      left={item.x}
      zIndex={item.zIndex}
      ref={ref}
      onClick={() => changeZIndex(item.date)}
      onMouseUp={onMouseUp}
    >
      <Memo_Header
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <Header_left>
          <Header_Btn onClick={() => addMemo()}>+</Header_Btn>
        </Header_left>
        <Header_right>
          <Header_Btn onClick={onClickBtn}>-</Header_Btn>
          <Header_Btn onClick={() => deleteMemo(item.date)}>X</Header_Btn>
        </Header_right>
      </Memo_Header>
      <Memo_Text value={memoInput} onChange={onChangeMemo}></Memo_Text>
      <Memo_Footer></Memo_Footer>
    </MemoContainer>
  );
};

export default observer(Memo);
