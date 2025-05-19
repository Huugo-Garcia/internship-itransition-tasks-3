import { Dice } from "../dice/Dice.js";
import readline from "readline-sync";

export class DiceSelector {
  private readonly diceSets: Dice[];
  private selectedByComputer: Dice | null = null;
  private selectedByUser: Dice | null = null;

  constructor(diceSets: Dice[]) {
    this.diceSets = diceSets;
  }

//   Computer selects first
  computerSelectsFirst(): number {
    const randomIndex = Math.floor(Math.random() * this.diceSets.length);
    this.selectedByComputer = this.diceSets[randomIndex];
    console.log(`I make the first move and choose the [${this.selectedByComputer.faces.join(",")}] dice.`);
    return randomIndex;
  }

// User selects first
  userSelectsFirst(): number {
    console.log('You make the first move');
    console.log("Choose your dice:");

    this.diceSets.forEach((dice, index) => {
      console.log(`${index} - ${dice.faces.join(",")}`);
    });

    const input = readline.question("Your selection: ");
    const selectedIndex = parseInt(input);

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= this.diceSets.length) {
      console.log("❌ Invalid selection. Try again.");
      return this.userSelectsFirst(); // Recursively ask for a valid selection
    }

    this.selectedByUser = this.diceSets[selectedIndex];
    console.log(`You choose the [${this.selectedByUser.faces.join(",")}] dice.`);
    return selectedIndex;
  }

  // Computer selects remaining dice
  // This method is called after the user has selected their dice
  computerSelectsRemainingDice(userIndex: number): number {
    const remainingDice = this.diceSets
      .map((dice, i) => ({ dice, index: i }))
      .filter(({ index }) => index !== userIndex);

    const random = remainingDice[Math.floor(Math.random() * remainingDice.length)];
    this.selectedByComputer = random.dice;

    console.log(`I choose the [${this.selectedByComputer.faces.join(",")}] dice.`);
    return random.index;
  }

    // User selects remaining dice
    // This method is called after the computer has selected its dice
  userSelectsRemainingDice(computerIndex: number): number {
  console.log("Your turn to choose from the remaining dice:");

  const remaining = this.diceSets
    .map((dice, i) => ({ dice, index: i }))
    .filter(({ index }) => index !== computerIndex);

  remaining.forEach(({ dice, index }) => {
    console.log(`${index} - ${dice.faces.join(",")}`);
  });

  const input = readline.question("Your selection: ");
  const selectedIndex = parseInt(input);

  const validIndices = remaining.map(r => r.index);
  if (isNaN(selectedIndex) || !validIndices.includes(selectedIndex)) {
    console.log("❌ Invalid selection. Try again.");
    return this.userSelectsRemainingDice(computerIndex);
  }

  this.selectedByUser = this.diceSets[selectedIndex];
  console.log(`You choose the [${this.selectedByUser.faces.join(",")}] dice.`);
  return selectedIndex;
}


  getUserDice(): Dice | null {
    return this.selectedByUser;
  }

  getComputerDice(): Dice | null {
    return this.selectedByComputer;
  }
}
