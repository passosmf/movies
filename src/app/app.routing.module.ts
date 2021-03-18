import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieModule } from './movie/movie.module';
import { CreateMovieComponent } from './movie/create-movie/create-movie.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'filmes',
      pathMatch: 'full'
  },
  {
    path: 'filmes',
    children: [
      {
        path: 'cadastro',
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
  { path: '**', redirectTo: 'filmes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MovieModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
