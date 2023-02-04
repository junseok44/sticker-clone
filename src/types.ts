export interface TtodoStore {
  todo: Ttodo[];
  addMemo: () => void;
  changePosition: (id: number, xPos: number, yPos: number) => void;
}

export interface Ttodo {
  msg: string;
  date: number;
  x: number;
  y: number;
}
