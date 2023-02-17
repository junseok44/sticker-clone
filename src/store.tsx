import { Tcategory, Ttodo, TtodoStore } from "./lib/types";
import { observable, action, computed, makeAutoObservable } from "mobx";
import { palette } from "./lib/palette";

export class todoItem implements Ttodo {
  msg = "";
  date = Date.now();
  x = 20;
  y = 20;
  zIndex = 0;
  width = 200;
  height = 200;
  category = "";
  bgColor = palette.grey;

  constructor(zIndex: number, category: string, x: number, bgColor?: string) {
    this.zIndex = zIndex;
    this.category = category;
    if (bgColor) this.bgColor = bgColor;
    if (x) this.x = x;
    makeAutoObservable(this, {
      msg: observable,
      date: observable,
      x: observable,
      y: observable,
      zIndex: observable,
      width: observable,
      height: observable,
      category: observable,
      bgColor: observable,
      changeCategory: action,
    });
  }

  changeCategory(category: string, bgColor: string) {
    this.category = category;
    this.bgColor = bgColor;
  }
}

export class todoStore implements TtodoStore {
  todo: Ttodo[] = [];
  category: Tcategory[] = [];

  constructor() {
    makeAutoObservable(this, {
      todo: observable,
      addMemo: action,
      editMemo: action,
      addCategory: action,
    });
  }

  addMemo(category: string, x: number, bgColor?: string) {
    this.todo.push(new todoItem(this.todo.length, category, x, bgColor));
    // 이때 length값은 0이므로. zIndex값은 0부터 생성도니다.
  }

  editMemo(id: number, msg: string) {
    const todoItem123 = this.todo.find((item) => item.date === id);
    if (todoItem123) todoItem123.msg = msg;
  }

  deleteMemo(id: number) {
    this.todo = this.todo.filter((item) => item.date !== id);
  }

  deleteMemoInCategory(categoryName: string) {
    this.todo = this.todo.filter((item) => item.category !== categoryName);
  }

  changePosition(id: number, xPos: number, yPos: number) {
    const index = this.todo.findIndex((item) => item.date === id);
    this.todo[index].x = xPos;
    this.todo[index].y = yPos;
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

  changeSize(id: number, width: number, height: number) {
    this.todo = this.todo.map((item) =>
      item.date === id ? { ...item, width: width, height: height } : item
    );
  }

  addCategory(catName: string, bgColor: string) {
    this.category.push({ name: catName, bgColor });
  }

  deleteCategory(catName: string) {
    this.category = this.category.filter((cat) => cat.name !== catName);
  }

  changeCategory(a: number, b: string, c: string) {
    const target = this.todo.find((item) => item.date == a);
    if (target) {
      target.category = b;
      target.bgColor = c;
    }
  }
}
