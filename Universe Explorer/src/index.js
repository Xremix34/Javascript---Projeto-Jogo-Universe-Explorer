let Players = [],
  Game;
let socket;
let board, cards;
let cardsImg = [];
let icons = [];
let boardImg, backImg, logo;
let playerGamming = 0;
let exploradas = {};
let imgBoard;
let haveAsPlayer = false;
let hidemenu = true;
//carrega as imagens dos tiles
let imgIDup = [];
let imgIDleft = [];
let imgIDdown = [];
let imgIDright = [];

//guarda o id das variaveis de cada tile
let tileRowUp = [];
let tileColLeft = [];
let tileRowDown = [];
let tileColRight = [];

//carregar imagens do menu Control
let imgDice;
let imgExplorer;

//cria o menu
let menuCont_width_x = 600;
let menuCont_heigth_y = 210;
let menuCont_position_x = 150;
let menuCont_position_y = 550;
let cont = 0;

//variavéis do Botão Explorer
let btnExplorer;
let btnFinishTurn;
let btnRollDice;

//varialvel de mensagens no textarea
var msg = "Lance os dados para começar.\n";
let saveMessages = [];

//variavéis do TextArea e do texto do menu Controller
let txtArea;
let txtExplorar;
let txtDados;
let points = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};
//conta o numero de cartas do baralho disponivéis
let countDeck = 0;
let deck = [
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  7,
  8,
  9,
  0,
  11,
  0,
  13,
  0,
  0,
  16,
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  25,
  0,
  0,
  0,
  29,
  0,
  31,
  32,
  0,
  0,
  0,
  36,
  37,
  38,
  0,
  0,
];
let totalOfCardsInDeck = 21;

let deckcards = [
  "terra",
  "meteoros1",
  "lua",
  "estrelacadente1",
  "satelite1",
  "meteoro1",
  "et1",
  "marte",
  "estacaoespacial1",
  "jupiter",
  "observatorio1", //10 possiçoes
  "saturno",
  "meteoros2",
  "urano",
  "buraconegro1",
  "ovni1",
  "asteroide1",
  "neptuno",
  "cometa1",
  "satelite2",
  "observatorio2", //10 posiçoes
  "et2",
  "buraconegro2",
  "estrelacadente2",
  "nebulosa",
  "estacaoespacial2",
  "satelite3",
  "ovni2",
  "meteoro2",
  "vialactea",
  "observatorio3", //10posiçoes
  "plutao",
  "sol",
  "cometa3",
  "buraconegro4",
  "satelite4",
  "mercurio",
  "asteroide2",
  "venus",
  "meteoros3",
];

colorPlayers = ["yellow", "#69E781", "blue", "red"];

//contador dos players criados
let playersInGame = 0;

//Array com os preços de compra dos planetas
let explorar = [
  0,
  0,
  25,
  0,
  0,
  0,
  0,
  50,
  150,
  100,
  0,
  150,
  0,
  200,
  0,
  0,
  120,
  250,
  0,
  0,
  0,
  0,
  0,
  0,
  300,
  150,
  0,
  150,
  0,
  350,
  0,
  500,
  450,
  0,
  0,
  0,
  280,
  120,
  200,
  0,
  0,
];

//Array de planetas para alugar a outros jogadores
let aluguer = [
  0,
  0,
  10,
  0,
  0,
  0,
  0,
  50,
  75,
  75,
  50,
  75,
  0,
  100,
  0,
  0,
  60,
  125,
  0,
  0,
  0,
  0,
  0,
  0,
  150,
  75,
  0,
  75,
  0,
  400,
  0,
  0,
  0,
  0,
  0,
  0,
  140,
  60,
  100,
  0,
  0,
];

//Retira cristais ao jogador se calhar em algumas posiçoes
let conseq = [
  0,
  -50,
  0,
  +80,
  +100,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -50,
  0,
  0,
  -100,
  0,
  0,
  -200,
  +100,
  0,
  0,
  0,
  +80,
  0,
  0,
  +100,
  -100,
  0,
  0,
  0,
  0,
  0,
  -200,
  0,
  +100,
  0,
  0,
  0,
  -50,
  0,
];

//variavél que guarda os icones dos players com o sprite
let sPlayersIcon;

//variavél para receber o valor para parar o jogo
let stopBtn;

//Variaveis para guardar os valores dos inputs e tambem que criam as cores dos jogadores na pagina principal
let p1Input,
  p2Input,
  p3Input,
  p4Input,
  startBtn,
  colorChoise,
  colorsbtn1,
  colorsbtn2,
  colorsbtn3,
  colorsbtn4;

//Variavel que guarda o valor do botao
let newGameBtn;

//Variaveis que ocultam ou mostram o conteudo do jogo
let startElements;
let playElements;
let stopElements;

//Constantes que definem o estado do jogo
const GAME_START = "start";
const GAME_PLAY = "play";
const GAME_STOP = "stop";
let mode = GAME_START;

//arrays que guardam as informaçoes dos jogadores
let player1 = [];
let player2 = [];
let player3 = [];
let player4 = [];

let count = 0;
let possibleToExplorer = true;
let startimer = false;

let saveColorHouse = [];

//variaveis para ajustar a posição do deck de cartas
let pos_cards_x = 0;
let pos_cards_y = 0;

//Variavel de ajuste de tempo do temporizador
let timer = 30;
let timerHours = 30;

let playersHTML = ["p1Input", "p2Input", "p3Input", "p4Input"];

