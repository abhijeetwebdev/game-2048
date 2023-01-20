import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  boardCreated = false;
  // default block size
  boardSize = 4;
  // mutli dimentional array to hold all blocks
  blocks: any[];
  // random numbers to chose from
  randomNums = [2, 4];
  // number of blocks to start with
  numInitialBlocks = 2;

  constructor() {}

  /**
   * to listen the navigation keys
   * @param event keypress
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    for (let i = 0; i < this.boardSize; i++) {
      this.float(event.key);
    }
  }

  ngOnInit() {
    // for DEV purpose, start the game on DOM load
    this.boardCreate();
  }

  boardCreate() {
    this.blocksCreate();
  }

  blocksCreate() {
    this.blocks = [];
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

  /**
   * filling 2 random blocks to get started
   */
  initialBlocks() {
    for (let i = 0; i < this.numInitialBlocks; i++) {
      const block = this.blockSelectRandom();
      this.blockFill(block[0], block[1]);
    }
  }

  /**
   * returns array [row, col] of block location
   */
  blockSelectRandom() {
    return [Math.floor(Math.random() * ((this.boardSize - 1) - 0 + 1)) + 0, Math.floor(Math.random() * ((this.boardSize - 1) - 0 + 1)) + 0];
  }

  /**
   * fills the block with either 2 or 4 number randomly
   */
  blockFill(row, col) {
    this.blocks[row][col] = this.randomNums[Math.floor(Math.random() * this.randomNums.length)];
  }

  /**
   * function to trigger the float action
   * @param direction string
   */
  float(direction: string) {
    for (let row = 0; row < this.blocks.length; row++) {
      for (let col = 0; col < this.blocks[row].length; col++) {
        // console.log(row, col, block);
        if (direction === 'ArrowLeft') {
          if (this.blocks[row][col - 1] === 0
            && this.blocks[row][col] !== 0
          ) {
            const val = this.blocks[row][col];
            this.blocks[row][col - 1] = val;
            this.blocks[row][col] = 0;
          }
          if (this.blocks[row][col - 1] === this.blocks[row][col]) {
            const val = this.blocks[row][col] * 2;
            this.blocks[row][col - 1] = val;
            this.blocks[row][col] = 0;
          }
        }
        if (direction === 'ArrowRight') {
          if (this.blocks[row][col + 1] === 0
            && this.blocks[row][col] !== 0
          ) {
            const val = this.blocks[row][col];
            this.blocks[row][col + 1] = val;
            this.blocks[row][col] = 0;
          }
          if (this.blocks[row][col + 1] === this.blocks[row][col]) {
            const val = this.blocks[row][col] * 2;
            this.blocks[row][col + 1] = val;
            this.blocks[row][col] = 0;
          }
        }
        if (direction === 'ArrowUp'
          && row !== 0 // to prevent going below existing rows
        ) {
          if (this.blocks[row - 1][col] === 0
            && this.blocks[row][col] !== 0
          ) {
            const val = this.blocks[row][col];
            this.blocks[row - 1][col] = val;
            this.blocks[row][col] = 0;
          }
          if (this.blocks[row - 1][col] === this.blocks[row][col]) {
            const val = this.blocks[row][col] * 2;
            this.blocks[row - 1][col] = val;
            this.blocks[row][col] = 0;
          }
        }
        if (direction === 'ArrowDown'
          && row !== (this.boardSize - 1) // to prevent going above existing rows
        ) {
          if (this.blocks[row + 1][col] === 0
            && this.blocks[row][col] !== 0
          ) {
            const val = this.blocks[row][col];
            this.blocks[row + 1][col] = val;
            this.blocks[row][col] = 0;
          }
          if (this.blocks[row + 1][col] === this.blocks[row][col]) {
            const val = this.blocks[row][col] * 2;
            this.blocks[row + 1][col] = val;
            this.blocks[row][col] = 0;
          }
        }
      }
    }
  }

}
