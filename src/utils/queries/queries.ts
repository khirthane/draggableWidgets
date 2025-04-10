import { useQuery } from '@tanstack/react-query';
import { fetchNews, fetchWeather } from '../services/publicApis';
import { DEFAULTS } from './keys';
import { queryKeys } from './queryKeys';

export const useWeatherQuery = (city: string) => {
  return useQuery({
    queryKey: queryKeys.weather(city),
    queryFn: () => fetchWeather(city),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useNewsQuery = (countryCode = DEFAULTS.COUNTRY_CODE) => {
  return useQuery({
    queryKey: queryKeys.news(countryCode),
    queryFn: () => fetchNews(countryCode),
    staleTime: 5 * 60 * 1000,
  });
};
