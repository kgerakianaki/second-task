import { Injectable } from "@angular/core";
import { WebService } from "./web.service";
import { AuthService } from "./auth.service";
import { HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  endpoint = "/api/v1/devices";
  headers: any;

  constructor(
    private webService: WebService,
    private translate: TranslateService,
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
          this.postSuccess();
        })
        .catch(error => {
          reject(error);
          this.postError(error);
        });
    });
  }

  private postError(error: any) {
    // Error toast with SweetAlert2
    Swal.fire({
      icon: "error",
      title: this.translate.instant("device-form.create-error-title"),
      text:
        error.message ||
        this.translate.instant("device-form.create-error-text"),
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#932222", // Red background for error
      color: "#fff" // White text
    });
  }

  private postSuccess() {
    // Success toast with SweetAlert2
    Swal.fire({
      icon: "success",
      title: this.translate.instant("device-form.create-success-title"),
      text: this.translate.instant("device-form.create-success-text"),
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#28a745", // Green background for success
      color: "#fff" // White text
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
          this.deleteSuccess();
        })
        .catch(error => {
          reject(error);
          this.deleteError(error);
        });
    });
  }

  private deleteError(error: any) {
    // Error: Show error notification
    Swal.fire({
      icon: "error",
      title: this.translate.instant("alert.title_delete_notif"),
      text: error.message,
      background: "#932222", // Red color background
      color: "#fff", // White text color
      timer: 3000, // Timeout after 3 seconds
      showConfirmButton: false,
      position: "top",
      toast: true
    });
  }

  private deleteSuccess() {
    // Success: Show success notification
    Swal.fire({
      icon: "success",
      title: this.translate.instant("alert.title_delete_notif"),
      text: this.translate.instant("alert.success_delete"),
      background: "#28a745", // Green color for success
      color: "#fff", // White text color
      timer: 3000, // Timeout after 3 seconds
      showConfirmButton: false,
      position: "top",
      toast: true
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
          this.deleteSuccess();
        })
        .catch(error => {
          reject(error);
          this.deleteError(error);
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
          this.updateSuccess();
        })
        .catch(error => {
          reject(error);
          this.updateError(error);
        });
    });
  }

  private updateError(error: any) {
    // Error toast with SweetAlert2
    Swal.fire({
      icon: "error",
      title: this.translate.instant("device-form.update-error-title"),
      text:
        error.message ||
        this.translate.instant("device-form.update-error-text"),
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#932222", // Red background for error
      color: "#fff" // White text
    });
  }
  private updateSuccess() {
    // Success toast with SweetAlert2
    Swal.fire({
      icon: "success",
      title: this.translate.instant("device-form.update-success-title"),
      text: this.translate.instant("device-form.update-success-text"),
      timer: 3000,
      showConfirmButton: false,
      position: "top",
      toast: true,
      background: "#28a745", // Green background for success
      color: "#fff" // White text
    });
  }
}
