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
    // alert(this.boardSize);
    for (let i = 0; i < this.boardSize; i++) {
      this.blocks[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.blocks[i].push(0);
      }
    }
    this.boardDisplay();
  }

  boardDisplay() {
    this.boardCreated = true;
  }

}
