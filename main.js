(function(){
    console.log("We are connected");

    let board = document.querySelector('.board');
    let userForm = document.querySelector('.choice');
    let reset = document.querySelector('.reset');
    let pOneRecord = document.querySelector('[data-player = "one"]');
    let pTwoRecord = document.querySelector('[data-player = "two"]');
    let boardArr = [];
    let boardSize = 0;
    let players = {
        1: {userName: "", piece: "X", wins: 0, losses: 0, ties: 0},
        2: {userName: "", piece: "O", wins: 0, losses: 0, ties: 0}
    };
    let currPlayer = players[1];
    let gameFinish = false;

    userForm.addEventListener('submit', function(event){
        event.preventDefault();

        if (boardArr.length !== 0 || gameFinish){return;}

        if (document.querySelector('.pOne>input[type="text"]').value === "" || document.querySelector('.pTwo>input[type="text"]').value === ""){
            alert("Please Enter Names For Both Players");
            return;
        }
        
        let data = event.target;

        players[1].userName = document.querySelector('.pOne>input[type="text"]').value;
        players[2].userName = document.querySelector('.pTwo>input[type="text"]').value;

        boardSize = document.querySelector('input[name="size"]:checked').value;
        
        createBoard(boardSize); 
        updatePlayerOneRecord();       
        updatePlayerTwoRecord();
    })

    reset.addEventListener('click', function(){
        resetGame()
    });

    board.addEventListener('click', function(event){
        if (boardSize === 0 || gameFinish){return;}

        let el = event.target;

        if (el.innerHTML === 0){return;}

        let location = event.target.dataset.num.split("");
        let row = location[0];
        let col = location[1];

        el.textContent = currPlayer.piece;
        boardArr[row][col] = currPlayer.piece;

        if (checkRow(row) || checkCol(col) || checkDOne() || checkDTwo()){
            gameFinish = true;
            alert(`CONGRATS ${currPlayer.userName} YOU WIN`)
        }

        currPlayer = currPlayer.piece === players[1].piece ? players[2] : players[1];
    })

    var createBoard = function(size){

        for (let i=0; i<size; ++i){
            let row = document.createElement('section');
            row.className = "row";            

            boardArr.push([])

            for (let j = 0; j<size; ++j){
                let box = document.createElement('div');
                box.className = "box";
                
                let dataNum = i.toString() + j.toString();
                
                box.setAttribute("data-num", dataNum);

                row.appendChild(box)

                boardArr[i].push(0)
            }
            board.appendChild(row);
        }
    }

    var checkRow = function(row){
        var rowLen = boardArr[row].length;

        for (var i = 0; i<rowLen; ++i){
            if (boardArr[row][i] !== currPlayer.piece) {return false;}
        }
        return true;
    }

    var checkCol = function(col){
        var colLen = boardArr[col].length;

        for (var i = 0; i<colLen; ++i){
            if (boardArr[i][col] !== currPlayer.piece) {return false;}
        }
        return true;
    }

    var checkDOne = function(){
        var bLen = boardArr.length;

        for (var i = 0; i<bLen; ++i){
            if(boardArr[i][i] !== currPlayer.piece){ return false; }
        }
        return true;
    }

    var checkDTwo = function(){
        var bLen = boardArr.length;
        var col = boardArr.length - 1;

        for (var i = 0; i<bLen; ++i){
            if(boardArr[i][col] !== currPlayer.piece){ return false; }
            col --
        }
        return true;
    }

    var resetGame = function(){
        console.log('reseting shit')
        boardArr = [];
        boardSize = 0;
        while (board.firstChild){
            console.log(board.firstChild)
            board.removeChild(board.childNodes[0]);
        }
        currPlayer = players[1]
        gameFinish = false;
        console.log(board)
    }

    var updatePlayerOneRecord = function(){
        pOneRecord.style.display = "block";

        let h3 = document.createElement('h3')
        h3.innerHTML = "Welcome! " + players[1].userName;

        let wins = document.createElement("h5")
        wins.innerHTML = "Wins: " + players[1].wins;

        let losses = document.createElement("h5")
        losses.innerHTML = "Losses: " + players[1].losses;

        let ties = document.createElement("h5")
        ties.innerHTML = "Ties: " + players[1].ties;

        pOneRecord.appendChild(h3);
        pOneRecord.appendChild(wins);
        pOneRecord.appendChild(losses);
        pOneRecord.appendChild(ties);
    }

    var updatePlayerTwoRecord = function(){
        pTwoRecord.style.display = "block";

        let h3 = document.createElement('h3')
        h3.innerHTML = "Welcome! " + players[2].userName;

        let wins = document.createElement("h5")
        wins.innerHTML = "Wins: " + players[2].wins;

        let losses = document.createElement("h5")
        losses.innerHTML = "Losses: " + players[2].losses;

        let ties = document.createElement("h5")
        ties.innerHTML = "Ties: " + players[2].ties;

        pTwoRecord.appendChild(h3);
        pTwoRecord.appendChild(wins);
        pTwoRecord.appendChild(losses);
        pTwoRecord.appendChild(ties);
    }

}());
