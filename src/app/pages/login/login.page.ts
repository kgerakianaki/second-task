import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  passwordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {}

  //This method is responsible for log in
  login() {
    if (this.isValid()) {
      this.isLoading = true; // Show loading state

      // Call login method from AuthService
      this.authService.login(this.email, this.password).then(
        response => {
          // Handle successful login
          this.isLoading = false; // Hide loading state
          this.router.navigateByUrl("/management", {
            replaceUrl: true
          });
          // this isnot done properly and just change the url and not the context please correct it
        },
        error => {
          this.isLoading = false; // Hide loading state
          // Handle error
          console.log("Login failed: ", error);
        }
      );
    }
  }

  //This method is responsible for checking if the form is valid
  isValid() {
    return this.email.trim().length > 0 && this.password.trim().length > 0;
  }

  //This method is responsible for toggling the password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
