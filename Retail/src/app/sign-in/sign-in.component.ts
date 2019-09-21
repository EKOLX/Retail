import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"]
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  userName: FormControl;
  formIsValidated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userName = new FormControl(
      null,
      [Validators.required],
      this.nonExistingName.bind(this)
    );

    this.signInForm = this.formBuilder.group({
      userName: this.userName,
      password: new FormControl(null, Validators.required)
    });

    this.signInForm.statusChanges.subscribe(value => {
      if (value === "VALID") this.formIsValidated = true;
      else this.formIsValidated = false;
    });

    // TODO: Get value from localStorage
    this.signInForm.patchValue({
      userName: "Elkhan"
    });
  }

  onLogin(): void {
    if (this.signInForm.valid) {
      this.signInForm.reset();
      this.authService.logIn();
      this.router.navigate(["/home"], { relativeTo: this.route });
    } else {
      alert("Please, specify credentials");
    }
  }

  private nonExistingName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === "test") {
          resolve({ nameDoesNotExist: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
