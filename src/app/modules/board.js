import Field from './field';
class Board {
  constructor(view, size) {
    this.view = view;
    this.size = size;
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
            let tempField = new Field(fieldContainer, 'unclicked', i, j);
            this.view.appendChild(tempField.view);
            collectionRow.push(tempField);
        }
        collection.push(collectionRow);
    }
    this.collection = collection;
  }
  randomizeBombs() {
    let bombsToDraw = 10;
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
        console.log(viewButton);
        viewButton.innerHTML = this.collection[x][y].value;
      }
    }
  }

}

export default Board;