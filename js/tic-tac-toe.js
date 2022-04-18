var canvas = document.getElementById("tic-tac-toe")
canvas.addEventListener("click", handleCanvasClick)
var ctx = canvas.getContext("2d");
var canvasWidth = canvas.width
var canvasHeight = canvas.height

var currentPlayer
var currentPlayerEl = document.getElementById("player-selected")
var winnerEl = document.getElementById("winner-selected")
var data;

function initData() {
    data = [["", "", ""], ["", "", ""], ["", "", ""]]
    currentPlayer = "X"
    currentPlayerEl.innerHTML = currentPlayer
    winnerEl.innerHTML = ""
}

function reset() {
    initData()
    clearBoard()
    drawBoard()
}

function clearBoard() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawBoard() {

    ctx.shadowColor = '#FFF';
    ctx.strokeStyle = 'black';

    let lineY = canvasHeight / 3

    for (let i = 1; i <= 2; i++) {
        ctx.moveTo(0, lineY * i);
        ctx.lineTo(canvasWidth, lineY * i);
        ctx.stroke();
    }

    let lineX = canvasWidth / 3
    for (let i = 1; i <= 2; i++) {
        ctx.moveTo(lineX * i, 0);
        ctx.lineTo(lineX * i, canvasHeight);
        ctx.stroke();
    }
}

function render(pos) {
    let lineYSize = canvasHeight / 3
    let lineXSize = canvasWidth / 3

    let centerX = (lineXSize * pos[0]) - (lineXSize / 2)
    let centerY = (lineYSize * pos[1]) - (lineYSize / 2)

    ctx.strokeStyle = '#ad2323';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#656565';
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(currentPlayer, centerX, centerY);

}

function handleCanvasClick(ev) {
    validInput(ev)
    let pos = play(ev)
    render(pos)
    if(checkWinner()){
        winnerEl.innerHTML = currentPlayer
    } else {
        choosePlayer()
    }
    
}

function checkWinner(){

    // checks lines
    for(let i = 0; i < data.length; i++){
        let score = 0;
        for(let j = 0; j < i.length; j++){
            if(data[i][j] == currentPlayer)  
                score++
            else 
                break;
        }
        if(score == 3) return true;
    }

    // checks columns
    for(let i = 0; i < data.length; i++){
        let score = 0;
        for(let j = 0; j < i.length; j++){
            if(data[j][i] == currentPlayer)  
                score++
            else 
                break;
        }
        if(score == 3) return true;
    }
}

function validInput(ev) {
    if (ev.offsetX < 0 || ev.offsetX > canvasWidth) throw Error("Invalid Axis Value")

    if (ev.offsetY < 0 || ev.offsetY > canvasHeight) throw Error("Invalid Axis Value")
}

function choosePlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    currentPlayerEl.innerHTML = currentPlayer
}

function play(ev) {
    let y = ev.offsetY
    let x = ev.offsetX

    let lineXSize = canvasWidth / 3
    let lineYSize = canvasHeight / 3

    let xSquare = Math.ceil(x / lineXSize)
    let ySquare = Math.ceil(y / lineYSize)

    if (data[xSquare - 1][ySquare - 1]) throw Error("Not empty")
    data[xSquare - 1][ySquare - 1] = currentPlayer

    return [xSquare, ySquare]

}

drawBoard()
initData()