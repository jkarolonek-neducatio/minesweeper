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
      if (this.firstClick === false) {
          this.firstClick = true;
          do {
              for (let x = 0; x < this.height; x++) {
                  for (let y = 0; y < this.width; y++) {
                      this.collection[x][y].value = 0;
                  }
              }
              this.randomizeBombs();
              this.assignHints();
              this.displayValues();
          } while (field.value === 9);
      }
      this.fieldEmptyCheck(field.x, field.y);
      this.fieldStateChange(field, 'clicked');
      this.gameLost(field);
      this.gameWon();
  }

  onContextMenu = (event) => {
    const field = this.getField(event);
    event.preventDefault();

    if (field.state === 'unclicked') {
        this.fieldStateChange(field, 'flagged');
    } else if (field.state === 'flagged') {
        this.fieldStateChange(field, 'unclicked');
    }
    console.log(this.state);
    return false;
  }

  onDoubleClick = (event) => {
    const field = this.getField(event);
    this.revealAround(field.x, field.y);
    this.gameWon();
  }

  createBoard() {
    const collection = [];
    for (let i = 0; i < this.height; i++) {
      let collectionRow = [];
      for(let j = 0; j < this.width; j++) {
          let fieldContainer = document.createElement('BUTTON');
          let field = new Field(fieldContainer, 'unclicked', i, j);
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
      for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
              const {view} = this.collection[i][j];
              view.removeEventListener('click', this.onClick);

              view.removeEventListener('contextmenu', this.onContextMenu);

              view.removeEventListener('dblclick', this.onDoubleClick);
              this.view.removeChild(this.collection[i][j].view);
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

      for (let x = 0; x < this.height; x++) {
          for (let y = 0; y < this.width; y++) {
              const f = this.collection[x][y];
              if (f.state === 'clicked') {
                  checked++;
              }
          }
      }
      console.log(this.collection);
      if (checked === this.width * this.height - this.bombs) {
          this.state = 'won';
          this.view.classList.add('game-won');
      }
  }

  getField(event) {
    const tile = event.target;
    const tileX = parseInt(tile.getAttribute('data-x'));
    const tileY = parseInt(tile.getAttribute('data-y'));
    return this.collection[tileX][tileY];
  }

  fieldStateChange(field, state) {
    field.view.classList.remove(field.state);
    field.state = state;
    field.view.classList.add(field.state);
  }

  isInBounds(x,y) {
    return x >= 0 && y >= 0 && x < this.height && y < this.width;
  }

  fieldEmptyCheck(x, y) {
    if (x >= 0 && y >= 0 && x < this.height && y < this.width) {
      const tile = this.collection[x][y];
      if (tile.checked === true) return;

      tile.checked = true;
      if (tile.state !== 'flagged') {
        this.fieldStateChange(tile, 'clicked');
      }
      if (tile.value === 0 && tile.state !== 'flagged') {

        if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y - 1], 'clicked');
        }
        if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y], 'clicked');
        }
        if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y + 1], 'clicked');
        }
        if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y - 1], 'clicked');
        }
        if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y + 1], 'clicked');
        }
        if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y - 1], 'clicked');
        }
        if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y], 'clicked');
        }
        if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y + 1], 'clicked');
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
        flagCount++;
    }
    if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state === 'flagged') {
        flagCount++;
    }
    if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state === 'flagged') {
        flagCount++;
    }
    if (tile.value === flagCount) {
      if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y - 1], 'clicked');
          this.gameLost(this.collection[x - 1][y - 1]);
          this.fieldEmptyCheck(x - 1, y - 1);
      }
      if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y], 'clicked');
          this.gameLost(this.collection[x - 1][y]);
          this.fieldEmptyCheck(x - 1, y);
      }
      if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y + 1], 'clicked');
          this.gameLost(this.collection[x - 1][y + 1]);
          this.fieldEmptyCheck(x - 1, y + 1);
      }
      if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y - 1], 'clicked');
          this.gameLost(this.collection[x][y - 1]);
          this.fieldEmptyCheck(x, y - 1);
      }
      if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y + 1], 'clicked');
          this.gameLost(this.collection[x][y + 1]);
          this.fieldEmptyCheck(x, y + 1);
      }
      if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y - 1], 'clicked');
          this.gameLost(this.collection[x + 1][y - 1]);
          this.fieldEmptyCheck(x + 1, y - 1);
      }
      if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y], 'clicked');
          this.gameLost(this.collection[x + 1][y]);
          this.fieldEmptyCheck(x + 1, y);
      }
      if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y + 1], 'clicked');
          this.gameLost(this.collection[x + 1][y + 1]);
          this.fieldEmptyCheck(x + 1, y + 1);
      }
    }
  }

  randomizeBombs() {
    let bombsToDraw = this.bombs;
    do {
      let bombPlaced = 9;
      let randomX = Math.floor(Math.random() * (this.height));
      let randomY = Math.floor(Math.random() * (this.width));
      let randomElement = this.collection[randomX][randomY];
      if (bombPlaced !== randomElement.value) {
        randomElement.value = 9;
        bombsToDraw--;
      }
    }
    while (bombsToDraw > 0);
  }

  assignHints() {
    for(let x = 0; x < this.height; x++) {
      for(let y = 0; y < this.width; y++) {
        if (this.collection[x][y].value === 9) {
          continue;
        }
        if (this.isInBounds(x - 1, y - 1) && this.collection[x - 1][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x - 1, y) && this.collection[x - 1][y].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x - 1, y + 1) && this.collection[x - 1][y + 1].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x, y - 1) && this.collection[x][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x, y + 1) && this.collection[x][y + 1].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x + 1, y - 1) && this.collection[x + 1][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x + 1, y) && this.collection[x + 1][y].value === 9) {
          this.collection[x][y].value++
        }
        if (this.isInBounds(x + 1, y + 1) && this.collection[x + 1][y + 1].value === 9) {
          this.collection[x][y].value++
        }
      }
    }
    console.log(this.collection);
  }

  displayValues() {
    for(let x = 0; x < this.height; x++) {
      for(let y = 0; y < this.width; y++) {
        let viewButton = this.collection[x][y].view;
        viewButton.setAttribute('data-value', this.collection[x][y].value);
      }
    }
  }

}

export default Board;