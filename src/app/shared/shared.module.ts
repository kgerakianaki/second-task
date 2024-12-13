import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from '../login/login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DeviceManagementComponent } from '../device-management/device-management.component';
import { DeviceComponent } from '../device/device.component';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { CustomPopoverComponent } from '../custom-popover/custom-popover.component';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';
import { CategorySearchComponent } from '../category-search/category-search.component';

@NgModule({
  declarations: [LoginComponent,
    DeviceManagementComponent,
    DeviceComponent,
    DeviceFormComponent,
    CustomPopoverComponent,
    DeleteAlertComponent,
    CategorySearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,// Import necessary modules here
    FormsModule,
    IonicModule.forRoot()
  ],
  exports: [LoginComponent,
    DeviceManagementComponent,
    DeviceComponent,
    DeviceFormComponent,
    CustomPopoverComponent,
    DeleteAlertComponent,
    CategorySearchComponent

  ]
})
export class SharedModule { }
