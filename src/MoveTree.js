import { Chess } from "chess.js";
import Tree from "./Tree.js";

export default class MoveTree {
  constructor() {
    this.MoveTree = new Tree("root");
  }

  addMove(notation, parent) {
    this.chess = new Chess();
    let moveToPlay = [];
    if (parent) return this.addVariation(notation, parent);

    moveToPlay = this.getMainMoves();
    let newMove = this.createNewChessMove(notation, moveToPlay);
    if (!newMove) throw new "Invalid Move"();
    let newNode = this.MoveTree.createChildNode(notation, newMove);

    return newNode;
  }

  getMainMoves() {
    let children = [];
    this.MoveTree.children.forEach((item) => {
      children.push(item);
    });
    return children;
  }

  getVariation(id) {
    let children = [];
    const node = this.MoveTree.findNodeById(id);
    if (!node) throw new "Move not found"();

    node.children.forEach((item) => {
      children.push(item);
    });
    return children;
  }

  addVariation(notation, parent) {
    var moveToPlay = this.getBranch(parent);
    let newMove = this.createNewChessMove(notation, moveToPlay);
    return parent.createChildNode(notation, newMove);
  }
  getBranch(node) {
    return this.MoveTree.findBranchForNode(node);
  }
  pgn() {
    return this.MoveTree.print();
  }
  createNewChessMove(newNotation, Moves) {
    for (const index in Moves) {
      this.chess.move(Moves[index].name, { sloppy: true });
    }
    return this.chess.move(newNotation);
  }
}
