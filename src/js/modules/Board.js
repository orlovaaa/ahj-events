export default class Board {
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