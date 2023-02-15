import React, { useContext, useCallback } from "react";
import { StoreContext } from "./MemoContainer";
import { observer } from "mobx-react";
const MemoCatModal = ({
  id,
  setModal,
}: {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      카테고리 변경
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
