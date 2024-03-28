"use client";
import React, { useEffect, useState } from "react";
import logo from "@/app/assets/Consulting.png";
import pin from "@/app/assets/MapPin.png";
import favStar from "@/app/assets/Star.png";
import sun from "@/app/assets/sun.png";
import umbrella from "@/app/assets/Umbrella.png";
import wind from "@/app/assets/wind.png";
import drop from "@/app/assets/Drop.png";
import sunrise from "@/app/assets/sunrise.png";
import sunset from "@/app/assets/moon.png";
import Image from "next/image";
import MapComponent from "../MapComponent";
import Forecast from "../Forecast";
import { Coord, ICity, Main } from "@/app/Interfaces/Interfaces";
import { getCity, getWeather } from "@/app/DataService/DataService";
import { weatherKey } from "../../../../Keys/Key";

const WeatherApp = () => {


  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [degrees, setDegrees] = useState<number>(0)
  const [low, setLow] = useState<number>(0)
  const [high, setHigh] = useState<number>(0)
  const [cityName, setCityName] = useState<string>("")
  const [rise, setRise] = useState<number>(0)
  const [sunSet, setSunSet] = useState<number>(0)
  const [prec, setPrec] = useState<number>(0)
  const [windSpeed, setWind] = useState<number>(0)
  const [windDir, setWindDir] = useState<string>('')
  const [humid, setHumid] = useState<number>(0)
  const [isSnow, setIsSnow] = useState<boolean>(false)
  const [weatherImg, setWeatherImg] = useState<string>("")

  
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude)
        });
      } else {
        console.log("Geolocation is not supported on your browser.");
      }


      const getCurrentWeather = async() => {
        const data = await getWeather(lat, lng, weatherKey)

        setDegrees(Math.floor(data.main.temp))
        setLow(Math.floor(data.main.temp_min))
        setHigh(Math.floor(data.main.temp_max))
        setRise(data.sys.sunrise)
        setSunSet(data.sys.sunset)
        setWind(data.wind.speed)
        setHumid(data.main.humidity)
        
        if (data.wind.deg >= 0 && data.wind.deg < 30) {
            setWindDir("East")
          } else if (data.wind.deg >= 30 && data.wind.deg < 60) {
            setWindDir("North East")
          } else if (data.wind.deg >= 60 && data.wind.deg < 120) {
            setWindDir("North")
          } else if (data.wind.deg >= 120 && data.wind.deg < 150) {
            setWindDir("North West")
          } else if (data.wind.deg >= 150 && data.wind.deg < 210) {
            setWindDir("West")
          } else if (data.wind.deg >= 210 && data.wind.deg < 240) {
            setWindDir("South West")
          } else if (data.wind.deg >= 240 && data.wind.deg < 300) {
            setWindDir("South")
          } else if (data.wind.deg >= 300 && data.wind.deg < 330) {
            setWindDir("South East")
          } else if (data.wind.deg >= 330 && data.wind.deg < 360) {
            setWindDir("East")
          }
        

        if(data.rain?.["1h"]){
            setPrec(data.rain?.["1h"])
        }else if(data.snow?.["1h"]){
            setPrec(data.snow?.["1h"])
        }
    }

    const getCurrentCity = async() => {
        const cityData = await getCity(lat, lng, weatherKey)

        console.log(cityData)
        setCityName(`${cityData.name}, ${cityData.state ? cityData.state : cityData.country}`)
    }

    getCurrentWeather()
    getCurrentCity()
    }, [lat]);


  
 

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
          ></input>
        </div>
      </div>

      {/* Main Body */}
      <div className=" h-full w-full pt-12 mx-20">
        <div className="flex">
          <div className="bg-[#CAE8FF] w-1/4 h-96 opacity-75 rounded-xl mr-10">
            <div className="">
              <div className="flex justify-between mx-6 mt-6">
                <p className="text-2xl">{cityName}</p>
                <button>
                  <Image src={favStar} alt="Favorite Button" />
                </button>
              </div>
              <div className="flex justify-between mx-6 mt-7">
                <p className="text-6xl">{`${degrees}\u00b0`}</p>
                <div className="text-base mr-12">
                  <p>{`High: ${high}\u00b0`}</p>
                  <p>{`Low: ${low}\u00b0`}</p>
                </div>
              </div>
              <div className="flex justify-center my-10">
                <Image src={weatherImg} alt="Displayed Weather" className="w-40" />
              </div>
            </div>
          </div>
          <div className="bg-[#CAE8FF] w-3/5 h-96 opacity-75 rounded-xl flex flex-row justify-between">
            <div className="space-y-12 my-auto ml-8">
              <div className="flex">
                <Image src={umbrella} alt="Umbrella Icon" className="w-12 h-10 my-auto" />
                <div className="text-2xl pl-5">
                  <p>Precipitation:</p>
                  <p>{`${prec} mm`}</p>
                </div>
              </div>
              <div className="flex">
                <Image src={wind} alt="Wind Icon" className="w-10 h-10 my-auto" />
                <div className="text-2xl pl-5">
                  <p>Wind:</p>
                  <p>{`${windDir} ${windSpeed} mph`}</p>
                </div>
              </div>
              <div className="flex">
                <Image src={drop} alt="Rain Drop Icon" className="w-12 h-10 my-auto" />
                <div className="text-2xl pl-5">
                  <p>Humidity:</p>
                  <p>{`${humid}%`}</p>
                </div>
              </div>
            </div>
            <div className="mr-10 mt-6">
              <div className="w-[550px] h-56">
                <MapComponent lat={lat} lng={lng} />
              </div>
              <div className="flex space-x-4 text-center">
                <p>{`Lat: ${Math.round(lat * 1000) / 1000}`}</p>
                <p>{`Lon: ${Math.round(lng * 1000) / 1000}`}</p>
              </div>
              <div className="flex justify-evenly">
                <div>
                  <Image src={sunrise} alt="Sunrise Icon" className="w-16" />
                  <p>{`Sunrise: ${rise}`}</p>
                </div>
                <div>
                  <Image src={sunset} alt="Sunrise Icon" className="w-12" />
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
