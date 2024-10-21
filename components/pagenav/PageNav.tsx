'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SectionLink } from '@/utils/extratypes';

function PageNav({ pages }: { pages: SectionLink[] }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className='flex gap-6 pb-5'>
      {pages.map((page, i) => (
        <Link
          key={i}
          href={page.link}
          className={`size-lg ${pathname === page.link ? "border-b border-black" : "hover:border-b border-slate-300"}`}
        >
          {page.pagename}
        </Link>
      ))}
    </div>
  );
}

export default PageNav;
