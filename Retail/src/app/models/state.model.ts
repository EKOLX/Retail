export enum Status {
  isNew = 0,
  isSaved = 1,
  isRemoved = 2,
  isCompleted = 3
}

export enum ModalSize {
  SM = "modal-sm",
  LG = "modal-lg",
  XL = "modal-xl"
}

export class ModalDialog {
  modalType: ModalType;
  modalSize: ModalSize;
  modalTitle: string;
  modalContent: string;
}

type ModalType = "Saved" | "Completed" | "Cleared";
