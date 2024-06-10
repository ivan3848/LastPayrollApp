export interface IProvince {
    idProvince: number;
    name: string;
    idCity?: number;
    cityName?: string;
    action?: React.ReactNode;
}