import React from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  ThermometerSun,
  ThermometerSnowflake,
  CircleHelp,
  CloudMoon,
  Moon,
} from "lucide-react";

interface WeatherDisplayData {
  icon: React.ReactElement;
  backgroundClass: string;
}

const weatherDisplayMap: Record<string, WeatherDisplayData> = {
  sunny: {
    icon: <Sun className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-sunny",
  },
  "mostly sunny": {
    icon: <CloudSun className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-sunny",
  },
  "partly sunny": {
    icon: <CloudSun className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-partly-cloudy",
  },
  "partly cloudy": {
    icon: <CloudSun className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-partly-cloudy",
  },
  cloudy: {
    icon: <Cloud className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-cloudy",
  },
  overcast: {
    icon: <Cloud className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-cloudy",
  },
  rain: {
    icon: <CloudRain className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-rainy",
  },
  showers: {
    icon: <CloudRain className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-rainy",
  },
  thunderstorms: {
    icon: <CloudRain className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-thunderstorms",
  },
  snow: {
    icon: <CloudSnow className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-snowy",
  },
  sleet: {
    icon: <CloudSnow className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-snowy",
  },
  "wintry mix": {
    icon: <CloudSnow className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-snowy",
  },
  windy: {
    icon: <Wind className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-windy",
  },
  fog: {
    icon: <Droplets className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-foggy",
  },
  hazy: {
    icon: <Droplets className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-foggy",
  },
  hot: {
    icon: <ThermometerSun className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-hot",
  },
  cold: {
    icon: <ThermometerSnowflake className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-cold",
  },
  "mostly clear": {
    icon: <CloudMoon className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-clear-night",
  },
  clear: {
    icon: <Moon className="h-5 w-5 drop-shadow-md" />,
    backgroundClass: "bg-weather-clear-night",
  },
};

const defaultDisplayData: WeatherDisplayData = {
  icon: <CircleHelp className="h-5 w-5 drop-shadow-md" />,
  backgroundClass: "bg-gray-300",
};

function getWeatherDisplayData(
  shortForecast: string
): WeatherDisplayData {
  const normalizedInput = shortForecast.toLowerCase().trim();
  return weatherDisplayMap[normalizedInput] || defaultDisplayData;
}

export function getWeatherIcon(shortForecast: string): React.ReactElement {
  return getWeatherDisplayData(shortForecast).icon;
}

export function getWeatherBackgroundClass(shortForecast: string): string {
  return getWeatherDisplayData(shortForecast).backgroundClass;
}
