import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { ModalDialog } from "src/app/models/state.model";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.sass"]
})
export class ConfirmationComponent implements OnInit, OnChanges {
  @Input() modalDialog: ModalDialog;
  @Output() confirmClicked = new EventEmitter();

  constructor() {
    this.modalDialog = new ModalDialog();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const modalDialogInst = changes["modalDialog"].currentValue as ModalDialog;
    if (modalDialogInst.buttons.length > 0) {
      const button1 = modalDialogInst.buttons.find(b => b.id == "button1");
      button1.clicked.subscribe(() => {
        this.confirmClicked.emit();
      });
    }
  }
}
