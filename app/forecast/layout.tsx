import PageNav from "@/components/pagenav/PageNav";
import { SectionLink } from "@/utils/extratypes";

function ToursLayout({ children }: { children: React.ReactNode }) {
    const pages:SectionLink[]= [{pagename:"Forecast",link:"/forecast"},{pagename:"Analysis",link:"/forecast/analysis"},{pagename:"Charts",link:"/forecast/charts"},{pagename:"Guide",link:"/forecast/guide"}]
    return (
      <div>
           <PageNav pages={pages as SectionLink[]}/>
        {children}
      </div>
    );
  }
  export default ToursLayout;