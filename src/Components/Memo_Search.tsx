import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useStateWithPromises } from "../lib/hooks";
import { Ttodo } from "../lib/types";

const Memo_Search = ({
  setSearchArray,
  todoArray,
  searchInput,
  onSearchMemoList,
}: {
  searchInput: string;
  todoArray: Ttodo[];
  setSearchArray: (newState: Ttodo[]) => Promise<unknown>;
  onSearchMemoList: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  useEffect(() => {
    setSearchArray(todoArray.filter((item) => item.msg.includes(searchInput)));
  }, [searchInput]);

  return (
    <>
      <TextField
        id="standard-basic"
        label="메모 검색"
        variant="standard"
        onChange={onSearchMemoList}
      />
      {/* <input placeholder="메모 검색.." onChange={onSearchMemoList}></input> */}
    </>
  );
};

export default Memo_Search;
