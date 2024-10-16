let cols; let rows; let size = 5;
let grid;
let play = false;
let history = [];
let generation = 0;

function setup()
{
    let sketchholder = createDiv();
    sketchholder.id("sketch-holder");

    let canvas = createCanvas(1000, 1000)
    canvas.parent("sketch-holder"); //place inside div

    cols = width/size;
    rows = height/size;

    grid = new Grid(); 

    let buttonholder = createDiv();
    buttonholder.id("button-holder");
    buttonholder.parent(sketchholder)

    let playButton = createButton("Play");
    playButton.parent(buttonholder);
    playButton.mousePressed(function() {playGrid(playButton)});

    let stepBackwardButton = createButton("<--");
    stepBackwardButton.parent(buttonholder);
    stepBackwardButton.mousePressed(stepBackward);

    let stepForwardButton = createButton("-->");
    stepForwardButton.parent(buttonholder);
    stepForwardButton.mousePressed(stepForward);

    let randomButton = createButton("Random")
    randomButton.parent(buttonholder)
    randomButton.mousePressed(randomGrid)

    let clearButton = createButton("Clear");
    clearButton.parent(buttonholder)
    clearButton.mousePressed(clearGrid);

    let resizeholder = createDiv();
    resizeholder.id("resize-holder");
    resizeholder.parent(sketchholder);

    let widthInput = createInput("1000", "number");
    widthInput.id('canvas-width');
    widthInput.parent(resizeholder);

    let heightInput = createInput("1000", "number");
    heightInput.id('canvas-height');
    heightInput.parent(resizeholder);

    let resizeButton = createButton("Resize Canvas (reset)");
    resizeButton.parent(resizeholder);
    resizeButton.mousePressed(function() {
        let newWidth = parseInt(widthInput.value());
        let newHeight = parseInt(heightInput.value());
        resizeCanvas(newWidth, newHeight);
        // reset grid
        cols = newWidth / size;
        rows = newHeight / size;
        grid = new Grid();
        generation = 0;
        history = [];
    });

}

function draw()
{
    background(220);
    if (play == true)
    {
        grid.update();
    }
    grid.display();
}

function playGrid(button)
{
    play = !play;
    
    if (play)
    {
        button.html("Pause");
    }
    else
    {
        button.html("Play");
    }
}

function clearGrid()
{
    grid.clearGrid();
}

function randomGrid()
{
    grid.randomGrid();
}

function mouseDragged()
{
    let x = floor(mouseX / size);
    let y = floor(mouseY / size);

    if (x >= 0 && x < cols && y >= 0 && y < rows)
    {
        grid.grid[x][y] = 1;
    }
    
}

function mousePressed()
{
    let x = floor(mouseX / size);
    let y = floor(mouseY / size);

    if (x >= 0 && x < cols && y >= 0 && y < rows)
        {
            grid.grid[x][y] = 1;
        }
}

function stepForward()
{
    if (!play)
    {
        history[generation] = grid.copy();
        grid.update();
        generation++;
        console.log(generation)
    }
}

function stepBackward()
{
    console.log(generation);
    if (!play && generation > 0)
    {
        generation--;
        grid.set(history[generation]);
    }
}