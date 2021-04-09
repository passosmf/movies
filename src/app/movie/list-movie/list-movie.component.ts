import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MovieService } from 'src/app/core/movie.service';
import { ConfigPrams } from 'src/app/shared/models/config-prams';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'dio-ist-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {

  config: ConfigPrams = {
    page: 0,
    quantity: 4,
  };
  movies: Movie[] = [];
  filters: FormGroup;
  genres: Array<string>;

  constructor(private movieService: MovieService , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filters = this.fb.group({
      text: [''],
      genres: ['']
    });

    this.filters.get('text').valueChanges
    .subscribe((val: string) => {
      this.config.search = val;
      this.resetSearch();
    });

    this.filters.get('genres').valueChanges.subscribe((val: string) => {
      this.config.field = {type: 'genre', value: val};
      this.resetSearch();
    });

    this.genres = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

    this.listMovies();
  }

  private listMovies(): void {
    this.config.page++;
    this.movieService.list(this.config).subscribe((movies: Movie[]) => this.movies.push(...movies));
  }

  onScroll() {
    this.listMovies();
  }

  private resetSearch(): void {
    this.config.page = 0;
    this.movies = [];
    this.listMovies();
  }
}
