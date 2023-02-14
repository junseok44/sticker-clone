export interface TtodoStore {
  todo: Ttodo[];
  category: string[];
  addMemo: (category: string) => void;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
  changeZIndex: (id: number) => void;
  changeSize: (id: number, width: number, height: number) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

export interface Ttodo {
  msg: string;
  date: number;
  x: number;
  y: number;
  zIndex: number;
  width: number;
  height: number;
  category: string;
}

export interface TmovingObj {
  id: number;
  offsetX: number;
  offsetY: number;
}
