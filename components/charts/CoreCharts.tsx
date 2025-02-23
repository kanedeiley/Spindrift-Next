"use client";

import * as React from "react";
import { Waves } from "lucide-react"; // Assuming you're using this for the wave icon
import { Wind, Thermometer, CloudSunRain, Star, Moon } from "lucide-react"; // Import necessary icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function currentIndex(dates) {
  const now = new Date();  // Get the current date and time

  let closestIndex = 0;
  let smallestDiff = Math.abs(new Date(dates[0]).getTime() - now.getTime()); // Initialize with the first date's difference

  // Loop through the list of dates
  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const diff = Math.abs(currentDate.getTime() - now.getTime()); // Calculate the difference with the current date

    // Update if we find a closer date
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;  // Return the index of the closest date
}


export function Corecharts({ data }) {


  const index = currentIndex(data.hourly.date)
  const Currents = {
    WaveHeight: data.hourly.waveHeight[index],
    WindSpeed: Math.round(data.hourly.windSpeed10m[index]),
    Rating: data.hourly.ratings[index],
    WeatherCode: data.hourly.weatherCode[index],
    Tempature: Math.round(data.hourly.temperature2m[index])

  }




  const coreConditions = [
    {
      CardTitle: "Wave Height",
      Value: Currents.WaveHeight,
      Image: <Waves className="h-4 w-4 text-muted-foreground" />,
      Description: "Current Wave Forecast",
    },
    {
      CardTitle: "Wind",
      Value: Currents.WindSpeed,
      Image: <Wind className="h-4 w-4 text-muted-foreground" />,
      Description: "Below Average Day",
    },
    {
      CardTitle: "Temperature",
      Value: Currents.Tempature,
      Image: <Thermometer className="h-4 w-4 text-muted-foreground" />,
      Description: "Warm",
    },
    {
      CardTitle: "Weather",
      Value: Currents.WeatherCode,
      Image: <CloudSunRain className="h-4 w-4 text-muted-foreground" />,
      Description: "Perfect",
    },
    {
      CardTitle: "Tide",
      Value: "Low",
      Image: <Moon className="h-4 w-4 text-muted-foreground" />,
      Description: "Changes in 3 Hours",
    },
    {
      CardTitle: "Rating",
      Value: Currents.Rating,
      Image: <Star className="h-4 w-4 text-muted-foreground" />,
      Description: "Good",
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-6">
        {coreConditions.map((cc, i) => (
          <Card x-chunk="dashboard-01-chunk-0" key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cc.CardTitle}</CardTitle>
              {cc.Image}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cc.Value}</div>
              <p className="text-xs text-muted-foreground">{cc.Description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Corecharts;