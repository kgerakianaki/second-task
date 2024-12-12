import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-custom-popover',
  templateUrl: './custom-popover.component.html',
  styleUrls: ['./custom-popover.component.scss'],
})
export class CustomPopoverComponent implements OnInit {

  @Output() deleteId=new EventEmitter();
  @Input() triggerId: string = '';
  @Input() device:any;
  @Output() updateList=new EventEmitter();
  clean_id:string='';
  isDelete:boolean=false;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() { 
    
  }

  //This method opens the delete alert
  delete(){
    this.isDelete=true;

     // Close the popover if it's open
     this.popoverController.dismiss();
  }

  closeDeleteAlert($event:boolean){
    this.isDelete=$event;
  }



}
