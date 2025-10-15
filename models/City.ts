import { Float } from "react-native/Libraries/Types/CodegenTypes";

export class City {
    public name: string;
    public country: string;
    public lon: Float;
    public lat: Float;
    public state: string;

    constructor(name: string, country: string, lon: Float, lat: Float, state: string) {
        this.name = name;
        this.country = country;
        this.lon = lon;
        this.lat = lat;
        this.state = state;
    }

    static equals(city1: any, city2: City): boolean {
        return city1.name === city2.name &&
            city1.country === city2.country &&
            city1.state === city2.state;
    }
}
