import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenVar: string = ''; // Store token in memory (no persistence across reloads)
  private userDataVar: any = null; // Store user data in memory (no persistence across reloads)

  constructor(private webService: WebService) { }

  /**
   * Login method
   * @param email - User's email
   * @param password - User's password
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    const endpoint = '/api/v1/user/login';
    const data = { email, password };

    const headers = new HttpHeaders({
      Accept: 'application/json',
      lang: 'el',
    });

    return this.webService.post(endpoint, data, headers);
  }

  /**
   * Save token in memory (no persistence)
   * @param token - Authentication token
   */
  setToken(token: string): void {
    this.tokenVar = `Bearer ${token}`;
  }

  /**
   * Save user data in memory (no persistence)
   * @param userData - User data object
   */
  setUserData(userData: any): void {
    this.userDataVar = userData;
  }

  /**
   * Retrieve token from memory
   * @returns string
   */
  getToken(): string {
    return this.tokenVar;
  }

  /**
   * Retrieve user data from memory
   * @returns any
   */
  getUserData(): any {
    return this.userDataVar;
  }

  /**
   * Check if the user is logged in
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return !!this.getToken(); // Returns true if a token exists
  }

  /**
   * Logout the user
   */
  logout(): void {
    this.tokenVar = ''; // Clear the token in memory
    this.userDataVar = null; // Clear the user data in memory
  }
}
