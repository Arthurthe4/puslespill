//Modell
var image = new Image();
image.onload = cutImageUp;
image.src = "../src/bil.jpg";
var numColsToCut = 3;
var numRowsToCut = 3;
var widthOfOnePiece = Math.floor(image.width/numColsToCut);
var heightOfOnePiece = Math.floor(image.height/numRowsToCut);
var imagePieces = [];
var puzzleplaces = [];
var pieceplaces = [];
var images = []
start()
console.log(images)

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
    //Puzzlearea
    for (let i = 0; i<= (numberofpieces-1); i++) {
        let div = document.createElement("div")
        div.id = i
        div.addEventListener("drop", dropA)
        div.addEventListener("dragover", allowDrop)
        div.classList.add("place")
        div.style.height = heightOfOnePiece
        div.style.width = widthOfOnePiece
        //fill with pictures if necessary
        if (puzzleplaces[i] != "") {
            for( var a in images) {
                if (images[a].id == puzzleplaces[i]) {
                    div.appendChild(images[a])
                }
            }
        }
        puzzlearea.appendChild(div)
    }

    //Piecearea
    for (var i in imagePieces) {
        let div = document.createElement("div")
        div.id = "piece"+ i
        div.ondrop = "dropB"
        div.ondragover = "allowDrop"
        div.width = widthOfOnePiece + "px"
        div.height = heightOfOnePiece + "px"
        //fill with pictures if necessary
        if (pieceplaces[i] != "") {
            for( var a in images) {
                if (images[a].id == puzzleplaces[i]) {
                    div.appendChild(images[a])
                }
            }
        }
        piecearea.appendChild(div)
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//Controller

// This is the part which cut the image into pieces. 
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
// Setting up a new game
function start() {

    for ( var i in imagePieces) {
        pieceplaces.push("p"+i)
        puzzleplaces.push("")    
    }
    for (var n = 0; n <= pieceplaces.length; n++) {
        var num = getRndInteger(0, (pieceplaces-1))
        const tmp = pieceplaces[n]
        pieceplaces[n] = pieceplaces[num]
        pieceplaces[num] = tmp
    }
    for ( var p in imagePieces) {
        let img = document.createElement("img")
        img.src = imagePieces[p]
        img.draggable = true
        img.ondragstart = drag
        img.id = "p" + p
        images.push(img)
    }
}
// Drag and Drop func
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
    ev.dataTransfer.setData("parent", ev.target.parentNode.id)    
}
function dropA(ev) {
    ev.preventDefault();
    var imgID = ev.dataTransfer.getData("text");
    var formerparentID = ev.dataTransfer.getData("parent")
        if ( puzzleplaces[ev.target.id] == "") {
            puzzleplaces[ev.target.id] = imgID;
            if(formerparentID.length = 1) {
                puzzleplaces[formerparentID] = ""
            }
            else {
                pieceplaces[formerparentID[5]] == ""
            }
        }
    show()
}
function dropB(ev) {
    ev.preventDefault()
    var imgID = ev.dataTransfer.getData("text");
    var formerparentID = ev.dataTransfer.getData("parent")
        if ( puzzleplaces[ev.target.id[5]] == "") {
            puzzleplaces[ev.target.id[5]] = imgID;
            if(formerparentID.length = 1) {
                puzzleplaces[formerparentID] = ""
            }
            else {
                pieceplaces[formerparentID[5]] == ""
            }
        }
    show()
}