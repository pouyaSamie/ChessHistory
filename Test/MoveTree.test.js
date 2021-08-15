import ChessHistory from "./../src/ChessHistory.js";
import assert from "assert";

describe("MoveHistory", function () {
  describe("AddMoveToMainLoe()", function () {
    it("should add Move in main line", function () {
      let history = new ChessHistory();
      history.addMove("e4").addMove("e5").addMove("Nf3").addMove("Nf6");
      console.log(history.getMainLine());
      assert.strictEqual(history.getMainLine().length, 4);
    });
  });

  describe("#addVariationForMove()", function () {
    it("should create New Variation", function () {
      let history = new ChessHistory();
      history.addMove("e4");
      history.addMove("e6");
      var d3 = history.addMove("d3");
      history.addMove("d5");
      history.addVariation(d3, "Nf6");
      history.addVariation(d3, "Bc5");
      history.addVariation(d3, "Qe7");
      history.addMove("Nf3");
      assert.strictEqual(d3.children.length, 3);
    });
  });

  describe("#AddMoveToVariation()", function () {
    it("should get variation of a move ", function () {
      let history = new ChessHistory();
      history.addMove("e4");
      history.addMove("e6");
      var d3 = history.addMove("d3");
      history.addMove("d5");
      var Nf6 = history.addVariation(d3, "Nf6");
      history.addVariation(d3, "Bc5");
      history.addVariation(d3, "Qe7");
      history.addMove("Nf3");
      history.AddMoveToVariation(Nf6, "f4");
      history.AddMoveToVariation(Nf6, "g6");
      history.AddMoveToVariation(Nf6, "Nc3");
      history.print();
      assert.strictEqual(Nf6.children.length, 3);
    });
  });

  // describe("#getVariation()", function () {
  //   it("should get variation of a move ", function () {
  //     let history = new ChessHistory();
  //     const m1 = history.addMove("e4");
  //     history.addMove("e6");
  //     history.addMove("d3");
  //     history.addMove("d5");
  //     history.addMove("Nd2");
  //     history.addMove("d5", m1);
  //     history.addMove("f3", m1);
  //     history.addMove("e6", m1);
  //     history.addMove("Ne2", m1);
  //     let variations = history.getVariation(m1.identifier);
  //     assert.strictEqual(variations[2].name, "e6");
  //   });
  // });

  // describe("#getBranch()", function () {
  //   it("should get branch of variation", function () {
  //     let history = new ChessHistory();
  //     history.addMove("e4");
  //     history.addMove("e5");
  //     history.addMove("d3");
  //     const m1 = history.addMove("d5");

  //     history.addMove("f4", m1);
  //     history.addMove("f6", m1);
  //     var m2 = history.addMove("f5", m1);
  //     history.MoveTree.print();
  //     let branch = history.getBranch(m2);
  //     assert.strictEqual(branch.length, 7);
  //   });
  // });

  // describe("#findMoveById()", function () {
  //   it("should finds move by id ", function () {
  //     let history = new ChessHistory();
  //     history.addMove("e4");
  //     const m1 = history.addMove("e6");
  //     history.addMove("d3");

  //     let foundNode = history.findMoveById(m1.identifier);
  //     assert.strictEqual(foundNode.name, "e6");
  //   });
  // });

  // describe("#addComplexVariation()", function () {
  //   it("should add Move in main line and add multilevel variation ", function () {
  //     let history = new ChessHistory();
  //     history.addMove("e4");
  //     history.addMove("e5");
  //     let mainLine = history.addMove("d3");
  //     history.addMove("d5");

  //     let firstMoveOfVariation = history.addMove("Bc5", mainLine);
  //     history.addMove("f4", firstMoveOfVariation);

  //     let secondVariation = history.addMove("Nf6", mainLine);
  //     history.addMove("f4", secondVariation);

  //     history.MoveTree.print();
  //     assert.strictEqual(4, 4);
  //   });
  // });
});
