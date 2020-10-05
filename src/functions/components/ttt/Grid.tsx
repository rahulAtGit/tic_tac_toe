import React, { useState, FC, useEffect } from "react";
import { IPlayerType, TClickedPosition } from "../../types/ITTT";
import styled from "styled-components";

export interface IGrid {
  currentPlayer?: IPlayerType;
  isReset: boolean;
  GRID_WIDTH: number;
  rowIndex: number;
  columnIndex: number;
  updateClickedPosition: TClickedPosition;
}

const SGrid = styled.div<{ GRID_WIDTH: number }>`
  display: inline-flex;
  width: ${props => props.GRID_WIDTH}px;
  height: ${props => props.GRID_WIDTH}px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 0.25em;
  font-family: "Laila", serif;
  color: #506973;
  font-size: 2.4em;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`;

const Grid: FC<IGrid> = props => {
  const [gridValue, setGridValue] = useState<IPlayerType>();
  const gridClickHandler = () => {
    if (!gridValue)
      props.updateClickedPosition(props.rowIndex, props.columnIndex);
  };

  useEffect(() => {
    props.currentPlayer && setGridValue(props.currentPlayer);
  }, [props.currentPlayer]);

  useEffect(() => {
    setGridValue(undefined);
  }, [props.isReset]);

  return (
    <SGrid
      className="grid"
      onClick={gridClickHandler}
      GRID_WIDTH={props.GRID_WIDTH}
    >
      {gridValue}
    </SGrid>
  );
};

export default React.memo(Grid);
