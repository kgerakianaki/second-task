import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private webService: WebService, private authService: AuthService) { }

  getDevices(): Observable<any> {
    const endpoint = '/api/v1/devices';
    const token = this.authService.getToken(); // Get token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    console.log('Authorization Header:', headers);
    // Pass the headers to the WebService's get method
    return this.webService.get(endpoint, headers);
  }
}
