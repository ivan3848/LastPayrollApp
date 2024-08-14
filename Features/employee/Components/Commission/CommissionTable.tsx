"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { ICommission } from "./Types/ICommission";
import useCommissionByIdEmployee from "./Hooks/useCommissionByIdEmployee";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: ICommission) => void;
    handleDelete: (entity: ICommission) => void;
    handleAdd: () => void;
}

const DependantTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useCommissionByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
    );
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Comisión </h3>
            <AddButton handleAdd={handleAdd} entity={idEmployee} />
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-md"
                dataKey="idCommission"
                rows={5}
            >
                <Column field="fullName" header="Concepto" />
                <Column field="relationship" header="Cantidad" />
                <Column field="relationship" header="Fecha De pago" />
                <Column field="relationship" header="Fecha Realizado" />

                <Column
                    header="Acciones"
                    body={(rowData: ICommission) => (
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

export default DependantTable;
