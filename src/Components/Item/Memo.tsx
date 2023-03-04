import React, { useState, useEffect, useCallback } from "react";
import { TaddMemo, TmovingObj, Ttodo } from "../../lib/types";
import { observer } from "mobx-react";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import { palette } from "../../lib/palette";
import { MutableRefObject } from "react";
import MemoCatModal from "./MemoCatModal";
import MemoCategoryBar from "./MemoCategoryBar";

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
  padding: 3rem 1rem 1rem;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Memo_Header = styled.div<{ isFocus: boolean; bgColor: string }>`
  width: 100%;
  height: 2rem;
  background-color: ${(props) => props.bgColor};
  position: absolute;
  top: ${(props) => (props.isFocus ? "0rem" : "-2rem")};
  left: 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  transition: top 0.2s ease-in-out;
`;

const Memo_Text = styled.textarea<{ isFocus: boolean }>`
  all: unset;
  resize: none;
  width: 100%;
  overflow: hidden;
  height: 80%;
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 0.8rem;
  line-height: 1.1rem;
`;

const Memo_Footer = styled.div<{ isFocus: boolean }>`
  width: 100%;
  height: 2rem;
  border-top: 1px solid ${palette.grey};
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.3rem;
  display: ${(props) => (props.isFocus ? "flex" : "none")};
  z-index: 20;
  background-color: white;
`;

const Header_left = styled.div`
  height: 100%;
`;
const Header_right = styled.div`
  display: flex;
  height: 100%;
`;

const Btn = styled.button`
  all: unset;
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Header_Button = styled(Btn)``;

interface TMemoProps {
  currentMemoId: number | null;
  setcurrentMemoId: React.Dispatch<React.SetStateAction<number | null>>;
  item: Ttodo;
  setmovingObj: React.Dispatch<React.SetStateAction<TmovingObj | null>>;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  addMemo: TaddMemo;
  changeZIndex: (id: number) => void;
  changeSize: (
    id: number,
    width: number | undefined,
    height: number | undefined
  ) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}

const Memo = ({
  item,
  setmovingObj,
  editMemo,
  deleteMemo,
  addMemo,
  changeZIndex,
  changeSize,
  currentMemoId,
  setcurrentMemoId,
}: TMemoProps) => {
  const [memoInput, setmemoInput] = useState<string>(item.msg);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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
    e.stopPropagation();
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

  const onAddMemo = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.category) {
        addMemo(item.category, item.x + 20, item.y + 20, item.bgColor);
        // 지금처럼 이렇게 카테고리와 bgColor가 연결이 안되어있는경우에는.
        // 다 따로되니까. id로 둘을 묶어놓는게 나은것같다.
      } else {
        addMemo("", item.x + 20, item.y + 20);
      }
    },
    [item, addMemo]
  );

  return (
    <MemoContainer
      width={item.width}
      height={item.height}
      top={item.y}
      left={item.x}
      zIndex={item.zIndex}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setcurrentMemoId(item.date);
        changeZIndex(item.date);
      }}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseUp}
    >
      <Memo_Header
        bgColor={item.bgColor}
        isFocus={currentMemoId === item.date}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Header_left>
          <Header_Button onClick={onAddMemo}>+</Header_Button>
        </Header_left>
        <Header_right>
          <Header_Button
            onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
          >
            -
          </Header_Button>
          <Header_Button
            onClick={(e) => {
              e.stopPropagation();
              deleteMemo(item.date);
            }}
          >
            X
          </Header_Button>
        </Header_right>
      </Memo_Header>
      <MemoCategoryBar
        item={item}
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
      ></MemoCategoryBar>
      <Memo_Text
        value={memoInput}
        onChange={onChangeMemo}
        isFocus={currentMemoId === item.date}
      ></Memo_Text>
      {/* <Memo_Footer isFocus={currentMemoId === item.date}>
        <Btn>+</Btn>
        <Btn>+</Btn>
        <Btn>+</Btn>
        <Btn>+</Btn>
        <Btn>+</Btn>
        <Btn>+</Btn>
      </Memo_Footer> */}
    </MemoContainer>
  );
};

export default observer(Memo);
