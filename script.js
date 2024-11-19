class Player{
    constructor(id,value,name,score){
        this.id=id;
        this.value =value;
        this.name = name;
        this.score = score
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

    initBoard = ()=>{
        board = []
        for(let i =0;i<3;i++){
            row =[]
            for(let j =0;j<3;j++){
                row.push(Cell())
            }
            board.push(row)
        }
    }
    return {getBoard,initBoard};
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
    activePlayer = null;
    players = []
    won = false;

    board = gameBoard();
    board.initBoard()
    controller = UIController();

    init = ()=>{
        if(players.length == 0){
            players.push(new Player(0,"X","player1",0));
            players.push(new Player(1,"O","player2",0));
        }
        won =false;
        displayScore();
        board.initBoard();
        activePlayer = players[0];  
        controller.displayBoard(board);
    }

    displayScore = ()=>{
        score1 = document.querySelector(".score1");
        score2 = document.querySelector(".score2");
        score1.textContent = `${players[0].name} score: ${players[0].score}`;
        score2.textContent = `${players[1].name} score: ${players[1].score}`;
    }
    getPlayers = ()=>players;

    getActivePlayer = ()=>activePlayer;

    updatePlayers = (name1,name2)=>{
        players = [
            new Player(0,"X",name1,0),
            new Player(0,"O",name2,0),
        ]
        activePlayer = players[0];
        displayScore();

    }
    checkWin = () =>{
        for(let i =0;i<3;i++){
            if (
                board.getBoard()[i][0].getCurrent() == board.getBoard()[i][1].getCurrent() &&
                board.getBoard()[i][1].getCurrent() == board.getBoard()[i][2].getCurrent() &&
                board.getBoard()[i][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                won = true;
                return true;
            } else if (
                board.getBoard()[0][i].getCurrent() == board.getBoard()[1][i].getCurrent() &&
                board.getBoard()[1][i].getCurrent() == board.getBoard()[2][i].getCurrent() &&
                board.getBoard()[0][i].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                won = true;
                return true;
            } else if (
                board.getBoard()[0][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[2][2].getCurrent() &&
                board.getBoard()[0][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                won = true;
                return true;
            } else if (
                board.getBoard()[2][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[0][2].getCurrent() &&
                board.getBoard()[2][0].getCurrent() != "--"
            ) {
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
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
                displayScore();
                switchPlayer();
                
            }
        }

        
    }

    return{playGame,getActivePlayer,switchPlayer,checkWin,init,getPlayers,updatePlayers,displayScore};
}


const gameInstance = game();
gameInstance.init();


document.addEventListener("click",gameInstance.playGame.bind(gameInstance));


enterNames = document.querySelector(".enterNames")
submitNames = document.querySelector(".submitNames");
startButton = document.querySelector(".startButton");

player1 = document.querySelector("#player1");
player2 = document.querySelector("#player2");

dialog = document.querySelector("dialog");

enterNames.addEventListener("click",()=> dialog.show())
submitNames.addEventListener("click",function(event){
    event.preventDefault();
    player1Name =  player1.value;
    player2Name =  player2.value;
    players = gameInstance.getPlayers();
    gameInstance.updatePlayers(player1Name,player2Name);

    player1.value = "";
    player2.value = "";
    dialog.close()
})

startButton.addEventListener("click",()=> gameInstance.init());


