import { Component, EventEmitter, Input } from '@angular/core';
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
  searchTerm:string='';
  
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

// This method handles the search functionality. It updates the 'searchTerm' 
getSearch($event: any) {
  this.searchTerm = $event; // Assign the search term to the 'searchTerm' property
}

// This method triggers the deletion action. It sets 'isDelete' to true, 
deleteThem() {
  this.isDelete = true; // Set 'isDelete' to true to show the delete confirmation
}

// This method handles the closing of the delete confirmation alert.
closeDeleteAlert($event: boolean) {
  this.isDelete = $event; 
}

// This method updates the state after a delete action is confirmed.
updateFromDelete($event: boolean) {
  this.update($event); // Call the 'update' method 
  this.isDelete = false; // Hide the delete confirmation alert after the update
}
}
