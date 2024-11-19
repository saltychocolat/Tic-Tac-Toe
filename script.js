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
        grid = document.querySelector(".grid-container")
        boxes = grid.children;
        let i=0;
        let j =0;
        for(let k=0;k<9;k++){
            j=k%3;
            if(k%3==0 && k!=0){
                i+=1;
            }
            boxes[k].textContent = board.getBoard()[i][j].getCurrent();
        }
        
    }
    displayWinner = (activePlayer) =>{
        console.log(activePlayer.name);
    }
    return{displayBoard,displayWinner};
}

function game(){
    players = []
    players.push(new Player(0,"X","player1"));
    players.push(new Player(1,"O","player2"));
    activePlayer = players[0];

    won = false;

    board = gameBoard();
    controller = UIController();

    init = ()=>{
        document.addEventListener("click",playGame);
        controller.displayBoard(board);
    }

    getActivePlayer = ()=>activePlayer;

    checkWin = () =>{
        for(let i =0;i<3;i++){
            if (
                board.getBoard()[i][0].getCurrent() == board.getBoard()[i][1].getCurrent() &&
                board.getBoard()[i][1].getCurrent() == board.getBoard()[i][2].getCurrent() &&
                board.getBoard()[i][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                won = true;
                return true;
            } else if (
                board.getBoard()[0][i].getCurrent() == board.getBoard()[1][i].getCurrent() &&
                board.getBoard()[1][i].getCurrent() == board.getBoard()[2][i].getCurrent() &&
                board.getBoard()[0][i].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                won = true;
                return true;
            } else if (
                board.getBoard()[0][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[2][2].getCurrent() &&
                board.getBoard()[0][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                won = true;
                return true;
            } else if (
                board.getBoard()[2][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[0][2].getCurrent() &&
                board.getBoard()[2][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                won = true;
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

    playGame = (event)=>{
        if(won == false){
            if(event.target.classList.contains("box")){
                controller.displayBoard(board);
                id = event.target.id;
                player = getActivePlayer();
                cell = board.getBoard()[Math.floor(id/3)][id%3]
                cell.changeCurrent(player);
                controller.displayBoard(board);

                checkWin();
                switchPlayer();
                
            }
        }

        
    }

    return{playGame,getActivePlayer,switchPlayer,checkWin,init};
}

game  = game();

game.init();
