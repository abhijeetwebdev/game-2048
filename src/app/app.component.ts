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

  constructor() {}

  /**
   * to listen the navigation keys
   * @param event keypress
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log('event: ', event);
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

  /**
   * fills the block with either 2 or 4 number randomly
   */
  blockFillRandomNum(row, col) {
    this.blocks[row][col] = this.randomNums[Math.floor(Math.random() * this.randomNums.length)];
  }

  /**
   * function to trigger the float action
   * @param direction string
   */
  float(direction: string) {
    console.log('direction: ', direction);
  }

}
