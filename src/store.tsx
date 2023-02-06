import { Ttodo, TtodoStore } from "./types";
import { observable, action, computed, makeAutoObservable } from "mobx";

export class todoItem implements Ttodo {
  msg = "";
  date = Date.now();
  x = 20;
  y = 20;
  zIndex = 0;

  constructor(zIndex: number) {
    this.zIndex = zIndex;
    makeAutoObservable(this, {
      msg: observable,
      date: observable,
      x: observable,
      y: observable,
      zIndex: observable,
    });
  }
}

export class todoStore implements TtodoStore {
  todo: Ttodo[] = [];

  constructor() {
    makeAutoObservable(this, {
      todo: observable,
      addMemo: action,
      editMemo: action,
    });
  }
  changeZIndex(id: number) {
    const todoItem = this.todo.find((item) => item.date === id);
    if (todoItem) {
      this.todo = this.todo.map((item) =>
        item.date === id
          ? {
              ...item,
              zIndex: this.todo.length - 1,
            }
          : item.zIndex < todoItem.zIndex
          ? item
          : { ...item, zIndex: item.zIndex - 1 }
      );
      //그러니까 이 zIndex보다 더 낮은경우에는. -1이 필요없다.
    }
  }

  addMemo() {
    this.todo.push(new todoItem(this.todo.length));
    // 이때 length값은 0이므로. zIndex값은 0부터 생성도니다.
  }

  editMemo(id: number, msg: string) {
    const todoItem123 = this.todo.find((item) => item.date === id);
    if (todoItem123) todoItem123.msg = msg;
  }

  changePosition(id: number, xPos: number, yPos: number) {
    const index = this.todo.findIndex((item) => item.date === id);
    this.todo[index].x = xPos;
    this.todo[index].y = yPos;
  }
}
