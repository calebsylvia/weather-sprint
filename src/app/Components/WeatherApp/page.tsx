"use client";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/Consulting.png";
import pin from "@/app/assets/MapPin.png";
import favStar from "@/app/assets/Group 9.png";
import favTab from "@/app/assets/favTab.png";
import sun from "@/app/assets/sun.png";
import cloud from "@/app/assets/cloud.png";
import cloudy from "@/app/assets/cloudy.png";
import haze from "@/app/assets/haze.png";
import rainy from "@/app/assets/rainy.png";
import snowflake from "@/app/assets/snowflake.png";
import storm from "@/app/assets/storm.png";
import umbrella from "@/app/assets/Umbrella.png";
import wind from "@/app/assets/wind.png";
import drop from "@/app/assets/Drop.png";
import sunrise from "@/app/assets/sunrise.png";
import sunset from "@/app/assets/moon.png";
import notFavStar from "@/app/assets/Star.png";
import Image, { StaticImageData } from "next/image";
import MapComponent from "../MapComponent";
import Forecast from "../Forecast";
import { Coord, ICity, Main } from "@/app/Interfaces/Interfaces";
import { getCity, getWeather, getWeatherBySearch } from "@/app/DataService/DataService";
import { getLocal, saveLocal, removeLocal } from "@/app/Utils/LocalStorage";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const WeatherApp = () => {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [searchCity, setSearchCity] = useState<string>("")
  const [input, setInput] = useState<string>("")
  const [degrees, setDegrees] = useState<number>(0);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);
  const [cityName, setCityName] = useState<string>("");
  const [favCity, setFavCity] = useState<string>("");
  const [rise, setRise] = useState<number | string>("");
  const [sunSet, setSunSet] = useState<number | string>("");
  const [prec, setPrec] = useState<number>(0);
  const [windSpeed, setWind] = useState<number>(0);
  const [windDir, setWindDir] = useState<string>("");
  const [humid, setHumid] = useState<number>(0);
  const [isSnow, setIsSnow] = useState<boolean>(false);
  const [weatherImg, setWeatherImg] = useState<string | StaticImageData>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favImg, setFavImg] = useState<string | StaticImageData>(notFavStar);

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported on your browser.");
    }

    if(searchCity !== ""){
        const getCoords = async() => {
           
            const data = await getWeatherBySearch(input)
            
            setLat(data.lat)
            setLng(data.lon)
        }

        getCoords()
    }

    const getCurrentWeather = async () => {
      const data = await getWeather(lat, lng);

      setDegrees(Math.floor(data.main.temp));
      setLow(Math.floor(data.main.temp_min));
      setHigh(Math.floor(data.main.temp_max));
      setWind(data.wind.speed);
      setHumid(data.main.humidity);

      if (data.wind.deg >= 0 && data.wind.deg < 30) {
        setWindDir("East");
      } else if (data.wind.deg >= 30 && data.wind.deg < 60) {
        setWindDir("North East");
      } else if (data.wind.deg >= 60 && data.wind.deg < 120) {
        setWindDir("North");
      } else if (data.wind.deg >= 120 && data.wind.deg < 150) {
        setWindDir("North West");
      } else if (data.wind.deg >= 150 && data.wind.deg < 210) {
        setWindDir("West");
      } else if (data.wind.deg >= 210 && data.wind.deg < 240) {
        setWindDir("South West");
      } else if (data.wind.deg >= 240 && data.wind.deg < 300) {
        setWindDir("South");
      } else if (data.wind.deg >= 300 && data.wind.deg < 330) {
        setWindDir("South East");
      } else if (data.wind.deg >= 330 && data.wind.deg < 360) {
        setWindDir("East");
      }

      if (data.rain?.["1h"]) {
        setIsSnow(false)
        setPrec(data.rain?.["1h"]);
      } else if (data.snow?.["1h"]) {
        setIsSnow(true)
        setPrec(data.snow?.["1h"]);
      }

      switch (data.weather[0].description) {
        case "clear sky":
          setWeatherImg(sun);
          break;
        case "rain":
          setWeatherImg(rainy);
          break;
        case "few clouds":
          setWeatherImg(cloudy);
          break;
        case "scattered clouds":
          setWeatherImg(cloud);
          break;
        case "overcast clouds":
          setWeatherImg(cloud);
          break;
        case "broken clouds":
          setWeatherImg(cloud);
          break;
        case "shower rain":
          setWeatherImg(rainy);
          break;
        case "thunderstorm":
          setWeatherImg(storm);
          break;
        case "snow":
          setWeatherImg(snowflake);
          break;
        case "haze":
          setWeatherImg(haze);
          break;
        case "light rain":
          setWeatherImg(rainy);
          break;
        default:
          break;
      }

      const riseTime = data.sys.sunrise;
      const setTime = data.sys.sunset;

      const rise = new Date(riseTime * 1000);
      const set = new Date(setTime * 1000);

      let setHours = set.getHours();
      let setMinutes = "0" + set.getMinutes();
      let riseHours = rise.getHours();
      let riseMinutes = "0" + rise.getMinutes();

      setSunSet(`${setHours}:${setMinutes.substr(-2)}`)
      setRise(`${riseHours}:${riseMinutes.substr(-2)}`)
    };

    const getCurrentCity = async () => {
      const cityData: ICity = await getCity(lat, lng);

      console.log(cityData);
      setFavCity(cityData.name);
      setCityName(
        `${cityData.name}, ${
          cityData.state ? cityData.state : cityData.country
        }`
      );
    };

    getCurrentWeather();
    getCurrentCity();
  }, [lat, lng]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleFav = () => {
    setIsFav(!isFav);

    if (isFav === true) {
      saveLocal(favCity);
      setFavImg(favStar);
    } else {
      removeLocal(favCity);
      setFavImg(notFavStar);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between bg-[#212A79] h-24 w-full border-b-[#CAE8FF] border-b-[1px]">
        <Image
          src={logo}
          alt="Cloud Weather App Logo"
          className="w-20 h-20 my-auto ml-6"
        ></Image>
        <div className="my-auto mr-20 flex">
          <Image src={pin} alt="Map Pin Icon" className="mr-2 w-8 h-8"></Image>
          <input
            type="search"
            placeholder="Enter City Name..."
            className="rounded-2xl w-60 h-7"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setSearchCity((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchCity !== ''){
                  setInput(searchCity)
                }
                (e as React.ChangeEvent<HTMLInputElement>).target.value = ''
              }}}
          ></input>
        </div>
      </div>
      <div className="relative">
        <button>
          <Image
            onClick={toggleDrawer}
            src={favTab}
            alt="Favorite Button"
            className="w-16 rounded-b-2xl"
          />
        </button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="top"
          size={200}
          className="bg-[#CAE8FF] w-screen"
        ></Drawer>
      </div>

      {/* Main Body */}
      <div className=" h-full w-full pt-3 mx-20">
        <div className="flex">
          <div className="bg-[#CAE8FF] w-1/4 h-96 opacity-75 rounded-xl mr-10">
            <div className="">
              <div className="flex justify-between mx-6 mt-6">
                <p className="text-2xl">{cityName}</p>
                <button onClick={handleFav}>
                  <Image src={favImg} alt="Favorite Star Button" />
                </button>
              </div>
              <div className="flex justify-between mx-6 mt-7">
                <p className="text-6xl">{`${degrees}\u00b0`}</p>
                <div className="text-base mr-12">
                  <p>{`High: ${high}\u00b0`}</p>
                  <p>{`Low: ${low}\u00b0`}</p>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Image
                  src={weatherImg}
                  alt="Displayed Weather"
                  className="w-40"
                />
              </div>
            </div>
          </div>
          <div className="bg-[#CAE8FF] w-3/5 h-96 opacity-75 rounded-xl flex flex-row justify-between">
            <div className="space-y-12 my-auto ml-8">
              <div className="flex">
                <Image
                  src={isSnow === true ? snowflake : umbrella}
                  alt="Umbrella Icon"
                  className="w-12 h-10 my-auto"
                />
                <div className="text-2xl pl-5">
                  <p>Precipitation:</p>
                  <p className="pl-2">{`${prec} mm`}</p>
                </div>
              </div>
              <div className="flex">
                <Image
                  src={wind}
                  alt="Wind Icon"
                  className="w-10 h-10 my-auto"
                />
                <div className="text-2xl pl-5">
                  <p>Wind:</p>
                  <p className="pl-2">{`${windDir} ${windSpeed} mph`}</p>
                </div>
              </div>
              <div className="flex">
                <Image
                  src={drop}
                  alt="Rain Drop Icon"
                  className="w-12 h-10 my-auto"
                />
                <div className="text-2xl pl-5">
                  <p>Humidity:</p>
                  <p className="pl-2">{`${humid}%`}</p>
                </div>
              </div>
            </div>
            <div className="mr-10 mt-6">
              <div className="w-[500px] h-56">
                <MapComponent lat={lat} lng={lng}/>
              </div>
              <div className="flex justify-center space-x-12 mb-2">
                <p>{`Lat: ${Math.round(lat * 1000) / 1000}`}</p>
                <p>{`Lon: ${Math.round(lng * 1000) / 1000}`}</p>
              </div>
              <div className="flex justify-evenly">
                <div className="">
                  <Image src={sunrise} alt="Sunrise Icon" className="w-16 mx-auto" />
                  <p>{`Sunrise: ${rise}`}</p>
                </div>
                <div className="mt-2">
                  <Image src={sunset} alt="Sunrise Icon" className="w-12 mb-[6px] mx-auto" />
                  <p>{`Sunset: ${sunSet}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Five Day Forecast */}

      <div>
        <Forecast lat={lat} lng={lng} />
      </div>
    </div>
  );
};

export default WeatherApp;
