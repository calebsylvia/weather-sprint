import { ICity, IForecast, IGeocode, IWeather, cities } from "../Interfaces/Interfaces";



export const getWeather = async(lat: number , lng: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
      const data: IWeather = await promise.json();
      return data;
}

export const getForecast = async(lat: number, lng: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
    const data: IForecast = await promise.json();
    return data
}

export const getCity = async(lat: number , lng: number) => {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
    const data = await promise.json();
    return data[0];
}

export const getWeatherBySearch = async(cityName: string) => {
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
    const data = promise.json();
    return data;
}