//Variavéis de inicialização da rotaçao daa imagens players
let pos_r_x = 0;
let pos_r_y = 0;
let angle = 0;
let rotation = 0;

//Variavéis das imagens dos players
let img_p = 0;
let pos_p_x = 0;
let pos_p_y = 0;
let w_p_x = 0;
let h_p_x = 0;

let textPlayerWin;
let boardOthersPlayers;

let createbox;

let imgStart;

//let imgsDice = ["dice1", "dice2", "dice3", "dice4", "dice5", "dice6"];
let imgsDice = [];
let iconsDice = [];
let imgCristal;
//let imgDiceX;
//let imgDiceY;

var messageAlert;
let message, pos_m_x, pos_m_y;

let timerH = 3600;

let iconsMovePlayer1 = [];

let imgEmpate;

let sound;

function loadImgBoard() {
  for (let i = 0; i < 11; i++) {
    imgIDup[i] = loadImage("./assets/images/idcards/rowup/" + (i + 1) + ".png");
    //}
    //for (let i = 0; i < 11; i++) {
    imgIDleft[i] = loadImage(
      "./assets/images/idcards/colleft/" + (i + 1) + ".png"
    );
    //}
    //for (let i = 0; i < 11; i++) {
    imgIDdown[i] = loadImage(
      "./assets/images/idcards/rowdown/" + (i + 1) + ".png"
    );
    //}
    //for (let i = 0; i < 11; i++) {
    imgIDright[i] = loadImage(
      "./assets/images/idcards/colright/" + (i + 1) + ".png"
    );
  }
}

//Carrega as imagens
function preload() {
  loadImgBoard();

  for (let i = 0; i < 4; i++) {
    const path = "./assets/images/icon_" + (i + 1) + ".png";
    icons.push(loadImage(path));
  }

  for (let i = 0; i < deckcards.length; i++) {
    const path = "./assets/images/deck/" + deckcards[i] + ".png";
    cardsImg.push(loadImage(path));
  }

  for (let i = 0; i < 6; i++) {
    iconsDice[i] = loadImage("./assets/images/iconsdice/" + (i + 1) + ".png");
  }

  for (let i = 0; i < 4; i++) {
    iconsMovePlayer1[i] = loadImage(
      "./assets/images/iconsplayers/" + (i + 1) + ".png"
    );
  }

  imgStart = loadImage("./assets/images/backgroundStart.png");
  //imgWinner = loadImage("./assets/images/winner.png");
  imgBoard = loadImage("./assets/images/board.png");
  imgLogo = loadImage("./assets/images/logo.png");
  imgP1 = loadImage("./assets/images/nave1.png");
  imgP2 = loadImage("./assets/images/nave2.png");
  imgP3 = loadImage("./assets/images/nave3.png");
  imgP4 = loadImage("./assets/images/nave4.png");
  //imgCristal = loadImage("./assets/images/cristal.png");
  imgDice = loadImage("./assets/images/dados.png");
  imgExplorer = loadImage("./assets/images/explorar.png");
  backImg = loadImage("./assets/images/back.png");
}

//Carrega todos os elementos do jogo
function setup() {
  //Create game screen
  createCanvas(900, 900);
  startGame();
}

//desenha o jogo
function draw() {
  if (mode === GAME_PLAY) {
    playGame();
  }

  if (mode === GAME_STOP) {
    stopGame();
  }
}


