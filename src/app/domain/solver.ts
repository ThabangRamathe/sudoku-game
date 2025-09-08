import { BOARD1 } from "../utils";

export class Solver{

    board: number[][] = BOARD1;

    constructor(board: number[][]){
        this.copyBoard(board);
    }

    copyBoard(board: number[][]){
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                this.board[i][j] = board[i][j];
            }
        }
    }

    getEmpty(board: number[][]): number{

        for (let i = 0; i<board.length; i++){
            for(let j=0; j<board[0].length; j++){
                if(board[i][j] == 0){
                    return (i * 9) + j;
                }
            }
        }

        return -1;
    }

    isValid(board: number[][], col: number, row:number, num: number): boolean{
        for (let i = 0; i < board[0].length; i++) {
            if (board[row][i] == num && col!=i) return false;
        }

        for (let i = 0; i < board.length; i++) {
            if (board[i][col] == num && row!=i) return false;
        }

        let boxY = Math.floor(row/3), boxX = Math.floor(col/3);

        for (let i = boxY*3; i < boxY*3 + 3; i++) {
            for (let j = boxX*3; j < boxX*3 +3; j++) {
                if(board[i][j] == num && row!=i && col!=j) return false;
            }
        }

        return true;
    }

    solve(): boolean{return this.solve1(this.board);}

    solve1(board: number[][]): boolean{
        let pos:number = this.getEmpty(board);
        let row, col;

        if(pos == -1){return true;}
        else{
            row = Math.floor(pos/9);
            col = pos%9;
        }

        for(let i =1; i< 10; i++){
            if(this.isValid(board, col, row, i)){
                board[row][col] = i;

                if(this.solve1(board)) return true;

                board[row][col] = 0;
            }
        }

        return false;
    }

    getBoard(){ return this.board; }
}
