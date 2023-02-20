import { Tcategory, Ttodo, TtodoStore } from "./lib/types";
import {
  observable,
  action,
  computed,
  makeAutoObservable,
  autorun,
} from "mobx";
import { palette } from "./lib/palette";
import { v3, v4 } from "uuid";

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

  constructor(
    zIndex: number,
    category: string,
    x: number,
    y: number,
    bgColor?: string
  ) {
    this.zIndex = zIndex;
    this.category = category;
    this.x = x;
    this.y = y;
    if (bgColor) this.bgColor = bgColor;
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
  localStorage: Storage | null = null;
  constructor() {
    makeAutoObservable(this, {
      todo: observable,
      addMemo: action,
      editMemo: action,
      addCategory: action,
    });

    this.initLocalStorage();
    autorun(() => {
      if (this.localStorage !== null) {
        this.localStorage.setItem("todo", JSON.stringify(this.todo));
        this.localStorage.setItem("category", JSON.stringify(this.category));
      }
    });
  }

  initLocalStorage() {
    if (!this.localStorage) {
      this.localStorage = window.localStorage;
      this.loadLocalStorage();
    } else {
      this.loadLocalStorage();
    }
  }

  loadLocalStorage() {
    this.todo = JSON.parse(this.localStorage?.getItem("todo") || "");
    this.category = JSON.parse(this.localStorage?.getItem("category") || "");
  }

  addMemo(category: string, x: number, y: number, bgColor?: string) {
    this.todo.push(new todoItem(this.todo.length, category, x, y, bgColor));
    // 이때 length값은 0이므로. zIndex값은 0부터 생성도니다.
  }

  editMemo(id: number, msg: string) {
    const todoItem123 = this.todo.find((item) => item.date === id);
    if (todoItem123) todoItem123.msg = msg;
  }

  deleteMemo(id: number) {
    this.todo = this.todo.filter((item) => item.date !== id);
  }

  resetMemoList() {
    this.todo = [];
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

  addCategory(categoryName: string, bgColor: string) {
    const newCategory = {
      id: v4(),
      name: categoryName,
      bgColor,
    };

    this.category.push(newCategory);

    return newCategory;
  }

  // 이 부분이 사실 category id 시에 카테고리에서 그걸 찾아서
  // 카테고리 이름과 bgCOlor를 설정하는것으로 바뀌어야 함.

  deleteCategory(categoryId: string) {
    this.category = this.category.filter((cat) => cat.id !== categoryId);
  }

  changeCategory(itemId: number, categoryId: string) {
    const target = this.todo.find((item) => item.date == itemId);
    const category = this.category.find((cat) => cat.id === categoryId);
    if (target && category) {
      target.bgColor = category.bgColor;
      target.category = category.name;
    }
  }
}
