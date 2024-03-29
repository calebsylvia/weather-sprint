"use client";
import React, { useEffect, useState } from "react";
import { IForecast, position } from "../Interfaces/Interfaces";
import { getLocal } from "../Utils/LocalStorage";
import { getForecast } from "../DataService/DataService";
import Image, { StaticImageData } from "next/image";
import sun from "@/app/assets/sun.png";
import cloud from "@/app/assets/cloud.png";
import cloudy from "@/app/assets/cloudy.png";
import haze from "@/app/assets/haze.png";
import rainy from "@/app/assets/rainy.png";
import snowflake from "@/app/assets/snowflake.png";
import storm from "@/app/assets/storm.png";
import wind from "@/app/assets/wind.png";

const Forecast = ({ lat, lng }: position) => {
  const [dayOne, setDayOne] = useState<string>("");
  const [dayOneHigh, setDayOneHigh] = useState<number>(0);
  const [dayOneLow, setDayOneLow] = useState<number>(0);
  const [dayOneImg, setDayOneImg] = useState<string | StaticImageData>(cloud);
  const [dayOneAlt, setDayOneAlt] = useState<string>("");
  const [dayTwo, setDayTwo] = useState<string>("");
  const [dayTwoHigh, setDayTwoHigh] = useState<number>(0);
  const [dayTwoLow, setDayTwoLow] = useState<number>(0);
  const [dayTwoImg, setDayTwoImg] = useState<string | StaticImageData>(cloud);
  const [dayTwoAlt, setDayTwoAlt] = useState<string>("");
  const [dayThree, setDayThree] = useState<string>("");
  const [dayThreeHigh, setDayThreeHigh] = useState<number>(0);
  const [dayThreeLow, setDayThreeLow] = useState<number>(0);
  const [dayThreeImg, setDayThreeImg] = useState<string | StaticImageData>(cloud);
  const [dayThreeAlt, setDayThreeAlt] = useState<string>("");
  const [dayFour, setDayFour] = useState<string>("");
  const [dayFourHigh, setDayFourHigh] = useState<number>(0);
  const [dayFourLow, setDayFourLow] = useState<number>(0);
  const [dayFourImg, setDayFourImg] = useState<string | StaticImageData>(cloud);
  const [dayFourAlt, setDayFourAlt] = useState<string>("");
  const [dayFive, setDayFive] = useState<string>("");
  const [dayFiveHigh, setDayFiveHigh] = useState<number>(0);
  const [dayFiveLow, setDayFiveLow] = useState<number>(0);
  const [dayFiveImg, setDayFiveImg] = useState<string | StaticImageData>(cloud);
  const [dayFiveAlt, setDayFiveAlt] = useState<string>("");

  function mostFrequent(arr: string[]) {
    let count = 1,
      max = 0,
      element;

    for (let i = 1; i < arr.length; ++i) {
      if (arr[i] === arr[i - 1]) {
        count++;
      } else {
        count = 1;
      }
      if (count > max) {
        max = count;
        element = arr[i];
      }
    }

    return element || "";
  }

  const iconChange = (desc: string | StaticImageData) => {
    switch (desc) {
      case "clear sky":
        return sun;
      case "rain":
        return rainy;
      case "few clouds":
        return cloudy;
      case "scattered clouds":
        return cloud;
      case "broken clouds":
        return cloud;
      case "overcast clouds":
        return cloud;
      case "shower rain":
        return rainy;
      case "thunderstorm":
        return storm;
      case "snow":
        return snowflake;
      case "haze":
        return haze;
      case "light rain":
        return rainy;
      default:
        break;
    }
  };



  useEffect(() => {
    const getData = async () => {
      const data = await getForecast(lat, lng);

      let day1max = [];
      let day2max = [];
      let day3max = [];
      let day4max = [];
      let day5max = [];

      let day1min = [];
      let day2min = [];
      let day3min = [];
      let day4min = [];
      let day5min = [];

      let day1desc: string[] = [];
      let day2desc: string[] = [];
      let day3desc: string[] = [];
      let day4desc: string[] = [];
      let day5desc: string[] = [];

      let day1Freq = mostFrequent(day1desc);
      let day2Freq = mostFrequent(day2desc);
      let day3Freq = mostFrequent(day3desc);
      let day4Freq = mostFrequent(day4desc);
      let day5Freq = mostFrequent(day5desc);

      let currentDay = new Date();

      let day1Day = new Date(currentDay.getTime() + 86400000);
      let day2Day = new Date(currentDay.getTime() + 86400000 * 2);
      let day3Day = new Date(currentDay.getTime() + 86400000 * 3);
      let day4Day = new Date(currentDay.getTime() + 86400000 * 4);
      let day5Day = new Date(currentDay.getTime() + 86400000 * 5);

      setDayOne(
        `${day1Day.toLocaleDateString("default", {
          weekday: "long",
        })}`
      );
      setDayTwo(
        `${day2Day.toLocaleDateString("default", {
          weekday: "long",
        })}`
      );
      setDayThree(
        `${day3Day.toLocaleDateString("default", {
          weekday: "long",
        })}`
      );
      setDayFour(
        `${day4Day.toLocaleDateString("default", {
          weekday: "long",
        })}`
      );
      setDayFive(
        `${day5Day.toLocaleDateString("default", {
          weekday: "long",
        })}`
      );

      for (let i = 0; i < data.list.length; i++) {
        let d = new Date(data.list[i].dt * 1000);
        if (
          d.toLocaleDateString("default") ===
          day1Day.toLocaleDateString("default")
        ) {
          day1max.push(data.list[i].main.temp_max);
          day1min.push(data.list[i].main.temp_min);
          day1desc.push(data.list[i].weather[0].description);
        } else if (
          d.toLocaleDateString("default") ===
          day2Day.toLocaleDateString("default")
        ) {
          day2max.push(data.list[i].main.temp_max);
          day2min.push(data.list[i].main.temp_min);
          day2desc.push(data.list[i].weather[0].description);
        } else if (
          d.toLocaleDateString("default") ===
          day3Day.toLocaleDateString("default")
        ) {
          day3max.push(data.list[i].main.temp_max);
          day3min.push(data.list[i].main.temp_min);
          day3desc.push(data.list[i].weather[0].description);
        } else if (
          d.toLocaleDateString("default") ===
          day4Day.toLocaleDateString("default")
        ) {
          day4max.push(data.list[i].main.temp_max);
          day4min.push(data.list[i].main.temp_min);
          day4desc.push(data.list[i].weather[0].description);
        } else if (
          d.toLocaleDateString("default") ===
          day5Day.toLocaleDateString("default")
        ) {
          day5max.push(data.list[i].main.temp_max);
          day5min.push(data.list[i].main.temp_min);
          day5desc.push(data.list[i].weather[0].description);
        }
      }

      setDayOneHigh(Math.floor(Math.max(...day1max)));
      setDayOneLow(Math.floor(Math.min(...day1min)));
      setDayTwoHigh(Math.floor(Math.max(...day2max)));
      setDayTwoLow(Math.floor(Math.min(...day2min)));
      setDayThreeHigh(Math.floor(Math.max(...day3max)));
      setDayThreeLow(Math.floor(Math.min(...day3min)));
      setDayFourHigh(Math.floor(Math.max(...day4max)));
      setDayFourLow(Math.floor(Math.min(...day4min)));
      setDayFiveHigh(Math.floor(Math.max(...day5max)));
      setDayFiveLow(Math.floor(Math.min(...day5min)));

      console.log(data);
      console.log(day1desc);
      console.log(day1Freq);

      const fiveDayArr = [
        setDayOneImg,
        setDayTwoImg,
        setDayThreeImg,
        setDayFourImg,
        setDayFiveImg,
      ];
      const fiveDayAltArr = [
        setDayOneAlt,
        setDayTwoAlt,
        setDayThreeAlt,
        setDayFourAlt,
        setDayFiveAlt,
      ];
      const dayFreq = [day1Freq, day2Freq, day3Freq, day4Freq, day5Freq];

        
    };

    getData();
  }, [lat, lng]);

  return (
    <div className="lg:flex justify-center mt-6 md:space-x-20 text-[#212A79]">
      <div className="bg-[#CAE8FF] opacity-75 text-center w-1/2 md:w-[13%] h-56 rounded-xl text-xl max-md:mx-auto ">
        <p className="mt-5">{dayOne}</p>
        <Image src={dayOneImg} alt={dayOneAlt} className="w-24 mx-auto"/>
        <p>{`High: ${dayOneHigh}`}</p>
        <p className="mn-6">{`Low: ${dayOneLow}`}</p>
      </div>
      <div className="bg-[#CAE8FF] opacity-75 text-center w-1/2 md:w-[13%] h-56 rounded-xl text-xl max-md:mx-auto ">
        <p className="mt-5">{dayTwo}</p>
        <Image src={dayTwoImg} alt={dayTwoAlt} className="w-24 mx-auto" />
        <p>{`High: ${dayTwoHigh}`}</p>
        <p className="mn-6">{`Low: ${dayTwoLow}`}</p>
      </div>
      <div className="bg-[#CAE8FF] opacity-75 text-center w-1/2 md:w-[13%] h-56 rounded-xl text-xl max-md:mx-auto ">
        <p className="mt-5">{dayThree}</p>
        <Image src={dayThreeImg} alt={dayThreeAlt} className="w-24 mx-auto" />
        <p>{`High: ${dayThreeHigh}`}</p>
        <p className="mn-6">{`Low: ${dayThreeLow}`}</p>
      </div>
      <div className="bg-[#CAE8FF] opacity-75 text-center w-1/2 md:w-[13%] h-56 rounded-xl text-xl max-md:mx-auto ">
        <p className="mt-5">{dayFour}</p>
        <Image src={dayFourImg} alt={dayFourAlt} className="w-24 mx-auto" />
        <p>{`High: ${dayFourHigh}`}</p>
        <p className="mn-6">{`Low: ${dayFourLow}`}</p>
      </div>
      <div className="bg-[#CAE8FF] opacity-75 text-center w-1/2 md:w-[13%] h-56 rounded-xl text-xl max-md:mx-auto ">
        <p className="mt-5">{dayFive}</p>
        <Image src={dayFiveImg} alt={dayFiveAlt} className="w-24 mx-auto" />
        <p>{`High: ${dayFiveHigh}`}</p>
        <p className="mn-6">{`Low: ${dayFiveLow}`}</p>
      </div>
    </div>
  );
};

export default Forecast;
