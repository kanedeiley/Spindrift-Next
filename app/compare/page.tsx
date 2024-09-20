import React from 'react'
import { fetchSpotsAction } from '@/utils/actions'

async function page() {
const spots = await fetchSpotsAction();
  return (
    <div className="h-50 w-1/5 flex flex-col gap-5">
        {spots.map((spot) => 
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

export default page