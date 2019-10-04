import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { SaleService } from "src/app/services/sale.service";
import { Status, ModalDialog, ModalButton } from "src/app/models/state.model";
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
  btnRestore: ModalButton;
  private _selectedSaleId: number = 0;

  constructor(private saleService: SaleService) {
    this.btnRestore = new ModalButton();
  }

  set selectedSaleId(value: number) {
    this._selectedSaleId = value;
    this.btnRestore.enabled = value > 0;
  }
  get selectedSaleId(): number {
    return this._selectedSaleId;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modalDialogInst = changes["modalDialog"].currentValue as ModalDialog;
    if (modalDialogInst.buttons.length > 0) {
      this.btnRestore = modalDialogInst.buttons.find(b => b.id == "button1");
      this.btnRestore.clicked.subscribe(() => {
        if (modalDialogInst.type == "IncompletedList")
          this.saleService.moveSavedSaleToCurrent(this.selectedSaleId);
      });
    }
    if (modalDialogInst.type == "CompletedList")
      this.sales = this.saleService.getSalesByStatus(Status.isCompleted);
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
