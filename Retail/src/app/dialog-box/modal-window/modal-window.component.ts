import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalSize, ModalNature } from "src/app/models/state.model";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.sass"]
})
export class ModalWindowComponent implements OnInit {
  @Input() modalId: string;
  @Input() modalSize: ModalSize;
  @Input() modalNature: ModalNature;
  @Input() title: string;
  @Input() button1Title: string;
  @Input() showButton1: boolean = false;
  @Input() enableButton1: boolean = false;
  @Output() button1Clicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();

  ngOnInit() {}

  getDialogClass(): string {
    return `modal-dialog ${this.modalSize}`;
  }

  getTitleClass(): string {
    return `modal-title text-${this.modalNature}`;
  }

  getButtonClass(): string {
    return `btn btn-${this.modalNature}`;
  }

  onButton1Click(): void {
    this.button1Clicked.emit();
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
