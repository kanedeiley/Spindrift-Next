
import { Switch } from "@/components/ui/switch"
import { useDateRange } from "@/app/range-provider";

function SpotHeader({title}) {

    const {dateRange } = useDateRange();
  return (
    <div className="flex justify-between">
        <h1 className="text-xl">{title}</h1>
        <div className="flex gap-4 align-center justify-center"><h1 className="text-xl">{dateRange}</h1><Switch /></div>
    </div>
  )
}

export default SpotHeader