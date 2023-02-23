import React, { ReactNode } from "react";
import styled from "styled-components";
import { JsxElement } from "typescript";

const ConfirmModalContainer = styled.div`
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 10;
  left: 8rem;
  border: "1px solid black";
`;
const ConfirmModal = ({
  confirmFunction,
  setModalController,
  children,
}: {
  children?: ReactNode;
  confirmFunction: any;
  setModalController: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ConfirmModalContainer>
      {children}
      <button
        onClick={(e) => {
          e.stopPropagation();
          confirmFunction();
          setModalController(false);
        }}
      >
        삭제
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("fdsfwe");
          setModalController(false);
        }}
      >
        취소
      </button>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;
