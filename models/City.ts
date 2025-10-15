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

    hashCode(): number {
        const str = this.name.toLowerCase() + "|" + this.country.toLowerCase() + "|" + this.state.toLowerCase();

        let hash = 0;
        const prime = 31;

        for (let i = 0; i < str.length; i++) {
            hash = (hash * prime + str.charCodeAt(i)) | 0;
        }

        return hash >>> 0;
    }

    equals(other: City): boolean {
        return this.hashCode() === other.hashCode();
    }
}
