import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStateWithPromises } from "../lib/hooks";
import { colorArray } from "../lib/palette";
import { TtodoStore } from "../lib/types";

export const CircleItem = styled.div<{ bgColor: string }>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-right: 0.3rem;
  background-color: ${(props) => props.bgColor};
`;

const MemoCategory = ({ store }: { store: TtodoStore }) => {
  const [cgInput, setcgInput] = useStateWithPromises("");
  const [cgColor, setCgColor] = useStateWithPromises("");
  const [cgErrMsg, setCgErrMsg] = useState<string>("");
  const [isAddedCategory, setIsAddedCategory] = useStateWithPromises(false);

  useEffect(() => {
    if (isAddedCategory) {
      console.log(cgInput);
      store.addCategory(cgInput, cgColor);
      setIsAddedCategory(false);
    }
  }, [isAddedCategory]);

  const addCategory = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!cgInput) {
        setCgErrMsg("카테고리 이름을 입력하세요!!");
        return;
      }
      if (!cgColor) {
        let catColorArr = [];
        for (const cat of store.category) {
          catColorArr.push(cat.bgColor);
        }
        const catColorSet = new Set(catColorArr);
        const noColorSet = new Set(
          [...colorArray].filter((color) => !catColorSet.has(color))
        );
        const leftArray = Array.from(noColorSet);
        await setCgColor(
          leftArray[Math.floor(Math.random() * leftArray.length)]
        );
      }
      console.log(cgInput);
      await setIsAddedCategory(true);
      await setcgInput("");
      await setCgColor("");
      // store.addCategory(cgInput, selectedCgColor);
      // setIsAddedCategory(true);
      // 여기서 바로 store.addCategory하면 안된단다. 왜냐하면
      // addCategory가 참조하고 있는 store.addCategory는 여전히 낡은것이기 때문이라고.
      // 그래서 useEffect를 통해서 이 값이 바뀌면
    },
    [store, cgInput, cgColor, setcgInput, setCgColor]
  );
  return (
    <>
      <form onSubmit={addCategory}>
        <input
          placeholder="카테고리 추가.."
          value={cgInput}
          onChange={async (e) => {
            setCgErrMsg("");
            await setcgInput(e.target.value);
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
                border: item == cgColor ? "3px solid black" : "none",
                backgroundColor: item,
                marginRight: "0.3rem",
              }}
              onClick={async () => {
                if (cgColor == item) {
                  await setCgColor("");
                  return;
                }
                await setCgColor(item);
                setCgErrMsg("");
              }}
            ></div>
          ))}
        </div>
        {cgErrMsg && <div style={{ color: "red" }}>{cgErrMsg}</div>}
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
