import { Dice } from "./Dice.js";

export class DiceValidator {
  validate(diceInputs: string[]): Dice[] {
    // Check if the user provided 3 dices
    if (diceInputs.length < 3) {
      console.log("❌ To start the game you need to provide 3 dices");
    }

    return diceInputs
      .map((input, index) => {
        const faces = input.split(" ").map((value) => {
          const number = Number(value);
          // Check if the user provided a valid number for each dice face
          if (isNaN(number) || number < 0) {
            console.log(
              `❌ Dice #${
                index + 1
              } invalid: contains non-numeric or negative values: ${input}`
            );
          }
          return number;
        });

        // Check if the user provided a dice with 6 faces
        if (faces.length !== 6) {
          console.log(
            `❌ Dice #${index + 1} invalid: must have exaclty 6 faces. Got ${faces.length} -> ${input}`
          );
        }

        return new Dice(faces);
      })
      .filter((dice) => dice.faces.length === 6);
  }
}
