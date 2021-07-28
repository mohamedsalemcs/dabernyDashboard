import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  dataItems: any[];
  cols: any[];
  constructor() {}

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
      { id: '00001', name: 'محمد سالم محمد', status: 'مفعل' },
      { id: '00002', name: 'محمد سالم محمد', status: 'غير مفعل' },
      { id: '00003', name: 'محمد سالم محمد', status: 'مفعل' },
      { id: '00004', name: 'محمد سالم محمد', status: 'غير مفعل' }
    ];
  }
}
