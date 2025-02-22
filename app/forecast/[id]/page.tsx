'use client'
import { BarChart } from '@/components/charts/ForecastBarChart';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <BarChart id={id} />
    </div>
  );
};

export default Page;