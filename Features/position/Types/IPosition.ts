export interface IPosition {
    name: string;
    occupation?: string;
    department?: string;
    positionManager?: string;
    maxSalary?: number;
    minSalary?: number;
    idPosition?: number;
    idDepartment: number;
    idOccupation: number;
    IdPersonalArea: number;
    idPositionManager: number;
    isActive?: boolean;
    action?: React.ReactNode;
}
