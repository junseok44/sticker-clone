export interface TtodoStore {
  todo: Ttodo[];
  category: Tcategory[];
  localStorage: Storage | null;
  initLocalStorage: () => void;
  loadLocalStorage: () => void;
  addMemo: TaddMemo;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  resetMemoList: () => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
  changeZIndex: (id: number) => void;
  changeSize: (id: number, width: number, height: number) => void;
  addCategory: (name: string, bgColor: string) => Tcategory;
  deleteCategory: (categoryId: string) => void;
  changeCategory: (itemId: number, categoryId: string) => void;
}

export interface Ttodo {
  id: string;
  msg: string;
  date: number;
  x: number;
  y: number;
  zIndex: number;
  width: number;
  height: number;
  category: string;
  bgColor: string;
  changeCategory: (category: string, bgColor: string) => void;
}

export interface TmovingObj {
  id: number;
  offsetX: number;
  offsetY: number;
}

export interface Tcategory {
  id: string;
  name: string;
  bgColor: string;
}

export type TaddMemo = (
  category: string,
  x: number,
  y: number,
  bgColor?: string
) => void;

export type TchangeZIndex = (Id: number) => void;
export type TdeleteCategory = (catId: string) => void;
