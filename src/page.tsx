import { Link } from "react-router-dom";
import DayRow from "./components/day-row";
import TodayCard from "./components/today-card";
import { useWeatherForecast } from "./hooks/use-weather-forecast";
import { getWeatherBackgroundClass } from "./lib/weather-display-data";

export default function Page() {
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

  if (!allForecasts) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-full">
        No forecast data or day selected.
      </div>
    );
  }
  const days = Object.entries(allForecasts);
  const today = Object.values(allForecasts)[0];
  const background = getWeatherBackgroundClass(today.summary.shortForecast);

  return (
    <div
      className={`flex justify-center w-full h-full min-h-full ${background}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col items-center gap-5">
        <TodayCard forecast={today} />
        {days.slice(1).map(([dayKey, forecast]) => (
          <Link
            key={dayKey}
            to={`/day/${dayKey}`}
            className="w-full"
          >
            <DayRow forecast={forecast} />
          </Link>
        ))}
      </div>
    </div>
  );
}
