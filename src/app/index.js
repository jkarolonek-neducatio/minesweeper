import '../style/app.scss';
import Field from './modules/field.js';
import Board from './modules/board.js';
require('./modules/field.js');
document.addEventListener("DOMContentLoaded", function(event) {

const boardSize = 9;
const boardContainer = document.querySelector(".board-container");
const board = new Board(boardContainer, boardSize);

});