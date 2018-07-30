import '../style/app.scss';
import Board from './modules/board.js';

document.addEventListener("DOMContentLoaded", (event) => {

    const boardContainer = document.querySelector(".board-container");
    const {style} = document.documentElement;
    let bombCount = 10;
    let boardWidth = 9;
    let boardHeight = 9;
    let board = new Board(boardContainer, bombCount, boardWidth, boardHeight);


    console.log(board.collection);
    const restartBtn = document.querySelector('.diff-btn');

    const options = document.getElementsByClassName('diff');
    console.log(options[0].checked);


    restartBtn.addEventListener('click', function () {
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