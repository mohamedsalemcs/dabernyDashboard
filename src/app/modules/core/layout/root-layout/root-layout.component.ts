import { Component, OnInit } from '@angular/core';
declare let $: any;
declare let mLayout: any;
@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.css']
})
export class RootLayoutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    mLayout.init();
  }
}
