import readline from "readline-sync";
import { FairProtocol } from "../security/FairProtocol.js";
import { Dice } from "../dice/Dice.js";

export class DiceThrower {
  private readonly protocol: FairProtocol;

  constructor(private readonly dice: Dice, private readonly owner: string) {
    this.protocol = new FairProtocol(6);
  }

  launch(): number {
    console.log(`It's time for ${this.owner.toLowerCase()} throw.`);
    console.log(
      `I selected a random value in the range 0..5 (HMAC=${this.protocol.getHmac()})`
    );
    console.log("Add your number modulo 6.");
    console.log("0 - 0");
    console.log("1 - 1");
    console.log("2 - 2");
    console.log("3 - 3");
    console.log("4 - 4");
    console.log("5 - 5");
    console.log("X - exit");
    console.log("? - help");

    const userInput = readline.question("Your selection: ");
    if (userInput === "x" || userInput === "X") {
      console.log("Exiting the game.");
      process.exit(0);
    }

    if (userInput === "?") {
      console.log("Calculate probability of winning...");
      return this.launch();
    }

    const userNumber = parseInt(userInput);
    const { value, key } = this.protocol.reveal();
    const modulo = this.calculateModulo(value, userNumber);
    const face = this.getFace(this.dice, modulo);

    if (isNaN(userNumber) || userNumber < 0 || userNumber > 5) {
      console.log("❌ Invalid input. Please enter a number between 0 and 5.");
      return this.launch();
    }

    console.log(`My number is: ${value} (KEY=${key})`);
    console.log(`Your number is: ${userNumber}`);
    console.log(`The result is ${value} + ${userNumber} = ${modulo} (mod 6)`);

    console.log(`${this.owner} throw is ${face}.`);

    return face;
  }

  //   Calculate the modulo of the sum of the computer's and user's numbers
  private calculateModulo(value: number, userNumber: number): number {
    return (value + userNumber) % 6;
  }

  //   Get the face value of the dice
  private getFace(dice: Dice, index: number): number {
    const face = dice.faces[index];
    console.log(`The face value of the dice is: ${face}`);
    return face;
  }
}
