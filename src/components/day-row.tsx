import { ForecastProps, IconComponentProps } from "~/types/props";
import { Progress } from "./ui/progress";
import { getWeatherIcon } from "~/lib/weather-display-data";
import React from "react";

export default function DayRow({ forecast }: ForecastProps) {
  const WeatherIcon = getWeatherIcon(forecast.summary.shortForecast || "");

  return (
    <div className="grid grid-cols-5 gap-2 items-center w-full text-2xl p-3 border border-white/30 rounded-lg bg-transparent backdrop-blur-sm text-center shadow-md">
      <div>{forecast.summary.name}</div>
      <div>
        {WeatherIcon && React.cloneElement<IconComponentProps>(WeatherIcon, { className: 'h-8 w-8' })}
      </div>
      <div className="text-blue-300">Low: {forecast.summary.lowTemp}°F</div>
      <div className="w-20">
        <Progress
          className=""
          value={(forecast.summary.lowTemp / forecast.summary.highTemp) * 100}
        />
      </div>
      <div className="text-red-300">High: {forecast.summary.highTemp}°F</div>
    </div>
  );
}