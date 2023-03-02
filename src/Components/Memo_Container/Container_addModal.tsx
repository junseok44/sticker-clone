import React, { useState, useContext } from "react";
import { TaddMemo, Tcategory } from "../../lib/types";
import { observer } from "mobx-react";
import MemoCategoryAdd from "../Category/Category_Add";
import { StoreContext } from "./Container";

interface TMemoAddProps {
  category: Tcategory[];
  addMemo: TaddMemo;
  setIsAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemoAdd = ({ category, addMemo, setIsAddModal }: TMemoAddProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Tcategory | null>(
    null
  );
  const [errMsg, setErrMsg] = useState("");

  const store = useContext(StoreContext);
  return (
    <div style={{ position: "absolute", zIndex: "100" }}>
      <div></div>
      <div
        style={{
          width: "20rem",
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        카테고리 선택
        <MemoCategoryAdd store={store}></MemoCategoryAdd>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          {category.map((item) => (
            <div
              style={{
                color: item.bgColor,
                border:
                  item.name == selectedCategory?.name
                    ? "1px solid black"
                    : "none",
              }}
              onClick={() => {
                if (selectedCategory?.name === item.name) {
                  setSelectedCategory(null);
                  return;
                }
                setSelectedCategory(item);
              }}
            >
              #{item.name}
            </div>
          ))}
        </div>
        {errMsg && <div style={{ color: "red" }}>{errMsg}</div>}
        <div>
          <button
            onClick={() => {
              if (!selectedCategory) {
                addMemo("", 20, 20);
                setIsAddModal(false);

                return;
              }
              addMemo(selectedCategory.name, 20, 20, selectedCategory.bgColor);
              setIsAddModal(false);
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(MemoAdd);
