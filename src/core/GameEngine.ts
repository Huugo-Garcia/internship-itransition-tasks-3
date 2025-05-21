import { FirstMoveDecider } from "./FirstMoveDecider.js";
import { DiceSelector } from "./DiceSelector.js";
import { DiceValidator } from "../dice/DiceValidator.js";
import { DiceThrower } from "./DiceThrower.js";

export class GameEngine {
  private readonly decider: FirstMoveDecider;
  private readonly diceSelector: DiceSelector;

  constructor(private readonly rawArgs: string[]) {
    const diceValidator = new DiceValidator();
    const validatedDices = diceValidator.validate(this.rawArgs);

    this.decider = new FirstMoveDecider(2);
    this.diceSelector = new DiceSelector(validatedDices);
  }

  start(): void {
    // Determine who moves first
    const whoMovesFirst = this.decider.start();

    if (whoMovesFirst === 0) {
      // Computer selects first
      const computerIndex = this.diceSelector.computerSelectsFirst();
      this.diceSelector.userSelectsRemainingDice(computerIndex);
    } else {
      // User selects first
      const userIndex = this.diceSelector.userSelectsFirst();
      this.diceSelector.computerSelectsRemainingDice(userIndex);
    }

    const userDice = this.diceSelector.getUserDice();
    const computerDice = this.diceSelector.getComputerDice();

    if (!userDice || !computerDice) {
      console.error("Error: One of the dice is not selected.");
      return;
    }

    // Create the DiceThrower instances
    const userThrower = new DiceThrower(userDice, "Your");
    const computerThrower = new DiceThrower(computerDice, "My");

    let userResult: number, computerResult: number;

    // Launch the dice throws
    if (whoMovesFirst === 0) {
      // Computer throws first
      computerResult = computerThrower.launch();
      userResult = userThrower.launch();
    } else {
      // User throws first
      userResult = userThrower.launch();
      computerResult = computerThrower.launch();
    }

    // Determine the winner
    if (userResult > computerResult) {
      console.log(`You win! (${userResult} > ${computerResult})`);
    } else if (userResult < computerResult) {
      console.log(`I win! (${computerResult} > ${userResult})`);
    } else {
      console.log("It's a draw!");
    }
  }
}
