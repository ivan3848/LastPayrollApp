export interface IRegion {
    idRegion: number;
    name: string;
    idCountry?: number;
    country?: string;
    action?: React.ReactNode;
}
