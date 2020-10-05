import { ITTT, IPlayerType, IProgressObj } from "../../../types/ITTT";

const computeProgressObj = (
  progressObj: IProgressObj,
  currentPlayer: IPlayerType
): IProgressObj => {
  return currentPlayer === "X"
    ? progressObj.O > 0
      ? {
          ...progressObj,
          X: progressObj.X + 1,
          isValid: false
        }
      : { ...progressObj, X: progressObj.X + 1 }
    : progressObj.X > 0
    ? {
        ...progressObj,
        O: progressObj.O + 1,
        isValid: false
      }
    : { ...progressObj, O: progressObj.O + 1 };
};

const computeRowsProgress = (
  array: IProgressObj[],
  positionToCompare: number,
  currentPlayer: IPlayerType
) => {
  return array.map((value, index) =>
    index === positionToCompare
      ? computeProgressObj(value, currentPlayer)
      : value
  );
};

const computeGameProress = (
  ttt: ITTT,
  filledRowIndex: number,
  filledColumnIndex: number,
  currentPlayer: IPlayerType,
  difficultyLevel: number
): ITTT => {
  const rowsProgress = computeRowsProgress(
    ttt.rowsProgress,
    filledRowIndex,
    currentPlayer
  );
  const columnsProgress = computeRowsProgress(
    ttt.columnsProgress,
    filledColumnIndex,
    currentPlayer
  );
  const topRightDiagonalProgress =
    filledColumnIndex === filledRowIndex
      ? computeProgressObj(ttt.topRightDiagonalProgress, currentPlayer)
      : ttt.topRightDiagonalProgress;
  const bottomRightDiagonalProgress =
    filledColumnIndex + filledRowIndex === difficultyLevel - 1
      ? computeProgressObj(ttt.bottomRightDiagonalProgress, currentPlayer)
      : ttt.bottomRightDiagonalProgress;

  return {
    rowsProgress,
    columnsProgress,
    topRightDiagonalProgress,
    bottomRightDiagonalProgress
  };
};

export default computeGameProress;