//pagina para inserir os jogadores
function pageStartOfGame() {
  background("#2471A3");
  image(
    imgStart,
    width / 2 - 450,
    height / 2 - 350,
    width / 2 - 450,
    height / 2 + 350
  );
  fill(213, 219, 216);
  noStroke();
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = -1;
  drawingContext.shadowBlur = 2;
  drawingContext.shadowColor = "black";
  rect(0, 0, width / 2 + 450, height / 2 - 345, 0, 0, 360, 360); //define a box da imagem logo
  image(imgLogo, 0, width / 2 - 435, width / 2 + 415, height / 2 - 315);

  p1 = createElement("p", "JOGADOR 1");
  p1.style("color: #AED6F1; font-size: 14px; font-weight:bold");
  p1.position(width / 2 - 320, height / 2 - 325);

  fill(213, 219, 216);
  noStroke();
  rect(55, 170, width / 2 - 265, height / 2 - 290, 5);
  p1Input = createInput("").attribute("placeholder", "Inserir nome");
  p1Input.style("border-radius:5px; border:none");
  p1Input.position(width / 2 - 377, height / 2 - 260);
  image(imgP1, width / 2 - 360, height / 2 - 235, 100, 100);

  p2 = createElement("p", "JOGADOR 2");
  p2.style("color: #AED6F1; font-size: 14px; font-weight:bold");
  p2.position(width / 2 - 125, height / 2 - 325);
  fill(213, 219, 216);
  noStroke();
  rect(252, 170, width / 2 - 265, height / 2 - 290, 5);
  p2Input = createInput("").attribute("placeholder", "Inserir nome");
  p2Input.style("border-radius:5px; border:none");
  p2Input.position(width / 2 - 181, height / 2 - 260);
  image(imgP2, width / 2 - 160, height / 2 - 235, 100, 100);

  p3 = createElement("p", "JOGADOR 3");
  p3.style("color: #AED6F1; font-size: 14px; font-weight:bold");
  p3.position(width / 2 + 73, height / 2 - 325);
  fill(213, 219, 216);
  noStroke();
  rect(452, 170, width / 2 - 265, height / 2 - 290, 5);
  p3Input = createInput("").attribute("placeholder", "Inserir nome");
  p3Input.style("border-radius:5px; border:none");
  p3Input.position(width / 2 + 20, height / 2 - 260);
  image(imgP3, width / 2 + 40, height / 2 - 235, 100, 100);

  p4 = createElement("p", "JOGADOR 4");
  p4.style("color: #AED6F1; font-size: 14px; font-weight:bold");
  p4.position(width / 2 + 270, height / 2 - 325);
  fill(213, 219, 216);
  noStroke();
  rect(650, 170, width / 2 - 265, height / 2 - 290, 5);
  p4Input = createInput("").attribute("placeholder", "Inserir nome");
  p4Input.style("border-radius:5px; border:none");
  p4Input.position(width / 2 + 216.5, height / 2 - 260);
  image(imgP4, width / 2 + 230, height / 2 - 235, 110, 110);

  colorsbtn1 = createButton("");
  colorsbtn1.style(
    "width:30px;height:30px;border-radius:4px;background-color:yellow; border:none"
  );
  colorsbtn1.position(width / 2 - 250, height / 2 - 160);

  colorsbtn2 = createButton("");
  colorsbtn2.style(
    "width:30px;height:30px;border-radius:4px;background-color:#69E781; border:none"
  );
  colorsbtn2.position(width / 2 - 53, height / 2 - 160);

  colorsbtn3 = createButton("");
  colorsbtn3.style(
    "width:30px;height:30px;border-radius:4px;background-color:blue; border:none"
  );
  colorsbtn3.position(width / 2 + 147, height / 2 - 160);

  colorsbtn4 = createButton("");
  colorsbtn4.style(
    "width:30px;height:30px;border-radius:4px;background-color:red; border:none"
  );
  colorsbtn4.position(width / 2 + 346, height / 2 - 160);

  startBtn = createButton("Jogar");
  noStroke();
  startBtn.style(
    "width:100px;heigth:300px;border-radius:20px; color:#2471A3; font-size:25px; border:none"
  );

  startBtn.position(width / 2 - 50, height / 2 - 50);
  startBtn.mousePressed(clickStart);
}

//Inicia o jogo
function startGame() {
  //Reset
  //exploradas = {};
  for (let index = 0; index < Players.length; index++) {
    console.log(Players[index].cristals, "cristals")
    Players[index].cristals=1000;
    console.log(Players[index].name, "nome")
    Players[index].name = "";
    console.log( Players[index].exploradas, "exploradas")
  }
  exploradas.length = 0;
  //Players[playerGamming].cristals = {};
  //Players[playerGamming].name = {};
  //timer = 30;
  //countDeck = 21;
  //msg = "";
  //saveMessages = [];
  cards = [];
  sPlayersIcon = [];
  timeleft = timerH;
  finishedGame = false;
  pos_cards_x = width / 2 - 140;
  pos_cards_y = height / 2 - 300;
  
  pageStartOfGame();

  //Create game
  createSprits();
  createGame();
  createPlayers();

  //Hide game screen
  if (playElements) {
    playElements.forEach((p) => {
      p.hide();
    });
  }

  //Hide final screen
  if (stopElements) {
    stopElements.forEach((st) => {
      st.hide();
    });
  }

  startElements = [
    //rules,
    p1,
    p1Input,
    p2,
    p2Input,
    p3,
    p3Input,
    p4,
    p4Input,
    //colorChoise,
    colorsbtn1,
    colorsbtn2,
    colorsbtn3,
    colorsbtn4,
    startBtn,
  ];
}

//Cria o tabuleiro
function createBoard() {
  const n = 11;
  const m = 11;
  let height_y = height / m;
  let width_x = width / n;

  for (let i = 0; i < n; i++) {
    let posX = map(i, 0, n, 0, width);

    tileRowUp[i] = new Tile(posX, 0, width_x, height_y, imgIDup[i]);
    tileRowUp[i].showTiles();

    tileRowDown[i] = new Tile(
      posX,
      height - width_x,
      height_y,
      width_x,
      imgIDdown[i]
    );
    tileRowDown[i].showTiles();
  }
  for (let i = 0; i < m; i++) {
    let posY = map(i, 0, m, 0, height);
    let posY2 = map(i, 0, m, height, 0);

    tileColLeft[i] = new Tile(0, posY, width_x, height_y, imgIDleft[i]);
    tileColLeft[i].showTiles();

    tileColRight[i] = new Tile(
      width - width_x,
      posY2,
      height_y,
      height_y,
      imgIDright[i]
    );
    tileColRight[i].showTiles();
  }
  createMenuControl();
}

//Cria o menu control
function createMenuControl() {
  var menu_control = new Menu(
    menuCont_position_x,
    menuCont_position_y,
    menuCont_width_x,
    menuCont_heigth_y,
    10
  );

  menu_control.showMenu();
}

function keyPressed() {
  if (keyCode === ENTER) {
    clickStart();
  }
}
//function mouseOver(){
//  btnExplorer.style(" color:red;");
//}

