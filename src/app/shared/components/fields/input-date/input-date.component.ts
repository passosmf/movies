import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validator: ValidateFieldsService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
