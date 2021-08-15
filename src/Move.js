import { Chess } from "chess.js";

const uniqueId = (() => {
  function* uniqueIdGenerator() {
    let id = Date.now();

    while (true) {
      yield id++;
    }
  }

  const gen = uniqueIdGenerator();

  return () => gen.next().value;
})();

export default class Move {
  constructor(parent, notation) {
    this.index = parent ? parent.index + 1 : 1;
    this.parent = parent;
    this.notation = notation;
    this.Moves = [];
    this.info = this._createChessMove();
    this.id = uniqueId();
  }

  addMove(notation) {
    var newMove = new Move(this, notation);
    this.Moves.push(newMove);
    return newMove;
  }

  get depth() {
    let depth = 0;
    let move = this;
    while (move) {
      depth++;
      move = move.parent;
    }
    return depth;
  }

  _createChessMove() {
    let chess = new Chess();
    let previousMoves = this.previousMoves();
    previousMoves.forEach((move) => {
      chess.move(move.notation, { sloppy: true });
    });

    var newMove = chess.move(this.notation);
    if (!newMove) {
      var message = "Moves that has been in branch are :";
      previousMoves.forEach((move) => {
        message += ` ${move.notation}`;
      });

      message += ` and the move ${this.notation} is invalid`;
      throw new Error(message);
    }

    return newMove;
  }

  mainMove() {
    return this.Moves[0];
  }

  variations() {
    var arr = [...this.Moves];

    arr.shift();
    return arr;
  }
  traverse(cb) {
    for (let move of this.Moves) {
      if (cb(move) === true || move.traverse(cb) === true) {
        return true;
      }
    }
  }

  previousMoves() {
    let list = [];
    let move = this;
    while (move.parent) {
      list.push(move.parent);
      move = move.parent;
    }

    return list.reverse();
  }

  _getTreeString = (node, spaceCount = 0) => {
    let str = "\n";

    node.Moves.forEach((child) => {
      str += `${" ".repeat(spaceCount)}|(${child.id})${
        child.notation
      }${this._getTreeString(child, spaceCount + 2)}`;
    });

    return str;
  };

  print() {
    console.log(`\n${this.notation}${this._getTreeString(this, 2)}`);
  }

  pgn(callback) {
    var queue = [this];
    let pgn = "";
    callback = (item) => {
      pgn += item;
    };
    this.printChilds(queue, callback);
    return pgn + " *";
  }

  printChilds(queue, callback) {
    var n;

    while (queue.length > 0) {
      var count = queue.length;
      n = queue.shift();
      callback(n.toString());
      if (count > 1) {
        while (queue.length > 0) {
          let v = queue.shift();
          this.printVariations(v, callback);
        }
      }

      if (!n.Moves) return;
      for (let index = 0; index < n.Moves.length; index++) {
        queue.push(n.Moves[index]);
      }
    }
  }

  printVariations(move, callback) {
    var queue = [move];
    let moveOrder = `${Math.ceil(move.depth / 2)}`;
    var blackVariation = move.info.color == "b" ? "..." : "";
    callback(" (" + moveOrder + blackVariation);
    this.printChilds(queue, callback);
    callback(")");
  }

  toString() {
    let moveOrder = `${Math.ceil(this.depth / 2)}`;
    let moveNumber = this.info.color == "b" ? "" : ` ${moveOrder}.`;
    return `${moveNumber} ${this.notation}`;
  }
}
