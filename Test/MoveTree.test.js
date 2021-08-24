import ChessHistory from "./../src/ChessHistory.js";
import assert from "assert";

describe("MoveHistory", function () {
  describe("AddMoveToMainLoe()", function () {
    it("should add Move in main line", function () {
      let history = new ChessHistory();
      history.addMove("e4").addMove("e5").addMove("Nf3").addMove("Nf6");
      assert.strictEqual(history.getMainLine().length, 4);
    });
  });

  describe("#addVariationForMove()", function () {
    it("should create New Variation", function () {
      var history = new ChessHistory();
      var d3 = history.addMove("e4").addMove("e5").addMove("d3");

      d3.addMove("d5").addMove("Nf3");
      let f4 = d3.addMove("Bc5").addMove("f4");
      f4.addMove("d6");
      f4.addMove("b6");

      d3.addMove("Nf6").addMove("f4").addMove("g6").addMove("Nc3");
      d3.addMove("Qe7");
      assert.strictEqual(d3.Moves.length, 4);
    });
  });

  describe("#findMoveById()", function () {
    it("should finds move by id ", function () {
      var history = new ChessHistory();
      var d3 = history.addMove("e4").addMove("e5").addMove("d3");

      d3.addMove("d5").addMove("Nf3");
      let f4 = d3.addMove("Bc5").addMove("f4");
      f4.addMove("d6");
      f4.addMove("b6");

      d3.addMove("Nf6").addMove("f4").addMove("g6").addMove("Nc3");
      d3.addMove("Qe7");

      let foundNode = history.findMoveById(f4.id);
      assert.strictEqual(foundNode.notation, f4.notation);
    });
  });

  describe("#Pgn for white ()", function () {
    it("it should generate correct pgn for white ", function () {
      var expectedPgn =
        "1. e4  e5 2. d3  d5  (2... Bc5 3. f4  d6  (3... b6 )) (2... Nf6 3. f4  g6 4. Nc3 ) (2... Qe7 )3. Nf3  (3. Be2 ) *";
      var history = new ChessHistory();
      var d3 = history.addMove("e4").addMove("e5").addMove("d3");

      let d5 = d3.addMove("d5");
      d5.addMove("Nf3");
      d5.addMove("Be2");
      let f4 = d3.addMove("Bc5").addMove("f4");
      f4.addMove("d6");
      f4.addMove("b6");

      d3.addMove("Nf6").addMove("f4").addMove("g6").addMove("Nc3");
      d3.addMove("Qe7");
      console.log(history.pgn());
      assert.strictEqual(expectedPgn, history.pgn());
    });
  });

  describe("#fen()", function () {
    it("should give fen of position after move ", function () {
      var history = new ChessHistory();
      var m = history.addMove("e4").addMove("e5").addMove("Nf3").addMove("Nf6");
      assert.strictEqual(
        "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        m.info.Fen
      );
    });
  });
});
