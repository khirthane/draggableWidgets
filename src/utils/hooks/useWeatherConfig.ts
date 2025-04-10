import { WEATHER_UNIT, WeatherConfig } from '@/types';
import { useEffect, useState } from 'react';
import { DEFAULTS } from '../queries/keys';

const defaultConfig: WeatherConfig = {
  location: DEFAULTS.CITY,
  unit: WEATHER_UNIT.CELCIUS,
};

export const useWeatherConfig = () => {
  const [config, setConfig] = useState<WeatherConfig>(() => {
    const saved = localStorage.getItem('weatherConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('weatherConfig', JSON.stringify(config));
  }, [config]);

  return [config, setConfig] as const;
};
