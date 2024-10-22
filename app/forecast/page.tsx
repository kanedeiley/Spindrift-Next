import BarChartComponent from "@/components/charts/BarChartComponent";
import LineChartComponent from "@/components/charts/LineChartComponent";
import CoreCharts from "@/components/forecast/core/Corecharts";
import Navbar from "@/components/navbar/Navbar";

function Forecast() {

  return (
    <>
      <CoreCharts />
      <BarChartComponent />
      <LineChartComponent />
    </>
  );
}

export default Forecast;
