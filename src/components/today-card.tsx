import { ForecastProps, IconComponentProps } from "~/types/props";
import { format } from "date-fns/format";
import { getWeatherIcon } from "~/lib/weather-display-data";
import React from "react";

export default function TodayCard({ forecast }: ForecastProps) {
  const currentTime = format(new Date(), "h:00 a");
  
  return (
    <div className="flex flex-col items-center w-full mt-20 mb-10 gap-4 p-3 border border-white/30 rounded-lg bg-transparent text-center shadow-md">
      <div className="text-8xl">
        {forecast.hourlyData[currentTime]?.temperature}°{forecast.hourlyData[currentTime]?.temperatureUnit}
      </div>
      <div className="text-2xl">{forecast.summary.shortForecast}</div>
      <div className="flex gap-2 text-2xl">
        <div>L:{forecast.summary.lowTemp}°F</div>
        <div>H:{forecast.summary.highTemp}°F</div>
      </div>
      <div className="flex text-wrap w-3/4 text-center">
        {forecast.summary.detailedForecastDay}
      </div>
      <div className="flex gap-6 w-80 overflow-x-scroll">
        {Object.values(forecast.hourlyData).map((hour) => {
          const WeatherIcon = getWeatherIcon(hour.shortForecast);
         return ( <div
            key={hour.startTime}
            className="flex flex-col text-nowrap items-center gap-2"
          >
            <div>{format(hour.startTime, "h a")}</div>
            {WeatherIcon && React.cloneElement<IconComponentProps>(WeatherIcon, { className: 'h-8 w-8' })}
            <div>{hour.temperature}°{hour.temperatureUnit}</div>
          </div>)
})}
      </div>
    </div>
  );
}