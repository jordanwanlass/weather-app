import { ForecastProps } from "~/types/props";
import { Progress } from "./ui/progress";
import { getWeatherIcon } from "~/lib/weather-icon-map";


export default function DayRow({ forecast }: ForecastProps) {
    const WeatherIcon = getWeatherIcon(forecast.summary.shortForecast);
  return (
    <div className="grid grid-cols-5 gap-2 items-center w-full text-2xl">
      <div>{forecast.summary.name}</div>
      <div>{WeatherIcon}</div>
      <div>Low: {forecast.summary.lowTemp}</div>
      <div className="w-20">
        <Progress className="" value={(forecast.summary.lowTemp/forecast.summary.highTemp) * 100} />
      </div>
      <div>High: {forecast.summary.highTemp}</div>

    </div>
  );
}
