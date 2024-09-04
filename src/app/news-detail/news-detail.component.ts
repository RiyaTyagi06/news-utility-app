import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NewsItem } from '../models/news-item.model';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  public news: NewsItem | undefined;

  constructor(private newsService: NewsService, private router: Router) {}

  public ngOnInit(): void {
    this.getNewsDetail();
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  private getNewsDetail(): void {
    const storedNews = localStorage.getItem('selectedNews');
    if (storedNews) {
      this.news = JSON.parse(storedNews);
    }
    this.newsService.data$.subscribe(data => {
      if (data) {
        this.news = data;
      }
    });
  }
}