//Lança os dados
function rollDice() {
  //debugger;
  if (haveAsPlayer) {
    messagesAlerts(Players[playerGamming].name.bold() +
        " - você já lançou os dados."
    );
    msg += Players[playerGamming].name + " você já lançou os dados.";
    saveMessages.push(msg);
    return true;
  }
  haveAsPlayer = true;
  count = 0;
  clearBoard();
  let dice;
  let x = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  let y = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  image(imgExplorer, width / 2 - 275, height / 2 + 180, 90, 90);
  image(iconsDice[x - 1], width / 2 + 185, height / 2 + 185, 45, 45);
  image(iconsDice[y - 1], width / 2 + 235, height / 2 + 185, 45, 45);

  dice = x + y;

  possibleToExplorer = true;
  startimer = true;

  //dice = 6;
  points[playerGamming] += dice;
  logsMsgRollDice(dice);
  verifyTilesBoard(dice);
}

//Compra o planeta
function explorer() {
  // ajustar para o player seguinte nao comprar casa
  let playerInMoveNow = playerGamming;
  if (count >= 1 && !possibleToExplorer) {
    messagesAlerts(
        Players[playerInMoveNow].name.bold() +
        " - só pode comprar uma vez por turno!."
    );
    msg += Players[playerInMoveNow].name + "Só pode comprar uma vez por turno!. \n";
    saveMessages.push("msg");
  } else {
    if (exploradas[points[playerGamming]]) {
      messagesAlerts(
          Players[playerGamming].name.bold()+
          " - este planeta já foi comprado."
      );
      msg += Players[playerInMoveNow].name + "este planeta já foi comprado. \n";
    } else {
      if (Players[playerInMoveNow].cristals < 0) {
        msg += Players[playerInMoveNow].name + " perdeu o Jogo";
        saveMessages.push(msg);
      } else {
        if (
          Players[playerInMoveNow].cristals >= explorar[points[playerInMoveNow]]
        ) {
          possibleToExplorer = false;
          verifyDeckCardsToPay();
        } else {
          msg +=
            Players[playerInMoveNow].name +
            " os seus cristais são insuficioentes. \n";
          saveMessages.push(msg);
        }
      }
    }
    count++;
  }
  txtArea.elt.placeholder = msg;
}

function verifyDeckCardsToPay() {
  console.log(exploradas);
  let player = playerGamming;
  if (
    !exploradas[points[playerGamming - 1]] &&
    countDeck < totalOfCardsInDeck - 1
  ) {
    document.getElementById("idDeckcards").innerHTML =
      totalOfCardsInDeck - 1 - countDeck;
    console.log(points);
    console.log(player);
    document.getElementById("circulo" + points[player]).style.background =
      "#AED6F1";
    console.log(Players);
    Players[player].cristals =
      Players[player].cristals - explorar[points[player]];
    document.getElementById("cristals" + (player + 1)).innerHTML =
      Players[player].cristals;

    var img = document.createElement("img");
    img.src = getIdImage(points[player]);
    img.height = 28;
    img.width = 28;
    var src = document.getElementById("compradas" + (player + 1));
    src.appendChild(img);
    //document.getElementById("compradas0").innerHTML =
    //debugger
    //document.getElementById("cristals" + (player)).innerHTML = 0;
    // colorPlayers(sPlayersIcon[points[(player)]].position.x + 10, sPlayersIcon[points[(player)]].position.y + 80,10,255,255,0)
    exploradas[points[player]] = player;
    messagesAlerts(
        Players[playerGamming].name.bold() +
        " - comprou " +
        " o planeta " +
        deckcards[points[player]]
    );
    msg +=
      Players[player].name +
      " comprou " +
      " o planeta " +
      deckcards[points[player]];
    saveMessages.push(msg);
    countDeck++;
    
  document.getElementById("idDeckcards").innerHTML = totalOfCardsInDeck - countDeck -1;
    cont++;
    setTimeout(function () {
      finishTurn();
    }, 3000);
  }
}

function getIdImage(image) {
  alert(image);
  switch (image) {
    case 2:
      return "./../assets/images/iconsplanets/icon_1.png";
    case 7:
      return "./../assets/images/iconsplanets/icon_2.png";
    case 8:
      return "./../assets/images/iconsplanets/icon_3.png";
    case 9:
      return "./../assets/images/iconsplanets/icon_4.png";
    case 11:
      return "./../assets/images/iconsplanets/icon_5.png";
    case 13:
      return "./../assets/images/iconsplanets/icon_6.png";
    case 16:
      return "./../assets/images/iconsplanets/icon_7.png";
    case 17:
      return "./../assets/images/iconsplanets/icon_8.png";
    case 24:
      return "./../assets/images/iconsplanets/icon_9.png";
    case 25:
      return "./../assets/images/iconsplanets/icon_10.png";
    case 29:
      return "./../assets/images/iconsplanets/icon_11.png";
    case 31:
      return "./../assets/images/iconsplanets/icon_12.png";
    case 32:
      return "./../assets/images/iconsplanets/icon_13.png";
    case 36:
      return "./../assets/images/iconsplanets/icon_14.png";
    case 37:
      return "./../assets/images/iconsplanets/icon_15.png";
    case 38:
      return "./../assets/images/iconsplanets/icon_16.png";
    default:
      break;
  }
}

function payforAluguer() {
  if (
    exploradas[points[playerGamming]] ||
    exploradas[points[playerGamming]] == 0
  ) {
    messagesAlerts(
        Players[playerGamming].name.bold() +
        " - pagou " +
        aluguer[points[playerGamming]] +
        " para " +
        Players[exploradas[points[playerGamming]]].name +
        " na casa " +
        deckcards[points[playerGamming]]
    );
    //dar ao jogador que tem a casa
    Players[exploradas[points[playerGamming]]].cristals =
      Players[exploradas[points[playerGamming]]].cristals +
      aluguer[points[playerGamming]];

    //tira ao que foi para a casa
    Players[playerGamming].cristals =
      Players[playerGamming].cristals - aluguer[points[playerGamming]];

    document.getElementById("cristals" + (playerGamming + 1)).innerHTML =
      Players[playerGamming].cristals;
  }
  txtArea.elt.placeholder = msg;
}

