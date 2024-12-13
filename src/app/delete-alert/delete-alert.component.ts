import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
import { DeviceService } from '../services/device.service';
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


  constructor(
    private translate: TranslateService, 
    private deviceService:DeviceService
  ) { 
    
  }

  ngOnInit() {
    if(this.device){
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

   // Confirm deletion of the device (emitting valueEmitted)
   confirm() {
    //this.close(); // Close the alert first
    this.isLoading = true; // Show loading state
    this.deviceService.deleteDevice(this.device._id).subscribe(response => {
      this.isLoading = false; // Hide loading state
      if (response.status === 200) {
        this.updateDelete.emit(true)
      } else {
        alert(response.message); // Handle failure
      }
    });
  }

}
