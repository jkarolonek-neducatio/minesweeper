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
  const customBtn = document.querySelector('.custom-btn');

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

  customBtn.addEventListener('click', () => {
    const customWidth = document.getElementById('custom-width').value;
    const customHeight = document.getElementById('custom-height').value;
    const customBombs = document.getElementById('bomb-number').value;
    if (customWidth === '' || customHeight === '' || customBombs === '') {
      alert('Ooops, you left some fields empty, cannot generate board!');
    } else if (customWidth * customHeight < customBombs) {
      alert('Ooops, the number of bombs exceeds board size, cannot generate board!');
    } else {
      board.removeBoard();
      boardWidth = customWidth;
      boardHeight = customHeight;
      bombCount = customBombs;
      style.setProperty('--width', boardWidth);
      style.setProperty('--height', boardHeight);
      board = new Board(boardContainer, bombCount, boardWidth, boardHeight);
    }
  });
});
