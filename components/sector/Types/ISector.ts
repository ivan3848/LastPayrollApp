export interface ISector {
    idSector: number;
    name: string;
    idProvince?: number;
    provinceName?: string;
    action?: React.ReactNode;
}
