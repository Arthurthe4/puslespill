//Modell

var image = new Image();
image.onload = cutImageUp;
image.src = "../src/phoenix.jpg";
var numColsToCut = 10;
var numRowsToCut = 10;
var widthOfOnePiece = 50;
var heightOfOnePiece = 50;
var imagePieces = []

//Viewer

function show() {
    var puzzlearea = document.getElementById("puzzlearea")
    var piecearea = document.getElementById("piecearea")

    puzzlearea.innerHTML += `<img id="bigPicture" src="../src/phoenix.jpg" alt='picture' >`
    for (var i in imagePieces) {
        piecearea.innerHTML += `<img src="${imagePieces[i]}">`

    }
    
}

//Controller

// This is the part which cut the image into pieces. 

function cutImageUp() {
    for(var x = 0; x < numColsToCut; ++x) {
        for(var y = 0; y < numRowsToCut; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image

    

}


// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

/* <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
  <img src="img_w3slogo.gif" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
</div>

<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div> */