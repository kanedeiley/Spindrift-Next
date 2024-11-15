import BarChartComponent from "@/components/charts/BarChart";
import LineChartComponent from "@/components/charts/LineChart";
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
