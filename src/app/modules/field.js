class Field {
  constructor(view, state, x, y, value = 0) {
    this.view = view;
    this.state = state;
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

export default Field;