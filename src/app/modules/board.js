import Field from './field';

class Board {
  constructor(view, bombs, width, height) {
    this.view = view;
    this.bombs = bombs;
    this.width = width;
    this.height = height;
    this.state = 'initial';
    this.firstClick = false;
    this.createBoard();
  }


  onClick = (event) => {
    const field = this.getField(event);
    if (field.state === 'flagged') {
      return false;
    }
    if (this.firstClick === false) {
      this.firstClick = true;
      do {
        for (let x = 0; x < this.height; x += 1) {
          for (let y = 0; y < this.width; y += 1) {
            this.collection[x][y].value = 0;
          }
        }
        this.randomizeBombs();
        this.assignHints();
        this.displayValues();
      } while (field.value === 9);
    }
    this.fieldEmptyCheck(field.x, field.y);
    Board.fieldStateChange(field, 'clicked');
    this.gameLost(field);
    this.gameWon();
  }

  onContextMenu = (event) => {
    const field = this.getField(event);
    event.preventDefault();
    if (field.state === 'unclicked') {
      Board.fieldStateChange(field, 'flagged');
    } else if (field.state === 'flagged') {
      Board.fieldStateChange(field, 'unclicked');
    }
    return false;
  }

  onDoubleClick = (event) => {
    const field = this.getField(event);
    if (field.state === 'flagged') {
      return false;
    }
    this.revealAround(field.x, field.y);
    this.gameWon();
  }

  createBoard() {
    const collection = [];
    for (let i = 0; i < this.height; i += 1) {
      const collectionRow = [];
      for (let j = 0; j < this.width; j += 1) {
        const fieldContainer = document.createElement('BUTTON');
        const field = new Field(fieldContainer, 'unclicked', i, j);
        this.view.appendChild(field.view);
        collectionRow.push(field);
        field.view.classList.add(field.state);

        field.view.addEventListener('click', this.onClick);

        field.view.addEventListener('contextmenu', this.onContextMenu);

        field.view.addEventListener('dblclick', this.onDoubleClick);
      }
      collection.push(collectionRow);
    }
    this.collection = collection;
  }

