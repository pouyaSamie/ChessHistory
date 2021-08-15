import { Chess } from "chess.js";
import Tree from "./Tree.js";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

const MAIN_LINE = "mainLine";
export default class ChessHistory {
  constructor() {
    this.MoveTree = new Tree(MAIN_LINE);
    this.chess = new Chess();
  }

  get Moves() {
    return this.MoveTree.children;
  }

  addMoveToMainLine(notation) {
    let moveToPlay = this.getMainLine();
    let newMove = this.createNewChessMove(notation, moveToPlay);
    let newNode = this.MoveTree.createChildNode(notation, newMove);

    return newNode;
  }

  addNewVariation(move, notation) {
    let moveToPlay = this.getBranchFromParent(move);
    let newMove = this.createNewChessMove(notation, moveToPlay);
    return move.createChildNode(notation, newMove);
  }

  AddMoveToVariation(variation, notation) {
    let moveToPlay = this.getBranch(variation);
    let newMove = this.createNewChessMove(notation, moveToPlay);
    return variation.createChildNode(notation, newMove);
  }

  addVariation(notation, parent) {
    var moveToPlay = this.getBranchFromParent(parent);
    let newMove = this.createNewChessMove(notation, moveToPlay);

    return parent.createChildNode(notation, newMove);
  }

  getMainLine() {
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

  getBranchFromParent(parent) {
    let branch = [];

    var ancectors = this.getBranch(parent);
    ancectors.forEach((p) => {
      branch.push(p);
    });

    return branch;
  }

  getBranch(move) {
    let branch = [];
    const getsiblings = (move, branch) => {
      if (!move) return;
      if (move.name == MAIN_LINE) return;
      var siblings = move.parentNode.children;
      var currentMoveIndex = siblings.findIndex((x) => x.name === move.name);
      var s = siblings.slice(0, currentMoveIndex + 1).reverse();
      s.forEach((m) => {
        branch.push(m);
      });
      getsiblings(move.parentNode, branch);
    };
    getsiblings(move, branch);
    return branch.reverse();
  }

  pgn() {
    return this.chess.pgn();
  }

  print() {
    return this.MoveTree.print();
  }
  createNewChessMove(newNotation, Moves) {
    this.chess = new Chess();
    Moves.forEach((move) => {
      this.chess.move(move.name, { sloppy: true });
    });

    var newMove = this.chess.move(newNotation);
    if (!newMove) {
      var message = "Moves that has been in branch are :";
      Moves.forEach((move) => {
        message += ` ${move.name}`;
      });

      message += ` and the move ${newNotation} is invalid`;
      throw new Error(message);
    }

    return newMove;
  }
}
