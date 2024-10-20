import { SectionLink } from "@/utils/extratypes";

function ToursLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
          <div> add pagenav here </div>
           {children}
      </div>
    );
  }
  export default ToursLayout;