import Move from "./Move.js";

export default class ChessHistory {
  constructor() {
    this.History = null;
  }

  addMove(notation) {
    if (!this.History) this.History = new Move(null, notation);
    return this.History;
  }

  getMainLine() {
    var mainLine = [];
    var move = this.History;
    while (move) {
      mainLine.push(move);
      move = move.MainMove;
    }
    return mainLine;
  }

  pgn() {
    return this.History.pgn();
  }
  findMoveById(id) {
    let foundNode = null;

    this.History.traverse((node) => {
      if (node.id === id) {
        foundNode = node;
        return true;
      }
    });

    return foundNode;
  }
}
