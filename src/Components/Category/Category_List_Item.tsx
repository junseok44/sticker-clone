import { Grid, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Tcategory, TdeleteCategory } from "../../lib/types";
import ConfirmModal from "../ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";

export const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const CategoryListItem = ({
  item,
  deleteCategory,
}: {
  item: Tcategory;
  deleteCategory: TdeleteCategory;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteCategoryThunk = () => () => {
    deleteCategory(item.id);
  };
  return (
    <Grid container>
      <ListItemButton>
        <Grid item>
          <div
            style={{
              width: "1.3rem",
              height: "1.3rem",
              borderRadius: "50%",
              backgroundColor: item.bgColor ? item.bgColor : "black",
              marginRight: "0.3rem",
            }}
          ></div>
        </Grid>
        <Grid item>
          <StyledLink to={`/category/${item.id}`}>
            <ListItemText primary={`${item.name}`}></ListItemText>
          </StyledLink>
        </Grid>
        {/* <Grid item>
          <DeleteIcon onClick={() => setIsModalOpen(true)}></DeleteIcon>
        </Grid>
        {isModalOpen && (
          <ConfirmModal
            confirmFunction={deleteCategoryThunk()}
            setModalController={setIsModalOpen}
          >
            <h1>
              정말 삭제하시겠습니까?
              <br /> 해당 카테고리 내용이 날아가실수도 있습니다!
            </h1>
          </ConfirmModal>
        )} */}
      </ListItemButton>
    </Grid>

    // <div style={{ display: "flex" }}>
    //   <div
    //     style={{
    //       width: "1.3rem",
    //       height: "1.3rem",
    //       borderRadius: "50%",
    //       backgroundColor: item.bgColor ? item.bgColor : "black",
    //       marginRight: "0.3rem",
    //     }}
    //   ></div>
    //   <StyledLink to={`category/${item.name}`}>#{item.name}</StyledLink>
    //   <div
    //     style={{ color: "red", cursor: "pointer" }}
    //     onClick={() => setIsModalOpen(true)}
    //   >
    //     X
    //   </div>
    //   {isModalOpen && (
    //     <ConfirmModal
    //       confirmFunction={deleteCategoryThunk()}
    //       setModalController={setIsModalOpen}
    //     >
    //       <h1>
    //         정말 삭제하시겠습니까?
    //         <br /> 해당 카테고리 내용이 날아가실수도 있습니다!
    //       </h1>
    //     </ConfirmModal>
    //   )}
    // </div>
  );
};

export default CategoryListItem;
