import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { DeviceManagementComponent } from "../components/device-management/device-management.component";
import { DeviceComponent } from "../components/device/device.component";
import { DeviceFormComponent } from "../components/device-form/device-form.component";
import { CustomPopoverComponent } from "../components/custom-popover/custom-popover.component";
import { DeleteAlertComponent } from "../components/delete-alert/delete-alert.component";
import { CategorySearchComponent } from "../components/category-search/category-search.component";

@NgModule({
  declarations: [
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
    TranslateModule, // Import necessary modules here
    FormsModule,
    IonicModule.forRoot()
  ],
  exports: [
    DeviceManagementComponent,
    DeviceComponent,
    DeviceFormComponent,
    CustomPopoverComponent,
    DeleteAlertComponent,
    CategorySearchComponent
  ]
})
export class SharedModule {}
