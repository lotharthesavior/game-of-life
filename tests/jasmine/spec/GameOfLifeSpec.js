describe("Game Of Life", function() {
  var board;

  beforeEach(function() {
    board = new Board($('#board'), 10, 10);
  });

  // Board Tests -------------------------------------------------------------------------------------------

  it("After instantiate Board, create abstract Grid.", function(){
    expect(board.grid.length).toEqual(10);
    expect(board.grid[0].length).toEqual(10);
  });

  it("After instantiate Board, create abstract Grid in the specific tag element.", function(){
    console.log($('#board').find('.line').length);

    expect($('#board').find('.line').length).toEqual(10);
    expect($($('#board').find('.line')[0]).find('.column').length).toEqual(10);
  });

  it("getNeighbours must return the real number of cell neighbours.", function(){
    var neighbours = board.getNeighbours(1,1);
    var neighbours2 = board.getNeighbours(0,1);
    var neighbours3 = board.getNeighbours(0,0);

    expect(neighbours.length).toEqual(8);
    expect(neighbours2.length).toEqual(5);
    expect(neighbours3.length).toEqual(3);
  });

  it("getCellStatus must return the real state of the cell.", function(){
    board.grid[0][0] = true;
    expect(board.getCellStatus(0, 0)).toEqual(true);
  });

  it("after run changeCellStatus, the status of the cell must not be the same as before.", function(){
    board.grid[0][0] = true;
    board.changeCellStatus(0,0);
    expect(board.getCellStatus(0, 0)).toEqual(false);
  });

  // Game Rules Tests -------------------------------------------------------------------------------------------

  it("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", function(){
    board.grid[0][0] = true;

    board.grid[0][1] = true;
    board.grid[1][0] = false;
    board.grid[1][1] = false;

    board.Rule1(0,0);

    expect(board.getCellStatus(0, 0)).toEqual(false);
  });

  it("Any live cell with two or three live neighbours lives on to the next generation.", function(){
    board.grid[0][0] = true;

    board.grid[0][1] = true;
    board.grid[1][0] = true;
    board.grid[1][1] = true;
    
    board.grid[0][9] = true;

    board.grid[0][8] = true;
    board.grid[1][9] = true;
    board.grid[1][8] = false;

    board.Rule2(0,0);
    board.Rule2(0,9);

    expect(board.getCellStatus(0, 0)).toEqual(true);
    expect(board.getCellStatus(0, 9)).toEqual(true);
  });

  it("Any live cell with more than three live neighbours dies, as if by overpopulation.", function(){
    board.grid[1][1] = true;

    board.grid[0][0] = true;
    board.grid[0][1] = true;
    board.grid[1][0] = true;
    board.grid[0][2] = true;

    board.Rule3(1,1);

    expect(board.getCellStatus(1, 1)).toEqual(false);
  });

  it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function(){
    board.grid[0][0] = false;

    board.grid[0][1] = true;
    board.grid[1][0] = true;
    board.grid[1][1] = true;

    board.Rule4(0,0);

    expect(board.getCellStatus(0, 0)).toEqual(true);
  });

});