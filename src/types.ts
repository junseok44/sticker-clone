export interface TtodoStore {
  todo: Ttodo[];
  addMemo: () => void;
  editMemo: (id: number, msg: string) => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
  changeZIndex: (id: number) => void;
}

export interface Ttodo {
  msg: string;
  date: number;
  x: number;
  y: number;
  zIndex: number;
}