  removeBoard() {
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        const { view } = this.collection[i][j];
        view.removeEventListener('click', this.onClick);

        view.removeEventListener('contextmenu', this.onContextMenu);

        view.removeEventListener('dblclick', this.onDoubleClick);
        this.view.removeChild(this.collection[i][j].view);
        this.gameReset();
      }
    }
  }

  gameLost(field) {
    if (field.state === 'clicked' && field.value === 9) {
      this.state = 'lost';
      this.view.classList.add('game-lost');
    }
  }

  gameWon() {
    let checked = 0;

    for (let x = 0; x < this.height; x += 1) {
      for (let y = 0; y < this.width; y += 1) {
        const f = this.collection[x][y];
        if (f.state === 'clicked') {
          checked += 1;
        }
      }
    }
    if (checked === this.width * this.height - this.bombs) {
      this.state = 'won';
      this.view.classList.add('game-won');
    }
  }

  gameReset() {
    this.state = 'initial';
    this.view.classList.remove('game-won');
    this.view.classList.remove('game-lost');
  }

  getField(event) {
    const tile = event.target;
    const tileX = parseInt(tile.getAttribute('data-x'), 10);
    const tileY = parseInt(tile.getAttribute('data-y'), 10);
    return this.collection[tileX][tileY];
  }

  static fieldStateChange(field, state) {
    field.view.classList.remove(field.state);
    field.state = state; // eslint-disable-line no-param-reassign
    field.view.classList.add(field.state);
  }

  isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.height && y < this.width;
  }

  fieldEmptyCheck(x, y) {
    if (x >= 0 && y >= 0 && x < this.height && y < this.width) {
      const tile = this.collection[x][y];
      if (tile.checked === true) return;

      tile.checked = true;
      if (tile.state !== 'flagged') {
        Board.fieldStateChange(tile, 'clicked');
      }
      if (tile.value === 0 && tile.state !== 'flagged') {
        if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x - 1][y - 1], 'clicked');
        }
        if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x - 1][y], 'clicked');
        }
        if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x - 1][y + 1], 'clicked');
        }
        if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x][y - 1], 'clicked');
        }
        if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x][y + 1], 'clicked');
        }
        if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x + 1][y - 1], 'clicked');
        }
        if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x + 1][y], 'clicked');
        }
        if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state !== 'flagged') {
          Board.fieldStateChange(this.collection[x + 1][y + 1], 'clicked');
        }

        this.fieldEmptyCheck(x - 1, y - 1);
        this.fieldEmptyCheck(x - 1, y);
        this.fieldEmptyCheck(x - 1, y + 1);
        this.fieldEmptyCheck(x, y - 1);
        this.fieldEmptyCheck(x, y + 1);
        this.fieldEmptyCheck(x + 1, y - 1);
        this.fieldEmptyCheck(x + 1, y);
        this.fieldEmptyCheck(x + 1, y + 1);
      }
    }
  }

  revealAround(x, y) {
    const tile = this.collection[x][y];
    let flagCount = 0;
    if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state === 'flagged') {
      flagCount += 1;
    }
    if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state === 'flagged') {
      flagCount += 1;
    }
    if (tile.value === flagCount) {
      if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x - 1][y - 1], 'clicked');
        this.gameLost(this.collection[x - 1][y - 1]);
        this.fieldEmptyCheck(x - 1, y - 1);
      }
      if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x - 1][y], 'clicked');
        this.gameLost(this.collection[x - 1][y]);
        this.fieldEmptyCheck(x - 1, y);
      }
      if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x - 1][y + 1], 'clicked');
        this.gameLost(this.collection[x - 1][y + 1]);
        this.fieldEmptyCheck(x - 1, y + 1);
      }
      if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x][y - 1], 'clicked');
        this.gameLost(this.collection[x][y - 1]);
        this.fieldEmptyCheck(x, y - 1);
      }
      if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x][y + 1], 'clicked');
        this.gameLost(this.collection[x][y + 1]);
        this.fieldEmptyCheck(x, y + 1);
      }
      if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x + 1][y - 1], 'clicked');
        this.gameLost(this.collection[x + 1][y - 1]);
        this.fieldEmptyCheck(x + 1, y - 1);
      }
      if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x + 1][y], 'clicked');
        this.gameLost(this.collection[x + 1][y]);
        this.fieldEmptyCheck(x + 1, y);
      }
      if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state !== 'flagged') {
        Board.fieldStateChange(this.collection[x + 1][y + 1], 'clicked');
        this.gameLost(this.collection[x + 1][y + 1]);
        this.fieldEmptyCheck(x + 1, y + 1);
      }
    }
  }

  randomizeBombs() {
    let bombsToDraw = this.bombs;
    do {
      const bombPlaced = 9;
      const randomX = Math.floor(Math.random() * (this.height));
      const randomY = Math.floor(Math.random() * (this.width));
      const randomElement = this.collection[randomX][randomY];
      if (bombPlaced !== randomElement.value) {
        randomElement.value = 9;
        bombsToDraw -= 1;
      }
    }
    while (bombsToDraw > 0);
  }

  assignHints() {
    for (let x = 0; x < this.height; x += 1) {
      for (let y = 0; y < this.width; y += 1) {
        if (this.collection[x][y].value !== 9) {
          if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].value === 9) {
            this.collection[x][y].value += 1;
          }
          if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].value === 9) {
            this.collection[x][y].value += 1;
          }
        }
      }
    }
  }

  displayValues() {
    for (let x = 0; x < this.height; x += 1) {
      for (let y = 0; y < this.width; y += 1) {
        const viewButton = this.collection[x][y].view;
        viewButton.setAttribute('data-value', this.collection[x][y].value);
      }
    }
  }
}

export default Board;
