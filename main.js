/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/Board.js
class Board {
  constructor() {
    this.size = 16;
  }
  createHtml() {
    const goblin = document.getElementById("goblin");
    const card = document.createElement("div");
    card.classList.add("card");
    goblin.appendChild(card);
    const points = `
          <div id="status" class="status">
          <div>Попаданий: <span id="dead">0</span></div>
          <div>Пропущено: <span id="lost">0</span></div>
          </div>`;
    card.insertAdjacentHTML("afterBegin", points);
    const holeGame = document.createElement("div");
    holeGame.classList.add("hole-game");
    card.appendChild(holeGame);
    const gameOver = `<div data-id="gameOver" class="gameOver">Вы пропустили слишком много гоблинов</div>`;
    card.insertAdjacentHTML("beforeend", gameOver);
    const buttonClearStat = `<button class="button-clear-stat">Новая игра</button>`;
    card.insertAdjacentHTML("beforeend", buttonClearStat);
    for (let i = 0; i < this.size; i++) {
      const hole = document.createElement("div");
      hole.classList.add("hole");
      hole.id = `hole${i}`;
      holeGame.appendChild(hole);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/modules/Goblin.js
class Goblin {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
      this.size = 16;
      this.lastGoblin = 0;
      this.dead = document.getElementById("dead");
      this.lost = document.getElementById("lost");
      this.hole = Array.from(document.querySelectorAll(".hole"));
      this.newGame = this.newGame.bind(this);
      this.clearStat = document.querySelector(".button-clear-stat");
      this.clearStat.addEventListener("click", this.newGame);
      this._element = element;
      this.holeOnClick = this.holeOnClick.bind(this);
      this._element.addEventListener("click", this.holeOnClick);
      this.gameOverElement = document.querySelector(".gameOver");
    }
  }
  goblinRandom() {
    const random = () => {
      const rand = Math.floor(Math.random() * this.size);
      if (rand === this.lastGoblin) return random();
      this.lastGoblin = rand;
      return rand;
    };
    this.timerGoblin = setInterval(() => {
      this.gameOver();
      if (this.hole[this.lastGoblin].className.includes("hole_has-goblin") && this.lost.textContent <= 4) {
        this.lostCounter();
      }
      if (this.lost.textContent <= 5) {
        this.hole[this.lastGoblin].classList.remove("hole_has-goblin");
        const index = random();
        this.hole[index].classList.add("hole_has-goblin");
      }
    }, 1000);
  }
  holeOnClick(e) {
    if (e.target.className.includes("hole_has-goblin")) {
      e.target.classList.remove("hole_has-goblin");
      this.deadCounter();
    }
  }
  deadCounter() {
    this.dead.textContent = Number(this.dead.textContent) + 1;
  }
  lostCounter() {
    this.lost.textContent = Number(this.lost.textContent) + 1;
  }
  gameOver() {
    if (this.lost.textContent >= 5) {
      clearInterval(this.timerGoblin);
      this.gameOverElement.style.display = "flex";
      this.hole.forEach(e => {
        e.classList.remove("hole_has-goblin");
      });
    }
  }
  newGame() {
    clearInterval(this.timerGoblin);
    this.lost.textContent = 0;
    this.dead.textContent = 0;
    this.gameOverElement.style.display = "none";
    this.goblinRandom();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const board = new Board();
board.createHtml();
// eslint-disable-next-line
const goblin = new Goblin(".hole-game");
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;