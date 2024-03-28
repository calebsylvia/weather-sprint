
export interface position {
    lat: number,
    lng: number
}

export interface IWeather {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
    rain?: IRain;
    snow?: ISnow;
}

export interface IRain{
    '1h'?: number,
    '3h'?: number
}

export interface ISnow{
    '1h'?: number,
    '3h'?: number
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}

export interface Sys {
    country: string;
    sunrise: number;
    sunset:  number;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}


export interface IForecast {
    cod:     string;
    message: number;
    cnt:     number;
    list:    List[];
    city:    City;
}

export interface City {
    id:         number;
    name:       string;
    coord:      Coord;
    country:    string;
    population: number;
    timezone:   number;
    sunrise:    number;
    sunset:     number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface List {
    dt:         number;
    main:       MainClass;
    weather:    Weather[];
    clouds:     Clouds;
    wind:       Wind;
    visibility: number;
    pop:        number;
    sys:        Sys;
    dt_txt:     string;
    snow?:      Snow;
}

export interface Clouds {
    all: number;
}

export interface MainClass {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    sea_level:  number;
    grnd_level: number;
    humidity:   number;
    temp_kf:    number;
}

export interface Snow {
    "3h": number;
}

export interface Sys {
    pod: Pod;
}

export enum Pod {
    D = "d",
    N = "n",
}

export interface Weather {
    id:          number;
    foreMain:        MainEnum;
    description: string;
    icon:        string;
}

export enum MainEnum {
    Clear = "Clear",
    Clouds = "Clouds",
    Snow = "Snow",
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}

export interface cities{
    cities: ICity[]
}


export interface ICity {
    name:        string;
    local_names: LocalNames;
    lat:         number;
    lon:         number;
    country:     string;
    state:       string;
}

export interface LocalNames {
    ru:           string;
    de:           string;
    en:           string;
    ascii:        string;
    feature_name: string;
    ka:           string;
}


export interface IGeocode {
    name:        string;
    local_names: LocalNames;
    lat:         number;
    lon:         number;
    country:     string;
    state:       string;
}

export interface LocalNames {
    en: string;
}
