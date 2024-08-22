export interface NewsItem {
    title: string;
    author: string;
    content: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: NewsItemSource;
    country?: string;
  }

  export interface NewsItemSource {
    id: string | null;
    name: string;
  }

  export interface ApiResponse {
    status: string;
    totalResults: number;
    articles: NewsItem[];
  }