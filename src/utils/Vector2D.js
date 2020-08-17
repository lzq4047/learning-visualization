export default class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v1) {
    this.x = this.x + v1.x;
    this.y = this.y + v1.y;
    return this;
  }

  rotate(rad) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const { x, y } = this;
    this.x = x * c + y * -s;
    this.y = x * s + y * c;
    return this;
  }

  scale(length) {
    this.x = length * this.x;
    this.y = length * this.y;
    return this;
  }
}