import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dio-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  get f() {
    return this.createForm.controls;
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: ['', [Validators.required, Validators.minLength(3)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      rating: ['0', [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });

  }

  submit(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) {
      return;
    }

    alert(JSON.stringify(this.createForm.value, null, 4));
  }

  resetForm(): void {
    this.createForm.reset();
  }
}
