import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/core/movie.service';
import { ValidateFieldsService } from 'src/app/shared/components/fields/validate-fields.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  createForm: FormGroup;
  genres: Array<string>;

  constructor(
    public validator: ValidateFieldsService,
    private formBuilder: FormBuilder,
    private movieService: MovieService) { }

  get f() {
    return this.createForm.controls;
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      urlPhoto: ['', [Validators.required, Validators.minLength(2)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      rating: ['0', [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });

    this.genres = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
  }

  submit(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) {
      return;
    }

    const movie = this.createForm.getRawValue() as Movie;
    this.save(movie);
  }

  resetForm(): void {
    this.createForm.reset();
  }

  private save(movie: Movie): void {
    this.movieService.save(movie).subscribe(() => {
      alert('a');
    },
    () => {
      alert('b');
    });
  }
}
