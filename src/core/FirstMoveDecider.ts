import { FairProtocol } from "../security/FairProtocol.js";
import readline from 'readline-sync';

// This class is responsible for determining who makes the first move in the game.
// It uses a fair protocol to ensure that both players have an equal chance of winning.
export class FirstMoveDecider {
  private readonly protocol: FairProtocol;

  constructor(private readonly range: number) {
  
    this.protocol = new FairProtocol(2);
  }

  start(): number {
    console.log("Let's determine who makes the first move");
    console.log(
      `I selected a random value in the range 0..1 (HMAC=${this.protocol.getHmac()})`
    );
    console.log("Try to guess my selection.");
    console.log("0 - 0");
    console.log("1 - 1");
    console.log("X - exit");
    console.log("? - help");

    const userInput = readline.question("Your selection: ");
    if (userInput === "X") process.exit(0);
    if (userInput === "?") {
      console.log("The computer has selected 0 or 1. Try to guess it.");
      return this.start();
    }

    const guess = parseInt(userInput);
    const { value, key } = this.protocol.reveal();

    if (isNaN(guess) || guess < 0 || guess > 1) {
      console.log("Invalid input. Please enter 0 or 1.");
      return this.start();
    }

    console.log(`My selection: ${value} (KEY=${key})`);
    // Check if the user guessed correctly
    if (guess === value) {
      console.log("You guessed correctly. You move first.");
      return 1;
    } else {
      console.log("I move first.");
      return 0;
    }
  }
}
