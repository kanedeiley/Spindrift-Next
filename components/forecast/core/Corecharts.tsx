"use client"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"
import { Waves } from "lucide-react"
import { Wind } from "lucide-react"
import { Thermometer } from "lucide-react" 
import { CloudSunRain } from "lucide-react"
import { Star } from "lucide-react"
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Value } from "@radix-ui/react-select"
import { Description } from "@radix-ui/react-toast"

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and a user nav dropdown. The user nav is toggled by a button with an avatar image."

export function Corecharts() {
  function Message(){
    console.log("ssf")
  }
  const coreConditions = [{CardTitle:"Wave Height",Value:"2-3ft", Image:<Waves className="h-4 w-4 text-muted-foreground"/>,Description:"Average Day"},{CardTitle:"Wind",Value:"2 mph",Image:<Wind className="h-4 w-4 text-muted-foreground" />,Description:"Below Average Day"}
    ,{CardTitle:"Tempature",Value:"65 F",Image:<Thermometer className="h-4 w-4 text-muted-foreground" />,Description:"Warm"},{CardTitle:"Weather",Value:"Sunny",Image:<CloudSunRain className="h-4 w-4 text-muted-foreground" />,Description:"Perfect"},{CardTitle:"Tide",Value:"Low",Image:<Moon className="h-4 w-4 text-muted-foreground" />
      ,Description:"Changes in 3 Hours"},{CardTitle:"Rating",Value:"3.4/5", Image:<Star className="h-4 w-4 text-muted-foreground"/>,Description:"Good"}
  ]
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-6">
        {coreConditions.map((cc,i)=>(
          <Card x-chunk="dashboard-01-chunk-0" onClick={Message} key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {cc.CardTitle}
            </CardTitle>
             {cc.Image}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cc.Value}</div>
            <p className="text-xs text-muted-foreground">
              {cc.Description}
            </p>
          </CardContent>
        </Card>

        ))}
        {/* <Card x-chunk="dashboard-01-chunk-0" onClick={Message}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wave Height
            </CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1" onClick={Message}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wind
            </CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2" onClick={Message}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3" onClick={Message}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <CloudSunRain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3" onClick={Message}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <CloudSunRain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card> */}
      </div>
    </main>  // Closing tag added here
  )
}
export default Corecharts