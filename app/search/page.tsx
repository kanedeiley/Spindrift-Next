"use client"
import { Paginate } from "@/components/pagination/Paginate"
import { useSearchParams } from "next/navigation"
import { encode } from "punycode"
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
const searchPage = search ? Number(search.get("page")) || 1 : 1;
const { data, isLoading} = useSWR(`/api/search?q=${encodedSearchQ}&page=${searchPage}`, fetchData)
if(!data?.spots){
    return null;
}
return (
    <div>
       
            {data.spots.map((spot:any, i:number) =>(
                <p key={i}>{spot.name}</p>
            ))}
           <Paginate  className={"fixed bottom-1 left-1/2 transform -translate-x-1/2 flex justify-center fixed bottom-0"} q={searchQ ? searchQ : ""} page={searchPage} count={data.totalPages}/>
    </div>
  )
}

export default SearchPage