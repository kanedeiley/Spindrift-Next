"use client";

import * as React from "react";
import { BarChart as RechartsBarChart, CartesianGrid, XAxis, Bar, Cell } from "recharts";
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

export const description = "An interactive bar chart";

export function WaveHeightChart({ data }) {
  const formattedData = data.hourly.date.map((time: string, index: number) => {
    const waveHeight = data.hourly.waveHeight[index] ?? 0; // Handle missing data
    const waveRating = data.hourly.ratings[index] ?? 0; // Handle missing data
    return {
      date: new Date(time).toISOString(), // Store the date as an ISO string
      wave_height: waveHeight,
      wave_rating: waveRating,
      wind: 180, // Placeholder for wind data
    };
  });

  // Function to determine color based on wave height
  const getBarColor = (rating: string) => {

    switch (rating) {
      case 'good':
        return "hsl(130, 82.60%, 50.40%)";
      case 'poor':
        return "hsl(0, 100.00%, 50.00%)";
      case 'fair':
        return "hsl(55, 89.30%, 47.60%)";

    }
    return "hsl(0, 100.00%, 50.00%)"; // Red for very rough waves
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Wave Height and Wind</CardTitle>
          <CardDescription>Showing Reports From Last Three Days</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={{}} className="aspect-auto h-[250px] w-full">
          <RechartsBarChart
            data={formattedData}
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
                  className="w-[200px] p-4"
                  nameKey="views"
                  labelFormatter={(value) => {
                    const date = new Date(value);
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
            <Bar dataKey="wave_height">
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.wave_rating)} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default WaveHeightChart;
