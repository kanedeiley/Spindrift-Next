import PageNav from "@/components/pagenav/PageNav";
import { SectionLink } from "@/utils/extratypes";

function ToursLayout({ children }: { children: React.ReactNode }) {
  const pages:SectionLink[]= [{pagename:"Journal",link:"/journal"},{pagename:"Timeline",link:"/journal/timeline"},{pagename:"Create",link:"/journal/create"}]
  return (
    <div>
         <PageNav pages={pages as SectionLink[]}/>
      {children}
    </div>
  );
}
  export default ToursLayout;