import { WEATHER_UNIT } from '@/types';
import { useWeatherConfig } from '@/utils/hooks/useWeatherConfig';
import { useWeatherQuery } from '@/utils/queries/queries';
import { saveWidget, setWidgetState } from '@/utils/store/slices/widgetSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface WeatherWidgetProps {
  widgetId: string;
  location: string;
}

const WeatherWidget = React.memo(
  ({ widgetId, location }: WeatherWidgetProps) => {
    const [cityInput, setCityInput] = useState(location);
    const [config, setConfig] = useWeatherConfig();
    const { data, isLoading, isError, isFetching } = useWeatherQuery(location);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!isLoading) {
        dispatch(
          setWidgetState({
            widgetId,
            isLoading,
            isError,
            isFetching,
          })
        );
      }
    }, [dispatch, isLoading, isError, isFetching, widgetId]);

    const updateConfig = (updates: Partial<typeof config>) =>
      setConfig((prev) => ({ ...prev, ...updates }));

    const handleCityChange = (city: string) => {
      setCityInput(city);
      dispatch(saveWidget({ id: widgetId, data: city }));
    };

    const renderTemperature = () => {
      if (!data) return null;
      const { temp_c, temp_f } = data.current;

      return (
        <p className='text-3xl font-bold'>
          {config.unit === WEATHER_UNIT.CELCIUS
            ? `${temp_c} °C`
            : `${temp_f} °F`}
        </p>
      );
    };

    return (
      <>
        {/* Settings */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateConfig({ location: cityInput.trim() });
          }}
          className='mb-2 flex gap-2'
        >
          <input
            type='text'
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onBlur={(e) => handleCityChange(e.target.value)} // Trigger onBlur
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === 'Enter') {
                handleCityChange(target.value); // Trigger on Enter key
              }
            }}
            className='input'
            placeholder='City'
          />

          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={() =>
                updateConfig({
                  unit:
                    config.unit === WEATHER_UNIT.CELCIUS
                      ? WEATHER_UNIT.FAHRENHEIT
                      : WEATHER_UNIT.CELCIUS,
                })
              }
              className='input'
            >
              {config.unit === WEATHER_UNIT.CELCIUS ? '°C' : '°F'}
            </button>
          </div>
        </form>

        {/* Display */}
        {data && (
          <div className='space-y-4 overflow-y-auto'>
            <div className='flex items-center'>
              <h3 className='text-lg font-semibold'>
                {data.location.name}, {data.location.country}
              </h3>
            </div>

            <div className='flex items-center space-x-4'>
              <img
                src={`https:${data.current.condition.icon}`}
                alt={data.current.condition.text}
                className='w-16 h-16'
              />
              <div>
                {renderTemperature()}
                <p className='text-md'>{data.current.condition.text}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium'>Humidity</p>
                <p className='text-xs text-gray-500'>
                  {data.current.humidity}%
                </p>
              </div>
              <div>
                <p className='text-sm font-medium'>Wind</p>
                <p className='text-xs text-gray-500'>
                  {data.current.wind_kph} km/h
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
export default WeatherWidget;
