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
import ModalForm from "../ModalForm";
import { Grid } from "@mui/material";

const StyledGrid = styled(Grid)`
  &:hover {
    color: red;
  }
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
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: "50px",
        zIndex: 1,
        overflow: "visible",
      }}
    >
      <ModalForm title="카테고리 설정" cancelFunction={setModal}>
        <div>
          <MemoCategoryAdd
            store={store}
            setModal={setModal}
            memoId={memoId}
          ></MemoCategoryAdd>
          <Grid container>
            {store?.category.map((item) => (
              <StyledGrid
                item
                sx={{ cursor: "pointer", color: "black" }}
                sm={6}
                onClick={(e) => onClick(e, item.id)}
              >
                {item.name}
              </StyledGrid>
            ))}
          </Grid>
        </div>
      </ModalForm>
    </div>

    // <ModalContainer onClick={(e) => e.stopPropagation()}>
    //   카테고리 설정
    //   <MemoCategoryAdd
    //     store={store}
    //     setModal={setModal}
    //     memoId={memoId}
    //   ></MemoCategoryAdd>
    //   <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
    //     {store?.category.map((cat) => (
    //       <div
    //         style={{
    //           color: cat.bgColor,
    //           cursor: "pointer",
    //         }}
    //         onClick={(e) => {
    //           onClick(e, cat.id);
    //         }}
    //       >
    //         #{cat.name}
    //       </div>
    //     ))}
    //   </div>
    // </ModalContainer>
  );
};

export default observer(MemoCatModal);
