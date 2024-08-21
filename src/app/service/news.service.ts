import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  private apiKey = '827f97d0ddd6468e97caf9a955d172db';

  constructor(private http: HttpClient) { }

  public async getNews(): Promise<any> {
    const url = `${this.apiUrl}?sources=techcrunch&apiKey=${this.apiKey}`;
    try {
      const data = await this.http.get(url).toPromise();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
}
