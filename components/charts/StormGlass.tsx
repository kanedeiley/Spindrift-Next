"use client";

import * as React from "react";
import { BarChart as RechartsBarChart, CartesianGrid, XAxis, Bar } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Type definition for the chart data
type ChartData = {
  date: string;
  wave_height: number;  // Make sure wave_height is a number (in meters or feet)
  wind: number;         // Wind data can also be a number, adjust as needed
};

export const description = "An interactive bar chart";

export function StormGlassComponent() {
  // Explicitly type the state variable to accept the chart data
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("wave_height");

  // Fetch data from Stormglass API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Build the URL with query parameters manually
        const lat = "40.1315"; // Latitude for Sea Girt, NJ
        const lng = "-74.0273"; // Longitude for Sea Girt, NJ
        const apiKey = "7dd347d2-b5b1-11ef-a0d5-0242ac130003-7dd3484a-b5b1-11ef-a0d5-0242ac130003"; // Replace with your actual API key
        const params = new URLSearchParams({
          lat,
          lng,
          params: "waveHeight",  // Request wave height data
        });

        const url = `https://api.stormglass.io/v2/weather/point?${params.toString()}`;
        // const url = `https://api.stormglass.io/v2/weather/point?$`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
 
        const hours = data.hours;

        // Format the data for your chart
        const formattedData = hours.map((hour: any) => ({
          date: new Date(hour.time).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          wave_height: hour.waveHeight.meto,  // Assuming you want to use 'meteo' data
          wind: 180,  // Placeholder for wind data, adjust if necessary]
        }));

        console.log(formattedData)
        

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  // Config for the chart
  const chartConfig = {
    views: {
      label: "Wave Height",
    },
    wave_height: {
      label: "Wave Height",
      color: "hsl(var(--chart-1))",
    },
    wind: {
      label: "Wind",
      color: "hsl(var(--chart-2))",
    },
  };

  const total = React.useMemo(
    () => ({
      wave_height: chartData.reduce((acc, curr) => acc + curr.wave_height, 0),
      wind: chartData.reduce((acc, curr) => acc + curr.wind, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Wave Height and Wind</CardTitle>
          <CardDescription>Showing Reports From Last Three Days</CardDescription>
        </div>
        <div className="flex">
          {["wave_height", "wind"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <RechartsBarChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default StormGlassComponent;
