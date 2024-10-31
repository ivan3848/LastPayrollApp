"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
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
    const { params, setFilters, setSorts, clearSorts, clearFilters } =
        useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useBankEmployeeHistoryByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
    );

    const onSort = (event: DataTableSortEvent) => {
        switch (event.sortOrder) {
            case 1:
                setSorts([{ sortBy: event.sortField, isAsc: true }]);
                break;
            case -1:
                setSorts([{ sortBy: event.sortField, isAsc: false }]);
                break;
            default:
                clearSorts();
                break;
        }
    };

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Historial Bancario</h3>
            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="GESTION_BANCARIA"
            />
        </div>
    );

    const formatDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString("es-Es", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
        });
        return formattedDate;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idBankEmployeeHistory"
                paginator
                rows={5}
                onSort={onSort}
                removableSort
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                sortMode="single"
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column
                    field="bankName"
                    header="Banco"
                    sortable
                    filter
                    filterField="bankName"
                    filterPlaceholder="Buscar por Banco"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="paymentMethod"
                    header="Método de pago"
                    sortable
                    filter
                    filterField="bankName"
                    filterPlaceholder="Buscar por Banco"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="accountNumber"
                    header="Número de Cuenta"
                    sortable
                    filter
                    filterField="bankName"
                    filterPlaceholder="Buscar por Numero de Cuenta"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="startDate"
                    header="Fecha de Inicio"
                    body={(rowData: IBankEmployeeHistory) =>
                        formatDate(rowData.startDate?.toString()!)
                    }
                />
                <Column
                    field="endDate"
                    header="Fecha final"
                    body={(rowData: IBankEmployeeHistory) =>
                        formatDate(rowData.endDate.toString()!)
                    }
                />
                <Column
                    field="isDeposit"
                    header="Para deposito"
                    dataType="boolean"
                    bodyClassName="text-center"
                    style={{ minWidth: "8rem" }}
                    body={(e) => <GenericTableCheck isChecked={e.isDeposit} />}
                />
                <Column
                    header="Acciones"
                    body={(rowData: IBankEmployeeHistory) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            accessName="GESTION_BANCARIA"
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default BankEmployeeHistoryTable;
