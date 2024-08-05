"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useEmployeeQuery from "@/Features/employee/Hooks/useEmployeeQuery";
import { IEmployee } from "@/Features/employee/Types/IEmployee";
interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IEmployee) => void;
    handleDelete: (entity: IEmployee) => void;
    handleAdd: () => void;
}

const DeleteEmployeeTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useEmployeeQuery(params, listOfDependencies);
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Eliminar Empleado</h3>
        </div>
    );

    return (
        <Card className="m-2">
            <DataTable
                value={data.items}
                header={header}
                className="p-datatable-md"
                dataKey="idDeleteEmployee"
                rows={5}
            >
                <Column field="idEmployee" header="Código" />
                <Column field="employeeName" header="Nombre completo" />
                <Column field="position" header="Posición" />
                <Column field="department" header="Departamento" />
                <Column
                    header="Acciones"
                    body={(rowData: IEmployee) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default DeleteEmployeeTable;
