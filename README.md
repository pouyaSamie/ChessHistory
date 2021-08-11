# Chess History

### Chess History is a library that creates chess moves history with variations

you can use it to create chess moves and store theme in a tree.

each tree node contains move name and actual move that generated with [Chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md) library

# This library is still under development

## Installation

To install the stable version:

```
# NPM

npm install chesshistory

```

## Usage

```javascript
import ChessHistory from "chesshistory";
//initialize Chess History
let history = new ChessHistory();

//Add move to main line
const m1 = history.addMove("e4");
history.addMove("e6");
history.addMove("d3");
history.addMove("d5");
history.addMove("Nd2");

//Add variation for first move
history.addMove("d5", m1);
history.addMove("f3", m1);
history.addMove("e6", m1);
history.addMove("Ne2", m1);

//visualize history
history.print();

//show pgn
console.log(history.pgn()); // not completed it just prints the main moves
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

```javascript
import ChessHistory from "chesshistory";
//initialize Chess History
let history = new ChessHistory();

//Add move
const m1 = history.addMove("e4");

//Get Move Data base on chess.js moves
console.log(m1.data);
```

```
# result:
    { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' }

```

## Find move by it's unique Identifier

each node has unique identifier that you can use `findMoveById` method to get that move

```javascript
//initialize Chess History
let history = new ChessHistory();

// add some move
history.addMove("e4");
const m1 = history.addMove("e6");
history.addMove("d3");

// find move by it's identifier
let foundNode = history.findMoveById(m1.identifier);
```

## Run tests

- clone repository
- npm install
- npm run test

### Examples

you can see the test files in Test folder for more example
