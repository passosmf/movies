import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/movie.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-ist-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {

  movies: Movie[] = [];
  page = 0;
  readonly quantity = 8;

  constructor(private movieService: MovieService ) { }

  ngOnInit(): void {
    this.listMovies();
  }

  private listMovies(): void {
    this.page++;
    this.movieService.list(this.page, this.quantity).subscribe((movies: Movie[]) => this.movies.push(...movies));
  }

  onScroll() {
    this.listMovies();
  }
}
