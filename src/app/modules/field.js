class Field {
  constructor(view, state, x, y, value = 0) {
    this.view = view;
    this.state = state;
    this.x = x;
    this.y = y;
    this.value = value;
    this.view.setAttribute('data-x', x);
    this.view.setAttribute('data-y', y);
    this.checked = false;
  }
}

export default Field;
