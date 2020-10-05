import React, {
  FC,
  useState,
  ReactElement,
  useCallback,
  useEffect
} from "react";
import {
  ITTT,
  IProgressObj,
  IPlayerType,
  IGetCurrentPlayer,
  TClickedPosition,
  TPosition
} from "../../types/ITTT";
import Grid, { IGrid } from "./Grid";
import styled from "styled-components";
import computeGameProress from "./util/computeGameProress";
import computeGameResult from "./util/computeGameResult";

interface IBoard {
  difficultyLevel: number;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
}

const getInitialTTT = (size: number): ITTT => {
  const initialProgressObj: IProgressObj = {
    isValid: true,
    X: 0,
    O: 0
  };
  const initialRowsColumnsProgress: IProgressObj[] = new Array<IProgressObj>(
    size
  ).fill(initialProgressObj);

  return {
    // board: new Array<IPlayerType>(size)
    //   .fill(undefined)
    //   .map(() => new Array<IPlayerType>(size).fill(undefined)),
    bottomRightDiagonalProgress: initialProgressObj,
    topRightDiagonalProgress: initialProgressObj,
    rowsProgress: initialRowsColumnsProgress,
    columnsProgress: initialRowsColumnsProgress
  };
};

const createGrids = (
  boardLength: number,
  currentPlayer: IPlayerType,
  difficultyLevel: number,
  updateClickedPosition: TClickedPosition,
  clickedPosition: TPosition,
  reset: boolean,
  numOfTimesGameReset: number
) => {
  const result: ReactElement<IGrid>[] = [];
  for (let rowIndex = 0; rowIndex < boardLength; rowIndex++) {
    for (let columnIndex = 0; columnIndex < boardLength; columnIndex++) {
      const player =
        clickedPosition &&
        clickedPosition.rowIndex === rowIndex &&
        clickedPosition.columnIndex === columnIndex
          ? currentPlayer
          : undefined;
      result.push(
        <Grid
          currentPlayer={player}
          key={`${rowIndex}-${columnIndex}-${numOfTimesGameReset}`}
          GRID_WIDTH={GRID_WIDTH}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          updateClickedPosition={updateClickedPosition}
          isReset={reset}
        />
      );
    }
  }
  return result;
};

export const GRID_WIDTH = 60;
const getBoardSizeInPX = (numGrids: number) => numGrids * GRID_WIDTH;
const SBoard = styled.div<{ difficultyLevel: number }>`
  display: flex;
  flex-wrap: wrap;
  width: ${props => getBoardSizeInPX(props.difficultyLevel)}px;
  height: ${props => getBoardSizeInPX(props.difficultyLevel)}px;
  margin: 0 auto;
`;

const DEFAULT_PLAYER = "X";
const Board: FC<IBoard> = props => {
  const [ttt, setTtt] = useState<ITTT>(getInitialTTT(props.difficultyLevel));
  const [currentPlayer, setCurrentPlayer] = useState<IPlayerType>(
    DEFAULT_PLAYER
  );

  const [numOfTimesGameReset, setNumOfTimesGameReset] = useState<number>(0);

  const [clickedPosition, setClickedPosition] = useState<TPosition>();

  const updateClickedPosition: TClickedPosition = useCallback(
    (rowIndex, columnIndex) => {
      setClickedPosition({ rowIndex, columnIndex });
    },
    []
  );

  const [reset, setReset] = useState<boolean>();

  const resetGame = () => {
    setReset(true);
    setTtt(getInitialTTT(props.difficultyLevel));
    setCurrentPlayer(DEFAULT_PLAYER);
  };

  useEffect(() => {
    resetGame();
  }, [props.difficultyLevel]);

  useEffect(() => {
    if (reset === true) {
      setNumOfTimesGameReset(numOfTimesGameReset + 1);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (clickedPosition) {
      const nextPlayer: IPlayerType = currentPlayer === "X" ? "O" : "X";
      const updatedTTT = computeGameProress(
        ttt,
        clickedPosition.rowIndex,
        clickedPosition.columnIndex,
        nextPlayer,
        props.difficultyLevel
      );
      const gameResult = computeGameResult(
        updatedTTT,
        props.difficultyLevel,
        nextPlayer
      );
      if (gameResult === "X" || gameResult === "O") {
        props.setInfo(`Player ${gameResult} has won!!!!`);
        resetGame();
      } else if (gameResult === "GAME_IS_A_TIE") {
        props.setInfo(`Game is a tie!!`);
        resetGame();
      } else {
        setTtt(updatedTTT);
        setCurrentPlayer(nextPlayer);
      }
    }
  }, [clickedPosition]);

  return (
    <SBoard className="board" difficultyLevel={props.difficultyLevel}>
      {createGrids(
        props.difficultyLevel,
        currentPlayer,
        props.difficultyLevel,
        updateClickedPosition,
        clickedPosition,
        reset,
        numOfTimesGameReset
      )}
    </SBoard>
  );
};

export default Board;
