'use client'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, error } = useSWR(`/api/forecast?id=${id}`, fetcher);

  if (error) return <div>Error fetching data for forecast ID: {id}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Forecast for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;