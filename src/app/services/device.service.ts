import { Injectable } from "@angular/core";
import { WebService } from "./web.service";
import { AuthService } from "./auth.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  endpoint = "/api/v1/devices";
  headers: any;

  constructor(
    private webService: WebService,
    private authService: AuthService
  ) {
    let token = this.authService.getToken(); // Get token from AuthService
    this.headers = new HttpHeaders({
      Authorization: `${token}`
    });
  }

  // This method gets the list of devices
  getDevices(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.webService
        .get(this.endpoint, this.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // This method posts a device
  postDevice(deviceData: any): Promise<any> {
    const body = {
      manufacturer: deviceData.manufacturer,
      model: deviceData.model,
      platformDevice: deviceData.platformDevice,
      deviceUUID: deviceData.deviceUUID
    };
    return new Promise((resolve, reject) => {
      this.webService
        .post(this.endpoint, body, this.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // This method deletes a device by its _id
  deleteDevice(deviceId: string): Promise<any> {
    const url = `${this.endpoint}/${deviceId}`;
    return new Promise((resolve, reject) => {
      this.webService
        .delete(url, this.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // Post method to delete all devices
  deleteAllDevices(): Promise<any> {
    const url = `${this.endpoint}/deleteAll`; // URL for deleting all devices
    const body = {}; // Empty body
    return new Promise((resolve, reject) => {
      this.webService
        .post(url, body, this.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // Method to update a device (PATCH request)
  updateDevice(deviceId: string, updatedData: any): Promise<any> {
    const url = `${this.endpoint}/${deviceId}`; // Endpoint to update device
    return new Promise((resolve, reject) => {
      this.webService
        .patch(url, updatedData, this.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
