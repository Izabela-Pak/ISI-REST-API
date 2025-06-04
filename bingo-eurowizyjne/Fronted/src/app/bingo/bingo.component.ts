import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  imports: [NgFor, NgIf],
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent {

  download: any[] = [];
  board: { text: string; selected: boolean }[][] = [];
  bingoFound = false;
  message = '';
  continueAfterBingo = false; // nowa flaga, czy można kontynuować po bingo

  constructor(public serviceService: ServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.serviceService.findAll().subscribe(data => {
      this.download = data;
      if (this.download.length < 25) {
        this.message = 'Za mało haseł do Binga (min. 25)';
        this.board = [];
        this.bingoFound = false;
        this.continueAfterBingo = false;
      } else {
        this.message = '';
        this.shuffleAndCreateBoard();
      }
    });
  }

  shuffleAndCreateBoard() {
    this.bingoFound = false;
    this.continueAfterBingo = false;
    // Losujemy 25 haseł z pobranych danych
    const shuffled = this.download
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value.nazwa)
      .slice(0, 25);

    this.board = [];
    for (let i = 0; i < 5; i++) {
      this.board[i] = [];
      for (let j = 0; j < 5; j++) {
        this.board[i][j] = { text: shuffled[i * 5 + j], selected: false };
      }
    }
  }

  toggleCell(row: number, col: number) {
    if (this.bingoFound && !this.continueAfterBingo) return; // blokuj po bingo jeśli nie kontynuujemy

    const cell = this.board[row][col];
    cell.selected = !cell.selected;
    if (!this.bingoFound && this.checkBingo()) {
      this.bingoFound = true;
    }
  }

  checkBingo(): boolean {
    const size = 5;
    const b = this.board;

    // Sprawdź wiersze
    for (let i = 0; i < size; i++) {
      if (b[i].every(cell => cell.selected)) return true;
    }

    // Sprawdź kolumny
    for (let j = 0; j < size; j++) {
      let allSelected = true;
      for (let i = 0; i < size; i++) {
        if (!b[i][j].selected) {
          allSelected = false;
          break;
        }
      }
      if (allSelected) return true;
    }

    // Sprawdź przekątne
    let diag1 = true, diag2 = true;
    for (let i = 0; i < size; i++) {
      if (!b[i][i].selected) diag1 = false;
      if (!b[i][size - i - 1].selected) diag2 = false;
    }
    if (diag1 || diag2) return true;

    return false;
  }

  resetBoard() {
    this.shuffleAndCreateBoard();
    this.bingoFound = false;
    this.continueAfterBingo = false;
  }

  continueGame() {
    this.continueAfterBingo = true;
  }
}