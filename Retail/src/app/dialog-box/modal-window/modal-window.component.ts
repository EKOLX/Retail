import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { ModalDialog, ModalButton } from "src/app/models/state.model";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.sass"]
})
export class ModalWindowComponent implements OnInit, OnChanges {
  @Input() modalId: string;
  @Input() modalDialog: ModalDialog;
  @Output() cancelClicked = new EventEmitter();

  button1: ModalButton;

  constructor() {
    this.modalDialog = new ModalDialog();
    this.button1 = new ModalButton();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const modalDialogInst = changes["modalDialog"].currentValue as ModalDialog;
    if (modalDialogInst.buttons.length > 0) {
      this.button1 = this.modalDialog.buttons.find(b => b.id == "button1");
    }
  }

  getDialogClass(): string {
    return `modal-dialog ${this.modalDialog.size}`;
  }

  getTitleClass(): string {
    return `modal-title text-${this.modalDialog.nature}`;
  }

  getButtonClass(): string {
    return `btn btn-${this.modalDialog.nature}`;
  }

  onButton1Click(): void {
    this.button1.clicked.emit();
    this.hideModal();
  }

  showModal(): void {
    $(`#${this.modalId}`).modal("show");
  }

  hideModal(): void {
    $(`#${this.modalId}`).modal("hide");
    this.cancelClicked.emit();
  }
}
