import React, { useEffect } from "react";
import { useStateWithPromises } from "../lib/hooks";
import { Ttodo } from "../lib/types";

const Memo_Search = ({
  setSearchArray,
  todoArray,
}: {
  todoArray: Ttodo[];
  setSearchArray: (newState: Ttodo[]) => Promise<unknown>;
}) => {
  const [searchInput, changeSearchInput] = useStateWithPromises<string>("");

  useEffect(() => {
    setSearchArray(todoArray.filter((item) => item.msg.includes(searchInput)));
  }, [searchInput]);

  const onSearchMemoList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await changeSearchInput(e.target.value);
  };

  return (
    <>
      <input placeholder="메모 검색.." onChange={onSearchMemoList}></input>
    </>
  );
};

export default Memo_Search;
