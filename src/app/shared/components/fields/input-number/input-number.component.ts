import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  @Input() minimum = 0;
  @Input() maximum = 10;
  @Input() step = 1;

  constructor(public validator: ValidateFieldsService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
