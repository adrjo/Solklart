export class Weather {
    temp: {
        temp: Number,
        tempFeelsLike: Number,
        tempMax: Number,
        tempMin: Number
    };
    weather: {
        title: string,
        description: string,
        icon: string
    };

    sunset: Date;
    sunrise: Date;

    rainAmt?: Number;
    snowAmt?: Number;

    constructor({
        temp,
        tempFeelsLike,
        tempMax,
        tempMin,
        title,
        description,
        icon,
        sunset,
        sunrise,
        rain,
        snow,
    }: {
        temp: number;
        tempFeelsLike: number;
        tempMax: number;
        tempMin: number;
        title: string;
        description: string;
        icon: string;
        sunset: number;
        sunrise: number;
        rain?: number;
        snow?: number;
    }) {
        this.temp = { temp, tempFeelsLike, tempMax, tempMin };
        this.weather = { title, description, icon };
        this.sunset = new Date(sunset * 1000);
        this.sunrise = new Date(sunrise * 1000);
        this.rainAmt = rain;
        this.snowAmt = snow;
    }
}