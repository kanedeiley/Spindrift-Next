"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Filter } from "lucide-react"

const chartConfig = {
  duration: {
    label: "duration",
    color: "hsl(var(--chart-1))",
  },
  sessions: {
    label: "sessions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SessionChart({chartTitle, chartDescription, journals}:{chartTitle:string, chartDescription:string, journals:any}) {
  const date = new Date();
  const currentMonth = date.getMonth(); 
  const currentYear = date.getFullYear();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  

  
  const monthlySummary = journals.reduce((acc: any, journal: any) => {
    const date = new Date(journal.sessionStart);
    const month = date.getMonth(); // Get month index (0-11)
    const monthName = monthNames[month];
  
    // Find if the month is already in the accumulator
    const existingMonth = acc.find((item: { month: string }) => item.month === monthName);
  
    if (existingMonth) {
      // Update the existing month's duration and session count
      existingMonth.duration += journal.sessionLength;
      existingMonth.sessions += 1;
    } else {
      // Add a new month entry
      acc.push({
        month: monthName,
        duration: journal.sessionLength,
        sessions: 1
      });
    }

    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle} - Stacked</CardTitle>
        <CardDescription>
          {chartDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={monthlySummary}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="sessions"
              type="natural"
              fill="var(--color-sessions)"
              fillOpacity={0.4}
              stroke="var(--color-sessions)"
              stackId="a"
            />
            <Area
              dataKey="duration"
              type="natural"
              fill="var(--color-duration)"
              fillOpacity={0.4}
              stroke="var(--color-duration)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}