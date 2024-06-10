export interface ILocation {
    idLocation: number;
    name: string;
    address: string;
    idZone: number;
    zone?: string;
    code?: string;
    action?: React.ReactNode;
}
