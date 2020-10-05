import React, {
  useState,
  ChangeEventHandler,
  useCallback,
  KeyboardEventHandler
} from "react";
import Board from "../components/ttt/Board";
import styles from "../pageStyles/for_hasura.module.scss";
import Fonts from "../components/ttt/Fonts";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    body {
      height: 100%;
      margin: 0;
      line-height: 1.15;
      font-family: "Open Sans", sans-serif;
      overflow: scroll;
      color: #202121;
      background: #f4f7f6;
      width: 100vw;
      min-height: 100vh;
      font-size: 16px;
      padding: 0.5em;
      #__next {
        height: 100%;
      }
    }
  }
`;

const for_hasura = () => {
  const [inputText, setInputText] = useState<string>();
  const inputTextHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      setInputText(e.target.value);
    },
    []
  );

  const [info, setInfo] = useState<string>("Please enter difficulty level");

  const [difficultyLevel, setDifficultyLevel] = useState<number>();
  const updateDifficultyLevelHandler = () => {
    const parsedInputValue = parseInt(inputText);
    !isNaN(parsedInputValue) &&
      parsedInputValue &&
      //minimum level for tic tac toe is 3
      parsedInputValue >= 3 &&
      setDifficultyLevel(parsedInputValue);
  };
  const onEnterHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === "Enter") {
      updateDifficultyLevelHandler();
    }
  };
  return (
    <React.Fragment>
      <Fonts />
      <GlobalStyle />
      <div className={styles["ttt"]}>
        <h1 className={styles["ttt__header"]}>Tic Tac Toe</h1>
        <div className={styles["ttt__difficulty-level"]}>
          <input
            type="number"
            className={styles["ttt__level-input"]}
            value={inputText}
            onChange={inputTextHandler}
            onKeyUp={onEnterHandler}
            placeholder="Difficulty Level(3,4,5,6....n)"
          />
          <button
            className={styles["ttt__play"]}
            onClick={updateDifficultyLevelHandler}
          >
            Play
          </button>
        </div>
        <p className={styles["ttt__info"]}>{info}</p>

        {difficultyLevel && (
          <Board difficultyLevel={difficultyLevel} setInfo={setInfo} />
        )}
      </div>
    </React.Fragment>
  );
};

export default for_hasura;
