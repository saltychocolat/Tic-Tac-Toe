class Player{
    constructor(id,value,name){
        this.id=id;
        this.value =value;
        this.name = name;
    }
}

function Cell(){
    let currentValue = "--";
    getCurrent  = ()=> currentValue;
    changeCurrent = (player)=>{
        currentValue = player.value;
    };
    return{getCurrent,changeCurrent};
}

function gameBoard(){
    let board = [];
    getBoard = ()=> board;

    for(let i =0;i<3;i++){
        row =[]
        for(let j =0;j<3;j++){
            row.push(Cell())
        }
        board.push(row)
    }
    return {getBoard};
}

function UIController(){
    displayBoard = (board)=>{
        for(let i =0;i<3;i++){
            console.log(board.getBoard()[i][0].getCurrent() + " | " + board.getBoard()[i][1].getCurrent() + " | " + board.getBoard()[i][2].getCurrent())
            console.log();
        }
        console.log("--------------");
    }
    displayWinner = (activePlayer) =>{
        alert(`${activePlayer.name} has won the game!`);
    }
    return{displayBoard,displayWinner};
}

function game(){
    players = []
    players.push(new Player(0,"X","player1"));
    players.push(new Player(1,"O","player2"));
    activePlayer = players[0];

    board = gameBoard();
    controller = UIController();



    getActivePlayer= ()=>activePlayer;

    checkWin = () =>{
        for(let i =0;i<3;i++){
            if (
                board.getBoard()[i][0].getCurrent() == board.getBoard()[i][1].getCurrent() &&
                board.getBoard()[i][1].getCurrent() == board.getBoard()[i][2].getCurrent() &&
                board.getBoard()[i][0].getCurrent() != "--"
            ) {
                controller.displayBoard(board);
                controller.displayWinner(activePlayer);
                return true;
            } else if (
                board.getBoard()[0][i].getCurrent() == board.getBoard()[1][i].getCurrent() &&
                board.getBoard()[1][i].getCurrent() == board.getBoard()[2][i].getCurrent() &&
                board.getBoard()[0][i].getCurrent() != "--"
            ) {
                controller.displayBoard(board);
                controller.displayWinner(activePlayer);
                return true;
            } else if (
                board.getBoard()[0][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[2][2].getCurrent() &&
                board.getBoard()[0][0].getCurrent() != "--"
            ) {
                controller.displayBoard(board);
                controller.displayWinner(activePlayer);
                return true;
            } else if (
                board.getBoard()[2][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[0][2].getCurrent() &&
                board.getBoard()[2][0].getCurrent() != "--"
            ) {
                controller.displayBoard(board);
                controller.displayWinner(activePlayer);
                return true;
            }
            
            
        }
        return false;
    }

    switchPlayer = ()=>{
        if(activePlayer==players[0])
            activePlayer =players[1];
        else
            activePlayer=players[0];
    }

    getInput = (player)=>{
        
        let line = prompt(`Its ${player.name} turn! Whats your move line?: `);
        let column = prompt(`Its ${player.name} turn! Whats your move column?: `);
        current = board.getBoard()[line][column];
        while(!(current.getCurrent()=="--")){
            alert("SAME SPOT!INVALID");
            let line = prompt(`Its ${player.name} turn! Whats your move line?: `);
            let column = prompt(`Its ${player.name} turn! Whats your move column?: `);
            current = board.getBoard()[line][column];
        }
        current.changeCurrent(player);

        
    }

    playRound = ()=>{
        controller.displayBoard(board);
        player = getActivePlayer();
        getInput(player);
    }

    return{playRound,getInput,getActivePlayer,switchPlayer,checkWin};
}

game  = game();

while(true){  
    game.playRound();
    if(game.checkWin() == true){
        break;
    }
    else
        game.switchPlayer();  
}
