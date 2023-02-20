import { observer } from "mobx-react";
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStateWithPromises } from "../lib/hooks";
import { colorArray } from "../lib/palette";
import { TtodoStore } from "../lib/types";
import MemoCategoryAdd from "./MemoCategoryAdd";

export const CircleItem = styled.div<{ bgColor: string }>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-right: 0.3rem;
  background-color: ${(props) => props.bgColor};
`;

const MemoCategory = ({ store }: { store: TtodoStore }) => {
  const onDeleteCategory = (categoryId: string) => {
    store.deleteCategory(categoryId);
    store.deleteMemoInCategory(categoryId);
  };

  return (
    <>
      <MemoCategoryAdd store={store}></MemoCategoryAdd>
      <div>
        카테고리
        <div
          style={{
            width: "100%",
            minHeight: "3rem",
            // border: "1px solid black",
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            gridAutoRows: "2rem",
          }}
        >
          {store.category.map((cat) => (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  borderRadius: "50%",
                  backgroundColor: cat.bgColor ? cat.bgColor : "black",
                  marginRight: "0.3rem",
                }}
              ></div>
              <Link to={`category/${cat.name}`}>#{cat.name}</Link>
              <div
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => onDeleteCategory(cat.id)}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default observer(MemoCategory);