//Dá ou retira cristais consoante a carta
function giveAndTakeCristals() {
  if (conseq[points[playerGamming]] > 0) {
    Players[playerGamming].cristals =
      Players[playerGamming].cristals + conseq[points[playerGamming]];
    messagesAlerts(
        Players[playerGamming].name.bold() +
        "- você recebeu " +
        conseq[points[playerGamming]] +
        " ao ficar na casa " +
        deckcards[points[playerGamming]] + "."
    );

    msg +=
      Players[playerGamming].name +
      "- você recebeu " +
      conseq[points[playerGamming]] +
      " ao ficar na casa " +
      deckcards[points[playerGamming]] + ".";

    setTimeout(function () {
      finishTurn();
    }, 3000);
  } else if (conseq[points[playerGamming]] < 0) {
    Players[playerGamming].cristals =
      Players[playerGamming].cristals + conseq[points[playerGamming]];
    messagesAlerts(
        Players[playerGamming].name.bold() +
        "- sofreu uma penalização de " +
        conseq[points[playerGamming]] +
        " ao ficar na casa " +
        deckcards[points[playerGamming]] + "."
    );
    msg +=
      Players[playerGamming].name +
      "- sofreu uma penalização de " +
      conseq[points[playerGamming]] +
      " ao ficar na casa " +
      deckcards[points[playerGamming]] + ".";
    setTimeout(function () {
      finishTurn();
    }, 3000);
  }

  createElementsDOMMenuPlayer();
}

function giveCristalsInStart() {
  Players[playerGamming].cristals = Players[playerGamming].cristals + 250;
  messagesAlerts(
      Players[playerGamming].name.bold() +
      "- recebeu " +
      " 250 cristais ao passar no planeta terra."
  );
  msg +=
    Players[playerGamming].name +
    "- recebeu " +
    " 250 cristais ao passar no planeta terra. \n";
  saveMessages.push(msg);
  setTimeout(function () {
    finishTurn();
  }, 3000);
  createElementsDOMMenuPlayer();
}

//move aleatoriamente a nave para outro buraco negro
function movePlayersInMeteoro() {
  if (
    sPlayersIcon[playerGamming].position.x == 450 &&
    sPlayersIcon[playerGamming].position.y === 850
  ) {
    sPlayersIcon[playerGamming].position.x = 690;
    sPlayersIcon[playerGamming].position.y = 850;
    image(
      cardsImg[points[playerGamming] - 3],
      pos_cards_x,
      pos_cards_y,
      250,
      350
    );
    points[playerGamming] = points[playerGamming] - 3;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- andou para trás 3 casas."
      );
    }, 3000);
    msg += Players[playerGamming].name + "- andou para trás 3 casas. \n";
    saveMessages.push(msg);
    setTimeout(function () {
      finishTurn();
    }, 4500);
  } else {
    sPlayersIcon[playerGamming].position.x = 450;
    sPlayersIcon[playerGamming].position.y = 50;
    image(
      cardsImg[points[playerGamming] - 3],
      pos_cards_x,
      pos_cards_y,
      250,
      350
    );
    points[playerGamming] = points[playerGamming] - 3;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- andou para trás 3 casas."
      );
    }, 3000);
    msg += Players[playerGamming].name + "- andou para trás 3 casas. \n";
    saveMessages.push(msg);
    setTimeout(function () {
      finishTurn();
    }, 4500);
  }
  txtArea.elt.placeholder = msg;
}

function movePlayersInEt() {
  if (
    sPlayersIcon[playerGamming].position.x == 370 &&
    sPlayersIcon[playerGamming].position.y === 850
  ) {
    sPlayersIcon[playerGamming].position.x = 50;
    sPlayersIcon[playerGamming].position.y = 850;
    image(
      cardsImg[points[playerGamming] + 4],
      pos_cards_x,
      pos_cards_y,
      250,
      350
    );
    points[playerGamming] = points[playerGamming] + 4;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- andou para frente 4 casas."
      );
    }, 3000);

    msg += Players[playerGamming].name + "- andou para frente 4 casas. \n";
    saveMessages.push(msg);

    setTimeout(function () {
      finishTurn();
    }, 4500);
  } else {
    sPlayersIcon[playerGamming].position.x = 450;
    sPlayersIcon[playerGamming].position.y = 50;
    image(
      cardsImg[points[playerGamming] + 4],
      pos_cards_x,
      pos_cards_y,
      250,
      350
    );
    points[playerGamming] = points[playerGamming] + 4;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- andou para frente 4 casas."
      );
    }, 3000);

    msg += Players[playerGamming].name + "- andou para frente 4 casas. \n";
    saveMessages.push(msg);

    setTimeout(function () {
      finishTurn();
    }, 4500);
  }
  if (
    sPlayersIcon[playerGamming].position.x == 50 &&
    sPlayersIcon[playerGamming].position.y == 850
  ) {
    sPlayersIcon[playerGamming].rotation += 90;
  }
  txtArea.elt.placeholder = msg;
}

