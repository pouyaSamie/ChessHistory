import Move from "./Move.js";

export default class Game {
  constructor() {
    this.History = null;
  }

  addMove(notation) {
    if (!this.History) this.History = new Move(null, notation);
    return this.History;
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

function hello() {
  var game = new Game();
  var d3 = game.addMove("e4").addMove("e5").addMove("d3");

  d3.addMove("d5").addMove("Nf3");
  let f4 = d3.addMove("Bc5").addMove("f4");
  f4.addMove("d6");
  f4.addMove("b6");

  d3.addMove("Nf6").addMove("f4").addMove("g6").addMove("Nc3");
  d3.addMove("Qe7");

  console.log(game.History.pgn());
  game.History.print();
}

hello();
