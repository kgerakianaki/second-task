import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  device: Device = new Device();  // Empty device object initially
  isLoading: boolean = false;
  @Output() closeModal = new EventEmitter();
  @Output() updateDeviceList = new EventEmitter();
  @Input() deviceEdit: Device | undefined;  // Input property for device to edit
  originalDevice: Device = new Device();  // Store original device for comparison

  changedFields: Set<string> = new Set();  // Track changed fields

  constructor(private deviceService: DeviceService, private translate:TranslateService) {}

  ngOnInit() {
    this.initializeDeviceData();
  }

  initializeDeviceData() {
    // If editing an existing device, copy the device data into the `device` and `originalDevice` properties
    if (this.deviceEdit) {
      this.device = { ...this.deviceEdit };  // Copy the device data for editing
      this.originalDevice = { ...this.deviceEdit };  // Store original device data for comparison
    } else {
      // For creating a new device, initialize with an empty or default device
      this.device = new Device();
      this.originalDevice = new Device();
    }
  }

  generateUuid(): void {
    this.device.deviceUUID = uuidv4();  // Generate a new UUID
    this.onFieldChange('deviceUUID');   // In case of change UUID add field
  }

  checkData(): boolean {
    // Check if all required fields are filled before submitting
     return this.device.manufacturer?.trim() && 
         this.device.model?.trim() && 
         this.device.platformDevice?.trim() && 
         this.device.deviceUUID?.trim() ? true : false;
  }

  postDevice(): void {
    console.log(this.device);
    this.isLoading = true;
  
    if (this.checkData()) {

      this.deviceService.postDevice(this.device)
  .then((response) => {
    if (response.status === 201) {
      this.close();  // Close the modal on success
      this.updateList();  // Update the device list
      this.isLoading = false;  // Stop the loader
      console.log('Device created successfully:', response);

      // Success toast with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: this.translate.instant('device-form.create-success-title'),
        text: this.translate.instant('device-form.create-success-text'),
        timer: 3000,
        showConfirmButton: false,
        position: 'top',
        toast: true,
        background: '#28a745', // Green background for success
        color: '#fff', // White text
      });
    } else {
      console.error('Error creating device', response.message);

      // Error toast with SweetAlert2
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('device-form.create-error-title'),
        text: response.message || this.translate.instant('device-form.create-error-text'),
        timer: 3000,
        showConfirmButton: false,
        position: 'top',
        toast: true,
        background: '#932222', // Red background for error
        color: '#fff', // White text
      });
    }
  })
  .catch((error) => {
    console.error('Error creating device:', error);

    // Error toast with SweetAlert2
    Swal.fire({
      icon: 'error',
      title: this.translate.instant('device-form.create-error-title'),
      text: error.message || this.translate.instant('device-form.create-error-text'),
      timer: 3000,
      showConfirmButton: false,
      position: 'top',
      toast: true,
      background: '#932222', // Red background for error
      color: '#fff', // White text
    });
    this.isLoading = false;  // Stop the loader
  });

      // this.deviceService.postDevice(this.device).subscribe(
      //   (response) => {
      //     if (response.status === 201) {
      //       this.close();  // Close the modal on success
      //       this.updateList();  // Update the device list
      //       this.isLoading = false;  // Stop the loader
      //       console.log('Device created successfully:', response);
  
      //       // Success toast with SweetAlert2
      //       Swal.fire({
      //         icon: 'success',
      //         title: this.translate.instant('device-form.create-success-title'),
      //         text: this.translate.instant('device-form.create-success-text'),
      //         timer: 3000,
      //         showConfirmButton: false,
      //         position: 'top',
      //         toast: true,
      //         background: '#28a745', // Green background for success
      //         color: '#fff', // White text
      //       });
      //     } else {
      //       console.error('Error creating device', response.message);
  
      //       // Error toast with SweetAlert2
      //       Swal.fire({
      //         icon: 'error',
      //         title: this.translate.instant('device-form.create-error-title'),
      //         text: response.message || this.translate.instant('device-form.create-error-text'),
      //         timer: 3000,
      //         showConfirmButton: false,
      //         position: 'top',
      //         toast: true,
      //         background: '#932222', // Red background for error
      //         color: '#fff', // White text
      //       });
      //     }
      //   },
      //   (error) => {
      //     console.error('Error creating device:', error);
  
      //     // Error toast with SweetAlert2
      //     Swal.fire({
      //       icon: 'error',
      //       title: this.translate.instant('device-form.create-error-title'),
      //       text: error.message || this.translate.instant('device-form.create-error-text'),
      //       timer: 3000,
      //       showConfirmButton: false,
      //       position: 'top',
      //       toast: true,
      //       background: '#932222', // Red background for error
      //       color: '#fff', // White text
      //     });
      //     this.isLoading = false;  // Stop the loader
      //   }
      // );
    } else {
      this.isLoading = false;  // Stop the loader if data is incomplete
    }
  }

  onFieldChange(field: keyof Device): void {
    // Track changes in the fields and compare with original data
    if (this.device[field] !== this.originalDevice[field]) {
      console.log(this.device[field])
      this.changedFields.add(field);  // Add to changed fields
    } else {
      this.changedFields.delete(field);  // Remove from changed fields if reverted
    }
  }

  updateDevice(): void {
    // Only proceed if there are changes in the device data
    const updatedData: Partial<Device> = {};

    if (this.changedFields.size > 0) {
      // Prepare updated fields for the API request
      if (this.device.manufacturer !== this.originalDevice.manufacturer) updatedData['manufacturer'] = this.device.manufacturer;
      if (this.device.model !== this.originalDevice.model) updatedData['model'] = this.device.model;
      if (this.device.platformDevice !== this.originalDevice.platformDevice) updatedData['platformDevice'] = this.device.platformDevice;
      if (this.device.deviceUUID !== this.originalDevice.deviceUUID) updatedData['deviceUUID'] = this.device.deviceUUID;
    
      // Proceed only if there are changes to update
      if (Object.keys(updatedData).length) {
        this.isLoading = true;
        if (this.device._id) {
          this.deviceService.updateDevice(this.device._id, updatedData)
            .then((response) => {
              this.isLoading = false;
              this.close();  // Close the modal after updating
              this.updateList();  // Update the device list

              // Success toast with SweetAlert2
              Swal.fire({
                icon: 'success',
                title: this.translate.instant('device-form.update-success-title'),
                text: this.translate.instant('device-form.update-success-text'),
                timer: 3000,
                showConfirmButton: false,
                position: 'top',
                toast: true,
                background: '#28a745', // Green background for success
                color: '#fff', // White text
              });
            })
            .catch((error) => {
              this.isLoading = false;
              console.error('Error updating device:', error);

              // Error toast with SweetAlert2
              Swal.fire({
                icon: 'error',
                title: this.translate.instant('device-form.update-error-title'),
                text: error.message || this.translate.instant('device-form.update-error-text'),
                timer: 3000,
                showConfirmButton: false,
                position: 'top',
                toast: true,
                background: '#932222', // Red background for error
                color: '#fff', // White text
              });
            });

        }
      }
    }
  }

  updateList(): void {
    // Emit event to notify the parent component to update the device list
    this.updateDeviceList.emit(true);
  }

  close(): void {
    // Emit event to close the modal
    this.closeModal.emit(false);
  }
}
