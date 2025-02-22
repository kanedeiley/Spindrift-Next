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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useSWR from "swr";

export const description = "An interactive bar chart";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BarChart({id}) {

  const { data, error } = useSWR(`/api/forecast?id=${id}`, fetcher);

  if (error) return <div>Error fetching data for forecast ID: {id}</div>;
  if (!data) return <div>Loading...</div>;
  // Config for the chart
  const chartConfig = {
    views: { label: "Wave Height" },
    swellWaveHeight: { label: "Wave Height", color: "hsl(var(--chart-1))" },
    // wind: { label: "Wind", color: "hsl(var(--chart-2))" },
  };

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
            data={data.hourly} // Serialized date strings
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
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}