"use client";

import * as React from "react";
import { Waves } from "lucide-react"; // Assuming you're using this for the wave icon
import { Wind, Thermometer, CloudSunRain, Star, Moon } from "lucide-react"; // Import necessary icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ChartData = {
  date: string; // Store the date as a string
  wave_height: number;
  wind: number;
};

export function Corecharts() {
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [waveHeight, setWaveHeight] = React.useState<string>("Loading...");

  // Fetching wave height and wind data from the API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const latitude = "40.1315";
        const longitude = "-74.0273";
        const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height&length_unit=imperial&forecast_days=3`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const hours = data.hourly;

        // Format the data
        const formattedData = hours.time.map((time: string, index: number) => {
          const waveHeightInFeet = hours.wave_height[index] ?? 0; // Handle missing data
          return {
            date: new Date(time).toISOString(), // Store the date as an ISO string
            wave_height: waveHeightInFeet,
            wind: 180, // Placeholder for wind data
          };
        });

        setChartData(formattedData); // Set the formatted data

        // Get the wave height for the current hour
        const currentHour = new Date().getHours();
        const currentWaveHeight = formattedData.find(
          (data) => new Date(data.date).getHours() === currentHour
        )?.wave_height;

        if (currentWaveHeight) {
          setWaveHeight(`${currentWaveHeight} ft`); // Update the wave height for the current hour
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setWaveHeight("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const coreConditions = [
    {
      CardTitle: "Wave Height",
      Value: waveHeight,
      Image: <Waves className="h-4 w-4 text-muted-foreground" />,
      Description: "Current Wave Forecast",
    },
    {
      CardTitle: "Wind",
      Value: "2 mph",
      Image: <Wind className="h-4 w-4 text-muted-foreground" />,
      Description: "Below Average Day",
    },
    {
      CardTitle: "Temperature",
      Value: "65 F",
      Image: <Thermometer className="h-4 w-4 text-muted-foreground" />,
      Description: "Warm",
    },
    {
      CardTitle: "Weather",
      Value: "Sunny",
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
      Value: "3.4/5",
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