import React, { useState, useEffect } from "react";
import { Ttodo } from "../../lib/types";
import MemoCatModal from "./MemoCatModal";

const MemoCategoryBar = ({
  item,
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}: {
  item: Ttodo;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {}, []);

  const onOpenModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };
  return (
    <div style={{ position: "relative" }} onClick={onOpenModal}>
      <div
        style={{
          color: item.bgColor,
          cursor: "pointer",
          position: "relative",
        }}
      >
        {item.category ? "#" + item.category : "#태그 추가"}
      </div>
    </div>
  );
};

export default MemoCategoryBar;
