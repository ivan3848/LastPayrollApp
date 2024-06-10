export interface ICity {
    idCity: number;
    name: string;
    idRegion?: number;
    regionName?: string;
    action?: React.ReactNode;
}