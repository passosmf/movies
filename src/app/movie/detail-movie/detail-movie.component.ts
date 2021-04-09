import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/movie.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Movie } from 'src/app/shared/models/movie';
import { Warning } from 'src/app/shared/models/warning';


@Component({
  selector: 'dio-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit {

  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  id: number;
  movie: Movie;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.openDetail();
  }

  edit(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  delete(): void {
    const config = {
      data: {
        title: 'Are you sure?',
        description: 'If you are sure about that, click OK button',
        buttonSuccessCollor: 'warn',
        buttonCancelCollor: 'primary',
        hasCloseButton: true
      } as Warning
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.movieService.delete(this.id)
        .subscribe(() => this.router.navigateByUrl('/movies'));
      }
    });
  }

  private openDetail(): void {
    this.movieService.view(this.id).subscribe((movie: Movie) => this.movie = movie);
  }

}
