
export class PriceDetail {
    Agents : Agents[];
    Carriers: Carriers[];
    Currencies: Currencies[];
    Itineraries: Itineraries[];
    Legs: Legs[];
    Places: Places[];
    Query: Query;
    Segments: Segments[];
    SessionKey: string;
    Status: string;
}
export class Agents {
    Id: number;
    ImageUrl: string;
    Name: string;
    OptimisedForMobile: boolean;
    Status: string;
    Type: string;
}
export class Carriers {
    Code: string;
    DisplayCode: string;
    Id: number;
    ImageUrl: string;
    Name: string;
}
export class Currencies {
    Code: string;
    DecimalDigits: number;
    DecimalSeparator: string;
    RoundingCoefficient: number;
    SpaceBetweenAmountAndSymbol: boolean;
    Symbol: string;
    SymbolOnLeft: boolean;
    ThousandsSeparator: string;
}
export class Itineraries {
    BookingDetailsLink: BookingDetailsLink;
    OutboundLegId: string;
    PricingOptions: PricingOptions[]
}
export class BookingDetailsLink {
    Body: string;
    Method: string;
    Uri: string;
}
export class PricingOptions {
    Agents: number[];
    DeeplinkUrl: string;
    Price: number;
    QuoteAgeInMinutes: number;
}
export class Legs {
    Arrival: string;
    Carriers: number[];
    Departure: string;
    DestinationStation: number;
    Directionality: string;
    Duration: number;
    FlightNumbers: FlightNumbers[];
    JourneyMode: string;
    OperatingCarriers: number[];
    OriginStation: number;
    SegmentIds: number[];
    Stops: number[];
}

export class FlightNumbers{
    CarrierId: number;
    FlightNumber: string;
}
export class Places{
    Code: string;
    Id: number;
    Name: string;
    ParentId: number;
    Type: string;
}
export class Query{
    Adults: number;
    CabinClass: string;
    Children: number;
    Country: string;
    Currency: string;
    DestinationPlace: string;
    GroupPricing: boolean;
    Infants: number;
    Locale: string;
    LocationSchema: string;
    OriginPlace: string;
    OutboundDate: string;
}
export class Segments{
    ArrivalDateTime: string;
    Carrier: number;
    DepartureDateTime: string;
    DestinationStation: number;
    Directionality: string;
    Duration: number;
    FlightNumber: string;
    Id: number;
    JourneyMode: string;
    OperatingCarrier: number;
    OriginStation: number;
}
