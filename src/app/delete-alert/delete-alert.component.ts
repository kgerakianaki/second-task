import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { DeviceService } from '../services/device.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent  implements OnInit {

  @Input() title: String | undefined;
  message: String = ""
  @Input() device:any;
  isLoading:boolean=false;
  @Output() deleteClose = new EventEmitter();
  @Output() updateDelete= new EventEmitter();
  @Output() updateDeleteAll= new EventEmitter();
  @Input() one=false;

  constructor(
    private translate: TranslateService, 
    private deviceService:DeviceService
  ) { 
    
  }

  ngOnInit() {
    if(this.device&&this.one){
      this.translate.get('alert.subtitle_delete').subscribe((translation: string) => {
        this.message = translation+" "+this.device.manufacturer+"-"+this.device.model+";";// Assign the translated string to message
      });
    }
    
    console.log(this.device)
  }

  //This function close the delete alert component.
  close(){
    this.deleteClose.emit(false);
  }
  
  // Confirm deletion
  confirm() {
    if(this.one) {
       // Confirm deletion of the single device
      this.isLoading = true; // Show loading state
      this.deviceService.deleteDevice(this.device._id).subscribe(response => {
        this.isLoading = false; // Hide loading state
        if (response.status === 200) {
          // Success: Show success notification
          Swal.fire({
            icon: 'success',
            title: this.translate.instant('alert.title_delete_notif'),
            text: this.translate.instant('alert.success_delete'),
            background: '#28a745', // Green color for success
            color: '#fff', // White text color
            timer: 3000, // Timeout after 3 seconds
            showConfirmButton: false,
            position: 'top',
            toast: true,
          });
          this.updateDelete.emit(true); // Successfully deleted
        } else {
          // Error: Show error notification
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('alert.title_delete_notif'),
            text: response.message,
            background: '#932222', // Red color background
            color: '#fff', // White text color
            timer: 3000, // Timeout after 3 seconds
            showConfirmButton: false,
            position: 'top',
            toast: true,
          });
        }
      });

    } else {
       // Confirm deletion of all devices
      this.isLoading = true; // Show loading state
      // Subscribe to get the list of devices
    let dontDelete=false;
    this.deviceService.getDevices().subscribe(devices => {
      // Check if there are devices to delete
      console.log(devices.length)
      if (devices.length === undefined) {
        dontDelete=true;
        // Show warning if no devices are available
        Swal.fire({
          icon: 'warning',
          title: this.translate.instant('alert.title_delete_notif'),
          text: this.translate.instant('alert.no_devices_to_delete'), 
          background: '#ffffff', 
          color: '#FF7F50', 
          timer: 3000, // Timeout after 3 seconds
          showConfirmButton: false,
          position: 'top',
          toast: true,
        });
        this.isLoading = false; // Hide loading state
        return; // Stop further execution if no devices
      }
    });
      if(dontDelete){
        this.deviceService.deleteAllDevices().subscribe(response => {
          this.isLoading = false; // Hide loading state
          if (response.status === 200) {
            // Success: Show success notification
            Swal.fire({
              icon: 'success',
              title: this.translate.instant('alert.title_delete_notif'),
              text: this.translate.instant('alert.success_delete'),
              background: '#28a745', // Green color for success
              color: '#fff', // White text color
              timer: 3000, // Timeout after 3 seconds
              showConfirmButton: false,
              position: 'top',
              toast: true,
            });
            this.updateDeleteAll.emit(true); // Successfully deleted all devices
          } else {
            // Error: Show error notification
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('alert.title_delete_notif'),
              text: response.message,
              background: '#932222', // Red color background
              color: '#fff', // White text color
              timer: 3000, // Timeout after 3 seconds
              showConfirmButton: false,
              position: 'top',
              toast: true,
            });
          }
        });
      }
    }
  }


}
