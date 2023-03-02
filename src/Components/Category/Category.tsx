import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TdeleteCategory, TtodoStore } from "../../lib/types";
import CategoryListItem from "./Category_List_Item";
import ConfirmModal from "../ConfirmModal";
import MemoCategoryAdd from "./Category_Add";
import MemoCategoryList from "./Category_List";

export const CircleItem = styled.div<{ bgColor: string }>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  margin-right: 0.3rem;
  background-color: ${(props) => props.bgColor};
`;

const MemoCategory = ({
  store,
  deleteCategory,
}: {
  store: TtodoStore;
  deleteCategory: TdeleteCategory;
}) => {
  return (
    <>
      <MemoCategoryAdd store={store}></MemoCategoryAdd>
      <MemoCategoryList
        store={store}
        deleteCategory={deleteCategory}
      ></MemoCategoryList>
    </>
  );
};

export default observer(MemoCategory);
