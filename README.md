# Chess History

# This repository has been Archived as Lichess now has full open source PGN_Viewr
https://github.com/lichess-org/pgn-viewer

### Chess History is a library that creates chess moves history with variations

you can use it to create chess moves and store theme in a tree.

each tree node contains move name and actual move that generated with [Chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md) library

## Installation

To install the stable version:

```
# NPM

npm install chess-history

```

## Usage

```javascript
import ChessHistory from "chess-history";
//initialize Chess History
var history = new ChessHistory();

//Add move to main line
const d3 = history.addMove("e4").addMove("e5").addMove("d3");

//Continue Main Line
d3.addMove("d5").addMove("Nf3");

// Add Variation
d3.addMove("Nf6").addMove("f4").addMove("g6").addMove("Nc3");

//show pgn
console.log(history.pgn());
```

```
# result:
1. e4 e5 2. d3 d5 (2... Nf6 3. f4 g6 4. Nc3) 3. Nf3 *

```

## Get move info

each node is an object with name and move so you can get the move like this:

```javascript
import ChessHistory from "chess-history";
//initialize Chess History
let history = new ChessHistory();

//Add move
const m1 = history.addMove("e4");

//Get Move info base on chess.js moves
console.log(m1.info);
```

```
# result:
   {color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4', Fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'}

```

## Find move by it's unique Id

each node has unique Id that you can use `findMoveById` method to get that move

```javascript
//initialize Chess History
let history = new ChessHistory();

// add some move
const e6 = history.addMove("e4").addMove("e6");
e6.addMove("d3");

// find move by it's id
let foundNode = history.findMoveById(e6.id);
console.log(foundNode.notation);
```

```
# result:
    e6

```

## Run tests

- clone repository
- npm install
- npm run test

### Examples

you can see the test files in the Test folder for more example

### contribution

feel free to fork and send PR :)

# Changelog

## [1.3.3] - 2021-08-22

### Added

- `Fen` added to move info

### Fixed

- `Pgn`, fixed for white moves
