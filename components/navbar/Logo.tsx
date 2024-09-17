import Link from "next/link";
import { Button } from "../ui/button";
function Logo() {
  return (
    <Button className="dark:bg-muted dark:text-white bg-white text-slate-900 border hover:bg-color-grey-200" size='icon' asChild>
        <Link href='/'>
          S
        </Link>
    </Button>
  )
}

export default Logo