
/**
 * Board Object
 *
 * @param $('#element') element
 * @param integer width
 * @param integer height
 */
var Board = function(element, width, height){

	// clean board
	$('#board').html('');

	var BoardMethods = {};

	BoardMethods.grid = [];

	/**
	 * 
	 */
	function createAbstractGrid(){
		for(var i = 0;i < width; i++){
			BoardMethods.grid.push([]);

			for(var i2 = 0;i2 < height; i2++){
				BoardMethods.grid[i].push(false);
			}
		}
	}

	/**
	 *
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
	 * build Grid
	 *
	 * @param $('#element') element
	 * @param integer width
	 * @param integer height
	 */
	(function(){
		// var btn = document.createElement("BUTTON");
	})();

	/**
	 * Return an Array of neighbours
	 * 
	 * @param integer line
	 * @param integer column
	 * @return Array neighbours
	 */
	BoardMethods.getNeighbours = function(line, column){
		return [];
	};

	/**
	 * Return the status of the specific cell
	 *
	 * @param integer line
	 * @param integer column
	 * @return bool
	 */
	BoardMethods.getCellStatus = function(line, column){
		
	};

	/**
	 * Will change the status of the cell
	 * 
	 * @param integer line
	 * @param integer column
	 * @return $('#element')
	 */
	BoardMethods.changeCellStatus = function(line, column){
		
	};


    /**
     * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
     *
     * @param integer line
	 * @param integer column
     * @return bool
     */
    BoardMethods.Rule1 = function(line, column){

    };

    /**
     * Any live cell with two or three live neighbours lives on to the next generation.
     *
     * @param integer line
	 * @param integer column
     * @return bool
     */
    BoardMethods.Rule2 = function(line, column){

    };

    /**
     * Any live cell with more than three live neighbours dies, as if by overpopulation.
     *
     * @param integer line
	 * @param integer column
     * @return bool
     */
    BoardMethods.Rule3 = function(line, column){

    };

    /**
     * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     * @param integer line
	 * @param integer column
     * @return bool
     */
    BoardMethods.Rule4 = function(line, column){

    };

	return BoardMethods;
};