export type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    pressure_mb: number;
    precip_mm: number;
    vis_km: number;
    uv: number;
    gust_mph: number;
  };
};

export type WeatherConfig = {
  location: string;
  unit: WEATHER_UNIT;
};

export enum WEATHER_UNIT {
  CELCIUS = 'c',
  FAHRENHEIT = 'f',
}
