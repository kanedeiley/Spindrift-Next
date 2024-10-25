import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  interface PaginateProps {
    q: string;
    className: string;
    page: number;
    count: number;
  }


export function Paginate({className, q, page, count}:PaginateProps) {
const encodeQ = encodeURI(q)
const oPage =  page>count?count:page
const uPage = page<1?1:oPage
return(
<div className={className}>
<Pagination>
  <PaginationContent>
    { uPage > 1 && (
    <PaginationItem>
      <PaginationPrevious href={"/search?q=" + encodeQ + "&page=" + (page-1)} />
    </PaginationItem>
    )}
    { uPage > 2  && (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    )}
    { uPage > 1 && (
    <PaginationItem>
      <PaginationLink href={"/search?q=" + encodeQ + "&page=" + (page-1)}>{uPage-1}</PaginationLink>
    </PaginationItem>
    )}
    <PaginationItem>
      <PaginationLink className="bg-gray-500 bg-opacity-20"  href="#">{uPage}</PaginationLink>
    </PaginationItem>
    { count > uPage  && (
    <PaginationItem>
      <PaginationLink href={"/search?q=" + encodeQ + "&page=" + (page+1)} >{uPage+1}</PaginationLink>
    </PaginationItem>
    )}
     { count > uPage +1  && (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    )}
     {count > uPage  && (    
    <PaginationItem >
      <PaginationNext  href={"/search?q=" + encodeQ + "&page=" + (page+1)} />
    </PaginationItem>
     )}
  </PaginationContent>
</Pagination>
</div>
)
 }