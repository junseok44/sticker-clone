import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithPromises } from "../../lib/hooks";
import { colorArray } from "../../lib/palette";
import { TtodoStore } from "../../lib/types";
import { observer } from "mobx-react";
import { Button, Grid, TextField } from "@mui/material";
import styled from "styled-components";

const Item = styled.div`
  border: 1px solid black;
  height: 100%;
`;

const MemoCategoryAdd = ({
  store,
  setModal,
  memoId,
}: {
  store: TtodoStore | null;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  memoId?: number;
}) => {
  const [cgInput, setcgInput] = useStateWithPromises("");
  const [cgColor, setCgColor] = useStateWithPromises("");
  const [cgErrMsg, setCgErrMsg] = useState<string>("");
  const [isAddedCategory, setIsAddedCategory] = useStateWithPromises(false);
  const InputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (store && isAddedCategory) {
      const newCategory = store.addCategory(cgInput, cgColor);
      if (setModal && memoId) {
        store?.changeCategory(memoId, newCategory.id);
        setModal(false);
      }
      setIsAddedCategory(false);
    }
  }, [isAddedCategory]);

  useEffect(() => {
    if (InputRef.current) InputRef.current.focus();
  }, []);

  const filterArrayWithCategories = useCallback(() => {
    let currentCatColor: string[] = [];
    if (!store) return [...colorArray];
    for (let cat of store.category) {
      currentCatColor.push(cat.bgColor);
    }
    const leftArray = [...colorArray].filter(
      (color) => !new Set(currentCatColor).has(color)
    );
    return leftArray;
  }, [store]);

  const addCategory = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!cgInput) {
        setCgErrMsg("카테고리 이름을 입력하세요!!");
        return;
      }
      if (!cgColor) {
        // 에러처리. store가 없을수도 있다.
        const leftColorArray = filterArrayWithCategories();
        await setCgColor(
          leftColorArray[Math.floor(Math.random() * leftColorArray.length)]
        );
      }
      await setIsAddedCategory(true); // 카테고리 추가하기.

      await setcgInput("");
      await setCgColor("");
    },
    [store, cgInput, cgColor, setcgInput, setCgColor, setModal]
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <form onSubmit={addCategory}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="flex-end"
        >
          <Grid item xs={8}>
            <TextField
              id="standard-basic"
              label="카테고리 추가.."
              variant="standard"
              onChange={async (e) => {
                setCgErrMsg("");
                await setcgInput(e.target.value);
              }}
              ref={InputRef}
              value={cgInput}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={3} container direction="column" alignItems="center">
            {/* <Grid item xs></Grid> */}
            <Grid item>
              <Button variant="contained" type="submit">
                추가
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            {!setModal && (
              <div style={{ display: "flex" }}>
                {colorArray.map((item) => (
                  <Grid item md={2} lg={1}>
                    <div
                      style={{
                        width: "1.3rem",
                        height: "1.3rem",
                        borderRadius: "50%",
                        border: item == cgColor ? "3px solid black" : "none",
                        backgroundColor: item,
                        marginRight: "0.3rem",
                      }}
                      onClick={async () => {
                        if (cgColor == item) {
                          await setCgColor("");
                          return;
                        }
                        await setCgColor(item);
                        setCgErrMsg("");
                      }}
                    ></div>
                  </Grid>
                ))}
              </div>
            )}
            {cgErrMsg && <div style={{ color: "red" }}>{cgErrMsg}</div>}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default observer(MemoCategoryAdd);
