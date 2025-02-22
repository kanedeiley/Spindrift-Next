'use client'
import { BarChart } from '@/components/charts/ForecastBarChart';
import CoreCharts from "@/components/charts/CoreCharts";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, error } = useSWR(`/api/forecast?id=${id}`, fetcher);
  if (error) return <div>Error fetching data for forecast ID: {id}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <CoreCharts /> 
      <BarChart data={data} />
    </div>
  );
};

export default Page;