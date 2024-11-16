"use client";

import * as React from "react";
import { Bar as RechartsBar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts";
import useSWR from "swr"


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
import ComparisonChartSkeleton from "./ComparisonChartSkeleton";
import { Button } from "../ui/button";

export const description = "An interactive bar chart";

const fetchData = async(url: string) =>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Failed to fetch data")
    }
    return response.json()
    }

const chartConfig = {
  views: {
    label: "Wave Height",
  },
  wave_height: {
    label: "Wave Height",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig;

export function ComparisonChart({ id, name, remove }: { id: number; name: string; remove: (id: number) => void }) {
    const { data, isLoading} = useSWR(`/api/comparison?id=${id}`, fetchData)

    if(data === undefined || isLoading ){
        return <ComparisonChartSkeleton name={name} />
    }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-row justify-between gap-1 px-6 py-5 sm:py-6 w-full">
          <CardTitle>{name}</CardTitle>
          <Button onClick={() => {remove(id as number);}}>Remove</Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[100px] w-full"
        >
          <RechartsBarChart
            data={data}
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
            <RechartsBar dataKey={"wave_height"} fill={`var(--color-${"wave_height"})`} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


export default ComparisonChart; // Update the export
