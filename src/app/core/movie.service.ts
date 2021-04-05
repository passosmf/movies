import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';

const url = 'http://localhost:3000/movies/';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, movie);
  }

  edit(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(url + movie.id, movie);
  }

  list(page: number, quantity: number): Observable<Movie[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString());
    httpParams = httpParams.set('_limit', quantity.toString());
    return this.http.get<Movie[]>(url, {params: httpParams});
  }

  view(id: number): Observable<Movie> {
    return this.http.get<Movie>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
