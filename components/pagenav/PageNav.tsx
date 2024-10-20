'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SectionLink } from '@/utils/extratypes';

function PageNav({ pages }: { pages: SectionLink[] }) {
  const pathname = usePathname();
  return (
    <div className='flex gap-4'>
      {pages.map((page, i) => (
        <Link key={i} href={page.link}>
          {page.pagename}
        </Link>
      ))}
    </div>
  );
}

export default PageNav;
