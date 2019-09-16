import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"]
})
export class SignInComponent implements OnInit {
  userCredential: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // TODO: use localStorage
    this.userCredential = this.formBuilder.group({
      name: "",
      password: ""
    });
  }

  ngOnInit() {}

  onSubmit(data): void {
    // TODO: check credentials and forward to home page if it's ok
    this.userCredential.reset();
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
}
