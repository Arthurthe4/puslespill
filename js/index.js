//Modell

var image = new Image();
image.onload = cutImageUp;
image.src = "../src/phoenix.jpg";
var numColsToCut = 10;
var numRowsToCut = 10;
var widthOfOnePiece = image.width/numColsToCut;
var heightOfOnePiece = image.height/numRowsToCut;
var imagePieces = []

//Viewer

function show() {
    var puzzlearea = document.getElementById("puzzlearea")
    var piecearea = document.getElementById("piecearea")

    puzzlearea.appendChild(image)
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
