import { Component, OnInit } from '@angular/core';
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

  fetchDevices(): void {
    this.deviceService.getDevices().subscribe(
      (response) => {
        if (response.status === 200) {
          this.devices = response.data;
        }
      },
      (error) => {
        console.error('Error fetching devices:', error);
        this.loading = false;
      }
    );
  }
}
