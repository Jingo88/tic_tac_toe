(function(){
    console.log("We are connected");

    let board = document.querySelector('.board');
    let boardArr = [];

    let userForm = document.querySelector('.choice');

    let boardSize = 0;

    let userName = "";

    let pOne = 'X';
    let pTwo = 'O';
    let currPlayer = pOne;

    userForm.addEventListener('submit', function(event){
        event.preventDefault();

        if (boardArr.length !== 0){return;}
        
        let data = event.target

        userName = document.querySelector('.choice>input[type="text"]').value;
        boardSize = document.querySelector('input[name="size"]:checked').value;

        createBoard(boardSize);
    })

    var createBoard = function(size){

        for (let i=0; i<size; ++i){
            let row = document.createElement('section');
            row.className = "row";            

            boardArr.push([])

            for (let j = 0; j<size; ++j){
                let box = document.createElement('box');
                box.className = "box";
                
                let dataNum = i.toString() + j.toString();
                
                box.setAttribute("data-num", dataNum);

                row.appendChild(box)

                boardArr[i].push(0)
            }
            board.appendChild(row);
        }
    }

    board.addEventListener('click', function(event){
        if (boardSize === 0){return;}

        let el = event.target;

        if (el.innerHTML === 0){return;}

        let location = event.target.dataset.num.split("");
        let row = location[0];
        let col = location[1];

        el.innerHTML = currPlayer;
        boardArr[row][col] = currPlayer;

        if (checkRow(row) || checkCol(col) || checkDOne() || checkDTwo()){
            currPlayer === pOne ? alert(`CONGRATS ${userName} YOU WIN`) : alert(`YOU LOSE!!!`)
        }

        currPlayer = currPlayer === pOne ? pTwo : pOne;
    })

    var checkRow = function(row){
        var rowLen = boardArr[row].length;

        for (var i = 0; i<rowLen; ++i){
            if (boardArr[row][i] !== currPlayer) {return false;}
        }
        return true;
    }

    var checkCol = function(col){
        var colLen = boardArr[col].length;

        for (var i = 0; i<colLen; ++i){
            if (boardArr[i][col] !== currPlayer) {return false;}
        }
        return true;
    }

    var checkDOne = function(){
        var bLen = boardArr.length;

        for (var i = 0; i<bLen; ++i){
            if(boardArr[i][i] !== currPlayer){ return false; }
        }
        return true;
    }

    var checkDTwo = function(){
        var bLen = boardArr.length;
        var col = boardArr.length - 1;

        for (var i = 0; i<bLen; ++i){
            if(boardArr[i][col] !== currPlayer){ return false; }
            col --
        }
        return true;
    }

}());
