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

// Type for chart data
type ChartData = {
  date: string; // Store the date as a string
  wave_height: number;
  wind: number;
};

export const description = "An interactive bar chart";

export function BarChart({data}) {
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("wave_height");

  // Fetching data from the API
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
          const waveHeightInMeters = hours.wave_height[index] ?? 0; // Handle missing data
          return {
            date: new Date(time).toISOString(), // Store the date as an ISO string
            wave_height: waveHeightInMeters,
            wind: 180, // Placeholder for wind data
          };
        });

        setChartData(formattedData); // Set the formatted data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Config for the chart
  const chartConfig = {
    views: { label: "Wave Height" },
    wave_height: { label: "Wave Height", color: "hsl(var(--chart-1))" },
    // wind: { label: "Wind", color: "hsl(var(--chart-2))" },
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
        <div className="flex"></div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <RechartsBarChart
            data={chartData} // Serialized date strings
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Use serialized date strings
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value); // Parse the date string back to a Date object
                return date.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px] p-4" // Increased width and padding for a bigger hover box
                  nameKey="views"
                  labelFormatter={(value) => {
                    const date = new Date(value); // Parse the date string
                    return date.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
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

export default BarChart;