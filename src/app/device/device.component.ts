import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { SharedModule } from '../shared/shared.module';
import { PopoverController } from '@ionic/angular';
import { CustomPopoverComponent } from '../custom-popover/custom-popover.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() device: Device | undefined;
  created_at: String = '';
  constructor(private popocerCtrl: PopoverController) { }

  ngOnInit() {
    // Call the changeDateFormat function to format the date on component initialization
    this.changeDateFormat();
  }

  // This function formats the created_dt property of the device object
  changeDateFormat() {
    if (this.device?.created_dt) {
      const dateObj = new Date(this.device.created_dt);

      const formattedDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
        dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

      // Assign the formatted date to a property for display in the template
      this.created_at = formattedDate;
    }
  }
}
