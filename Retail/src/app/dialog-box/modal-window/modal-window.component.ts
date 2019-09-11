import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.sass"]
})
export class ModalWindowComponent implements OnInit {
  @Input() title: string;
  @Input() button1: string;
  @Input() showButton1: boolean = false;
  @Input() enableButton1: boolean = false;
  @Output() button1Clicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onButton1Click(): void {
    this.button1Clicked.emit();
  }

  showModal(): void {
    $("#cmptModal").modal("show");
  }

  hideModal(): void {
    document.getElementById("btnClose").click();
  }
}
