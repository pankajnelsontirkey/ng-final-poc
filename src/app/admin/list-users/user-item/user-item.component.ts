import { Component, OnInit, Input } from "@angular/core";
import { UserItem } from "src/app/shared/models";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.scss"]
})
export class UserItemComponent implements OnInit {
  @Input() user: UserItem;
  constructor() {}

  ngOnInit() {}
}
