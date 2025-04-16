export class Dice {
  private readonly _faces: number[];

  // The constructor receives an array of numbers representing the faces of the dice
  constructor(faces: number[]) {
    this._faces = [...faces];
  }

  get faces(): number[] {
    return this._faces;
  }
}
