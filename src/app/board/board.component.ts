import { Component, OnInit } from '@angular/core';
import { Generator } from '../domain/generator';
import { BOARD } from '../utils';
import { Solver } from '../domain/solver';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: number[][] = BOARD;

  solvedBoard: number[][] = BOARD;

  currentCell: number = -1;

  selectedValue: number = -1;

  difficulty = [[40, 0], [81, 5], [81, 10], [81, 20]];

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let diff = Number(this.route.snapshot.params['lvl']);
    this.generateBoard(this.difficulty[diff]);
    this.solve()
  }

  solve(){
    let solver = new Solver(this.board);
    let res = solver.solve();
    this.solvedBoard = solver.getBoard();
  }

  generateBoard(reductions: number[]){
    let generator = new Generator();
    generator.gen();
    generator.reduce(reductions[0]);
    generator.reduce(reductions[1]);
    
    this.board = generator.board;

  }

  handleSquareClick(row: number, col: number){}

  handleClick(event:any, row:number, col: number){
    if (this.board[row][col] != 0 && this.isCorrect(row,col)) {
      this.selectedValue = this.board[row][col];
      return;
    }
    this.currentCell = (row * 9) + col;
    setTimeout(()=> event.focus(), 0);
    this.selectedValue = -1;
  }

  onSubmit(event: any){
    let answer = Number(event.value)
    if (answer >= 0 && answer<10) {
      let row = Math.floor(this.currentCell/9);
      let col = this.currentCell%9;
      this.board[row][col] = Number(event.value);
      setTimeout(()=> event.focus(), 0);
      this.currentCell = -1;
    }
  }

  checkWin(){
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if(this.board[i][j] != this.solvedBoard[i][j]) return false;
      }
    }

    return true;
  }

  isError(row:number, col:number){
    if(this.board[row][col] == 0) return false;
    
    if(this.board[row][col] != this.solvedBoard[row][col]) return true;

    return false;
  }

  isCorrect(row:number, col:number){
    if(this.board[row][col] == 0) return false;
    
    if(this.board[row][col] == this.solvedBoard[row][col]) return true;

    return false;
  }

  goToMenu(){
    this.router.navigate(['/home'])
  }

}
