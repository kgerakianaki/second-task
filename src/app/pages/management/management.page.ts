import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-management",
  templateUrl: "./management.page.html",
  styleUrls: ["./management.page.scss"]
})
export class ManagementPage implements OnInit {
  addDevices: boolean = false;
  updateList: boolean = false;
  isDelete: boolean = false;
  searchTerm: string = "";
  deleteAll: boolean = false;

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  // Method to toggle the visibility of the add devices section
  openAddDevice() {
    this.addDevices = true;
    this.updateList = false; //update the flag to false for updating
  }

  // Method to close the device form
  closeForm($event: boolean) {
    this.addDevices = false;
  }

  //Output to update the device list
  update($event: boolean) {
    this.updateList = true;
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
    this.deleteAll = !this.deleteAll; // Call the 'update' method
    this.isDelete = false; // Hide the delete confirmation alert after the update
  }
}
