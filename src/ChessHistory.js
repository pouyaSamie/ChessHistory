import { Chess } from "chess.js";
import Tree from "./Tree.js";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

export default class ChessHistory {
  constructor() {
    this.MoveTree = new Tree("root");
    this.chess = null;
  }

  addMove(notation, parent) {
    this.chess = new Chess();

    let moveToPlay = [];
    if (parent) {
      return this.addVariation(notation, parent);
    } else {
      moveToPlay = this.getMainMoves();
      let newMove = this.createNewChessMove(notation, moveToPlay);
      if (!newMove) throw new "Invalid Move"();
      let newNode = this.MoveTree.createChildNode(notation, newMove);

      return newNode;
    }
  }

  getMainMoves() {
    let children = [];
    this.MoveTree.children.forEach((item) => {
      children.push(item);
    });
    return children;
  }

  findMoveById(id) {
    return this.MoveTree.findNodeById(id);
  }

  getVariation(id) {
    let children = [];
    const node = this.MoveTree.findNodeById(id);
    if (!node) throw new Error("Move not found");

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
    const branch = node.children;
    let parents = node.getAllParents();
    parents.forEach((p) => {
      branch.push(p);
    });

    branch.reverse().push(node);
    return branch.reverse();
  }

  pgn() {
    return this.chess.pgn();
  }

  print() {
    return this.MoveTree.print();
  }
  createNewChessMove(newNotation, Moves) {
    Moves.forEach((move) => {
      this.chess.move(move.name, { sloppy: true });
    });

    var newMove = this.chess.move(newNotation);
    if (!newMove) throw new Error("Invalid Move");

    return newMove;
  }
}
