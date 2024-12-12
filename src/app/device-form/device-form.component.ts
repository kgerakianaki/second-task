import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../models/device.model';
@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent  implements OnInit {
  //Uuid: string = '';
  device:Device=new Device();
 
  constructor() { }

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
  }

}
