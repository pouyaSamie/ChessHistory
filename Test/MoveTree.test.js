import "@babel/polyfill";
import Tree from "./../src/MoveTree.js";
import assert from "assert";

describe("MoveTree", function () {
  describe("#addMove()", function () {
    it("should add Move in main line", function () {
      let tree = new Tree();
      tree.addMove("e4");
      tree.addMove("e5");
      tree.addMove("Nf3");
      tree.addMove("Nf6");
      assert.strictEqual(tree.getMainMoves().length, 4);
    });
  });

  describe("#addVariation()", function () {
    it("should add Move in main line and add variation ", function () {
      let tree = new Tree();
      const m1 = tree.addMove("e4");
      tree.addMove("e6");
      tree.addMove("d3");
      tree.addMove("d5");
      tree.addMove("Nd2");
      tree.addMove("d5", m1);
      tree.addMove("f3", m1);
      tree.addMove("e6", m1);
      tree.addMove("Ne2", m1);
      tree.pgn();
      assert.strictEqual(tree.getVariation(m1.identifier).length, 4);
    });
  });
});
