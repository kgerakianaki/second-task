import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
import { DeviceService } from '../services/device.service';
@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss'],
})
export class DeleteAlertComponent  implements OnInit {
  @Output() alertClose = new EventEmitter();
  @Input() title: String | undefined;
  message: String = ""
  @Input() device:any;
  isLoading:boolean=false;
  @Output() updateList= new EventEmitter();
  @Output() deleteClose = new EventEmitter();

  constructor(private translate: TranslateService, private deviceService:DeviceService) { 
    
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
    this.deleteClose.emit(false)
  }

  //This function deletes the device.
  confirm(){

    this.close();
    this.isLoading = true; 
    this.deviceService.deleteDevice(this.device._id).subscribe(response => {
      this.isLoading = false; // Hide loader
      if (response.status === 200) {
        this.updateList.emit(true);
      }
      else{
        alert(response.message)
      }
    });
    
  }

}
