import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalSize } from "src/app/models/state.model";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.sass"]
})
export class ConfirmationComponent implements OnInit {
  @Input() modalSize: ModalSize;
  @Input() title: string;
  @Input() content: string;
  @Output() confirmClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onConfirmClicked() {
    this.confirmClicked.emit();
  }
}
