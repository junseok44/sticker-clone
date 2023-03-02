import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { StoreContext } from "../Memo_Container/Container";
import { observer } from "mobx-react";
import { colorArray } from "../../lib/palette";
import { CircleItem } from "../Category/Category";
import styled from "styled-components";
import { Tcategory } from "../../lib/types";
import MemoCategoryAdd from "../Category/Category_Add";

const CircleItemContainer = styled.div`
  display: flex;
`;

const CircleItem2 = styled(CircleItem)<{ selectedColor: string }>`
  border: ${(props) =>
    props.selectedColor == props.bgColor ? "2px solid black" : "none"};
`;

const ModalContainer = styled.div`
  width: 100%;
  background-color: white;
  position: absolute;
  min-height: 2rem;
  top: 1.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 100;
`;

const ModalOverlay = styled.div`
  width: 200%;
  height: 200%;
  position: absolute;
  z-index: -10;
  background-color: black;
`;

const MemoCatModal = ({
  id: memoId,
  setModal,
}: {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const store = useContext(StoreContext);

  const changeCategory = (id: string) => {
    store?.changeCategory(memoId, id);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    changeCategory(id);
    setModal(false);
  };

  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      카테고리 설정
      <MemoCategoryAdd
        store={store}
        setModal={setModal}
        memoId={memoId}
      ></MemoCategoryAdd>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {store?.category.map((cat) => (
          <div
            style={{
              color: cat.bgColor,
              cursor: "pointer",
            }}
            onClick={(e) => {
              onClick(e, cat.id);
            }}
          >
            #{cat.name}
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

export default observer(MemoCatModal);
