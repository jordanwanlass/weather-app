import { useQuery } from "@tanstack/react-query";
import { DailySummary, ForecastContainer, ForecastPeriod, NWSForecastResponse } from "~/types/forecast";
import { parseISO, format } from "date-fns";

type DailyGroupedForecasts = Record<string, ForecastPeriod[]>;

export const useWeatherForecast = () => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const lat = 40.5421823;
      const lon = -112.0435351;

      const pointsResponse = await fetch(
        `https://api.weather.gov/points/${lat},${lon}`
      );
      if (!pointsResponse.ok) throw new Error("Failed to find weather grid.");
      const pointsData = (await pointsResponse.json()) as {
        properties: { forecast: string; forecastHourly: string };
      };

      const dailyForecastUrl = pointsData.properties.forecast;
      const hourlyForecastUrl = pointsData.properties.forecastHourly;

      const [dailyResponse, hourlyResponse] = await Promise.all([
        fetch(dailyForecastUrl),
        fetch(hourlyForecastUrl),
      ]);

      if (!dailyResponse.ok) throw new Error("Failed to fetch daily forecast.");
      if (!hourlyResponse.ok)
        throw new Error("Failed to fetch hourly forecast.");

      const dailyData = (await dailyResponse.json()) as NWSForecastResponse;
      const hourlyData = (await hourlyResponse.json()) as NWSForecastResponse;

      const dailyPeriods = dailyData.properties.periods;
      const hourlyPeriods = hourlyData.properties.periods;

      const dailyGrouped = groupDailyPeriodsByDay(dailyPeriods);
      console.log(dailyGrouped);
      return combineForecastsByDayAndHour(hourlyPeriods, dailyGrouped);
    },
    retry: 2,
    refetchInterval: 1000 * 60 * 30,
  });
};

const groupDailyPeriodsByDay = (
  periods: ForecastPeriod[]
): DailyGroupedForecasts => {
  return periods.reduce((acc: DailyGroupedForecasts, period) => {
    const date = parseISO(period.startTime);
    const dayKey = format(date, "yyyy-MM-dd");
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    acc[dayKey].push(period);
    return acc;
  }, {});
};

const combineForecastsByDayAndHour = (
  hourlyPeriods: ForecastPeriod[],
  dailyGrouped: DailyGroupedForecasts
): ForecastContainer => {
  return hourlyPeriods
    .filter((period) =>
      Object.keys(dailyGrouped).includes(
        format(parseISO(period.startTime), "yyyy-MM-dd")
      )
    )
    .reduce((acc: ForecastContainer, period) => {
      const date = parseISO(period.startTime);
      const dayKey = format(date, "yyyy-MM-dd");
      const hourKey = format(date, "h:mm a")

      if (!acc[dayKey]) {
        const currentDayDailyPeriods = dailyGrouped[dayKey] || [];

        const daySummary: DailySummary = {};

        const dayPeriod = currentDayDailyPeriods[0];
        const nightPeriod = currentDayDailyPeriods[1];

        if (dayPeriod) {
          daySummary.name = dayPeriod.name;
        } else {
          daySummary.name = format(parseISO(dayKey), "eeee");
        }

        if (dayPeriod) {
          daySummary.highTemp = dayPeriod.temperature;
          daySummary.detailedForecastDay = dayPeriod.detailedForecast;
          daySummary.icon = dayPeriod.icon;
          daySummary.shortForecast = dayPeriod.shortForecast;
          daySummary.windSpeed = dayPeriod.windSpeed;
          daySummary.windDirection = dayPeriod.windDirection;
        }

        if (nightPeriod) {
          daySummary.lowTemp = nightPeriod.temperature;
          daySummary.detailedForecastNight = nightPeriod.detailedForecast;
        } else if (dayPeriod && !dayPeriod.isDaytime) {
          daySummary.lowTemp = dayPeriod.temperature;
          daySummary.detailedForecastNight = dayPeriod.detailedForecast;
        }

        acc[dayKey] = {
          summary: daySummary,
          hourlyData: {},
        };
      }

      if (!acc[dayKey].hourlyData[hourKey]) {
        acc[dayKey].hourlyData[hourKey] = {};
      }

      const periodWithFormattedTime = {
        ...period,
        formattedTime: format(date, "h:mm a"),
      };
      // acc[dayKey].hourlyData[hourKey].push(periodWithFormattedTime);
      acc[dayKey].hourlyData[hourKey] = periodWithFormattedTime;

      return acc;
    }, {});
};
