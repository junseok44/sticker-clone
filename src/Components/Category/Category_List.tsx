import React from "react";
import { TdeleteCategory, TtodoStore } from "../../lib/types";
import CategoryListItem from "./Category_List_Item";
import { observer } from "mobx-react";

interface MemoCategoryListProps {
  store: TtodoStore;
  deleteCategory: TdeleteCategory;
}

const MemoCategoryList = ({ store, deleteCategory }: MemoCategoryListProps) => {
  return (
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
  );
};

export default observer(MemoCategoryList);
