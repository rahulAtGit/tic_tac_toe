export type IPlayerType = "X" | "O";

export interface IProgressObj {
  //   [key: IPlayerType]: { count: number };
  //   [index: string]: { message: string };
  X: number;
  O: number;
  isValid: boolean;
}

export interface ITTT {
  //   board: IPlayerType[][];
  rowsProgress: IProgressObj[];
  columnsProgress: IProgressObj[];
  topRightDiagonalProgress: IProgressObj;
  bottomRightDiagonalProgress: IProgressObj;
}

export type IGetCurrentPlayer = () => IPlayerType;

export type TClickedPosition = (rowIndex: number, columnIndex: number) => void;

export type TPosition = { rowIndex: number; columnIndex: number };

export type GAME_IS_A_TIE = "GAME_IS_A_TIE";