//move para outro buraco negro
function movePlayersInHole() {
  if (
    sPlayersIcon[playerGamming].position.y === 530 &&
    sPlayersIcon[playerGamming].position.x === 50
  ) {
    sPlayersIcon[playerGamming].position.x = 210;
    sPlayersIcon[playerGamming].position.y = 50;
    points[playerGamming] = 22;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- foi teleportado para outro Buraco Negro."
      );
    }, 3000);

    msg +=
      Players[playerGamming].name +
      "- foi teleportado para outro Buraco Negro. \n";
    saveMessages.push(msg);
    setTimeout(function () {
      finishTurn();
    }, 4500);
  } else if (
    sPlayersIcon[playerGamming].position.y === 50 &&
    sPlayersIcon[playerGamming].position.x === 210
  ) {
    sPlayersIcon[playerGamming].position.x = 850;
    sPlayersIcon[playerGamming].position.y = 370;
    points[playerGamming] = 34;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- foi teleportado para outro Buraco Negro."
      );
    }, 3000);

    msg +=
      Players[playerGamming].name +
      "- foi teleportado para outro Buraco Negro. \n";
    saveMessages.push(msg);
    setTimeout(function () {
      finishTurn();
    }, 4500);
  } else {
    sPlayersIcon[playerGamming].position.x = 50;
    sPlayersIcon[playerGamming].position.y = 530;
    points[playerGamming] = 14;
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- foi teleportado para outro Buraco Negro."
      );
    }, 3000);

    msg +=
      Players[playerGamming].name +
      "- foi teleportado para outro Buraco Negro. \n";
    saveMessages.push(msg);
    setTimeout(function () {
      finishTurn();
    }, 4500);
  }
  if (
    sPlayersIcon[playerGamming].position.x == 50 &&
    sPlayersIcon[playerGamming].position.y == 530
  ) {
    sPlayersIcon[playerGamming].rotation += 180;
  } else if (
    (sPlayersIcon[playerGamming].position.x == 210 &&
      sPlayersIcon[playerGamming].position.y == 50) ||
    (sPlayersIcon[playerGamming].position.x == 850 &&
      sPlayersIcon[playerGamming].position.y == 370)
  ) {
    sPlayersIcon[playerGamming].rotation += +90;
  }
  txtArea.elt.placeholder = msg;
}

//inicia o jogo
function playGame() {
  if (startElements) {
    startElements.forEach((st) => {
      st.hide();
    });
  }

  //Hide final screen
  if (stopElements) {
    stopElements.forEach((sp) => {
      sp.hide();
    });
  }

  //Show game screen
  if (playElements) {
    playElements.forEach((p) => {
      p.show();
    });
  }

  countdownTimer();
  drawSprites();

  if (currentTime == timeleft) {
    mode = GAME_STOP;
    createElementsDOMMenuPlayer();
    createLeaderBoard();

  }
}

//Para o jogo
function stopGame() {
  //Hide initial screen
  if (startElements) {
    startElements.forEach((st) => {
      st.hide();
    });
  }

  //Hide game screen
  if (playElements) {
    playElements.forEach((p) => {
      p.hide();
    });
  }

  //stopElements = [newGameBtn];
}

function createLeaderBoard() {
  //document.getElementsByClassName('menuExterior')[0].style.visibility = 'hidden';
  if (Players[playerGamming].cristals > Players[playerGamming + 1].cristals) {
    var verifPlayerWin =
      "Parabéns -" +
      Players[playerGamming].name.bold() +
      "- você é o vencedor da Partida.";
    var verifyImage = "./assets/images/winner.png";
  } else {
    verifPlayerWin = "Ninguém venceu a partida";
    verifyImage = "./assets/images/empate.png";
  }

  Swal.fire({
    title: verifPlayerWin,
    imageUrl: verifyImage,
    width: 600,
    height: 200,
    imageWidth: 300,
    imageHeight: 200,
    confirmButtonText: "Novo Jogo",
    allowOutsideClick: false,
  }).then(() => {
    this.clickNewGameBtn();
  });
}

function finishTurn() {
  if (!haveAsPlayer) {
    setTimeout(function () {
      messagesAlerts(
          Players[playerGamming].name.bold() +
          "- voçê ainda não jogou."
      );
      msg += Players[playerGamming].name + "- voçê ainda não jogou.";
      saveMessages.push(msg);
    }, 2000);
    return true;
  }
  setTimeout(function () {
    messagesAlerts(
        Players[playerGamming].name.bold() +
        "- findou o seu turno."
    );
    nextPlayer();
    msg += Players[playerGamming].name + "- findou o seu turno.";
    saveMessages.push(msg);
  }, 1500);

  setTimeout(function () {
    messagesAlerts(
        Players[playerGamming].name.bold() +
        "- é a sua vez de jogar."
    );
    msg += Players[playerGamming].name + "- é a sua vez de jogar.";
    saveMessages.push(msg);
  }, 3500);

  image(backImg, pos_cards_x, pos_cards_y, 250, 350);
  txtArea.elt.placeholder = msg;
  startimer = false;
}

//Mostra os recursos dos jogadores no menu HTML
function createElementsDOMMenuPlayer() {
  playersInGame = 0;

  //document.getElementById("timer").innerHTML = hour;
  document.getElementById("idDeckcards").innerHTML =
    totalOfCardsInDeck - 1 - countDeck;

  for (let i = 0; i < 4; i++) {
    if (insertNamePlayer(playersHTML[i]).value()) {
      Players[i].name = document.getElementById(
        "player" + (i + 1)
      ).innerHTML = insertNamePlayer(playersHTML[i]).value();
      Players[i].cristals = document.getElementById(
        "cristals" + (i + 1)
      ).innerHTML = Players[i].cristals;
      playersInGame++;
    }
  }
  Players = Players.slice(0, playersInGame);
  console.log(Players);
}

