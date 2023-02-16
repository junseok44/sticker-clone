import React, { useContext, useCallback, useState } from "react";
import { StoreContext } from "./MemoContainer";
import { observer } from "mobx-react";
import { colorArray } from "../lib/palette";
import { CircleItem } from "./MemoCategory";
import styled from "styled-components";

const CircleItemContainer = styled.div`
  display: flex;
`;

const CircleItem2 = styled(CircleItem)<{ selectedColor: string }>`
  border: ${(props) =>
    props.selectedColor == props.bgColor ? "2px solid black" : "none"};
`;

const MemoCatModal = ({
  id,
  setModal,
}: {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCgColor, setselectedCgColor] = useState<string>("");

  const store = useContext(StoreContext);
  const changeCategory = (name: string, bgColor: string) => {
    console.log("clicked", name, bgColor);
    store?.changeCategory(id, name, bgColor);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        minHeight: "2rem",
        top: "1.5rem",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <CircleItemContainer>
        {colorArray.slice(0, 7).map((item) => (
          <CircleItem2
            bgColor={item}
            selectedColor={selectedCgColor}
            onClick={(e) => {
              e.stopPropagation();
              if (selectedCgColor == item) {
                setselectedCgColor("");
                return;
              }
              setselectedCgColor(item);
            }}
          ></CircleItem2>
        ))}
      </CircleItemContainer>
      카테고리 추가
      <input onClick={(e) => e.stopPropagation()}></input>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {store?.category.map((cat) => (
          <div
            style={{
              color: cat.bgColor,
            }}
            onClick={(e) => {
              e.stopPropagation();
              changeCategory(cat.name, cat.bgColor);
              setModal(false);
            }}
          >
            #{cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(MemoCatModal);
