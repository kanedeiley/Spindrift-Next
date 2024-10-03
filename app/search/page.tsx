"use client"
import { fetchQueriedSpots } from "@/utils/actions"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

function SearchPage() {
const search = useSearchParams()
const searchQ = search ? search.get("q") : ""
const [spots, setSpots] = useState([]);

const fetchSpots = async () => {
const data = await fetchQueriedSpots({query: searchQ===null?"":searchQ, page:1})
    console.log(data)
  };

  useEffect(() => {
    fetchSpots();
  }, []);
return (
    <div>
    </div>
  )
}

export default SearchPage