function insertNamePlayer(nameOfPlayers) {
  switch (nameOfPlayers) {
    case "p1Input": {
      return p1Input;
    }
    case "p2Input": {
      return p2Input;
    }
    case "p3Input": {
      return p3Input;
    }
    case "p4Input": {
      return p4Input;
    }
    default:
      break;
  }
}

//function createElementsDOM() {
//  playElements = [stopBtn, sentence, vote, result];
//}

//Cria os jogadores

function createPlayers() {
  for (let i = 0; i < 4; i++) {
    const player = {
      num: i + 1,
      name: i + 1 + name,
      color: [],
      cristals: 1000,
    };
    Players.push(player);
  }
}

//Cria o jogo
function createGame() {
  const data = new Date();
  const dataText =
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

  Game = {
    id_players: [],
    winner: 1,
    data: dataText,
  };
}

//Cria os sprites das naves
function createSprits() {
  sPlayersIcon = new Group();
}

//cria os icons das naves
function createIcons() {
  for (let i = 0; i < playersInGame; i++) {
    sPlayersIcon.add(createSprite(850, 850, 0, 0));
    //sPlayersIcon.add(createSprite(width/2+410, width/2+410, 0, 0));
    sPlayersIcon[i].addImage(icons[i]);
    sPlayersIcon[i].scale = 0.12;
    sPlayersIcon[i].numPlayer = Players[i].num;
    sPlayersIcon[i].rotation = -90;
  }
}

function countdownTimer() {
  fill(0, 255, 127);
  noStroke();
  circle(width / 2 + 100, height / 2 - 285, 50);
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(255, 245, 230);
  textStyle(BOLD);
  text(timer, width / 2 + 100, height / 2 - 284);

  if (frameCount % 60 == 0 && timer > 0 && startimer == true) {
    timer--;
  }
  
  if (timer == 0) {
    image(backImg, pos_cards_x, pos_cards_y, 250, 350);
    messagesAlerts(
      Players[playerGamming].name.bold() +
      "- seu turno terminou."
      );
      msg += Players[playerGamming].name + "- seu turno terminou. \n";
      startimer = false;
    finishTurn();
    timer = 30;
    saveMessages.push(msg);
    //points[playerGamming] = points[playerGamming +1];
    
  }
}

//Passa para o próximo player
function nextPlayer() {
  playerGamming = playerGamming + 1 >= playersInGame ? 0 : playerGamming + 1;
  haveAsPlayer = false;
  timer = 30;
}

//Verifica o valor dos dados e se este não é maior que 40
function verifyTilesBoard(dice) {
  if (points[playerGamming] >= 40) {
    giveCristalsInStart();
    points[playerGamming] = points[playerGamming] - 40;
  }

  createCards();
  movePlayers(dice);
  //createColorPlayerInTile(dice);
}

//function verifyCards(){
//  deckcards[points[playerGamming]] = deckcards[points[playerGamming]] + dice;
//  deckcards[points[playerGamming]] = deckcards[points[playerGamming]] >= 40 ?
//  deckcards[points[playerGamming]] = 0 + deckcards[points[playerGamming]] + dice :
//  deckcards[points[playerGamming]];
//}

//Limpa o Screen
function clearBoard() {
  //Hide initial screen
  if (startElements) {
    startElements.forEach((st) => {
      st.hide();
    });
  }

  //Hide game screen
  if (playElements) {
    playElements.forEach((p) => {
      p.hide();
    });
  }

  image(imgBoard, width / 2 - 450, height / 2 - 450, 0, 0);
  image(imgExplorer, width / 2 - 275, height / 2 + 180, 90, 90);
  createBoard();
}

//Mostra as mensagens quando o jogador joga
function logsMsgRollDice(dice) {
  messagesAlerts(
      Players[playerGamming].name.bold() +
      "- avançou " +
      dice +
      " casas."
  );
  msg += Players[playerGamming].name + "- avançou " + dice + " casas. \n";
  saveMessages.push(msg);

  txtArea.elt.placeholder = msg;
}

//Carrega os elementos para o jogo
function clickStart() {
  if (
    (p1Input.value() &&
      p2Input.value() &&
      !p3Input.value() &&
      !p4Input.value()) ||
    (p1Input.value() &&
      p2Input.value() &&
      p3Input.value() &&
      !p4Input.value()) ||
    (p1Input.value() && p2Input.value() && p3Input.value() && p4Input.value())
  ) {
    //background(204, 204, 255);
    //sound = loadSound('./assets/sound/soundrelaxbackground.flac');
    //sound.play();
    document.getElementsByClassName("menuExterior")[0].style.visibility =
      "visible";
    timerStart();
    image(imgBoard, width / 2 - 450, height / 2 - 450, 0, 0);
    createBoard();
    image(imgExplorer, width / 2 - 275, height / 2 + 180, 90, 90);
    createElementsDOMMenuPlayer();
    messagesAlerts("Lance os dados para iniciar o Jogo.");
    //createIdColorsPlayersBoard()
    createIcons();

    image(backImg, pos_cards_x, pos_cards_y, 250, 350);

    //createLeaderBoard();
    msg;
    mode = GAME_PLAY;
  } else {
    if (!p1Input.value() && !p2Input.value())
      messagesAlerts("É necessário inscrever pelo menos 2 jogadores.");
    else if (!p1Input.value()) messagesAlerts("Necessita do jogador 1.");
    else if (!p2Input.value()) messagesAlerts("Necessita do jogador 2.");
    else if (!p3Input.value()) messagesAlerts("Necessita do jogador 3.");
  }
}

