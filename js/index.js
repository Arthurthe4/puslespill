//Modell
var image = new Image();
image.onload = cutImageUp;
image.src = "../src/bil.jpg";
var numColsToCut = 3;
var numRowsToCut = 3;
var widthOfOnePiece = image.width/numColsToCut;
var heightOfOnePiece = image.height/numRowsToCut;
var imagePieces = [];

//Viewer
function show() {
    var table = document.getElementById("table")
    var piecearea = document.getElementById("piecearea")
    var pieceHeight = 700/numRowsToCut
    var pieceWidth = 700/numColsToCut
    table.innerhtml += `
    <div id="puzzlearea" 
    style="
        grid-template-rows: repeat(${numRowsToCut}, ${pieceHeight});
        grid-template-columns: auto;
    ">
    </div>
    `
    for (i = 1; i <= numRowsToCut; i++) {
        var puzzlearea = document.getElementById("puzzlearea")
        puzzlearea.innerHTML += `
            <div 
                id="row${i}" 
                class="row" 
                style=";
                height: auto;
                display: grid;
                grid-template-columns: repeat(${numColsToCut}, ${pieceWidth}px);
                ">
                </div>
        `;
        for ( c = 1; c <= numColsToCut; c++) {
            var row = document.getElementById("row"+i)
            row.innerHTML += `
            <div 
                id="piece${i}${c}" 
                ondrop="drop(event)" 
                ondragover="allowDrop(event)" 
                class="place fill" 
                style="height:${pieceHeight}px; width:${pieceWidth}px;">
                </div>
            `;
        }
    }
    for (var i in imagePieces) {
        piecearea.innerHTML += `
        <div id="piece${i}" 
        ondrop="drop(event)" 
        ondragover="allowDrop(event)"  
        width="${pieceWidth}" 
        height="${pieceHeight}"> 
        <img src="${imagePieces[i]}" draggable="true" ondragstart="drag(event)" id="drag${i}"> 
        </div>`
    }
}
//Controller// This is the part which cut the image into pieces. 
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
    }// imagePieces now contains data urls of all the pieces of the image
}
// Drag and Drop func
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id).parentElement.classList.remove("taken")
}
function drop(ev) {
    ev.preventDefault();
    if(ev.target.classList.contains("taken")) return
    else {
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        ev.target.classList.add("taken")
    }


}