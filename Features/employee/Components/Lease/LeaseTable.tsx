"use client";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { useState } from "react";
import AddButton from "../../../Shared/Components/AddButton";
import Amortization from "../Amortization/Amortization";
import LeasePauseActionTableTemplate from "../LeasePause/Components/LeasePauseActionTableTemplate";
import LeaseActionTableTemplate from "./Components/LeaseActionTableTemplate";
import useGetLeaseByIdEmployee from "./Hooks/useGetLeaseByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit?: (entity: ILease) => void;
    handleDelete?: (entity: ILease) => void;
    handleAdd?: () => void;
    handlePay?: (entity: ILease) => void;
    handleAmortize?: (entity: ILease) => void;
    showLeaseTable?: boolean;
    setShowLeaseTable?: (showLeaseTable: boolean) => void;
    handleAddLeasePause?: (entity: ILease) => void;
    showAddLeasePauseBtn?: boolean;
    setShowAddLeasePauseBtn?: (showAddLeasePauseBtn: boolean) => void;
}

const LeaseTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
    showLeaseTable,
    setShowLeaseTable,
    handleAddLeasePause,
    showAddLeasePauseBtn,
    setShowAddLeasePauseBtn,
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

    const { data, isLoading } = useGetLeaseByIdEmployee(
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
    const handleShowLeaseTable = () => {
        setShowAddLeasePauseBtn && setShowAddLeasePauseBtn(true);
        setShowLeaseTable && setShowLeaseTable(false);
    };
    const [customAddDialog, setCustomAddDialog] = useState(false);
    const [entity, setEntity] = useState<ILease | null>(null);

    const header = (
        <>
            {showLeaseTable ? (
                <div className="flex gap-5 justify-content-between align-items-center">
                    <h3 className="m-0">
                        <i
                            className="cursor-pointer pi pi-arrow-left mr-5"
                            onClick={handleShowLeaseTable}
                        ></i>
                        Lista de prestamos y avances
                    </h3>
                    {showAddLeasePauseBtn && (
                        <AddButton
                            handleAdd={() => handleAddLeasePause}
                            entity={idEmployee}
                        />
                    )}
                </div>
            ) : (
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h3 className="m-0">Prestamos</h3>
                    <AddButton
                        handleAdd={() => handleAdd!()}
                        entity={idEmployee}
                    />
                </div>
            )}
        </>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAmortize = (entity: ILease) => {
        setEntity(entity);
        setCustomAddDialog(true);
    };
    const formatCurrency = (value: number) => {
        if (value == null) return "";
        return value.toLocaleString("es-DO", {
            style: "currency",
            currency: "DOP",
        });
    };
    return (
        <>
            {customAddDialog && (
                <Amortization
                    customAddDialog={customAddDialog}
                    setCustomAddDialog={setCustomAddDialog}
                    customEntity={entity!}
                    id={entity?.idLease!}
                />
            )}

            <Card className="m-2">
                <DataTable
                    value={data}
                    header={header}
                    className="p-datatable-sm"
                    dataKey="idLease"
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
                        field="entity"
                        header="Banco"
                        sortable
                        filter
                        filterField="idBank"
                        filterPlaceholder="Buscar por banco"
                        filterElement={
                            <TableDropDownFilter
                                useQuery={useBankQuery}
                                text="name"
                                column="idBank"
                                setFilters={setFilters}
                                clearFilters={clearFilters}
                            />
                        }
                        showFilterMenuOptions={false}
                        showApplyButton={false}
                        showClearButton={false}
                        onFilterClear={clearFilters}
                    ></Column>
                    <Column
                        field="totalAmount"
                        header="Total"
                        sortable
                        filter
                        body={(rowData: ILease) =>
                            formatCurrency(rowData.totalAmount ?? 0)
                        }
                        filterField="totalAmount"
                        filterPlaceholder="Buscar por total"
                        showFilterMenuOptions={false}
                        onFilterApplyClick={(e) => onFilter(e)}
                        onFilterClear={clearFilters}
                    ></Column>
                    <Column
                        field="totalDebt"
                        header="Deuda"
                        sortable
                        body={(rowData: ILease) =>
                            formatCurrency(rowData.totalDebt ?? 0)
                        }
                        filter
                        filterField="totalDebt"
                        filterPlaceholder="Buscar por total"
                        showFilterMenuOptions={false}
                        onFilterApplyClick={(e) => onFilter(e)}
                        onFilterClear={clearFilters}
                    ></Column>
                    <Column
                        field="fees"
                        header="Cuotas"
                        sortable
                        filter
                        filterField="fees"
                        filterPlaceholder="Buscar por cuotas"
                        showFilterMenuOptions={false}
                        onFilterApplyClick={(e) => onFilter(e)}
                        onFilterClear={clearFilters}
                    ></Column>
                    <Column
                        field="requestDate"
                        header="Fecha Aprobación"
                        body={(rowData: ILease) =>
                            formatDate(rowData.requestDate?.toString()!)
                        }
                    />
                    <Column
                        header="Acciones"
                        body={(rowData: ILease) =>
                            showLeaseTable ? (
                                <LeasePauseActionTableTemplate
                                    entity={rowData}
                                    handleAddLeasePause={() =>
                                        handleAddLeasePause &&
                                        handleAddLeasePause(rowData!)
                                    }
                                />
                            ) : (
                                <LeaseActionTableTemplate
                                    entity={rowData}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete!}
                                    handlePay={() => alert("Pagar")!}
                                    handleAmortize={() =>
                                        handleAmortize(rowData)
                                    }
                                />
                            )
                        }
                    />
                </DataTable>
            </Card>
        </>
    );
};

export default LeaseTable;
