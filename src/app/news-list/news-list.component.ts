import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NewsService } from '../service/news.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
    FormsModule
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [NewsService, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  public newsList: any[] = [];
  public filteredNewsList: any[] = [];
  public countries = [
    { name: 'United States', code: 'us' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'India', code: 'in' },
  ];
  public selectedCountry: string = 'us';
  public fromDate: string = '';
  public toDate: string = '';
  public searchQuery: string = '';

  constructor(private newsService: NewsService, private router: Router) { }

  public ngOnInit(): void {
    this.getNews();
  }

  public openNewsDetail(news: any): void {
    this.router.navigate(['/news-detail', news.url], { state: { data: news } });
  }

  public async getNews(): Promise<void> {
    try {
      const data = await this.newsService.getNews();
      this.filteredNewsList = this.newsList = data.articles;
      console.log(this.newsList);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  public filterNews(): void {
    this.filteredNewsList = this.newsList.filter(news =>
      news.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      news.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
