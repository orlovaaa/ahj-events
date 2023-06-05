import Board from "./modules/Board.js";
import Goblin from "./modules/Goblin.js";

const board = new Board();
board.createHtml();
// eslint-disable-next-line
const goblin = new Goblin(".hole-game");