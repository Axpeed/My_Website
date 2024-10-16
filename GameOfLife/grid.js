class Grid {
    constructor()
    {
        this.grid = []
        for (let i = 0; i < cols; i++)
            {
                this.grid[i] = []
                for (let j = 0; j< rows; j++)
                {
                    this.grid[i][j] = floor(random(2));
                }
            }
    }

    copy()
    {
        return this.grid.map(arr => [...arr]);
    }

    set(prevGrid)
    {
         this.grid = prevGrid.map(arr => [...arr]);
    }

    display()
    {
        for (let i = 0; i < cols; i++)
            {
                for (let j = 0; j < rows; j++)
                {
                    if (this.grid[i][j] == 0)
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

    update()
    {
        let nextGen = [];
        for (let i = 0; i < cols; i++)
        {
            nextGen[i] = [];
            for (let j= 0; j < rows; j++)
            {
                let n = this.neighbors(this.grid, i, j); 

                if (this.grid[i][j] == 1 && n < 2) // underpopulation
                {
                    nextGen[i][j] = 0;
                }
                else if (this.grid[i][j] == 1 && (n == 2 || n == 3)) // healthy
                {
                    nextGen[i][j] = 1;
                }
                else if (this.grid[i][j] == 1 && n > 3) // overpopulation
                {
                    nextGen[i][j] = 0;
                }
                else if (this.grid[i][j] == 0 && n == 3) // reproduction
                {
                    nextGen[i][j] = 1;
                }
                else
                {
                    nextGen[i][j] = this.grid[i][j]; // otherwise remain same
                }
            }
        }
        this.grid = nextGen;
    }

    neighbors(grid, x, y)
    {
        let sum = 0;
        for (let i = -1; i < 2; i++) // traverse left and right
        {
            for (let j = -1; j < 2; j++) // traverse above and below
            {
                let xIndex = (x + i + cols) % cols; // adding cols/rows to avoid negative
                let yIndex = (y + j + rows) % rows;
                sum+= grid[xIndex][yIndex];
            }
        }
        sum -= grid[x][y]; // subtract center cell
        return sum;
    }

    clearGrid()
    {
        for (let i = 0; i < cols; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                this.grid[i][j] = 0;
            }
        }
    }

    randomGrid()
    {
        for (let i = 0; i < cols; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                this.grid[i][j] = floor(random(2));
            }
        }
    }
}