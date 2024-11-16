"use client"

import DragDropLists from "@/components/dnd/Dnd"
import { useState } from "react"


function Page() {

const [graphs,setGraphs] = useState([
    {
    id: 4,
    title: "belmar",
    },
    {
        id: 5,
        title: "deal",
    }
])
return (
<div className="flex justify-between gap-4 ">
<div className="w-[200px]">
    SpotList

</div>
<DragDropLists graphs={graphs} setGraphs={setGraphs}/>
</div>
)
}
export default Page