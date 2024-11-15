"use client";

import * as React from "react";
import { Bar as RechartsBar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-01", wave_height: 222, wind: 150 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-02", wave_height: 97, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-03", wave_height: 100, wind: 180 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  { date: "2024-04-04", wave_height: 102, wind: 140 },
  
  

];

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
} satisfies ChartConfig;

export function ComparisonChart() { // Renamed here
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("wave_height");

  const total = React.useMemo(
    () => ({
      wave_height: chartData.reduce((acc, curr) => acc + curr.wave_height, 0),
      wind: chartData.reduce((acc, curr) => acc + curr.wind, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Wave Height and Wind</CardTitle>
          <CardDescription>
            Showing Reports From Last Three Days
          </CardDescription>
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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <RechartsBarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
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
            <RechartsBar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ComparisonChart; // Update the export
