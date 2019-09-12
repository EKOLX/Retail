import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalSize } from "src/app/models/state.model";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.sass"]
})
export class ModalWindowComponent implements OnInit {
  @Input() modalSize: ModalSize;
  @Input() title: string;
  @Input() button1Title: string;
  @Input() showButton1: boolean = false;
  @Input() enableButton1: boolean = false;
  @Output() button1Clicked = new EventEmitter();

  ngOnInit() {}

  getModalDialogClass(): string {
    return `modal-dialog ${this.modalSize}`;
  }

  onButton1Click(): void {
    this.button1Clicked.emit();
    this.hideModal();
  }

  showModal(): void {
    $("#cmptModal").modal("show");
  }

  hideModal(): void {
    $("#cmptModal").modal("hide");
  }
}
