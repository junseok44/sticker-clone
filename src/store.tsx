import { Ttodo, TtodoStore } from "./types";
import { observable, action, computed, makeAutoObservable } from "mobx";

export class todoItem implements Ttodo {
  msg = "";
  date = Date.now();
  x = 20;
  y = 20;

  constructor() {
    makeAutoObservable(this, {
      msg: observable,
      date: observable,
      x: observable,
      y: observable,
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

  addMemo() {
    this.todo.push(new todoItem());
  }

  editMemo(id: number, msg: string) {
    this.todo.map((todoItem) =>
      todoItem.date == id ? { ...todoItem, msg: msg } : todoItem
    );
  }

  changePosition(id: number, xPos: number, yPos: number) {
    const index = this.todo.findIndex((item) => item.date === id);
    this.todo[index].x = xPos;
    this.todo[index].y = yPos;
  }
}
