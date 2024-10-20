"use client"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"


const fetchData = async(url: string) =>{
const response = await fetch(url);
if(!response.ok){
    throw new Error("Failed to fetch data")
}
return response.json()
}

function SearchPage() {
const search = useSearchParams()
const searchQ = search ? search.get("q") : ""
const encodedSearchQ = encodeURI(searchQ || "")
const { data, isLoading} = useSWR(`/api/search?q=${encodedSearchQ}`, fetchData)
if(!data?.spots){
    return null;
}
return (
    <div>
       
            {data.spots.map((spot:any, i:number) =>(
                <p key={i}>{spot.name}</p>
            ))}
      
    </div>
  )
}

export default SearchPage