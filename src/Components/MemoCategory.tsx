import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { colorArray } from "../lib/palette";
import { TtodoStore } from "../lib/types";

const MemoCategory = ({ store }: { store: TtodoStore }) => {
  const [cgInput, setcgInput] = useState<string>("");
  const [selectedCgColor, setselectedCgColor] = useState<string>("");
  const [catgErrMsg, catgSetErrMsg] = useState<string>("");
  const addCategory = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!cgInput) {
        catgSetErrMsg("카테고리 이름을 입력하세요!!");
        return;
      } else if (!selectedCgColor) {
        catgSetErrMsg("카테고리 색깔을 선택하세요!");
        return;
      } else if (store.category.find((cat) => cat.bgColor == selectedCgColor)) {
        catgSetErrMsg("이미 있는 카테고리 색깔입니다.");
        return;
      }
      store.addCategory(cgInput, selectedCgColor);
      setcgInput("");
    },
    [store, cgInput, selectedCgColor, setcgInput]
  );
  return (
    <>
      <form onSubmit={addCategory}>
        <input
          placeholder="카테고리 추가.."
          value={cgInput}
          onChange={(e) => {
            catgSetErrMsg("");
            setcgInput(e.target.value);
          }}
        ></input>
        <button>추가</button>
        <div style={{ display: "flex" }}>
          {colorArray.map((item) => (
            <div
              style={{
                width: "1.3rem",
                height: "1.3rem",
                borderRadius: "50%",
                border: item == selectedCgColor ? "3px solid black" : "none",
                backgroundColor: item,
                marginRight: "0.3rem",
              }}
              onClick={() => {
                if (selectedCgColor == item) {
                  setselectedCgColor("");
                  return;
                }
                setselectedCgColor(item);
                catgSetErrMsg("");
              }}
            ></div>
          ))}
        </div>
        {catgErrMsg && <div style={{ color: "red" }}>{catgErrMsg}</div>}
      </form>
      <div>
        카테고리
        <div
          style={{
            width: "100%",
            minHeight: "3rem",
            border: "1px solid black",
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MemoCategory;
