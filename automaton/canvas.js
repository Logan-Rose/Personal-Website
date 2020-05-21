let canvas = document.getElementById("board");
let page = document.getElementsByTagName("BODY")[0];
let context = canvas.getContext("2d");
let cellSize = 22;

var computed = getComputedStyle(canvas);
var w = parseInt(computed.getPropertyValue("width"), 10);
var h = parseInt(computed.getPropertyValue("height"), 10);
console.log(w  + "," + h );
window.onresize = function(){ location.reload(); };


canvas.height = h - (h % cellSize);
canvas.width = w - (w % cellSize);


let rows = canvas.height / cellSize;
let columns = canvas.width / cellSize;
let mouseDown = false;

//Initialize a 2 dimensional array for every cell on the board
let board = []
for (let i = 0; i < rows; i++) {
    board[i] = new Array(columns);
}
clearBoard();

//a function that detects if the whole board is off
function isOff(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(board[i][j]){
                return false;
            }
        }
    }
    return true;
}



//A function that sets the whole board to off
function clearBoard(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            board[i][j] = false;
        }
    }
}

//A function to create a gosper glider gun structure
function gosperGun(){
    board[5][2] = true;
    board[5][1] = true;
    board[6][1] = true;
    board[6][2] = true;
    board[5][11] = true;
    board[6][11] = true;
    board[7][11] = true;
    board[4][12] = true;
    board[8][12] = true;
    board[3][13] = true;
    board[3][14] = true;
    board[9][13] = true;
    board[9][14] = true;
    board[6][15] = true;
    board[4][16] = true;
    board[8][16] = true;
    board[5][17] = true;
    board[6][17] = true;
    board[7][17] = true;
    board[6][18] = true;
    board[3][21] = true;
    board[4][21] = true;
    board[5][21] = true;
    board[3][22] = true;
    board[4][22] = true;
    board[5][22] = true;
    board[2][23] = true;
    board[6][23] = true;
    board[1][25] = true;
    board[2][25] = true;
    board[6][25] = true;
    board[7][25] = true;
    board[3][35] = true;
    board[4][35] = true;
    board[3][36] = true;
    board[4][36] = true;
}



function condition(board, j, i){
    neighbours = []
    if(j == 0 && i == 0){
        neighbours.push(board[j][i+1]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j+1][i+1]);
      }else if(j == 0 && i == columns -1){
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j+1][i-1]);
      }else if(j == rows -1 && i ==columns-1){
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j-1][i-1]);
      }else if(j == rows -1 && i == 0){
        neighbours.push(board[j][i+1]);
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j-1][i+1]);
      }else if(j==0){
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j+1][i-1]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j+1][i+1]);
        neighbours.push(board[j][i+1]);
      }else if(j==rows-1){
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j-1][i-1]);
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j-1][i+1]);
        neighbours.push(board[j][i+1]);
      }else if(i==0){
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j][i+1]);
        neighbours.push(board[j+1][i+1]);
        neighbours.push(board[j-1][i+1]);
      }else if(i==columns-1){
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j-1][i-1]);
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j+1][i-1]);
      }else{
        neighbours.push(board[j][i+1]);
        neighbours.push(board[j][i-1]);
        neighbours.push(board[j+1][i]);
        neighbours.push(board[j+1][i+1]);
        neighbours.push(board[j+1][i-1]);
        neighbours.push(board[j-1][i]);
        neighbours.push(board[j-1][i+1]);
        neighbours.push(board[j-1][i-1]);
    }
    return neighbours;
}

function conway(cell, neighbours){
    neighbours.filter(isTrue);
    let neighbourCount = neighbours.filter(isTrue).length;
    if(cell && (neighbourCount ==2 || neighbourCount == 3)){
        //console.log("Alive " + neighbourCount +  true)
        return true;
    } else if(!cell && neighbourCount ==3){
        //console.log("Dead " + neighbourCount + true)
        return true;
    }else{
        return false;
    }
}

