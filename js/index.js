var image = new Image();
image.onload = cutImageUp;
image.src = './src/phoenix.jpg';
widthOfOnePiece = 50;
heightOfOnePiece = 50;
numColsToCut = 10;
numRowsToCut = 10;



function cutImageUp() {
    var imagePieces = [];
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

    // load all pieces onto into the div named base

    for (var i in imagePieces) {
        document.getElementById("base").innerHTML += `<img src="${imagePieces[i]}">`

    }
    

}