import React, { useEffect, useState } from "react";
import { getLocal } from "../Utils/LocalStorage";
import { getWeather, getWeatherBySearch } from "../DataService/DataService";
import { position } from "../Interfaces/Interfaces";

const DisplayFavs = () => {
  const favorites: [] = getLocal();
  const [temp, setTemp] = useState<number[]>([]);
  const [high, setHigh] = useState<number[]>([]);
  const [low, setLow] = useState<number[]>([]);

//   useEffect(() => {
//     if (favorites.length > 0) {
      
//         favorites.forEach((fav: string) => {
//         const getData = async () => {
//           const position: position = await getWeatherBySearch(fav);

//           const weatherData = await getWeather(position.lat, position.lng);

//           // setTemp((prev) => [...prev, weatherData.main.temp]);
//           // setHigh((prev) => [...prev, weatherData.main.temp_max]);
//           // setLow((prev) => [...prev, weatherData.main.temp_min]);
//         };

//         getData();
//       });
//     }
//   }, [favorites]);

  return (
    <div className="flex space-x-5 overflow-x-auto mx-6">
      {favorites.length > 0 ? (
        favorites.map((fav: string, id: number) => (
          <div
            key={id}
            className="bg-[#212A79] w-72 h-32 rounded-xl mt-6"
          >
            <div>
              <p className="text-center my-7 text-[#CAE8FF] text-xl">
                {fav}
              </p>
              
            </div>
            <div></div>
          </div>
        ))
      ) : (
        <div>
          <p>No favorites added</p>
        </div>
      )}
    </div>
  );
};

export default DisplayFavs;