function rose(cell, neighbours){
    neighbours.filter(isTrue)
    let neighbourCount = neighbours.filter(isTrue).length
    if(cell && (neighbourCount % 2 ==0)){
        //console.log("Alive " + neighbourCount +  true)
        return true;
    } else if(!cell && (neighbourCount % 2 == 1)){
        return true;
    }else{
        return false;
    }
}



algorithms = [conway, rose]
function isTrue(x){
    return x;
}

let playing = false
let gameLoop;
let gameSpeed = -1
function setSpeed(speed){
    if(speed ==30){
        document.getElementById("fast").style.background = "#50BFE6";
        document.getElementById("medium").style.background = "white";
        document.getElementById("slow").style.background = "white";
    }else if(speed == 250){
        document.getElementById("fast").style.background = "white";
        document.getElementById("medium").style.background = "#50BFE6";
        document.getElementById("slow").style.background = "white";
    } else if(speed == 500){
        document.getElementById("fast").style.background = "white";
        document.getElementById("medium").style.background = "white";
        document.getElementById("slow").style.background = "#50BFE6";
    }
    if(playing){
        clearInterval(gameLoop)
        gameSpeed = speed;
        play();
    } else{
        gameSpeed = speed;
    }
    
}

function play(){
    if(gameSpeed == -1){
        alert("You must pick a speed before playing");
    }else{
        playing = true;
        clearInterval(gameLoop);
        gameLoop = setInterval(simulate, gameSpeed);
    }

}
function pause(){
    clearInterval(gameLoop);
}

function simulate(){
    context.clearRect(0,0, canvas.width, canvas.height);
    let nextState = [];
    for (let i = 0; i < rows; i++) {
        row = [];
        for (let j = 0; j < columns; j++) {
            let neighbours = condition(board,i,j);
            if(algorithms[0](board[i][j], neighbours)){
                row[j] = true;
            } else{
                row[j] = false;
            }
            nextState[i] = row;
        }
    }
    board = nextState;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(board[j][i]){
                fillCell(i,j);
            }
        }
    }

}

//Game board listeners
window.addEventListener('mousedown',
    function(event){
        var rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;
        
        if(mouseX < canvas.width && mouseY < canvas.height){
            mouseDown = true;
            let yPos = Math.floor(mouseY / cellSize);
            let xPos = Math.floor(mouseX / cellSize);
            board[yPos][xPos] = true;
        }
    } 
)

window.addEventListener('dblclick',
    function(event){
        var rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;
        
        if(mouseX < canvas.width && mouseY < canvas.height){
            mouseDown = true;
            let yPos = Math.floor(mouseY / cellSize);
            let xPos = Math.floor(mouseX / cellSize);
            board[yPos][xPos] = false;
        }
    } 
)
window.addEventListener('mouseup',
    function(){
        mouseDown = false;
    } 
)


window.addEventListener('mousemove',
    function(event){
        if(mouseDown){
            var rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
            
            if(mouseX < canvas.width && mouseY < canvas.height){
                mouseDown = true;
                let yPos = Math.floor(mouseY / cellSize);
                let xPos = Math.floor(mouseX / cellSize);
                board[yPos][xPos] = true;
            }
        }
    } 
)


//Drawing functions
function fillCell(xPos, yPos){
    context.beginPath();
    context.fillRect(cellSize * xPos, cellSize * yPos, cellSize, cellSize);
    context.stroke();
}

function drawBoard(){
    if(!isOff()){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if(board[i][j]){
                    fillCell(j, i);
                }
            }
        }
    }

    for(let i =0; i < canvas.height; i = i + cellSize){
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.strokeStyle = "plum";
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = "#50BFE6";
    }
    for(let i =0; i < canvas.width; i = i + cellSize){
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.strokeStyle = "plum";
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = "#50BFE6";
    }
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBoard();

}


animate();