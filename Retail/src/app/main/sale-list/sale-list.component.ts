import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { SaleService } from "src/app/services/sale.service";
import { Status, ModalDialog, ModalButton } from "src/app/models/state.model";
import { Message } from "src/app/models/message.model";
import { Sale } from "src/app/models/sale.model";

@Component({
  selector: "app-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.sass"]
})
export class SaleListComponent implements OnChanges {
  @Input() modalDialog: ModalDialog;
  @Output() restoreClicked = new EventEmitter();

  sales: Array<Sale> = [];
  button1: ModalButton;
  private _selectedSaleId: number = 0;

  constructor(
    private communicationService: CommunicationService,
    private saleService: SaleService
  ) {
    this.button1 = new ModalButton();
  }

  set selectedSaleId(value: number) {
    this._selectedSaleId = value;
    this.button1.enabled = value > 0;
  }
  get selectedSaleId(): number {
    return this._selectedSaleId;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modalDialogInst = changes["modalDialog"].currentValue as ModalDialog;
    if (modalDialogInst.buttons.length > 0) {
      this.button1 = modalDialogInst.buttons.find(b => b.id == "button1");
      this.button1.clicked.subscribe(() => {
        if (modalDialogInst.type == "IncompletedList")
          this.communicationService.sendSale(
            new Message(Status.isSaved, this.selectedSaleId)
          );
      });
    }
    if (modalDialogInst.type == "CompletedList")
      this.sales = this.saleService.getSalesByStatus();
    else if (modalDialogInst.type == "IncompletedList")
      this.sales = this.saleService.getSalesByStatus(Status.isSaved);
  }

  onSelectSale(id: number): void {
    this.selectedSaleId = id;
  }

  onCancelClicked(): void {
    this.selectedSaleId = 0;
  }

  getSaleClass(id: number): string {
    return this.selectedSaleId == id ? "table-info" : "";
  }
}
