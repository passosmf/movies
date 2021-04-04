import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/core/movie.service';
import { ValidateFieldsService } from 'src/app/shared/components/fields/validate-fields.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Movie } from 'src/app/shared/models/movie';
import { Warning } from 'src/app/shared/models/warning';

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
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router) { }

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
      const config = {
        data: {
          buttonSuccess: 'Go to list',
          buttonCancel: 'Create a new movie',
          buttonSuccessCollor: 'accent',
          buttonCancelCollor: 'primary',
          hasCloseButton: true
        } as Warning
      };

      const dialogRef = this.dialog.open(ModalComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('movies');
        } else {
          this.resetForm();
        }
      });

    },
    () => {
      const config = {
        data: {
          title: 'Error!',
          description: 'Request failed.',
          buttonSuccess: 'Close',
          buttonCancel: 'Create a new movie',
          buttonSuccessCollor: 'warn'
        } as Warning
      };
      this.dialog.open(ModalComponent, config);
    });
  }
}
