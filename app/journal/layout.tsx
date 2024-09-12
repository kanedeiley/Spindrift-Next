import Section from "@/components/section/Section";

function ToursLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
           <Section />
        {children}
      </div>
    );
  }
  export default ToursLayout;