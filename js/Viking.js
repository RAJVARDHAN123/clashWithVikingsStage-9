class Viking extends BaseClass {
  constructor(x, y) {
    super(x, y, 90, 90);
    this.image = loadImage("../assets/viking.png");
    this.Visiblity = 255;
  }

  display() {
    if (this.body.speed < 3) {
      super.display();
    } else {
      World.remove(world, this.body);
      push();
      this.Visiblity = this.Visiblity - 5;
      tint(255, this.Visiblity);
      image(this.image, this.body.position.x, this.body.position.y, 50, 50);
      pop();
    }
  }

  score() {
    if (this.Visiblity < 0 && this.Visiblity > -1005) {
      score++;
    }
  }
}
