import Table from "cli-table3";
import chalk from "chalk";
import { Dice } from "../dice/Dice.js";

export class ProbabilityTable {
  constructor(private readonly dices: Dice[]) {}

  private countWins(a: number[], b: number[]): number {
    let count = 0;
    for (const x of a) {
      for (const y of b) {
        if (x > y) count++;
      }
    }
    return count;
  }

  private calculateProbability(a: number[], b: number[]): number {
    const total = a.length * b.length;
    const wins = this.countWins(a, b);
    return wins / total;
  }

  private formatDiceLabel(dice: Dice): string {
    return dice.faces.join(",");
  }

  private formatProbability(value: number): string {
    if (value > 0) return chalk.green(value.toFixed(4));
    if (value < 0) return chalk.red(value.toFixed(4));
    return chalk.yellow(value.toFixed(4));
  }

  public display(): void {
    const labels = this.dices.map((d) => this.formatDiceLabel(d));

    const table = new Table({
      head: [chalk.bold("User dice v"), ...labels],
      style: { head: ["cyan"] },
    });

    for (let i = 0; i < this.dices.length; i++) {
      const rowLabel = chalk.bold(this.formatDiceLabel(this.dices[i]));
      const row: string[] = [];

      for (let j = 0; j < this.dices.length; j++) {
        if (i === j) {
          row.push(chalk.gray("–"));
        } else {
          const prob = this.calculateProbability(
            this.dices[i].faces,
            this.dices[j].faces
          );
          row.push(this.formatProbability(prob));
        }
      }

      table.push([rowLabel, ...row]);
    }

    console.log(chalk.bold("\nProbability of the win for the user:\n"));
    console.log(table.toString());
  }
}
