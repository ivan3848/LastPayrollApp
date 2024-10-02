"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import ActionsTableContabilization from "../ActionsTableContabilizaiton";
import { IFireEmployee } from "@/Features/employee/Components/FiredEmployee/Types/IFiredEmployee";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import { CACHE_KEY_FIREDEMPLOYEE } from "@/constants/cacheKeys";
import { getAllFiredEmployeeService } from "@/Features/employee/Components/FiredEmployee/Services/firedEmployee";

interface Props {
    submitted: boolean;
    handleFiredEmployeeContabilization: (entity: IFireEmployee) => void;
}

const FiredEmployeeContabilizationTable = ({
    submitted,
    handleFiredEmployeeContabilization,
}: Props) => {
    const {
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];

    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_FIREDEMPLOYEE,
        getAllFiredEmployeeService
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                value={data.items}
                className="p-datatable-sm"
                dataKey="idEmployee"
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
                    field="idEmployee"
                    header="Codigo de empleado"
                    sortable
                    filter
                    filterField="idEmployee"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="employeeName"
                    header="Nombre"
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="firedDate"
                    header="Fecha de desvinculación"
                    body={(rowData: IFireEmployee) =>
                        formatDate(rowData.firedDate?.toString()!)
                    }
                />
                <Column
                    header="Contabilizacion Desvincular"
                    body={(rowData: IFireEmployee) => (
                        <ActionsTableContabilization
                            entity={rowData}
                            Contabilization1={handleFiredEmployeeContabilization}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default FiredEmployeeContabilizationTable;
