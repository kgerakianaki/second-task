import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  endpoint = '/api/v1/devices';
 headers:any;
  
  constructor(private webService: WebService, private authService: AuthService) { 
    let token = this.authService.getToken(); // Get token from AuthService
    this.headers = new HttpHeaders({
      'Authorization': `${token}`
    });
  }

  //This method get the list of devices
  getDevices(): Observable<any> {

    return this.webService.get(this.endpoint, this.headers);
  }

  //This method post a device
  postDevice(deviceData: any): Observable<any>{
     // Define the body of the request
     const body = {
      manufacturer: deviceData.manufacturer,
      model: deviceData.model,
      platformDevice: deviceData.platformDevice,
      deviceUUID: deviceData.deviceUUID
    };
    return this.webService.post(this.endpoint,body,this.headers)
  }

  // This method deletes a device by its _id
  deleteDevice(deviceId: string): Observable<any> {
    const url = `${this.endpoint}/${deviceId}`; //endpoint for deleting
    return this.webService.delete(url, this.headers)
  }


  // Post method to delete all devices
  deleteAllDevices(): Observable<any> {
    const url = `${this.endpoint}/deleteAll`; // URL for deleting all devices
    const body = {}; // Empty body
    return this.webService.post(url, body, this.headers);  // Sending POST request with empty body
  }

  // Method to update a device (PATCH request)
  updateDevice(deviceId: string, updatedData: any): Observable<any> {
    const url = `${this.endpoint}/${deviceId}`; // Endpoint to update device
    return this.webService.patch(url, updatedData, this.headers); // Send PATCH request
  }

}
