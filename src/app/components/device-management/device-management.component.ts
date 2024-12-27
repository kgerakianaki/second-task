import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss'],
})
export class DeviceManagementComponent implements OnInit, OnChanges {

  devices: Device[] = [];
  loading: boolean = false;
  @Input() searchTerm: string = '';   // Default to empty string
  @Input() update: boolean = false;   // Default to false
  @Input() delete: boolean = false;   // Default to false
  myfilteredDevices: Device[] = [];    // Store filtered devices
  searchOn: boolean = false;          // Flag to indicate if searching is active

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.fetchDevices();  // Initial fetch on component load
  }

  // This method checks about changes in the Inputs
  ngOnChanges(changes: SimpleChanges): void {
    // Only fetch devices if 'update' or 'delete' changes
    if (changes['update'] && this.update) {
      console.log('Update detected:', this.update);
      this.fetchDevices();
    }

    if (changes['delete'] && this.delete) {
      this.fetchDevices();
    }

    if (changes['searchTerm']) {
      this.filterDevices();
    }
  }

  // This method filters devices based on search term
  filterDevices(): void {
    if (this.searchTerm !== '') {
      this.searchOn = true;
      const term = this.searchTerm.toLowerCase();
      this.myfilteredDevices = this.devices.filter(device =>
        device.manufacturer?.toLowerCase().includes(term) ||
        device.model?.toLowerCase().includes(term)
      );
    } else {
      this.searchOn = false;
      this.myfilteredDevices = [...this.devices];  // Reset to all devices
    }
  }

  // Fetches devices from the service
  fetchDevices(): void {
    this.loading = true; // Show loading state
    this.deviceService.getDevices().then(
      (response) => {
        if (response.status === 200) {
          this.devices = response.data;
          // If no search term, populate filtered list with all devices
          if (!this.searchTerm) {
            this.myfilteredDevices = [...this.devices];
          }
        }
        this.loading = false; // Hide loading after fetching
      }
    ).catch(
      (error) => {
        console.error('Error fetching devices:', error);
        this.loading = false;
      }
    );
    // this.deviceService.getDevices().subscribe(
    //   (response) => {
    //     if (response.status === 200) {
    //       this.devices = response.data;
    //       // If no search term, populate filtered list with all devices
    //       if (!this.searchTerm) {
    //         this.myfilteredDevices = [...this.devices];
    //       }
    //     }
    //     this.loading = false; // Hide loading after fetching
    //   },
    //   (error) => {
    //     console.error('Error fetching devices:', error);
    //     this.loading = false;
    //   }
    // );
  }

  // This method is called when there's an update event
  getUpdate(event: any): void {
    console.log('Received update event:', event);
    this.fetchDevices();  // Re-fetch devices after update
  }
}

