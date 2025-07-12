import React from "react";
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, Wind, Droplets, ThermometerSun, Moon, CloudMoon } from "lucide-react";

const weatherIconMap: Record<string, React.ReactElement> = {
    "sunny": <Sun className="h-5 w-5"/>,
    "mostly sunny": <CloudSun className="h-5 w-5"/>,
    "partly sunny": <CloudSun className="h-5 w-5"/>,
    "partly cloudy": <CloudSun className="h-5 w-5"/>,
    "cloudy": <Cloud className="h-5 w-5"/>,
    "overcast": <Cloud className="h-5 w-5"/>,
    "rain": <CloudRain className="h-5 w-5"/>,
    "showers": <CloudRain className="h-5 w-5"/>,
    "thunderstorms": <CloudRain className="h-5 w-5"/>,
    "snow": <CloudSnow className="h-5 w-5"/>,
    "sleet": <CloudSnow className="h-5 w-5"/>,
    "wintry mix": <CloudSnow className="h-5 w-5"/>,
    "windy": <Wind className="h-5 w-5"/>,
    "fog": <Droplets className="h-5 w-5"/>,
    "hazy": <Droplets className="h-5 w-5"/>,
    "hot": <ThermometerSun className="h-5 w-5"/>,
    "mostly clear": <CloudMoon className="h-5 w-5"/>,
    "clear": <Moon className="h-5 w-5"/>
};

const defaultWeatherIcon: React.ReactElement = <Sun className="h-5 w-5"/>;

export function getWeatherIcon(shortForecast: string): React.ReactElement {
    const normalizedInput = shortForecast.toLowerCase().trim();
    return (
        weatherIconMap[normalizedInput] ||
        defaultWeatherIcon
    );
}