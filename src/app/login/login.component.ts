import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit() { }

  //This method is responsible for log in
  login() {
    this.isLoading = true;  // Show loading spinner

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.authService.setUserData(response.data[0]);
        this.isLoading = false;
        console.log(response);
      },
      (error) => {
        console.log('Error occurred during login', error);
        //TODO: Something fancier
        this.isLoading = false;
        alert(error.error?.message);

      }
    );
  }
  //This method is responsible for checking if the form is valid
  isValid() {
    return this.email.trim().length > 0 && this.password.trim().length > 0
  }
  //This method is responsible for toggling the password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
