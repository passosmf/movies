import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dio-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    title = 'Success!';
    description = 'Your request was successfully submitted!';
    buttonSuccess = 'OK';
    buttonCancel = 'Cancel';
    buttonSuccessCollor = 'primary';
    buttonSCancelCollor = 'warn';
    hasCloseButton = false;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
