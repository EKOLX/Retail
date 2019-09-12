export enum Status {
  isNew = 0,
  isSaved = 1,
  isRemoved = 2,
  isCompleted = 3
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
    public content: string = ""
  ) {}
}

type ModalType =
  | "None"
  | "Saved"
  | "Completed"
  | "Cleared"
  | "CompletedList"
  | "IncompletedList";
