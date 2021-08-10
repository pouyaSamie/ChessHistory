# ChessMoveTree

### ChessMoveTree creates a tree of moves with variations

you can use it to create chess moves and store theme in a tree.

each tree node contains move name and actual move that generated with [Chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md) library

# this library is still under development

## Usage

```
      let tree = new MoveTree();
      const m1 = tree.addMove("e4");
      tree.addMove("e6");
      tree.addMove("d3");
      tree.addMove("d5");
      tree.addMove("Nd2");
      tree.addMove("d5", m1);
      tree.addMove("f3", m1);
      tree.addMove("e6", m1);
      tree.addMove("Ne2", m1);
      tree.print();
      console.log(tree.pgn()); // not completed it just prints the main moves
```

```

# result:
root
  |(1628625486680)e4
    |(1628625486685)d5
    |(1628625486686)f3
    |(1628625486687)e6
    |(1628625486688)Ne2
  |(1628625486681)e6
  |(1628625486682)d3
  |(1628625486683)d5
  |(1628625486684)Nd2

  1. e4 d5 2. f3 e6 3. Ne2

```

## Get move data

each node is an object with name and move so you can get the move like this:

```
      let tree = new MoveTree();
      const m1 = tree.addMove("e4");
      console.log(m1.data);
```

```
# result:
    { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' }

```

## Run tests

- clone repository
- npm install
- npm run test

### Examples

you can see the test files in Test folder for more example
