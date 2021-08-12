import { Chess } from "chess.js";
import Tree from "./Tree.js";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

export default class ChessHistory {
  constructor() {
    this.MoveTree = new Tree("root");
    this.chess = new Chess();
  }

  get Moves() {
    return this.MoveTree.children;
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

  addVariation(notation, parent) {
    var moveToPlay = this.gteBranchFromParent(parent);
    let newMove = this.createNewChessMove(notation, moveToPlay);

    return parent.createChildNode(notation, newMove);
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

  gteBranchFromParent(parent) {
    let branch = [];

    const currentSiblings = parent.children;
    currentSiblings.forEach((siblings) => {
      branch.push(siblings);
    });
    branch = branch.reverse();
    var ancectors = this.getBranch(parent);
    ancectors.forEach((p) => {
      branch.push(p);
    });

    return branch.reverse();
  }

  getBranch(move) {
    let branch = [];
    const getsiblings = (move, branch) => {
      if (!move) return;
      if (move.name == "root") return;
      var siblings = move.parentNode.children;
      var currentMoveIndex = siblings.findIndex((x) => x.name === move.name);
      var s = siblings.slice(0, currentMoveIndex + 1).reverse();
      s.forEach((m) => {
        branch.push(m);
      });
      getsiblings(move.parentNode, branch);
    };
    getsiblings(move, branch);
    return branch;
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
