export interface TtodoStore {
  todo: Ttodo[];
  addMemo: () => void;
  editMemo: (id: number, msg: string) => void;
  deleteMemo: (id: number) => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
  changeZIndex: (id: number) => void;
  changeSize: (id: number, width: number, height: number) => void;
}

export interface Ttodo {
  msg: string;
  date: number;
  x: number;
  y: number;
  zIndex: number;
  width: number;
  height: number;
}

export interface TmovingObj {
  id: number;
  offsetX: number;
  offsetY: number;
}
