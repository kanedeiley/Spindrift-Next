"use client"
import { fetchSpotsAction } from '@/utils/actions'
import useSWR from "swr"


function SpotsList({className}:{className:string,}) {

const fetchData = async(url: string) =>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Failed to fetch data")
    }
    return response.json()
    }

const { data, isLoading} = useSWR(`/api/search?q=${"a"}&page=${1}`, fetchData)
if(!data?.spots){
    return null;
}
  return (
    <div className={`h-50 w-1/5 flex flex-col gap-5 ${className}`}>
        {data.spots?.map((spot) => 
        <div className="h-20 border rounded p-4 flex flex-col justify-between" key={spot.id}>
            <h2>{spot.name}</h2>
            <div className="flex flex-row justify-between">
            <p className="text-xs">{spot.state}</p>
            <p className="text-xs">{spot.region}</p>
            </div>
        </div>
    )
    }
    </div>
  )
}

export default SpotsList