import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';
@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent  implements OnInit {
  //Uuid: string = '';
  device:Device=new Device();
  isLoading:boolean=false;
  @Output() closeModal=new EventEmitter();
  @Output() updateDeviceList=new EventEmitter();
  constructor(private deviceService:DeviceService) { }

  ngOnInit() {}
 
  // The following function generates a random UUID.
  generateUuid(): void {
    console.log("I am called")
    this.device.deviceUUID = uuidv4();
    console.log(this.device.deviceUUID)
  }

  //This method checks the if the user has enter the device data
  checkData(){
    if (!this.device.manufacturer || !this.device.model || !this.device.platformDevice || !this.device.deviceUUID) {
      return false; // Return false if any required field is missing
    }
    return true;
  }

  // This function posts a new device
  postDevice(){
    console.log(this.device)
    this.isLoading=true;
    if (this.checkData()) {
      //check if all the required fields are filled
      this.deviceService.postDevice(this.device).subscribe(
        response => {
          if (response.status === 201) {
          this.close()//close the open modal
          this.updateList()//update the list of devices
          this.isLoading=false; //stopping the loader
          console.log('Device created successfully:', response);
        } else {
          //TODO: MODAL HERE 
          console.error('Error creating device', response.message);
        }
        },
        error => {
          //TODO: MODAL HERE 
          console.error('Error creating device:', error);
        }
      );
    } 
  }

  //This function sends emitter to update the Device List
  updateList(){
    this.updateDeviceList.emit(true);
  }

  //This function close the opened modal
  close(){
    this.closeModal.emit(false);
  }

}
