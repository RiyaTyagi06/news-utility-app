import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApiResponse, NewsItem } from '../models/news-item.model';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [NewsService, provideNativeDateAdapter()],
})
export class NewsListComponent implements OnInit {
  public newsList: NewsItem[] = [];
  public filteredNewsList: NewsItem[] = [];
  public countries = [
    { name: 'United States', code: 'us' },
    { name: 'United Kingdom', code: 'uk' },
    { name: 'India', code: 'in' },
  ];
  public selectedCountry: string = '';
  public fromDate: Date | null = null;
  public toDate: Date | null = null;
  public searchQuery: string = '';
  public isLoading: boolean = false;

  constructor(private newsService: NewsService, private router: Router) {}

  public ngOnInit(): void {
    this.getNews();
  }

  public openNewsDetail(news: NewsItem): void {
    this.router.navigate(['/news-detail', news.url], { state: { data: news } });
  }

  public async getNews(): Promise<void> {
    this.isLoading = true;
    this.newsService.getNews().subscribe({
      next: (data: ApiResponse) => {
        this.filteredNewsList = this.newsList = data.articles.map(
          (article, index) => {
            let country;
            if (index % 3 === 0) {
              country = 'us';
            } else if (index % 3 === 1) {
              country = 'uk';
            } else {
              country = 'in';
            }
            return { ...article, country };
          }
        );
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
        this.isLoading = false;
      },
    });
  }

  public filterNews(): void {
    this.filteredNewsList = this.newsList.filter((news) => {
      const matchesSearchQuery =
        news?.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        news?.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        news?.description
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

      const matchesCountry =
        !this.selectedCountry || news.country === this.selectedCountry;

      const newsDate = new Date(news.publishedAt);
      const matchesDateRange =
        (!this.fromDate || newsDate >= new Date(this.fromDate)) &&
        (!this.toDate || newsDate <= new Date(this.toDate));

      return matchesSearchQuery && matchesCountry && matchesDateRange;
    });
  }
}
