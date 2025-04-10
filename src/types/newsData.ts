export type NewsSource = {
  id: string | null;
  name: string;
};

export type NewsArticle = {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsApiResponse = {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsArticle[];
};

export type NewsApiErrorResponse = {
  status: 'error';
  code?: string;
  message?: string;
};

export type NewsApiData = NewsApiResponse | NewsApiErrorResponse;
