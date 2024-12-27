import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { WebService } from "./web.service";

const baseUrl: string = "https://testapiserver.com"; // Server base URL
const apiKey: string = "9f02f499-cd68-4ede-a3e8-fbb00c3bcde8"; // API Key

// Default headers
const headers = new HttpHeaders({
  ApiKey: apiKey,
  "Content-Type": "application/json"
});

const loginUrl = `${baseUrl}/api/v1/user/login`;

@Injectable({
  providedIn: "root" // This ensures the service is available globally
})
export class AuthService {
  private tokenVar: string = ""; // Store token in memory
  private userDataVar: any = null; // Store user data in memory

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService,
    private webService: WebService
  ) {}

  /**
   * Login method
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<any>
   */
  // login(email: string, password: string): Promise<any> {
  //   const data = { email, password };
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post<any>(loginUrl, data, { headers }).subscribe(
  //       (response) => {
  //         if (response.status === 200 && response.data) {
  //           this.setToken(response.token);
  //           this.setUserData(response.user);
  //           resolve(response);
  //           this.showSuccessNotification();
  //         } else {
  //           reject(response);
  //           this.showErrorNotification(response.error?.message || 'Unexpected error');
  //         }
  //       },
  //       (error) => {
  //         reject(error);
  //         this.showErrorNotification(error.error?.message || 'Failed to communicate with server');
  //       }
  //     );
  //   });
  // }

   login(email: string, password: string): Promise<any> {
    const data = { email, password };
    return new Promise((resolve, reject) => {
      this.webService
        .post("/api/v1/user/login", data)
        .then((response) => {
          if (response.status === 200 && response.data) {
            this.setToken(response.token);
            this.setUserData(response.user);
            this.showSuccessNotification();
            resolve(response);
          } else {
            this.showErrorNotification(response.error?.message || "Unexpected error");
            reject(response);
          }
        })
        .catch((error) => {
          this.showErrorNotification(error.error?.message || "Failed to communicate with server");
          reject(error);
        });
    });
  }
  // Save token in memory and persist it
  setToken(token: string): void {
    this.tokenVar = `Bearer ${token}`;
    localStorage.setItem('authToken', this.tokenVar); // Persist token
  }

  // Save user data in memory and persist it
  setUserData(userData: any): void {
    this.userDataVar = userData;
    localStorage.setItem('userData', JSON.stringify(userData)); // Persist user data
  }

  // Retrieve token from memory or localStorage
  getToken(): string {
    return this.tokenVar || localStorage.getItem('authToken') || '';
  }

  // Retrieve user data from memory or localStorage
  getUserData(): any {
    return this.userDataVar || JSON.parse(localStorage.getItem('userData') || 'null');
  }

  // Check if the user is logged in (if a token exists)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout the user and clear all related data
  logout(): void {
    this.tokenVar = ""; // Clear token
    this.userDataVar = null; // Clear user data
    localStorage.removeItem('authToken'); // Clear token from localStorage
    localStorage.removeItem('userData'); // Clear user data from localStorage
  }

  // Show success notification
  private showSuccessNotification() {
    const successTitle = this.translate.instant("login.success_title");
    const successText = this.translate.instant("login.success_text");
    Swal.fire({
      icon: "success",
      title: successTitle,
      text: successText,
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#28a745", // Green for success
      color: "#fff"
    });
  }

  // Show error notification
  private showErrorNotification(errorMessage: string) {
    const errorTitle = this.translate.instant("login.error_title");
    Swal.fire({
      icon: "error",
      title: errorTitle,
      text: errorMessage,
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#932222", // Red for error
      color: "#ffffff"
    });
  }
}
