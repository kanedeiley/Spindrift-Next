import { Label } from  "../ui/label"
import Rating from "./Rating"
import { Button } from "../ui/button"
function JournalCard({journal}: {journal: any}) {
  return (
    <div className="flex-col flex justify-between gap-6 border rounded p-4">
        <Label className="text-lg border-b-2 py-2 ">
             {journal.spot.name} - {journal.sessionStart.toDateString()}
        </Label>
        <p className="text-xs">
          {journal.entry.slice(0,30)}...  
        </p>
        <Rating count={journal.rating} title="Overall Rating" />
        <Rating count={journal.heightRating} title="Height Rating" />
        <Rating count={journal.fatigueRating} title="Fatigue Rating" />
    </div>
  )
}

export default JournalCard