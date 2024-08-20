import { Routes } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'detail', component: NewsDetailComponent },
  { path: 'list', component: NewsListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
