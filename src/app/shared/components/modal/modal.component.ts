import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Warning } from '../../models/warning';

@Component({
  selector: 'dio-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  warning = {
    title: 'Success!',
    description: 'Your request was successfully submitted!',
    buttonSuccess: 'OK',
    buttonCancel: 'Cancel',
    buttonSuccessCollor: 'primary',
    buttonCancelCollor: 'warn',
    hasCloseButton: false
  } as Warning;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warning) { }

    ngOnInit() {
      if (this.data) {
        this.warning.title = this.data.title || this.warning.title;
        this.warning.description = this.data.description || this.warning.description;
        this.warning.buttonSuccess = this.data.buttonSuccess || this.warning.buttonSuccess;
        this.warning.buttonCancel = this.data.buttonCancel || this.warning.buttonCancel;
        this.warning.buttonSuccessCollor = this.data.buttonSuccessCollor || this.warning.buttonSuccessCollor;
        this.warning.buttonCancelCollor = this.data.buttonCancelCollor || this.warning.buttonCancelCollor;
        this.warning.hasCloseButton = this.data.hasCloseButton || this.warning.hasCloseButton;
      }
    }

}
