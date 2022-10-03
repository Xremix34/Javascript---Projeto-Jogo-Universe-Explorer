class Tile {

  constructor(x, y, lar, alt, img) {

    this.x = x;
    this.y = y;
    this.lar = lar;
    this.alt = alt;
    this.img = img;
  }

  showTiles() {
    //noStroke();
    let q = color(65,74,76);
    fill(q);
    //rect(this.x, this.y, this.lar, this.alt, this.id);
    image(this.img, this.x, this.y, this.lar, this.alt);   
  }
}
