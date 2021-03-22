import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateMovieComponent } from './create-movie/create-movie.component';
import { MaterialModule } from '../shared/material/material.module';
import { FieldsModule } from '../shared/components/fields/fields.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule
  ],
  declarations: [CreateMovieComponent]
})
export class MovieModule { }
