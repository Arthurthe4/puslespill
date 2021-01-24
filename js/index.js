//Modell
var image = new Image();
image.onload = cutImageUp;
image.src = "../src/bil.jpg";
var numColsToCut = 3;
var numRowsToCut = 3;
var widthOfOnePiece = Math.floor(image.width/numColsToCut);
var heightOfOnePiece = Math.floor(image.height/numRowsToCut);
var imagePieces = [];
var places = [];

//Viewer
function show() {
    var table = document.getElementById("table")
    var piecearea = document.getElementById("piecearea")
    var numberofpieces = imagePieces.length
    let puzzlearea = document.createElement("div")
    puzzlearea.id = "puzzlearea"
    table.appendChild(puzzlearea)
    
    for (let i = 1; i<= numRowsToCut; i++) {
        var w = heightOfOnePiece.toString() +"px "
        var wr = w.repeat(numRowsToCut)
        puzzlearea.style.gridTemplateRows = wr
    }

    for (let i = 1; i<= numColsToCut; i++) {
        var w = widthOfOnePiece.toString() +"px "
        var wr = w.repeat(numColsToCut)
        puzzlearea.style.gridTemplateColumns = wr
    }

    for (let i = 0; i<= (numberofpieces-1); i++) {
        let div = document.createElement("div")
        div.id = i
        div.addEventListener("drop", drop)
        div.addEventListener("dragover", allowDrop)
        div.classList.add("place")
        div.style.height = heightOfOnePiece
        div.style.width = widthOfOnePiece
        puzzlearea.appendChild(div)

    }


    for (var i in imagePieces) {
        places.push("")
        let div = document.createElement("div")
        div.id = "piece"+ i
        div.ondrop = "drop"
        div.ondragover = "allowDrop"
        div.width = widthOfOnePiece + "px"
        div.height = heightOfOnePiece + "px"
        piecearea.appendChild(div)
    }
    var pieces = piecearea.children
    console.log(pieces)
    for ( var i=0; i<= (numberofpieces-1); i++) {
        var piece = pieces[i];
        console.log(piece)
        var randomnumber = getRndInteger(0, (imagePieces.length-1))
        console.log(randomnumber)
        let img = document.createElement("img")
        img.src = imagePieces[randomnumber]
        img.draggable = true
        img.ondragstart = drag
        img.id = "p" + randomnumber
        imagePieces.splice(randomnumber,1)
        piece.appendChild(img)
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//Controller// This is the part which cut the image into pieces. 
function cutImageUp() {
    for (var y = 0; y < numRowsToCut; ++y) {
        for (var x = 0; x < numColsToCut; ++x) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }// imagePieces now contains data urls of all the pieces of the image
}
// Drag and Drop func
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
    if (ev.target.parentNode.id.length == 1) places[ev.target.parentNode.id] = "";
    
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if ( places[ev.target.id] == "") {
        ev.target.appendChild(document.getElementById(data));
        places[ev.target.id] = data
    }
    console.log(places)
}