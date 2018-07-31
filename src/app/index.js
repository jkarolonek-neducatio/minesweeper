import '../style/app.scss';
import Board from './modules/board';

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.querySelector('.board-container');
  const { style } = document.documentElement;
  let bombCount = 10;
  let boardWidth = 9;
  let boardHeight = 9;
  let board = new Board(boardContainer, bombCount, boardWidth, boardHeight);

  const restartBtn = document.querySelector('.diff-btn');

  const options = document.getElementsByClassName('diff');


  restartBtn.addEventListener('click', () => {
    board.removeBoard();
    if (options[0].checked === true) {
      boardWidth = 9;
      boardHeight = 9;
      bombCount = 10;
    } else if (options[1].checked === true) {
      boardWidth = 16;
      boardHeight = 16;
      bombCount = 40;
    } else if (options[2].checked === true) {
      boardWidth = 30;
      boardHeight = 16;
      bombCount = 99;
    }
    style.setProperty('--width', boardWidth);
    style.setProperty('--height', boardHeight);
    board = new Board(boardContainer, bombCount, boardWidth, boardHeight);
  });
});
