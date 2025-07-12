interface PointProperties {
  forecast: string;
  forecastHourly: string;
}

interface PointResponse {
  properties: PointProperties;
}

interface ForecastPeriod {
  number?: number;
  name?: string;
  startTime?: string;
  endTime?: string;
  isDaytime?: boolean;
  temperature?: number;
  temperatureUnit?: "F" | "C";
  windSpeed?: string;
  windDirection?: string;
  icon?: string;
  shortForecast?: string;
  detailedForecast?: string;
  highTemp?: number;
  lowTemp?: number;
}

interface ForecastProperties {
  periods: ForecastPeriod[];
}

interface ForecastResponse {
  properties: ForecastProperties;
}

interface NWSForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}

interface DailySummary {
  name?: string;
  highTemp?: number;
  lowTemp?: number;
  detailedForecastDay?: string;
  detailedForecastNight?: string;
  icon?: string;
  shortForecast?: string;
  windSpeed?: string;
  windDirection?: string;
}

interface Forecast {
  summary: DailySummary;
  hourlyData: Record<string, ForecastPeriod>;
}

type ForecastContainer = Record<string, Forecast>;

export {
  PointResponse,
  ForecastPeriod,
  ForecastResponse,
  NWSForecastResponse,
  DailySummary,
  Forecast,
  ForecastContainer
};
