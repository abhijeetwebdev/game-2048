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
  numInitialBlocks = 8;

  constructor() {}

  /**
   * to listen the navigation keys
   * @param event keypress
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log('event: ', event);
    for (let i = 0; i < this.boardSize; i++) {
      if (event.key === '1') {
        this.float('left');
      } else if (event.key === '2') {
        this.float('right');
      } else if (event.key === '3') {
        this.float('up');
      } else if (event.key === '4') {
        this.float('down');
      }
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
        const block = this.blocks[row][col];
        // console.log(row, col, block);
        if (direction === 'left' && this.blocks[row][col - 1] === 0 && this.blocks[row][col] !== 0) {
          const val = this.blocks[row][col];
          this.blocks[row][col - 1] = val;
          this.blocks[row][col] = 0;
        }
        if (direction === 'right' && this.blocks[row][col + 1] === 0 && this.blocks[row][col] !== 0) {
          const val = this.blocks[row][col];
          this.blocks[row][col + 1] = val;
          this.blocks[row][col] = 0;
        }
      }
      console.log('---');
      // this.blockScanTillNonEmpty(direction, this.blocks[i]);
      // break;
    }
  }

  // blockScanTillNonEmpty(direction: string, row: any[]) {
  //   if (direction === 'left') {
  //     for (let i = 0; i < row.length ; i++) {
  //       const block = row[i];
  //       if (block !== 0) {
  //         console.log(i, ': NOT EMPTY', block);
  //       } else {
  //         console.log(i, ': EMPTY', block);
  //       }
  //     }
  //   } else if (direction === 'right') {
  //     for (let i = 0; i < row.length ; i++) {
  //       const block = row[i];
  //       if (block !== 0) {
  //         console.log(i, ': NOT EMPTY', block);
  //       } else {
  //         console.log(i, ': EMPTY', block);
  //       }
  //     }
  //   }
  // }

  /**
   * returns value from the block
   * @param row row index
   * @param col col index
   */
  blockGetValue(row, col) {
    return this.blocks[row][col];
  }

  /**
   * returns value from the block
   * @param row row index
   * @param col col index
   */
  blockSetValue(row, col, value) {
    this.blocks[row][col] = value;
    return value;
  }

}
