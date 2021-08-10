import { Chess } from "chess.js";
import Tree from "./Tree.js";

class MoveTree {
  constructor() {
    this.MoveTree = new Tree("root");
  }

  addMove(notation, parent) {
    this.chess = new Chess();
    let moveToPlay = [];
    if (parent) this.addVariation(notation, parent);

    moveToPlay = this.getMainMoves();
    for (const m in moveToPlay) {
      var move = this.chess.move(m);
    }
    let newMove = this.chess.move(notation);
    if (!newMove) throw new "Invalid Move"();
    return newMove;
  }

  getMainMoves() {
    return this.tree.getChildrenNodes("root");
  }

  addVariation(notation, parent) {}
  getBranch() {}
}

function test() {
  //    let chess = new Chess()
  let tree = new Tree("root");
  tree.createChildNode("e2");
  let node = tree.createChildNode("e4");
  tree.appendChildNode(new Tree("Nf3"));

  tree.print();
}

test();
