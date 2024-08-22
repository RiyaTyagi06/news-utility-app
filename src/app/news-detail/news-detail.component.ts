import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NewsItem } from '../models/news-item.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent implements OnInit {
  public news: NewsItem | undefined;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.getNewsDetail();
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  private getNewsDetail(): void {
    if (history.state && history.state.data) {
      this.news = history.state.data;
    } else {
      this.router.navigate(['/']);
    }
  }
}
