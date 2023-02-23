import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TdeleteCategory, TtodoStore } from "../lib/types";
import CategoryListItem from "./CategoryListItem";
import ConfirmModal from "./ConfirmModal";
import MemoCategoryAdd from "./MemoCategoryAdd";

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
            <CategoryListItem
              key={cat.id}
              item={cat}
              deleteCategory={deleteCategory}
            ></CategoryListItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default observer(MemoCategory);
