import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";

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
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // TODO: use localStorage
    this.userCredential = this.formBuilder.group({
      name: "",
      password: ""
    });
  }

  ngOnInit() {}

  onLogin(credentials: any): void {
    // TODO: check credentials and forward to home page if it's ok
    if (credentials.name && credentials.password) {
      this.userCredential.reset();
      this.authService.logIn();
      this.router.navigate(["/home"], { relativeTo: this.route });
    } else {
      alert("Please, specify credentials");
    }
  }
}
