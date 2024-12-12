import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { trigger } from '@angular/animations';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss'],
})
export class DeviceManagementComponent implements OnInit {

  devices: Device[] = [];
  loading: boolean = false;
  noDevice: boolean = false;

  @Input() update=false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.fetchDevices();
    if (this.devices.length == 0) {
      this.noDevice = true;
    }
    else {
      this.noDevice = false;
    }
  }

  //This method checks about changes in the Inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['update']) {
      this.fetchDevices();
    }
  }
  
  //This method get the devices
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe(
      (response) => {
        if (response.status === 200) {
          this.devices = response.data;
          console.log(this.devices)
        }
      },
      (error) => {
        console.error('Error fetching devices:', error);
        this.loading = false;
      }
    );
  }

  
}
