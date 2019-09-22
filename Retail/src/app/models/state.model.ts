import { EventEmitter } from "@angular/core";

export enum Status {
  isNew,
  isSaved,
  isRemoved,
  isCompleted,
  isRestored
}

export enum ModalSize {
  sm = "modal-sm",
  lg = "modal-lg",
  xl = "modal-xl"
}

export enum ModalNature {
  primary = "primary",
  info = "info",
  success = "success",
  danger = "danger",
  warning = "warning",
  secondary = "secondary"
}

export class ModalDialog {
  constructor(
    public type: ModalType = "None",
    public size: ModalSize = ModalSize.sm,
    public nature: ModalNature = ModalNature.primary,
    public title: string = "",
    public content: string = "",
    public buttons: Array<ModalButton> = []
  ) {}
}

export class ModalButton {
  constructor(
    public id: ModalButtonId = "button1",
    public title: string = "",
    public visible: boolean = false,
    public enabled: boolean = false,
    public clicked = new EventEmitter()
  ) {}
}

type ModalButtonId = "button1" | "button2" | "button3";

type ModalType =
  | "None"
  | "Saved"
  | "Completed"
  | "Cleared"
  | "CompletedList"
  | "IncompletedList";
