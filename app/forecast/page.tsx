import BarChartComponent from "@/components/charts/BarChart";
import LineChartComponent from "@/components/charts/LineChart";
import StormGlassComponent from "@/components/charts/StormGlass";
import CoreCharts from "@/components/forecast/core/Corecharts";
import Navbar from "@/components/navbar/Navbar";

function Forecast() {

  return (
    <>
      <CoreCharts />
      <StormGlassComponent />
      <BarChartComponent />
      <LineChartComponent />
    </>
  );
}

export default Forecast;
