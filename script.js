class Player{
    constructor(id,value,name,score){
        this.id=id;
        this.value =value;
        this.name = name;
        this.score = score
    }
}

function Cell(){
    let currentValue = "";
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
        alert(activePlayer.name + " has won the game!!");
    }
    displayDraw = ()=>{
        alert("It's a tie");
    }
    return{displayBoard,displayWinner,displayDraw};
}

function game(){
    activePlayer = null;
    players = []

    board = gameBoard();
    board.initBoard()
    controller = UIController();

    init = ()=>{
        if(players.length == 0){
            players.push(new Player(0,"X","player1",0));
            players.push(new Player(1,"O","player2",0));
        }
        board.initBoard();
        activePlayer = players[0];  
        displayScore();
        controller.displayBoard(board);
    }

    reset = ()=>{
        players = [];
        players.push(new Player(0,"X","player1",0));
        players.push(new Player(1,"O","player2",0));
    
        init();  
    }
    displayScore = ()=>{
        score1 = document.querySelector(".score1");
        score2 = document.querySelector(".score2");
        turn = document.querySelector(".turn");
        score1.textContent = ` (${players[0].value}) ${players[0].name} score: ${players[0].score}`;
        score2.textContent = `(${players[1].value}) ${players[1].name} score: ${players[1].score}`;
        turn.textContent = `It s ${getActivePlayer().value} turn`;
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
        init();

    }
    checkWin = () =>{
        for(let i =0;i<3;i++){
            if (
                board.getBoard()[i][0].getCurrent() == board.getBoard()[i][1].getCurrent() &&
                board.getBoard()[i][1].getCurrent() == board.getBoard()[i][2].getCurrent() &&
                board.getBoard()[i][0].getCurrent() != ""
            ) {
                winSound.play();
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                return true;
            } else if (
                board.getBoard()[0][i].getCurrent() == board.getBoard()[1][i].getCurrent() &&
                board.getBoard()[1][i].getCurrent() == board.getBoard()[2][i].getCurrent() &&
                board.getBoard()[0][i].getCurrent() != ""
            ) {
                winSound.play();
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                return true;
            } else if (
                board.getBoard()[0][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[2][2].getCurrent() &&
                board.getBoard()[0][0].getCurrent() != ""
            ) {
                winSound.play();
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                return true;
            } else if (
                board.getBoard()[2][0].getCurrent() == board.getBoard()[1][1].getCurrent() &&
                board.getBoard()[1][1].getCurrent() == board.getBoard()[0][2].getCurrent() &&
                board.getBoard()[2][0].getCurrent() != ""
            ) {
                winSound.play();
                controller.displayWinner(activePlayer);
                activePlayer.score+=1;
                return true;
            }
            
            
        }
        let k=0;
        for(let i =0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board.getBoard()[i][j].getCurrent() != "")
                    k+=1;
            }
        }
        if(k ==9){
            winSound.play();
            controller.displayDraw();
            return true
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
        if(event.target.classList.contains("box")){
            controller.displayBoard(board);
            id = event.target.id;
            player = getActivePlayer();
            cell = board.getBoard()[Math.floor(id/3)][id%3]
            if(cell.getCurrent()==""){
                clickSound.play();
                cell.changeCurrent(player);
                controller.displayBoard(board);
                event.target.classList.remove("O");
                event.target.classList.remove("X");
                event.target.classList.add(`${player.value}`);
                

                setTimeout(() => {
                    if(checkWin()==false){
                        switchPlayer();
                        displayScore();
                    }
                    else{
                        init();
                    } 
                }, 5);

            }
        }
    
    }

    return{playGame,getActivePlayer,switchPlayer,checkWin,init,getPlayers,updatePlayers,displayScore,reset};
}

var clickSound = new Audio("click.mp3");
var winSound = new Audio("tada.mp3");

const gameInstance = game();
gameInstance.init();


document.addEventListener("click",gameInstance.playGame.bind(gameInstance));


enterNames = document.querySelector(".enterNames")
submitNames = document.querySelector(".submitNames");
resetButton = document.querySelector(".resetButton");

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

resetButton.addEventListener("click",()=>{
    gameInstance.reset()
    dialog.close();
});


