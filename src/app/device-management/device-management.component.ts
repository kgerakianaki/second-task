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
  @Input() searchTerm='';
  @Input() update=false;
  @Input() delete=false;
  myfilteredDevices: any[] = []; 
  searchOn:boolean=false;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.fetchDevices();
  }

  //This method checks about changes in the Inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['update']) {
      if(this.update){
      this.fetchDevices();
      //this.update=false;
      console.log(this.update)
      }
    }

    if(changes['delete']){
      this.fetchDevices();
    }

    if(changes['searchTerm']){
     if(this.searchTerm!=''){
      this.filterDevices();
      this.searchOn=true;
     }
     else{
      //if no searching term then fetch all devices again and close the searchOn
      this.fetchDevices(); 
      this.searchOn=false;
     }
     
    }
  }

  filterDevices() {
      // Filter devices based on manufacturer and model
      const term = this.searchTerm.toLowerCase();  // Convert the searchTerm to lowercase for case-insensitive comparison
      this.myfilteredDevices = this.devices.filter(device => {
        return (
          device.manufacturer?.toLowerCase().includes(term) || 
          device.model?.toLowerCase().includes(term)
        );
      });
      
  }
  
  //This method get the devices
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

  //This method updates the devices' list
  getUpdate($even:any){
    this.fetchDevices();
  }
  
}
