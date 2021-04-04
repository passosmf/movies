import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/movie.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-ist-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService ) { }

  ngOnInit() {

    this.movieService.list().subscribe((movies: Movie[]) => this.movies = movies);
  }

  open() {
    alert('teste');
  }
}
