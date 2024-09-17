'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
function Section() {
const pathname = usePathname()
  return (
    <div className='flex gap-10 mb-10 justify-center w-full items-center'>
        <Link href="/journal" className={`p-2 capitalize rounded ${!pathname.includes("timeline") && !pathname.includes("create")  ? 'bg-muted': ''}`}>
            Journal
        </Link>
         | 
         <Link href="/journal/timeline" className={`p-2 capitalize rounded ${pathname.includes("timeline")  ? 'bg-muted': ''}`}>
            Timeline
        </Link>
        |
        <Link href="/journal/create" className={`p-2 capitalize rounded ${pathname.includes("create")  ? 'bg-muted': ''}`}>
           Create
        </Link>
        </div>
  )
}

export default Section