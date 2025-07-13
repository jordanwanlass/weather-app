import React from "react";
import { useParams, Link } from "react-router-dom";
import { useWeatherForecast } from "~/hooks/use-weather-forecast";
import { format, parseISO } from "date-fns";
import {
  getWeatherIcon,
  getWeatherBackgroundClass,
} from "~/lib/weather-display-data";
import { ArrowLeft } from "lucide-react";
import { IconComponentProps } from "~/types/props";

export default function DayDetail() {
  const { dayKey } = useParams<{ dayKey: string }>();

  const {
    data: allForecasts,
    isLoading,
    isError,
    error,
  } = useWeatherForecast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-full">
        Loading daily details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-full text-red-500">
        Error loading details: {error?.message}
      </div>
    );
  }

  if (!allForecasts || !dayKey) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-full">
        No forecast data or day selected.
      </div>
    );
  }

  const currentDayForecast = allForecasts[dayKey];

  if (!currentDayForecast) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-full">
        <p>Forecast for {dayKey} not found.</p>
        <Link to="/" className="text-blue-500 underline mt-4">
          Go back to main forecast
        </Link>
      </div>
    );
  }

  const { summary, hourlyData } = currentDayForecast;

  const backgroundClass = getWeatherBackgroundClass(summary.shortForecast || "");

  const summaryDisplayIcon = getWeatherIcon(summary.shortForecast || "");

  return (
    <div
      className={`flex flex-col items-center w-full h-full min-h-full p-4 ${backgroundClass}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-3xl w-full rounded-lg shadow-lg p-6">
        <Link to="/" className="hover:underline mb-4 block">
          <ArrowLeft className="w-8 h-8"/>
        </Link>

        <h1 className="text-3xl font-bold text-center mb-2">
          {summary.name}
        </h1>
        <p className="text-xl text-center mb-4">
          {format(parseISO(dayKey), "MMM d")}
        </p>

        <div className="flex flex-col items-center justify-center mb-6">
            {summaryDisplayIcon &&
              React.cloneElement<IconComponentProps>(summaryDisplayIcon, {
                className: "h-24 w-24 text-white drop-shadow-lg",
              })}
            <div className="flex gap-8 items-baseline mt-2">
                <p className="text-3xl font-bold text-red-300">High: {summary.highTemp}°F</p>
                <p className="text-3xl font-semibold text-blue-300">Low: {summary.lowTemp}°F</p>
            </div>
            <p className="text-lg text-center mt-4">
              {summary.detailedForecastDay || "No detailed daytime forecast."}
            </p>
            {summary.detailedForecastNight && (
              <p className="text-lg text-center">
                {summary.detailedForecastNight}
              </p>
            )}
        </div>

        <h2 className="text-2xl font-semibold text-center mt-6 mb-4">Hourly Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.entries(hourlyData).map(([hourKey, hour]) => {
            const icon = getWeatherIcon(hour.shortForecast);
            console.log(hour.shortForecast, hour.startTime)
            return (
              <div
                key={hourKey}
                className="flex flex-col items-center p-3 border border-white/30 rounded-lg bg-transparent backdrop-blur-sm text-center shadow-md"
              >
                <p className="font-bold text-lg">{hour.formattedTime}</p>
                {icon && React.cloneElement<IconComponentProps>(icon, { className: 'h-10 w-10 drop-shadow-sm' })}
                <p className="text-2xl font-semibold">
                  {hour.temperature}°{hour.temperatureUnit}
                </p>
                <p className="text-sm">
                  {hour.shortForecast}
                </p>
                <p className="text-sm">{hour.windSpeed}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}