import { useOutletContext } from "react-router-dom";
import {
  TaddMemo,
  TchangeZIndex,
  TdeleteCategory,
  Ttodo,
  TtodoStore,
} from "../lib/types";
import { observer } from "mobx-react";

import { useState, useEffect, useRef } from "react";
import { useStateWithPromises } from "../lib/hooks";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeSideBar from "../Components/HomeSideBar";

const MemoHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {isSidebarOpen ? (
        <HomeSideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        ></HomeSideBar>
      ) : (
        <IconButton
          onClick={() => setIsSidebarOpen(true)}
          sx={{ margin: "1rem 0rem 0rem 1rem" }}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
      )}
    </>
  );
};

export default observer(MemoHome);
