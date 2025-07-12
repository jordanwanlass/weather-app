import DayRow from "./components/day-row";
import TodayCard from "./components/today-card";
import { useWeatherForecast } from "./hooks/use-weather-forecast";

export default function Page() {
  const { data, isLoading, isError, error } = useWeatherForecast();
  console.log("final data", data);

  if (isLoading) {
    return <></>;
  }
  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-full"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col items-center gap-5">
        <TodayCard forecast={Object.values(data)[0]}/>
        {Object.values(data).slice(1).map((forecast) => (
          <DayRow forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