function messagesAlerts(messageAlert) {
  Swal.fire({
    title: messageAlert,
    size: 10,
    showConfirmButton: false,
    allowOutsideClick: false,
    timer: 2500,
  });
}

function messageWelcome(messageAlert) {
  Swal.fire({
    position: "top-end",
    title: messageAlert,
    size: 10,
    showConfirmButton: false,
    allowOutsideClick: false,
    timer: 2500,
  });
}

//Inicia um novo jogo
function clickNewGameBtn() {
  currentTime = 0;
  clearPlayersIcon();
  startGame();
  mode = GAME_START;
}

//Limpa o icon das naves dos jogadores
function clearPlayersIcon() {
  for (let i = 0; i < 4; i++) {
    if (sPlayersIcon[i]) {
      sPlayersIcon[i].visible = false;
    }
    document.getElementById("compradas" + (i+1)).innerHTML = "<div></div>";
    document.getElementById("cristals" + (i+1)).innerHTML = 1000;
    document.getElementById("player" + (i+1)).innerHTML = "";
    document.getElementById("cristals" + (i+1)).innerHTML = 1000;
  }

  for (let index = 1; index <= 11; index++) {
    document.getElementsByClassName("circ"+(index))[0].style={background: red}  
  }

  document.getElementById("idDeckcards").innerHTML = 20;
  countDeck=0;
  document.getElementById("timer").innerHTML = timeleft;


  sPlayersIcon = new Group();
  exploradas = [];
}

//Move os players consoante o numero de dados

function movePlayers(dice) {
  console.log(sPlayersIcon[playerGamming].position.x, "positionX");
  console.log(sPlayersIcon[playerGamming].position.y, "positionY");
  for (let j = 0; j < dice; j++) {
    //anda com o icon
    if (
      sPlayersIcon[playerGamming].position.x >= 130 &&
      sPlayersIcon[playerGamming].position.x <= 850 &&
      sPlayersIcon[playerGamming].position.y === 850
    ) {
      sPlayersIcon[playerGamming].position.x =
        sPlayersIcon[playerGamming].position.x - 80;
    } else if (
      sPlayersIcon[playerGamming].position.y >= 130 &&
      sPlayersIcon[playerGamming].position.y <= 850 &&
      sPlayersIcon[playerGamming].position.x === 50
    ) {
      sPlayersIcon[playerGamming].position.y =
        sPlayersIcon[playerGamming].position.y - 80;
      //sPlayersIcon[playerGamming].rotation = 90;
    } else if (
      sPlayersIcon[playerGamming].position.y === 50 &&
      sPlayersIcon[playerGamming].position.x >= 50 &&
      sPlayersIcon[playerGamming].position.x < 850
    ) {
      sPlayersIcon[playerGamming].position.x =
        sPlayersIcon[playerGamming].position.x + 80;
    } else if (
      sPlayersIcon[playerGamming].position.y >= 50 &&
      sPlayersIcon[playerGamming].position.y <= 850 &&
      sPlayersIcon[playerGamming].position.x === 850
    ) {
      sPlayersIcon[playerGamming].position.y =
        sPlayersIcon[playerGamming].position.y + 80;
    }

    //roda o icon do jogador
    if (
      (sPlayersIcon[playerGamming].position.x == 50 &&
        sPlayersIcon[playerGamming].position.y == 850) ||
      (sPlayersIcon[playerGamming].position.x == 50 &&
        sPlayersIcon[playerGamming].position.y == 50) ||
      (sPlayersIcon[playerGamming].position.x == 850 &&
        sPlayersIcon[playerGamming].position.y == 50) ||
      (sPlayersIcon[playerGamming].position.x == 850 &&
        sPlayersIcon[playerGamming].position.y == 850)
    ) {
      sPlayersIcon[playerGamming].rotation =
        sPlayersIcon[playerGamming].rotation + 90;
    }
  }
  console.log(
    sPlayersIcon[playerGamming].position.x,
    " positionX",
    sPlayersIcon[playerGamming].position.y,
    " positionY"
  );

  giveAndTakeCristals();
  payforAluguer();

  if (points[playerGamming] === 5 || points[playerGamming] === 28) {
    movePlayersInMeteoro();
  }
  if (
    points[playerGamming] === 14 ||
    points[playerGamming] === 22 ||
    points[playerGamming] === 34
  ) {
    movePlayersInHole();
  }
  if (points[playerGamming] === 6 || points[playerGamming] === 21) {
    movePlayersInEt();
  }

  if (
    points[playerGamming] === 10 ||
    points[playerGamming] === 20 ||
    points[playerGamming] === 31
  ) {
    sPlayersIcon.rotate = 90;
  }

  if (points[playerGamming] == 40) {
    giveCristalsInStart();
  }
  createElementsDOMMenuPlayer();
}

//Cria as cartas
function createCards() {
  image(cardsImg[points[playerGamming]], pos_cards_x, pos_cards_y, 250, 350);
}
