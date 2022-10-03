class Menu {
  constructor(x, y, lar, alt, rad) {

    this.x = x;
    this.y = y;
    this.lar = lar;
    this.alt = alt;
    this.rad = rad;
  }

  showMenu() {
    let q = color("#2471A3");
    fill(q);
    rect(this.x, this.y, this.lar, this.alt, this.rad);

    let txtExplorar = createDiv("Explorar");
  txtExplorar.style(
    "width:100px;heigth:300px;border-radius:20px; color:#AED6F1;; font-size:16px; border:none; bold"
  );
  txtExplorar.position(width / 2 - 255, height / 2 + 140);

  let txtDados = createDiv("Lançar Dados");
  txtDados.style(
    "width:100px;heigth:300px;border-radius:20px; color:#AED6F1;; font-size:16px; border:none; bold"
  );
  txtDados.position(width / 2 + 190, height / 2 + 140);
  
  btnExplorer = createButton("Explorar");
  btnExplorer.style(
    "width:100px;heigth:300px;border-radius:20px; color:#2471A3; font-size:14px; border:none; bold"
  );
  btnExplorer.position(width / 2 - 275, height / 2 + 280);
  //btnExplorer.mouseOver(mouseOver);
  btnExplorer.mousePressed(explorer);

  txtArea = createElement("textarea");
  txtArea.style(
    'border-radius:10px;color:#2471A3, background:"rgb(213, 219, 216)"'
    );
    txtArea.position(width / 2 - 158, height / 2 + 140);
    txtArea.attribute("rows", "9");
    txtArea.attribute("cols", "40");
    txtArea.elt.placeholder += msg; // "Logs do Servidor";
    msg = "";
    
    btnRollDice = createButton("Lançar Dados");
    btnRollDice.style(
      "width:100px;heigth:350px;border-radius:20px; color:#2471A3; font-size:14px; border:none; bold"
      );
      btnRollDice.position(width / 2 + 190, height / 2 + 280);
      btnRollDice.mousePressed(rollDice);
      playElements = [txtExplorar, txtDados, btnExplorer, txtArea, btnRollDice];
    } 
  
    
  }