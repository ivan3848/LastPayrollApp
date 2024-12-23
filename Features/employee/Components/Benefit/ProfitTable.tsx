"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import { IProfit } from "./Types/IProfit";
import useProfitByIdEmployee from "./Hooks/useProfitByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IProfit) => void;
    handleDelete: (entity: IProfit) => void;
    handleAdd: () => void;
}

const BenefitTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useProfitByIdEmployee(
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
            <h3 className="m-0">Beneficio </h3>
            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="BENEFICIOS"
            />
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
                className="p-datatable-sm"
                dataKey="idProfit"
                paginator
                onSort={onSort}
                removableSort
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                sortMode="single"
                rows={5}
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column
                    field="conceptName"
                    header="Concepto"
                    sortable
                    filter
                    filterField="conceptName"
                    filterPlaceholder="Buscar por Concepto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="amount"
                    header="Monto"
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="start"
                    header="Fecha Inicio"
                    body={(rowData: IProfit) =>
                        formatDate(rowData.start?.toString()!)
                    }
                />
                <Column
                    field="end"
                    header="Fecha Final"
                    body={(rowData: IProfit) =>
                        formatDate(rowData.end?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData: IProfit) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            accessName="BENEFICIOS"
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default BenefitTable;
