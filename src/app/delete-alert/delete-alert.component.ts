import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
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

  @Output() deleteClose = new EventEmitter();

  constructor(private translate: TranslateService) { 
    
  }

  ngOnInit() {
    if(this.device){
      this.translate.get('alert.subtitle_delete').subscribe((translation: string) => {
        this.message = translation+" "+this.device.manufacturer+"-"+this.device.model+";";// Assign the translated string to message
      });
    }
    console.log(this.device)
  }

}
