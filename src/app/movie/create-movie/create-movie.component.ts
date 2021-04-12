import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: number;
  createForm: FormGroup;
  genres: Array<string>;

  constructor(
    public validator: ValidateFieldsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.createForm.controls;
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.movieService.view(this.id).subscribe((movie: Movie) => this.loadMovieForm(movie));
    } else {
      this.loadMovieForm(this.createEmptyMovie());
    }

    this.genres = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
  }

  submit(): void {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) {
      return;
    }
    const movie = this.createForm.getRawValue() as Movie;

    if (this.id) {
      movie.id = this.id;
      this.edit(movie);
    } else {
      this.save(movie);
    }
  }

  resetForm(): void {
    this.createForm.reset();
  }

  private loadMovieForm(movie: Movie): void {
    this.createForm = this.formBuilder.group({
      title: [movie.title, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPhoto: [movie.urlPhoto, [Validators.minLength(10)]],
      releaseDate: [movie.releaseDate, [Validators.required]],
      description: [movie.description],
      rating: [movie.rating, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [movie.urlIMDb, [Validators.minLength(10)]],
      genre: [movie.genre, [Validators.required]]
    });
  }

  private createEmptyMovie(): Movie {
    return {
      id: null,
      title: null,
      releaseDate: null,
      urlFPhto: null,
      description: null,
      rating: null,
      urlIMDb: null,
      genre: null
    } as Movie;
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

  private edit(movie: Movie): void {
    this.movieService.edit(movie).subscribe(() => {
      const config = {
        data: {
          description: 'Record saved.',
          buttonSuccess: 'Go to list',
        } as Warning
      };

      const dialogRef = this.dialog.open(ModalComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('movies'));
    },
    () => {
      const config = {
        data: {
          title: 'Error!',
          description: 'Request failed.',
          buttonSuccess: 'Close',
          buttonSuccessCollor: 'warn'
        } as Warning
      };
      this.dialog.open(ModalComponent, config);
    });
  }
}
