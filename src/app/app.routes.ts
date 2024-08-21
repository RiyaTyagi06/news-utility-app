import { Routes } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'news-list', component: NewsListComponent },
  { path: 'news-detail/:id', component: NewsDetailComponent },
  { path: '', redirectTo: 'news-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
