import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommunicationService } from "src/app/services/communication.service";
import { Subscription } from "rxjs";

// This lets me use jQuery
declare var $: any;

@Component({
  selector: "app-completed",
  templateUrl: "./completed.component.html",
  styleUrls: ["./completed.component.sass"]
})
export class CompletedComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
    this.subscription = this.communicationService
      .getShowModal()
      .subscribe(msg => {
        if (msg) {
          this.showModal();
        }
      });
  }

  showModal(): void {
    $("#cptCompleted").modal("show");
  }

  hideModal(): void {
    document.getElementById("btnClose").click();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
