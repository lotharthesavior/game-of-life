describe("Game Of Life", function() {
  var board;

  beforeEach(function() {
    board = new Board($('#board'), 10, 10);
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  // Board Tests -------------------------------------------------------------------------------------------

  it("Return the abstract cell.", function(){
    expect(board.getCell(0,0)).toEqual(board.grid[0][0]);
  });

  it("After instantiate Board, create abstract Grid.", function(){
    expect(board.grid.length).toEqual(10);
    expect(board.grid[0].length).toEqual(10);
  });

  it("After instantiate Board, create abstract Grid in the specific tag element.", function(){
    expect($('#board').find('.line').length).toEqual(10);
    expect($($('#board').find('.line')[0]).find('.column').length).toEqual(10);
  });

  it("getNeighbours must return the real number of cell neighbours.", function(){
    var neighbours = board.getNeighbours(1,1);
    var neighbours2 = board.getNeighbours(0,1);
    var neighbours3 = board.getNeighbours(0,0);

    var neighbours4 = board.getNeighbours(9,9);
    var neighbours5 = board.getNeighbours(0,9);
    var neighbours6 = board.getNeighbours(9,0);

    expect(neighbours.length).toEqual(8);
    expect(neighbours2.length).toEqual(5);
    expect(neighbours3.length).toEqual(3);

    expect(neighbours4.length).toEqual(3);
    expect(neighbours5.length).toEqual(3);
    expect(neighbours6.length).toEqual(3);
  });

  it("getCellStatus must return the real state of the cell.", function(){
    board.grid[0][0] = true;
    expect(board.getCellStatus(0, 0)).toEqual(true);
  });

  it("after run changeCellStatus, the status of the cell must not be the same as before.", function(){
    board.grid[0][0] = true;
    board.changeCellStatus(0,0);
    board.updateGridOne();
    expect(board.getCellStatus(0, 0)).toEqual(false);
  });

  // Game Rules Tests -------------------------------------------------------------------------------------------

  it("Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.", function(){
    board.grid[0][0] = true;

    board.grid[0][1] = true;
    board.grid[1][0] = false;
    board.grid[1][1] = false;

    board.Rule1(0,0);
    board.updateGridOne();

    expect(board.getCellStatus(0, 0)).toEqual(false);
  });

  it("Any live cell with two or three live neighbours lives on to the next generation.", function(){
    
    // board.grid[0][0] = true;
    if( !board.getCellStatus(0,0) ){
      board.changeCellStatus(0,0);
    }

    // board.grid[0][1] = true;
    if( !board.getCellStatus(0,1) ){
      board.changeCellStatus(0,1);
    }
    // board.grid[1][0] = true;
    if( !board.getCellStatus(1,0) ){
      board.changeCellStatus(1,0);
    }
    // board.grid[1][1] = true;
    if( !board.getCellStatus(1,1) ){
      board.changeCellStatus(1,1);
    }
    
    // --
    // board.grid[0][9] = true;
    if( !board.getCellStatus(0,9) ){
      board.changeCellStatus(0,9);
    }

    // board.grid[0][8] = true;
    if( !board.getCellStatus(0,8) ){
      board.changeCellStatus(0,8);
    }
    // board.grid[1][9] = true;
    if( !board.getCellStatus(1,9) ){
      board.changeCellStatus(1,9);
    }
    // board.grid[1][8] = false;
    if( board.getCellStatus(1,8) ){
      board.changeCellStatus(1,8);
    }

    // --
    // board.grid[9][9] = true;
    if( !board.getCellStatus(9,9) ){
      board.changeCellStatus(9,9);
    }

    // board.grid[8][8] = true;
    if( !board.getCellStatus(8,8) ){
      board.changeCellStatus(8,8);
    }
    // board.grid[8][9] = false;
    if( board.getCellStatus(8,9) ){
      board.changeCellStatus(8,9);
    }
    // board.grid[9][8] = false;
    if( board.getCellStatus(9,8) ){
      board.changeCellStatus(9,8);
    }

    // --
    board.updateGridOne();

    board.Rule1(0,0);
    board.Rule2(0,0);
    board.Rule3(0,0);
    board.Rule4(0,0);

    board.Rule1(0,9);
    board.Rule2(0,9);
    board.Rule3(0,9);
    board.Rule4(0,9);

    board.Rule1(9,9);
    board.Rule2(9,9);
    board.Rule3(9,9);
    board.Rule4(9,9);

    board.updateGridOne();
    
    expect(board.getCellStatus(0, 0)).toEqual(true);
    expect(board.getCellStatus(0, 9)).toEqual(true);
    expect(board.getCellStatus(9, 9)).toEqual(false);
  });

  it("Any live cell with more than three live neighbours dies, as if by overpopulation.", function(){
    // board.grid[1][1] = true;
    if( !board.getCellStatus(1,1) ){
      board.changeCellStatus(1,1);
    }

    // board.grid[0][0] = true;
    if( !board.getCellStatus(0,0) ){
      board.changeCellStatus(0,0);
    }
    // board.grid[0][1] = true;
    if( !board.getCellStatus(0,1) ){
      board.changeCellStatus(0,1);
    }
    // board.grid[1][0] = true;
    if( !board.getCellStatus(1,0) ){
      board.changeCellStatus(1,0);
    }
    // board.grid[0][2] = true;
    if( !board.getCellStatus(0,2) ){
      board.changeCellStatus(0,2);
    }

    board.updateGridOne();

    board.Rule3(1,1);

    board.updateGridOne();

    expect(board.getCellStatus(1, 1)).toEqual(false);
  });

  it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function(){
    // board.grid[0][0] = false;
    if( board.getCellStatus(0,0) ){
      board.changeCellStatus(0,0);
    }

    // board.grid[0][1] = true;
    if( !board.getCellStatus(0,1) ){
      board.changeCellStatus(0,1);
    }
    // board.grid[1][0] = true;
    if( !board.getCellStatus(1,0) ){
      board.changeCellStatus(1,0);
    }
    // board.grid[1][1] = true;
    if( !board.getCellStatus(1,1) ){
      board.changeCellStatus(1,1);
    }

    board.updateGridOne();

    board.Rule4(0,0);

    board.updateGridOne();
    
    expect(board.getCellStatus(0, 0)).toEqual(true);
  });

  // TODO: not working well
  it("DOM must be exactly the same as the abstract.", function(){

    board.generateRandomCells();
    board.updateGrid();

    window.the_same = true;

    Object
      .keys($('.line'))
      .map(function (key) {
        return $('.line')[key]; 
      })
      .filter(function(element){
        return $(element).hasClass('line');
      })
      .forEach(function(element, index){ 

        Object
          .keys($(element).find('.column'))
          .map(function(key2){
            return $(element).find('.column')[key2];
          })
          .filter(function(element){
            return $(element).hasClass('column');
          })
          .forEach(function(element2, index2){

            if( 
              (
                board.getCellStatus(index, index2) == false
                && $(element2).hasClass('live') == true
              )
              || (
                board.getCellStatus(index, index2) == true
                && $(element2).hasClass('live') == false
              )
            ){
              window.the_same = false;
            }

          });

      });

    jasmine.clock().tick(1001);

    expect(window.the_same).toEqual(true);
  });

});