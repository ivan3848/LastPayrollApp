"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useBankEmployeeHistoryByIdEmployee from "./Hooks/useBankEmployeeHistoryByIdEmployee";
import { IBankEmployeeHistory } from "./types/IBankEmployeeHistory";

interface Props {
    id: number;
    submitted: boolean;
    handleEdit: (entity: IBankEmployeeHistory) => void;
    handleDelete: (entity: IBankEmployeeHistory) => void;
    handleAdd: (entity: IBankEmployeeHistory) => void;
}

const BankEmployeeHistoryTable = ({
    submitted,
    handleDelete,
    handleEdit,
    id,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useBankEmployeeHistoryByIdEmployee(
        params,
        listOfDependencies,
        id
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Historial Bancario</h3>
        </div>
    );

    return (
        <DataTable
            id="bankEmployeeHistory-Table"
            dataKey="idBankEmployeeHistory"
            value={data!}
            paginator
            loading={isLoading}
            className="datatable-responsive"
            header={header}
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
        >
            <Column field="startDate" header="Fecha de Inicio"></Column>
            <Column field="paymentMethod" header="Metodo"></Column>
            <Column
                field="accountNumber"
                header="Numero De Cuenta"
                headerStyle={{ minWidth: "15rem" }}
                sortable
            ></Column>

            <Column
                field={"bankName"}
                header="Nombre del banco"
                headerStyle={{ minWidth: "15rem" }}
            ></Column>

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IBankEmployeeHistory>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default BankEmployeeHistoryTable;
