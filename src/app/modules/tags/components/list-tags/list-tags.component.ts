import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {
  dataItems: any[];
  cols: any[];
  constructor() { }

  ngOnInit() {
    this.getData();

    this.cols = [
      { field: 'id', header: 'كود العميل' },
      { field: 'name', header: 'اسم العميل' },
      { field: 'status', header: 'الحالة', type: 'status' },
      { field: 'ActionButtons', header: 'الاجراءات', type: 'action' }
    ];
  }
  getData() {
    this.dataItems = [
      { id: '00004', name: 'محمد سالم محمد', status: 'غير مفعل' }
    ];
  }
}
