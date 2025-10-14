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
}