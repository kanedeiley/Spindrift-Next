import React from 'react'
import { PiStarDuotone } from "react-icons/pi";

function Rating({count, title}:{count:number, title:string}) {
  return (
    <div className="flex flex-col gap-2">
    <p>{title}</p>
    <div className="flex-row flex gap-1">
    {Array.from({ length: count }, (_, index) => (
    <PiStarDuotone key={index} className="text-slate-900 dark:text-white" />
  ))}
    </div>
    </div>
  )
}

export default Rating