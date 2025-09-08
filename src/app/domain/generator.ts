import { BOARD } from "../utils";

export class Generator{
    
    board: number[][] = BOARD;

    gen(): boolean{
        let cells: number[] = Array.from({length:9}, (_,i) => i + 1);
        cells = this.shuffle(cells);
        this.board[0] = cells;

        let m = 3;

        for (let i = 1; i < 9; i++) {
            if(i%3 == 0) m = 1
            else m = 3
            
            for (let j = 0; j < 9; j++) {
                let n = (9 + (j-m))%9;
                this.board[i][j] = this.board[i-1][n];                
            }
        }

        return true;
    }

    shuffle(arr: number[]): number[]{
        let res = arr;
        let n: number = arr.length;

        for (let i = 0; i < n; i++) {
            let pivot = Math.floor(Math.random()* (n-1));
            res = this.swap(res, i, pivot);
        }

        return res;
    }

    swap(arr:number[], l: number, r: number): number[]{
        let temp =arr[l];
        arr[l] = arr[r];
        arr[r] = temp;

        return arr;
    }

    reduce(cutoff: number){
        let cells: number[] = this.getUsedCells();
        cells = this.shuffle(cells);
        for (const data of cells) {
            if(this.getPossibleNums(data) == 1){
                this.removeCell(data);
                cutoff--;
            }

            if(cutoff == 0){
                break;
            }
        }
    }

    getUsedCells(): number[]{
        let used: number[] = [];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] != 0) {
                    let cell = (i*9)+j;
                    used.push(cell); 
                }
            }
        }

        return used;
    }

    getPossibleNums(cell: number): number{
        let i = Math.floor(cell/9);
        let j = cell%9;
        let possibilities = 0;

        for (let k = 1; k < 10; k++) {
            if(this.isValid(i,j,k)) possibilities++;
        }

        return possibilities;
    }

    removeCell(cell: number){
        let i = Math.floor(cell/9);
        let j = cell%9;

        this.board[i][j] = 0;
    }

    isValid(x: number, y: number, num: number): boolean{
        for (let i = 0; i < this.board.length; i++) {
            if(this.board[y][i]== num && x!=i) return false;
        }

        for (let i = 0; i < this.board.length; i++) {
            if(this.board[i][x] == num && y!=i) return false;
        }

        let boxX = Math.floor(x/3);
        let boxY = Math.floor(y/3);

        for (let i = boxY*3; i < boxY*3 +3; i++) {
            for (let j = boxY*3; j < boxY*3 +3; j++) {
                if(this.board[i][j] ==num && i!=y && j!=x) return false;
            }
        }
        
        return true;
    }
}
