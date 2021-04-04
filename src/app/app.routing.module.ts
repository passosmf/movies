import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieModule } from './movie/movie.module';
import { CreateMovieComponent } from './movie/create-movie/create-movie.component';
import { ListMovieComponent } from './movie/list-movie/list-movie.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'movies',
      pathMatch: 'full'
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: ListMovieComponent
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            component: CreateMovieComponent
          },
          {
            path: ':id',
            component: CreateMovieComponent
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'movies' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MovieModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
