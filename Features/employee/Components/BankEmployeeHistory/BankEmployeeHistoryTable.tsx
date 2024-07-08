"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useBankEmployeeHistoryByIdEmployee from "./Hooks/useBankEmployeeHistoryByIdEmployee";
import { IBankEmployeeHistory } from "./types/IBankEmployeeHistory";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import GenericTableCheck from "@/Features/Shared/Components/GenericTableCheck";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IBankEmployeeHistory) => void;
    handleDelete: (entity: IBankEmployeeHistory) => void;
    handleAdd: () => void;
}

const BankEmployeeHistoryTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useBankEmployeeHistoryByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Historial Bancario</h3>
            <AddButton handleAdd={handleAdd} entity={idEmployee} />
        </div>
    );

    const formatDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
        });
        return formattedDate;
    };

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idBankEmployeeHistory"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column field="bankName" header="Banco" />
                <Column field="paymentMethod" header="Método de pago" />
                <Column field="accountNumber" header="Número de Cuenta" />
                <Column
                    field="startDate"
                    header="Fecha de Inicio"
                    body={(rowData: IBankEmployeeHistory) =>
                        formatDate(rowData.startDate!)
                    }
                />
                <Column
                    field="endDate"
                    header="Fecha final"
                    body={(rowData: IBankEmployeeHistory) =>
                        formatDate(rowData.endDate!)
                    }
                />
                <Column
                    field="isDeposit"
                    header="Deposito"
                    dataType="boolean"
                    body={(e) => <GenericTableCheck isChecked={e.isActive} />}
                />
                <Column
                    header="Acciones"
                    body={(rowData: IBankEmployeeHistory) => (
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

export default BankEmployeeHistoryTable;
