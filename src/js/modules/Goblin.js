export default class Goblin {
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
      if (
        this.hole[this.lastGoblin].className.includes("hole_has-goblin") &&
        this.lost.textContent <= 4
      ) {
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
      this.hole.forEach((e) => {
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