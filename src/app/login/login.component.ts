import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


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
  

  constructor(private authService: AuthService, private toastController: ToastController,private translate: TranslateService ) {
  }

  ngOnInit() { }

  //This method is responsible for log in
  async login() {
    this.isLoading = true; // Show loading spinner

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.authService.setUserData(response.data[0]);
        this.isLoading = false; //Close loading spinner
        // Fetch the translated success message
        this.translate.get('login.success_title').subscribe((successTitle: string) => {
          this.translate.get('login.sucess_text').subscribe((successText: string) => {
            // Show success notification
            Swal.fire({
              icon: 'success',
              title: successTitle,  
              text: successText,   
              timer: 3000,
              showConfirmButton: false,
              position: 'top',
              toast: true,
              background: '#28a745', // Green background for success
              color: '#fff',          
            });
          });
        });
      },
      (error) => {
        console.log('Error occurred during login', error);

        // Fetch the translated error message
        this.translate.get('login.error_title').subscribe((errorTitle: string) => {
          // Close loader and show error notification
          this.isLoading = false;

          Swal.fire({
            icon: 'error',
            title: errorTitle,
            text: error.error?.message,
            timer: 3000,
            showConfirmButton: false,
            position: 'top',
            toast: true,
            background: '#932222', // Red background for error
            color: '#ffffff',         
          });
        });
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
