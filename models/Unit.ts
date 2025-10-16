export class Unit {
    constructor(
        public readonly name: string,
        public readonly symbol: string
    ) {}

    static readonly KELVIN = new Unit("KELVIN", "K");
    static readonly CELSIUS = new Unit("CELSIUS", "°C");
    static readonly FAHRENHEIT = new Unit("FAHRENHEIT", "°F");

    static fromString(unitStr: string): Unit {
        switch (unitStr.toUpperCase()) {
            case "CELSIUS":
                return Unit.CELSIUS;
            case "FAHRENHEIT":
                return Unit.FAHRENHEIT;
            default:
                return Unit.KELVIN;
        }
    }

    static values(): Unit[] {
        return [this.KELVIN, this.CELSIUS, this.FAHRENHEIT];
    }

    toString(): string {
        return this.name;
    }
}