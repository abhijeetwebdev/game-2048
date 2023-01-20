import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  boardCreated = false;
  boardSize = 4;
  blocks: any[];
  randomNums = [2, 4];

  constructor() {
    this.blocks = [];
  }

  ngOnInit() {
    this.boardCreate();
  }

  boardCreate() {
    this.blocksCreate();
  }

  blocksCreate() {
    for (let i = 0; i < this.boardSize; i++) {
      this.blocks[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.blocks[i].push(0);
      }
    }
    this.boardDisplay();
  }

  boardDisplay() {
    this.initialBlocks();
    this.boardCreated = true;
  }

  initialBlocks() {
    const block1 = this.blockSelectRandom();
    this.blockFillRandomNum(block1[0], block1[1]);

    const block2 = this.blockSelectRandom();
    this.blockFillRandomNum(block2[0], block2[1]);
  }

  /**
   * returns array [row, col] of block location
   */
  blockSelectRandom() {
    return [Math.floor(Math.random() * ((this.boardSize - 1) - 0 + 1)) + 0, Math.floor(Math.random() * ((this.boardSize - 1) - 0 + 1)) + 0];
  }

  blockFillRandomNum(row, col) {
    this.blocks[row][col] = this.randomNums[Math.floor(Math.random() * this.randomNums.length)];
  }

}
