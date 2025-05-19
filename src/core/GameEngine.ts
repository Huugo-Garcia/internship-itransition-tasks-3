import { FirstMoveDecider } from "./FirstMoveDecider.js";
import { DiceSelector } from "./DiceSelector.js";
import { DiceValidator } from "../dice/DiceValidator.js";
import readline from "readline-sync";

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
  }
}
