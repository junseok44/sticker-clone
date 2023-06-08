import { TchangeZIndex, Ttodo } from "../lib/types";
import { observer } from "mobx-react";
import Memo_List_Item from "./Memo_List_Item";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const MemoList = ({
  todoList,
  changeZIndex,
  title,
}: {
  title: string;
  todoList: Ttodo[];
  changeZIndex?: TchangeZIndex;
}) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        overflow: "auto",
      }}
      component="nav"
      // aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
          <Divider></Divider>
        </ListSubheader>
      }
    >
      {todoList.length !== 0 ? (
        [...todoList]
          .sort((a, b) => (a > b ? 1 : -1))
          .map((item) => (
            <Memo_List_Item
              key={item.date}
              item={item}
              changeZIndex={changeZIndex}
            ></Memo_List_Item>
          ))
      ) : (
        <ListItemButton>
          <ListItemText>메모없음</ListItemText>
        </ListItemButton>
      )}
    </List>
  );
};

export default observer(MemoList);
