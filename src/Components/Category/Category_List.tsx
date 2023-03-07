import React from "react";
import { TdeleteCategory, TtodoStore } from "../../lib/types";
import CategoryListItem from "./Category_List_Item";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

interface MemoCategoryListProps {
  store: TtodoStore;
  deleteCategory: TdeleteCategory;
}

const MemoCategoryList = ({ store, deleteCategory }: MemoCategoryListProps) => {
  return (
    <div style={{ maxHeight: "7rem", overflow: "auto" }}>
      <ListSubheader component="div" id="nested-list-subheader">
        카테고리
        <Divider></Divider>
      </ListSubheader>
      <Grid container>
        {store.category.map((cat) => (
          <Grid item md={12} lg={6}>
            <CategoryListItem
              key={cat.id}
              item={cat}
              deleteCategory={deleteCategory}
            ></CategoryListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default observer(MemoCategoryList);
