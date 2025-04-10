import axios from 'axios';
import { WeatherData } from '../../types';
import { NewsApiResponse } from '../../types/newsData';
import { API_KEYS } from '../queries/keys';

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const { data } = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEYS.WEATHER_API_KEY}&q=${city}`
  );

  if (!data.current) {
    throw new Error('data not found');
  }

  return data;
};

export const fetchNews = async (
  countryCode: string
): Promise<NewsApiResponse> => {
  const { data } = await axios.get<NewsApiResponse>(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEYS.NEWS_API_KEY}`
  );

  if (data.status === 'error') {
    throw new Error('data not found');
  }
  return data;
};
