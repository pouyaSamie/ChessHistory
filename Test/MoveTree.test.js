import ChessHistory from "./../src/ChessHistory.js";
import assert from "assert";

describe("MoveHistory", function () {
  describe("#addMove()", function () {
    it("should add Move in main line", function () {
      let history = new ChessHistory();
      history.addMove("e4");
      history.addMove("e5");
      history.addMove("Nf3");
      history.addMove("Nf6");

      assert.strictEqual(history.getMainMoves().length, 4);
    });
  });

  describe("#addVariation()", function () {
    it("should add Move in main line and add variation ", function () {
      let history = new ChessHistory();
      const m1 = history.addMove("e4");
      history.addMove("e6");
      history.addMove("d3");
      history.addMove("d5");
      history.addMove("Nd2");
      history.addMove("d5", m1);
      history.addMove("f3", m1);
      history.addMove("e6", m1);
      history.addMove("Ne2", m1);
      assert.strictEqual(history.getVariation(m1.identifier).length, 4);
    });
  });

  describe("#getVariation()", function () {
    it("should get variation of a move ", function () {
      let history = new ChessHistory();
      const m1 = history.addMove("e4");
      history.addMove("e6");
      history.addMove("d3");
      history.addMove("d5");
      history.addMove("Nd2");
      history.addMove("d5", m1);
      history.addMove("f3", m1);
      history.addMove("e6", m1);
      history.addMove("Ne2", m1);
      let variations = history.getVariation(m1.identifier);
      assert.strictEqual(variations[2].name, "e6");
    });
  });

  describe("#getBranch()", function () {
    it("should get branch of variation", function () {
      let history = new ChessHistory();
      history.addMove("e4");
      history.addMove("e5");
      history.addMove("d3");
      const m1 = history.addMove("d5");

      history.addMove("f4", m1);
      history.addMove("f6", m1);
      var m2 = history.addMove("f5", m1);
      let branch = history.getBranch(m2);
      assert.strictEqual(branch.length, 7);
    });
  });

  describe("#findMoveById()", function () {
    it("should finds move by id ", function () {
      let history = new ChessHistory();
      history.addMove("e4");
      const m1 = history.addMove("e6");
      history.addMove("d3");

      let foundNode = history.findMoveById(m1.identifier);
      assert.strictEqual(foundNode.name, "e6");
    });
  });
});
