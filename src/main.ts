import { GameEngine } from "./core/GameEngine.js";

const args = process.argv.slice(2);
const game = new GameEngine(args);
game.start();
