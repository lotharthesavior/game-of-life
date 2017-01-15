
/**
 * Board Object
 *
 * @param $('#element') element
 * @param integer width
 * @param integer height
 */
var Board = function (element, width, height) {

    // clean board
    $('#board').html('');

    var BoardMethods = {};

    BoardMethods.grid = [];
    BoardMethods.grid2 = [];

    BoardMethods.heartBeat;

    /**
     * Create the abstract grids
     */
    function createAbstractGrid(){
        for(var i = 0;i < width; i++){
            BoardMethods.grid.push([]);
            BoardMethods.grid2.push([]);

            for(var i2 = 0;i2 < height; i2++){
                BoardMethods.grid[i].push(false);
                BoardMethods.grid2[i].push(false);
            }
        }
    }

    /**
     * Create the DOM
     */
    function createPhysicalGrid(){
        // loop into the lines
        BoardMethods.grid.forEach(function(element, index){
            var newElement = document.createElement("div");
            newElement.classList.add('line');

            BoardMethods.grid[index].forEach(function(element2, index2){
                var newElement2 = document.createElement("div");
                newElement2.classList.add('column');
                $(newElement).append(newElement2);
            });

            $('#board').append(newElement);
        });
    }

    /**
     * build Abstract Grid
     * 
     @ @todo the original state of the cell will be random
     * @param integer width
     * @param integer height
     */
    (function(){

        createAbstractGrid();

        createPhysicalGrid();

    })();

    /**
     * Return the abstract cell
     *
     * @param line
     * @param column
     * @return bool
     */
    BoardMethods.getCell = function(line, column){
        return this.grid[line][column];
    };

    /**
     * Return an Array of neighbours
     * 
     * @param integer line
     * @param integer column
     * @return Array neighbours
     */
    BoardMethods.getNeighbours = function(line, column){

        var neighbours = [];

        line = parseInt(line);
        column = parseInt(column);

        if(
            typeof this.grid[line-1] !== "undefined"
            && typeof this.grid[line-1][column-1] !== "undefined"
        ){
            neighbours.push(this.grid[line-1][column-1]);
        }

        if(
            typeof this.grid[line-1] !== "undefined"
            && typeof this.grid[line-1][column] !== "undefined" 
        ){
            neighbours.push(this.grid[line-1][column]);
        }
        
        if(
            typeof this.grid[line-1] !== "undefined"
            && typeof this.grid[line-1][column+1] !== "undefined" 
        ){
            neighbours.push(this.grid[line-1][column+1]);
        }
        
        if(typeof this.grid[line][column-1] !== "undefined" ){
            neighbours.push(this.grid[line][column-1]);
        }
        
        if(typeof this.grid[line][column+1] !== "undefined" ){
            neighbours.push(this.grid[line][column+1]);
        }
        
        if(
            typeof this.grid[line+1] !== "undefined" 
            && typeof this.grid[line+1][column-1] !== "undefined" 
        ){
            neighbours.push(this.grid[line+1][column-1]);
        }
        
        if(
            typeof this.grid[line+1] !== "undefined" 
            && typeof this.grid[line+1][column] !== "undefined" 
        ){
            neighbours.push(this.grid[line+1][column]);
        }
        
        if(
            typeof this.grid[line+1] !== "undefined" 
            && typeof this.grid[line+1][column+1] !== "undefined" 
        ){
            neighbours.push(this.grid[line+1][column+1]);
        }

        return neighbours;
    };

    /**
     * Return the status of the specific cell
     *
     * @param integer line
     * @param integer column
     * @return bool
     */
    BoardMethods.getCellStatus = function(line, column){
        return this.grid[line][column];
    };

    /**
     * Will change the status of the cell
     * 
     * @param integer line
     * @param integer column
     * @return $('#element')
     */
    BoardMethods.changeCellStatus = function(line, column){
        this.grid2[line][column] = !this.grid[line][column];
        return $('#board');
    };

    /**
     * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
     *
     * @param integer line
     * @param integer column
     * @return bool
     */
    BoardMethods.Rule1 = function(line, column){
        var that = this;

        if( !that.getCellStatus(line, column) ){
            return "not live";
        }

        var neighbours = that.getNeighbours(line, column);

        var live_neighbours = neighbours.filter(function(value){
            return value == true;
        });

        if( live_neighbours.length < 2 ){
            that.grid2[line][column] = false;
            return true;
        }

        return false;
    };

    /**
     * Any live cell with two or three live neighbours lives on to the next generation.
     *
     * @param integer line
     * @param integer column
     * @return bool
     */
    BoardMethods.Rule2 = function(line, column){
        var that = this;

        if( !that.getCellStatus(line, column) ){
            return "not live";
        }

        var neighbours = that.getNeighbours(line, column);

        var live_neighbours = neighbours.filter(function(value){
            return value == true;
        });

        if( 
            live_neighbours.length == 2 
            || live_neighbours.length == 3 
        ){
            that.grid2[line][column] = true;
            return true;
        }

        return false;
    };

    /**
     * Any live cell with more than three live neighbours dies, as if by overpopulation.
     *
     * @param integer line
     * @param integer column
     * @return bool
     */
    BoardMethods.Rule3 = function(line, column){
        var that = this;

        if( !that.getCellStatus(line, column) ){
            return "not live";
        }

        var neighbours = that.getNeighbours(line, column);

        var live_neighbours = neighbours.filter(function(value){
            return value == true;
        });

        if( live_neighbours.length < 4 ){
            return false;
        }

        that.grid2[line][column] = false;

        return true;
    };

    /**
     * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     * @param integer line
     * @param integer column
     * @return bool
     */
    BoardMethods.Rule4 = function(line, column){
        var that = this;

        if( that.getCellStatus(line, column) ){
            return "not dead";
        }

        var neighbours = that.getNeighbours(line, column);

        var live_neighbours = neighbours.filter(function(value){
            return value == true;
        });

        if( live_neighbours.length != 3 ){
            return false;
        }

        that.grid2[line][column] = true;

        return true;
    };

    /**
     * Start the Game of Life
     *
     * @return void
     */
    BoardMethods.start = function(){
        // BoardMethods.generateRandomCells();
        clearInterval(BoardMethods.heartBeat);
        BoardMethods.heartBeat = setInterval(function(){
            if( flag ){
                BoardMethods.updateGrid();
            }
        }, 1000);
    };

    /**
     * Update abstract grid based on the rules
     *
     * @return void
     */
    BoardMethods.updateGrid = function(){
        var that = this;

        that.grid.forEach(function(element, index){

            element.forEach(function(element2, index2){

                var rule1 = that.Rule1(index, index2);

                that.Rule2(index, index2);

                that.Rule3(index, index2);

                var rule4 = that.Rule4(index, index2);

            });

        });

        that.updateGridOne();

        that.grid.forEach(function(element, index){

            element.forEach(function(element2, index2){

                if( that.getCellStatus(index, index2) ){
                    that.copyCellStatusToDOM( index, index2 );
                }else{
                    that.copyCellStatusToDOM( index, index2 );
                }

            });

        });

    };

    /**
     * Change on DOM the status based on the "action"
     *
     * @param String action (live|die)
     * @param int line
     * @param int column
     * @return void
     */
    BoardMethods.copyCellStatusToDOM = function( line, column ){

        var that = this;

        var current_board,
            current_line,
            current_column;

        if( that.getCellStatus(line, column) ){

            current_board = $('#board');
            current_line = current_board.find('.line')[line];
            current_column = $(current_line).find('.column')[column];
            
            $(current_column).addClass('live');

        }else{

        	current_board = $('#board');
            current_line = current_board.find('.line')[line];
            current_column = $(current_line).find('.column')[column];

            $(current_column).removeClass('live');

        }

    };

    /**
     *
     */
    BoardMethods.generateRandomCells = function(){
    	var that = this;

        var new_value = false;

        that.grid.forEach(function(element, index){

            element.forEach(function(element2, index2){
                
                new_value = Math.random() >= 0.5;

                if( new_value ){
                    that.grid2[index][index2] = true;
                }

            });

        });

        that.updateGridOne();

        that.updateDom();
    };

    /**
     *
     */
	BoardMethods.updateDom = function(){
		var that = this;

		that.grid.forEach(function(element, index){

            element.forEach(function(element2, index2){
                
                that.copyCellStatusToDOM(index, index2);

            });

        });
	};

    /**
     * Update grid 1 with the value of grid 2
     */
    BoardMethods.updateGridOne = function(){
        var that = this;

        that.grid2.forEach(function(element, index){

            element.forEach(function(element2, index2){

                that.grid[index][index2] = false;

                if( element2 ){
                    that.grid[index][index2] = true;
                }

            });

        });

    };

    return BoardMethods;
};