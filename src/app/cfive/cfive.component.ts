import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-cfive',
  templateUrl: './cfive.component.html',
  styleUrls: ['./cfive.component.css']
})
export class CfiveComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
  cimal: number = 6;
}
