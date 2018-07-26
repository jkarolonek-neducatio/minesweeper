import Field from './field';
class Board {
  constructor(view, size, bombs) {
    this.view = view;
    this.size = size;
    this.bombs = bombs;
    this.state = 'initial';
    this.createBoard();
    this.randomizeBombs();
    this.assignHints();
    this.displayValues();
  }

  createBoard() {
    const collection = [];
    for (let i = 0; i < this.size; i++) {
      let collectionRow = [];
      for(let j = 0; j < this.size; j++) {
          let fieldContainer = document.createElement('BUTTON');
          let field = new Field(fieldContainer, 'unclicked', i, j);
          this.view.appendChild(field.view);
          collectionRow.push(field);
          field.view.classList.add(field.state);

          field.view.addEventListener('click', this.onClick)

          field.view.addEventListener('contextmenu', this.onContextMenu);
        }
      collection.push(collectionRow);
    }
    this.collection = collection;
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

  fieldEmptyCheck(x, y) {
    if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
      const tile = this.collection[x][y];
      if (tile.checked === true) return;

      tile.checked = true;
      if (tile.state !== 'flagged') {
        this.fieldStateChange(tile, 'clicked');
      }
      if (tile.value === 0 && tile.state !== 'flagged') {

        if (x - 1 >= 0 && y - 1 >= 0 && x - 1 < this.size && y - 1 < this.size && this.collection[x - 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y - 1], 'clicked');
        }
        if (x - 1 >= 0 && y >= 0 && x - 1 < this.size && y < this.size && this.collection[x - 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y], 'clicked');
        }
        if (x - 1 >= 0 && y + 1 >= 0 && x - 1 < this.size && y + 1 < this.size && this.collection[x - 1][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x - 1][y + 1], 'clicked');
        }
        if (x >= 0 && y - 1 >= 0 && x < this.size && y - 1 < this.size && this.collection[x][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y - 1], 'clicked');
        }
        if (x >= 0 && y + 1 >= 0 && x < this.size && y + 1 < this.size && this.collection[x][y + 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x][y + 1], 'clicked');
        }
        if (x + 1 >= 0 && y - 1 >= 0 && x + 1 < this.size && y - 1 < this.size && this.collection[x + 1][y - 1].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y - 1], 'clicked');
        }
        if (x + 1 >= 0 && y >= 0 && x + 1 < this.size && y < this.size && this.collection[x + 1][y].state !== 'flagged') {
          this.fieldStateChange(this.collection[x + 1][y], 'clicked');
        }
        if (x + 1 >= 0 && y + 1 >= 0 && x + 1 < this.size && y + 1 < this.size && this.collection[x + 1][y + 1].state !== 'flagged') {
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

  onClick = (event) => {
    const field = this.getField(event);
    this.fieldEmptyCheck(field.x, field.y);
    this.fieldStateChange(field, 'clicked');
    if (field.state === 'clicked' && field.value === 9) {
      this.state = 'lost';
      this.view.classList.add('game-lost');
    }

    let checked = 0;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const f = this.collection[x][y];
        if (f.state === 'clicked') {
          checked++;
        }
      }
    }
    console.log(this.collection);
    if (checked === (this.size * this.size) - this.bombs) {
      this.state = 'won';
      this.view.classList.add('game-won');
    }
    console.log(this.state);
  }

  onContextMenu = (event) => {
    const field = this.getField(event);
    event.preventDefault();
    
    if (field.state === 'unclicked') {
      this.fieldStateChange(field, 'flagged');
    } else if (field.state === 'flagged') {
      this.fieldStateChange(field, 'unclicked');
    }
    console.log(this.state)
    return false;
  }

  randomizeBombs() {
    let bombsToDraw = this.bombs;
    do {
      let bombPlaced = 9;
      let randomX = Math.floor(Math.random() * (this.size));
      let randomY = Math.floor(Math.random() * (this.size));
      let randomElement = this.collection[randomX][randomY];
      if (bombPlaced !== randomElement.value) {
        randomElement.value = 9;
        bombsToDraw--;
      }
    }
    while (bombsToDraw > 0);
  }
  assignHints() {
    for(let x = 0; x < this.size; x++) {
      for(let y = 0; y < this.size; y++) {
        if (this.collection[x][y].value === 9) {
          continue;
        }
        if (x - 1 >= 0 && y - 1 >= 0 && x - 1 < this.size && y - 1 < this.size && this.collection[x - 1][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (x - 1 >= 0 && y + 1 >= 0 && x - 1 < this.size && y + 1 < this.size && this.collection[x - 1][y + 1].value === 9) {
          this.collection[x][y].value++
        }
        if (x + 1 >= 0 && y + 1 >= 0 && x + 1 < this.size && y + 1 < this.size && this.collection[x + 1][y + 1].value === 9) {
          this.collection[x][y].value++
        }
        if (x + 1 >= 0 && y - 1 >= 0 && x + 1 < this.size && y - 1 < this.size && this.collection[x + 1][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (x - 1 >= 0 && y >= 0 && x - 1 < this.size && y < this.size && this.collection[x - 1][y].value === 9) {
          this.collection[x][y].value++
        }
        if (x >= 0 && y - 1 >= 0 && x < this.size && y - 1 < this.size && this.collection[x][y - 1].value === 9) {
          this.collection[x][y].value++
        }
        if (x + 1 >= 0 && y >= 0 && x + 1 < this.size && y < this.size && this.collection[x + 1][y].value === 9) {
          this.collection[x][y].value++
        }
        if (x >= 0 && y + 1 >= 0 && x < this.size && y + 1 < this.size && this.collection[x][y + 1].value === 9) {
          this.collection[x][y].value++
        }
      }
    }
    console.log(this.collection);
  }
  displayValues() {
    for(let x = 0; x < this.size; x++) {
      for(let y = 0; y < this.size; y++) {
        let viewButton = this.collection[x][y].view;
        viewButton.setAttribute('data-value', this.collection[x][y].value);
      }
    }
  }

}

export default Board;