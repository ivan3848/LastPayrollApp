interface IPositionSalarytest {
    IdEmployee: number;
    IdChange: number;
    IdChangeManager?: number;
    IdNewStatus: number;
    Salary: number;
    DateChange: Date;
    ChangeName: string;
}

interface IPositionSalary {
    idDepartment: number;
    idPosition: number;
    salary: number;
    idHierarchyPositionManager?: number;
    IdNewStatus: number;
    DateChange: Date;
    Description?: string;
}

// interface IPosition{
//     IdPosition: number;
//     IdDepartment: number;
//     IdOrganizationalUnit: number;
//     Name: string;
//     MinSalary: number;
//     MaxSalary: number;
//     IdOccupation?: number;
//     IdPositionManager?: number;
// }