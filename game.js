var boardArr = [
    ['z','z','z'],
    ['z','z','z'],
    ['z','z','z']
];

// console.table(boardArr);
var playerOne = 'x';
var playerTwo = 'o';
var currentPlayer = playerOne

var $htmlBoard = $('.board');

$htmlBoard.click(function(event){
    var $el = $(event.target);

    if ($el.html() !== ""){return;}

    var location = $el.data("num").toString().split('')
    var row = location[0]
    var col = location[1]

    $el.html(currentPlayer);
    boardArr[row][col] = currentPlayer;
    
    if (checkRow(row) || checkCol(col) || checkDOne() || checkDTwo()){
        console.log("YOU WIN")
    }
    
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
})

var checkRow = function(row){
    var rowLen = boardArr[row].length;

    for (var i = 0; i<rowLen; ++i){
        if (boardArr[row][i] !== currentPlayer) {return false;}
    }
    return true;
}

var checkCol = function(col){
    var colLen = boardArr[col].length;

    for (var i = 0; i<colLen; ++i){
        if (boardArr[i][col] !== currentPlayer) {return false;}
    }
    return true;
}

var checkDOne = function(){
    var bLen = boardArr.length;

    for (var i = 0; i<bLen; ++i){
        if(boardArr[i][i] !== currentPlayer){ return false; }
    }
    return true;
}

var checkDTwo = function(){
    var bLen = boardArr.length;
    var col = boardArr.length - 1;

    for (var i = 0; i<bLen; ++i){
        if(boardArr[i][col] !== currentPlayer){ return false; }
        col --
    }
    return true;
}
