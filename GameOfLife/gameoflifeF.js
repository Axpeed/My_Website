let cols; let rows; let size = 10;
let grid = [];

function setup()
{
    createCanvas(400, 400)
    cols = width/size;
    rows = height/size;

    for (let i = 0; i < cols; i++)
    {
        grid[i] = []
        for (let j = 0; j< rows; j++)
        {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw()
{
    background(220);
    displayGrid();

    let nextGen = [];
    for (let i = 0; i < cols; i++)
    {
        nextGen[i] = [];
        for (let j= 0; j < rows; j++)
        {
            let n = neighbors(grid, i, j); 

            if (grid[i][j] == 1 && n < 2) // underpopulation
            {
                nextGen[i][j] = 0;
            }
            else if (grid[i][j] == 1 && (n == 2 || n == 3)) // healthy
            {
                nextGen[i][j] = 1;
            }
            else if (grid[i][j] == 1 && n > 3) // overpopulation
            {
                nextGen[i][j] = 0;
            }
            else if (grid[i][j] == 0 && n == 3) // reproduction
            {
                nextGen[i][j] = 1;
            }
            else
            {
                nextGen[i][j] = grid[i][j]; // otherwise remain same
            }
        }
    }
    grid = nextGen;
}

function displayGrid()
{
    for (let i = 0; i < cols; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                if (grid[i][j] == 0)
                {
                    fill(255);
                }
                else
                {
                    fill(0);
                }
                noStroke();
                rect(i * size, j * size, size, size );
            }
        }
}

function neighbors(grid, x, y) // finite grid not wrapping
{
    let sum = 0;
    if (x == 0) // first col case
    {
        for (let i = 0; i < 2; i++) // traverse right
        {
            if (y == 0) // first row case
            {
                for (let j = 0; j < 2; j++) // traverse below
                {
                    sum+= grid[x + i][y + j];
                }
            }
            else if (y == rows - 1) // last row case
            {
                for (let j = -1; j < 1; j++)
                {
                    sum += grid[x + i][y + j]; // tarverse above
                }
            }
            else // only if first col
            {
                for (let j = -1; j < 2; j++) // traverse above and below
                {
                    sum+= grid[x + i][y + j];
                }
            }
        }
    }
    else if (x == cols - 1) // last col case
    {
        for (let i = -1; i < 1; i++) // traverse left
        {
            if (y == 0) // first row case
            {
                for (let j = 0; j < 2; j++) // traverse below
                {
                    sum+= grid[x + i][y + j];
                }
            }
            else if (y == rows - 1) // last row case
            {
                for (let j = -1; j < 1; j++)
                {
                    sum += grid[x + i][y + j]; // tarverse above
                }
            }
            else // only if last col
            {
                for (let j = -1; j < 2; j++) // traverse above and below
                {
                    sum+= grid[x + i][y + j];
                }
            }
            
        }
    }
    else if (y == 0) // first row case
    {
        if (x == 0) // first col case
        {
            for (let i = 0; i < 2; i++) // traverse right
            {
                for (let j = 0; j < 2; j++) // traverse below
                {
                    sum += grid[x + i][y + j];
                }
            }
        }
        else if (x == cols - 1) // last col case
        {
            for (let i = -1; i < 1; i++) // traverse left
            {
                for (let j = 0; j < 2; j++) // traverse below
                {
                    sum += grid[x + i][y + j];
                }
            }
        }
        else // only first row
        {
            for (let i = -1; i < 2; i++) // traverse left and right
            {
                for (let j = 0; j < 2; j++) // traverse below
                {
                    sum+= grid[x + i][y + j];
                }
            }
        }
        
    }
    else if (y == rows - 1) // last row case
    {
        if (x == 0) // first col case
        {
            for (let i = 0; i < 2; i++) // traverse right
            {
                for (let j = -1; j < 1; j++) // traverse below
                {
                    sum += grid[x + i][y + j];
                }
            }
        }
        else if (x == cols - 1) // last col case
        {
            for (let i = -1; i < 1; i++) // traverse left
            {
                for (let j = -1; j < 1; j++) // traverse below
                {
                    sum += grid[x + i][y + j];
                }
            }
        }
        else // only last row
        {
            for (let i = -1; i < 2; i++) // traverse left and right
            {
                for (let j = -1; j < 1; j++) // traverse below
                {
                    sum+= grid[x + i][y + j];
                }
            }
        }
    }
    else // normal case
    {
        for (let i = -1; i < 2; i++) // traverse left and right
        {
            for (let j = -1; j < 2; j++) // traverse above and below
            {
                sum+= grid[x + i][y + j];
            }
        }
    }
    
    sum -= grid[x][y]; // subtract center cell
    return sum;
}