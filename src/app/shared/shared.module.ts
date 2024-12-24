import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { DeviceManagementComponent } from "../device-management/device-management.component";
import { DeviceComponent } from "../device/device.component";
import { DeviceFormComponent } from "../device-form/device-form.component";
import { CustomPopoverComponent } from "../custom-popover/custom-popover.component";
import { DeleteAlertComponent } from "../delete-alert/delete-alert.component";
import { CategorySearchComponent } from "../category-search/category-search.component";
import { LoginPage } from "../pages/login/login.page";

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
