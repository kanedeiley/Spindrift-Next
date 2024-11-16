"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ComparisonChartSkeleton({name}:{name: string}) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="aspect-auto h-[100px] w-full flex gap-10 items-end">
        {Array.from({ length: 4 }).map((_, index) => {
            const randomHeight = Math.floor(Math.random() * 50) + 20; 
            return (
            <div
                key={index}
                style={{ height: `${randomHeight}px` }}
                className="w-8 bg-gray-300 animate-pulse"
            ></div>
            );
        })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ComparisonChartSkeleton