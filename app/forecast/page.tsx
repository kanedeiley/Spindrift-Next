import BarChartComponent from "@/components/charts/BarChartComponent";
import CoreCharts from "@/components/forecast/core/Corecharts";
import Navbar from "@/components/navbar/Navbar";

function Forecast() {

  return (
    <>
      <CoreCharts />
      <BarChartComponent />
    </>
  );
}

export default Forecast;
