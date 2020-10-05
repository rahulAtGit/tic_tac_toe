import {
  ITTT,
  IPlayerType,
  IProgressObj,
  GAME_IS_A_TIE
} from "../../../types/ITTT";

const checkIfGameOver = (
  progressObjArray: IProgressObj[],
  currentPlayer: IPlayerType,
  difficultyLevel: number
) =>
  progressObjArray.filter(
    (value, index) => value[currentPlayer] === difficultyLevel
  ).length > 0;

const getTotalMoves = (progressObjArray: IProgressObj[]) =>
  progressObjArray.reduce((p, c) => p + c.X + c.O, 0);

const computeGameResult = (
  ttt: ITTT,
  difficultyLevel: number,
  currentPlayer: IPlayerType
): IPlayerType | GAME_IS_A_TIE | undefined => {
  const combinedProgressObjs = ttt.rowsProgress.concat(ttt.columnsProgress);
  combinedProgressObjs.push(ttt.bottomRightDiagonalProgress);
  combinedProgressObjs.push(ttt.topRightDiagonalProgress);

  return checkIfGameOver(combinedProgressObjs, currentPlayer, difficultyLevel)
    ? currentPlayer
    : getTotalMoves(combinedProgressObjs) ===
      2 * difficultyLevel * (difficultyLevel + 1)
    ? "GAME_IS_A_TIE"
    : undefined;
};

export default computeGameResult;
