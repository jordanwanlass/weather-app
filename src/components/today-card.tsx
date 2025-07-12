import { ForecastProps } from "~/types/props";
import { format } from "date-fns/format";
import { getWeatherIcon } from "~/lib/weather-icon-map";

export default function TodayCard({ forecast }: ForecastProps) {
  const currentTime = format(new Date(), "h:00 a");

  return (
    <div className="flex flex-col items-center w-full">
      <div>{forecast.hourlyData[currentTime]?.temperature}</div>
      <div>{forecast.summary.shortForecast}</div>
      <div className="flex text-wrap w-3/4 text-center">
        {forecast.summary.detailedForecastDay}
      </div>
      <div className="flex gap-4 w-40 overflow-x-scroll">
        {Object.values(forecast.hourlyData).map((hour) => (
          <div className="flex flex-col">
            <div>{getWeatherIcon(hour.shortForecast)}</div>
            <div>{hour.temperature}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
