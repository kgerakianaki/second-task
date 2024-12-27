import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  output,
  Output
} from "@angular/core";
import { DeviceService } from "../../services/device.service";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-delete-alert",
  templateUrl: "./delete-alert.component.html",
  styleUrls: ["./delete-alert.component.scss"]
})
export class DeleteAlertComponent implements OnInit {
  @Input() title: String | undefined;
  message: String = "";
  @Input() device: any;
  isLoading: boolean = false;
  @Output() deleteClose = new EventEmitter();
  @Output() updateDelete = new EventEmitter();
  @Output() updateDeleteAll = new EventEmitter();
  @Input() one = false;

  constructor(
    private translate: TranslateService,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    if (this.device && this.one) {
      this.translate
        .get("alert.subtitle_delete")
        .subscribe((translation: string) => {
          this.message =
            translation +
            " " +
            this.device.manufacturer +
            "-" +
            this.device.model +
            ";"; // Assign the translated string to message
        });
    }
  }

  //This function close the delete alert component.
  close() {
    this.deleteClose.emit(false);
  }

  // Confirm deletion
  confirm() {
    if (this.one) {
      // Confirm deletion of the single device
      this.isLoading = true; // Show loading state

      this.deviceService
        .deleteDevice(this.device._id)
        .then(response => {
          this.isLoading = false; // Hide loading state
          if (response.status === 200) {
            this.updateDelete.emit(true); // Successfully deleted
          }
        })
        .catch(error => {
          this.isLoading = false; // Hide loading state
          console.error("Error deleting device:", error);
        });
    } else {
      // Confirm deletion of all devices
      this.isLoading = true; // Show loading state
      // Subscribe to get the list of devices
      let dontDelete = true;
      this.deviceService
        .getDevices()
        .then(devices => {
          // Check if there are devices to delete
          console.log(devices.data.length);
          if (devices.data.length === 0) {
            dontDelete = false;
            // Show warning if no devices are available
            Swal.fire({
              icon: "warning",
              title: this.translate.instant("alert.title_delete_notif"),
              text: this.translate.instant("alert.no_devices_to_delete"),
              background: "#ffffff",
              color: "#FF7F50",
              timer: 3000, // Timeout after 3 seconds
              showConfirmButton: false,
              position: "top",
              toast: true
            });
            this.isLoading = false; // Hide loading state
            return; // Stop further execution if no devices
          } else {
            this.deviceService
              .deleteAllDevices()
              .then(response => {
                this.isLoading = false; // Hide loading state
                if (response.status === 200) {
                  this.updateDeleteAll.emit(true); // Successfully deleted all devices
                }
              })
              .catch(error => {
                this.isLoading = false; // Hide loading state
                console.error("Error deleting all devices:", error);
              });
          }
        })
        .catch(error => {
          this.isLoading = false; // Hide loading state
          console.error("Error fetching devices:", error);
        });
    }
  }
}
