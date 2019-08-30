import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from 'src/app/shared/models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() employee: EmployeeModel;
  constructor() {}

  ngOnInit() {}
}
