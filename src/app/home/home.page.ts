import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  authorized: boolean = false;
  addDevices: boolean = false;
  updateList:boolean=false;
  isDelete:boolean=false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkAuthorization(); // Check authorization when the component is initialized
  }

  ngAfterViewInit(){

    
  }

  ngDoCheck() {
    this.checkAuthorization(); // Check authorization whenever the component is checked for changes
  }

  // Method to check if the user is authorized
  checkAuthorization() {
    this.authorized = this.authService.isLoggedIn(); // Set authorized to true if logged in
  }

  // Method to toggle the visibility of the add devices section
  openAddDevice() {
    this.addDevices = true;
    this.updateList=false;//update the flag to false for updating
  }

  // Method to close the device form
  closeForm($event:boolean){
    this.addDevices=false;
  }

  //Output to update the device list
  update($event:boolean){
  this.updateList=true;
  }

 
}
