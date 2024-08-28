"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { ICommission } from "./Types/ICommission";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useCommissionDetailByIdEmployee from "../CommissionDetail/Hooks/useCommissionDetailByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: ICommission) => void;
    handleDelete: (entity: ICommission) => void;
    handleAdd: () => void;
}

const CommissionTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useCommissionDetailByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-DO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
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
                rows={5}
            >
                <Column field="concept" header="Concepto" />
                <Column field="amount" header="Cantidad" />
                <Column
                    field="date"
                    key={"date"}
                    header="Fecha Final"
                    body={(rowData: ICommission) =>
                        formatDate(rowData.date?.toString()!)
                    }
                />
                <Column
                    field="isPaid"
                    header="Pago Realizado"
                    body={(rowData: ICommission) =>
                        rowData.isPaid ? "Si" : "No"
                    }
                />

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

export default CommissionTable;
