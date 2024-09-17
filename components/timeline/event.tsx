import EventCard from "./eventcard"

function Event(){
return(
<div className="flex flex-row justify-center gap-28 h-80">
<EventCard />
<div className="flex flex-col items-center">
    <div className="w-6 h-6 rounded-sm dark:bg-muted bg-slate-900 ">
    </div>
    <div className="w-2 h-full dark:bg-muted bg-slate-900">
    </div>
</div>
<div className="flex flex-col w-32">
    item2
</div> 
</div>)}

export default Event