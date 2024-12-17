import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-custom-popover',
  templateUrl: './custom-popover.component.html',
  styleUrls: ['./custom-popover.component.scss'],
})
export class CustomPopoverComponent implements OnInit {

  @Output() deleteId=new EventEmitter();
  @Output() updateListDevice=new EventEmitter();
  @Input() triggerId: string = '';
  @Input() device:any;
  clean_id:string='';
  isDelete:boolean=false;
  isEdit=false;
  @Output() updatePopover=new EventEmitter();

  

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { 
    
  }

  //This method opens the delete alert
  delete(){
    this.isDelete=true;
     // Close the popover if it's open
     this.popoverController.dismiss();
  }
  
  //This method closes the alert
  closeDeleteAlert($event:boolean){
    this.isDelete=$event;
  }

  updateDeleteHandle($event:boolean){
    this.isDelete=false;//closing the delete Alert
    this.updatePopover.emit(true);
  }

  edit(){
    this.isEdit=true;
    // Close the popover if it's open
    this.popoverController.dismiss();
  }

  //Output to update the device list
  update($event:boolean){
    this.updatePopover.emit(true);
  }
  
  
  // Method to close the device form
  closeForm($event:boolean){
    this.isEdit=false;
  }

}
