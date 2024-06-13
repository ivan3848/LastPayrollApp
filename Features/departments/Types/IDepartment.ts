export interface IDepartment {
    idDepartment: number;
    name: string;
    idCostCenter?: number;
    costCenter?: string;
    idOrganizationalUnit?: number;
    organizationalUnit?: string;
    action?: React.ReactNode;
}