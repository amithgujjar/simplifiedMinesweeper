import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simplified minesweeper';
  public mineSweeperRow = 10;
  public mineSweeperCol = 10;
  public mineSweeperCount = 5;
  public completeArray;
  public displayMessage;

  startGame() {
    console.log(this.mineSweeperRow + '' + this.mineSweeperCol + '' + this.mineSweeperCount);
    let rowArrayLen = this.mineSweeperRow;
    let colArrayLen = this.mineSweeperCol;
    let colObject: any = {};
    let rowArray = [];
    let colArray = [];
    let colObj: any = {};
    let rowObj: any = {};
    let countOfMines = 0;

    for (let m = 0; m < rowArrayLen; m++) {
      for (let n = 0; n < colArrayLen; n++) {
        colObj = {};
        colObj.colId = n;
        colObj.mineClass = false;
        colArray.push(colObj);
      }
      rowObj = {};
      rowObj.colObjectArray = colArray;
      rowObj.rowId = m;
      rowArray.push(rowObj);
      colArray = [];
    }
    console.log(this.mineSweeperCount);
    while (countOfMines < this.mineSweeperCount) {
      for (let m = 0; m < rowArray.length; m++) {
        for (let n = 0; n < rowArray[m].colObjectArray.length; n++) {

          if (Math.random() < 0.1) {
            if (countOfMines >= this.mineSweeperCount) break;
            countOfMines = countOfMines + 1;
            rowArray[m].colObjectArray[n].mineClass = true;
          }
        }
      }
    }

    this.completeArray = rowArray;
  }



  clickColoumn(event) {
    const row = event.target.getAttribute('data-row');
    const col = event.target.getAttribute('data-col');
    const colLen = document.getElementsByClassName('col hidden').length;
    const rowLen = document.getElementsByClassName('row').length;
    const clickedObj = event.target;

    if (event.target.classList.contains('mine')) {
      this.gameCompleted(false);
    } else {
      this.getAdjacentCell(parseInt(row), parseInt(col));

      const isGameOver = $('.col.hidden').length === $('.col.mine').length
      if (isGameOver) this.gameCompleted(true);

    }
  }

  getAdjacentCell(oi, oj) {
    const seen = {};
    this.getAdjacentCellvalues(oi, oj, seen);
  }

  getAdjacentCellvalues(i, j, seen) {

    if (i >= this.mineSweeperRow || j >= this.mineSweeperCol || i < 0 || j < 0) return;
    const key = `${i} ${j}`
    if (seen[key]) return;
    const $cell =
      $(`.col.hidden[data-row=${i}][data-col=${j}]`);
    const mineCount = this.getMinesCount(i, j);
    if (
      !$cell.hasClass('hidden') ||
      $cell.hasClass('mine')
    ) {
      return;
    }

    $cell.removeClass('hidden');

    if (mineCount) {
      $cell.text(mineCount);
      return;
    }

    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        this.getAdjacentCellvalues(i + di, j + dj, seen);
      }
    }
  }

  getMinesCount(i, j) {

    let count = 0;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= this.mineSweeperRow || nj >= this.mineSweeperCol || nj < 0 || ni < 0) continue;
        const $cell =

          $(`.col.hidden[data-row=${ni}][data-col=${nj}]`);
        if ($cell.hasClass('mine')) count++;
      }
    }
    return count;
  }

  gameCompleted(isWin) {
    let message = null;
    let icon = null;
    if (isWin) {
      this.displayMessage = 'YOU WON!';
      icon = 'fa fa-flag';
    } else {
      this.displayMessage = 'YOU LOST!';
      icon = 'fa fa-bomb';
    }

    let colMineArray = document.getElementsByClassName('col mine');
    for (let k = 0; k < colMineArray.length; k++) {
      let inode = document.createElement("i");
      inode.className = icon;
      colMineArray[k].appendChild(inode)
    }

    let colArray = document.querySelectorAll('.col:not(.mine)');

    for (let l = 0; l < colArray.length; l++) {
      const count: any = this.getMinesCount($(colArray[l]).data('row'), $(colArray[l]).data('col'));

      if (count === 0) {
        colArray[l].innerHTML = "";
      } else {
        colArray[l].innerHTML = count;
      }
    }
    $('.col.hidden').removeClass('hidden');
  }

  ngAfterViewInit() {
    this.startGame()
  }
}
