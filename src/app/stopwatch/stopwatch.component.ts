import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})

export class StopwatchComponent implements OnInit {

  constructor() {
  }

  // @Output() public childEvent = new EventEmitter();
  public x;
  public startstop = 0;
  public myEvent = new EventEmitter();

  public milisec: number = 0;
  public sec: number = 0; /* holds incrementing value */
  public min: number = 0;
  public hour: number = 0;

  /* Contains and outputs returned value of  function checkTime */

  public miliSecOut: any = 0;
  public secOut: any = 0;
  public minOut: any = 0;
  public hourOut: any = 0;

  public lasthTime:any;
  public lastMatchTime:any;

  timer() {
    /* Main Timer */

    this.miliSecOut = checkTime(this.milisec);
    this.secOut = checkTime(this.sec);
    this.minOut = checkTime(this.min);
    this.hourOut = checkTime(this.hour);

    this.milisec = ++this.milisec;

    if (this.milisec === 100) {
      this.milisec = 0;
      this.sec = ++this.sec;
    }

    if (this.sec == 60) {
      this.min = ++this.min;
      this.sec = 0;
    }

    if (this.min == 60) {
      this.min = 0;
      this.hour = ++this.hour;

    }


    document.getElementById("milisecId").innerHTML = this.miliSecOut;
    document.getElementById("secId").innerHTML = this.secOut;
    document.getElementById("minId").innerHTML = this.minOut;
    document.getElementById("hourId").innerHTML = this.hourOut;
   }

  start() {
    this.x = setInterval(() => this.timer(), 10);
  } /* Start */

  stop() {
    debugger;
     clearInterval(this.x);
      // this.lastMatchTime = this.miliSecOut + ":" + this.secOut + ":" + this.minOut + ":" + this.hourOut;
      // this.childEvent.emit(this.lastMatchTime);
  } /* Stop */



  reset() {

    /*Reset*/

    this.milisec = 0;
    this.sec = 0;
    this.min = 0
    this.hour = 0;

    document.getElementById("milisecId").innerHTML = "00";
    document.getElementById("secId").innerHTML = "00";
    document.getElementById("minId").innerHTML = "00";
    document.getElementById("hourId").innerHTML = "00";

  }

  ngOnInit() {

  }



}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}