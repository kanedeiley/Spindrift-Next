import { NextApiRequest, NextApiResponse } from "next";
import { fetchSpot } from "@/utils/actions";
import { fetchWeatherApi } from 'openmeteo';


function generateRandomList(length: number): string[] {
    const options = ["good", "fair", "poor"];
    const items: string[] = [];
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * options.length);
      items.push(options[randomIndex]);
    }
  
    return items;
  }
  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const ratings = generateRandomList(167);
    
    const { id } = req.query;
    if( req.method === "GET" ){
        try {
            if(typeof id === "string"){
                const spot = await fetchSpot({spotID:id});
                const params = {
                    "latitude": spot?.latitude,
                    "longitude": spot?.longitude,
                    "hourly": ["wave_height", "wave_direction", "wave_period", "wind_wave_height", "wind_wave_direction", "wind_wave_period", "swell_wave_height", "swell_wave_direction", "swell_wave_period"]
                };
                const url = "https://marine-api.open-meteo.com/v1/marine";                
                const responses = await fetchWeatherApi(url, params);
                const response = responses[0];
                const utcOffsetSeconds = response.utcOffsetSeconds();
                const hourly = response.hourly()!;


                const wind_params = {
                    "latitude": 52.52,
                    "longitude": 13.41,
                    "hourly": ["wind_speed_10m", "wind_direction_10m"]
                };
                const wind_url = "https://api.open-meteo.com/v1/forecast";
                const wind_responses = await fetchWeatherApi(wind_url, wind_params);
                const wind_response = wind_responses[0];
                const wind_hourly = wind_response.hourly()!;

                const weatherData = {
                    hourly: {
                        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                            (t) => new Date((t + utcOffsetSeconds) * 1000)
                        ),
                        waveHeight: hourly.variables(0)!.valuesArray()!,
                        waveDirection: hourly.variables(1)!.valuesArray()!,
                        wavePeriod: hourly.variables(2)!.valuesArray()!,
                        windWaveHeight: hourly.variables(3)!.valuesArray()!,
                        windWaveDirection: hourly.variables(4)!.valuesArray()!,
                        windWavePeriod: hourly.variables(5)!.valuesArray()!,
                        swellWaveHeight: hourly.variables(6)!.valuesArray()!,
                        swellWaveDirection: hourly.variables(7)!.valuesArray()!,
                        swellWavePeriod: hourly.variables(8)!.valuesArray()!,
                        ratings: ratings,
                        windSpeed10m: wind_hourly.variables(0)!.valuesArray()!,
                        windDirection10m: wind_hourly.variables(1)!.valuesArray()!,
                    },

                };
                res.status(200).json(
                 weatherData
                );
            }
            else{
                res.status(500).json({ error: "Error fetching spots" });
            }
        } catch (error) {
          res.status(500).json({ error: "Error fetching spots" });
        }
      }
}
