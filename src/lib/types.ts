export interface TtodoStore {
  todo: Ttodo[];
  category: Tcategory[];
  addMemo: (category: string, bgColor?: string) => void;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
  changeZIndex: (id: number) => void;
  changeSize: (id: number, width: number, height: number) => void;
  addCategory: (category: string, bgColor: string) => void;
  deleteCategory: (category: string) => void;
  changeCategory: (id: number, newCategory: string, newBgColor: string) => void;
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
  bgColor: string;
  changeCategory: (category: string, bgColor: string) => void;
}

export interface TmovingObj {
  id: number;
  offsetX: number;
  offsetY: number;
}

export interface Tcategory {
  name: string;
  bgColor: string;
}
