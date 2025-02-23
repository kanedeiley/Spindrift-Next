"use client";

import WaveHeightChart from '@/components/charts/WaveHeightChart';
import CoreCharts from "@/components/charts/CoreCharts";
import useSWR from "swr";
import WindSpeedChart from '@/components/charts/WindSpeedChart';
import { useDateRange } from "@/app/range-provider";
import SpotHeader from '@/components/header/SpotHeader';
import { useState, useEffect } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = ({ params }: { params: { id: string } }) => {
  const { dateRange } = useDateRange();
  const { id } = params;

  const { data, error } = useSWR(`/api/forecast?id=${id}`, fetcher);
  
  const [formedData, setFormedData] = useState(data || null); // Initialize state with data

  useEffect(() => {
    if (data) {
      // Apply slicing logic whenever `dateRange` or `data` changes
      setFormedData(
        dateRange === "daily"
          ? {hourly: Object.fromEntries(
              Object.entries(data.hourly).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.slice(0, 24) : value,
              ])
            ) }
          : data
      );
    }
  }, [dateRange, data]); // Depend on `dateRange` and `data`

  if (error) return <div>Error fetching data for forecast ID: {id}</div>;
  if (!data || !formedData) return <div>Loading...</div>;

  return (
    <div>
      <SpotHeader title={data.spot.title} />
      <CoreCharts data={formedData} />
      <WaveHeightChart data={formedData} />
      <WindSpeedChart data={formedData} />
    </div>
  );
};

export default Page;
