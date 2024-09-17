import { IEmployee } from '@/Features/employee/Types/IEmployee';
import { IAddEmployee } from '@/Features/payrollPay/Components/AddOrExcludeEmployee';
import { employeesForPayrollPayService } from '@/Features/payrollPay/Services/payrollPayService';
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons';
import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTableSortEvent, DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import React, { useEffect, useState } from 'react'

interface Props {
    byPayroll?: boolean;
    employees?: IAddEmployee;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const PayrollPayDetails = ({
    editEntityDialog,
    setEditEntityDialog,
    toast,
    setSubmitted,
    byPayroll,
    employees }: Props) => {
    const {
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const [list, setList] = useState<IEmployee[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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

    useEffect(() => {
        const response = async () => {
            const response = await employeesForPayrollPayService.post(employees!.employees) as IEmployee[];
            setList(response);
        }
        employees && response();
    }, [byPayroll, employees]);

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "60vw" }}
            header="Detalles de Nómina"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <div className="card">
                <div className="p-col-12">
                    <h4>Empleados</h4>
                </div>
            </div>
            <div className='card'>
                <div className="flex mb-2 gap-2 justify-content-end">
                    <Button
                        onClick={() => setActiveIndex(0)}
                        className="w-2rem h-2rem p-0" rounded
                        outlined={activeIndex !== 0} label="1" />
                    <Button onClick={() => setActiveIndex(1)}
                        className="w-2rem h-2rem p-0"
                        rounded outlined={activeIndex !== 1}
                        label="2" />
                </div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header={"Nomina Real"}>
                        <DataTable
                            value={list ?? []}
                            className="p-datatable-sm"
                            dataKey="idEmployee"
                            style={{ width: "100%", height: "100%" }}
                            paginator
                            onSort={onSort}
                            removableSort
                            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                            sortMode="single"
                            rows={5}
                            rowsPerPageOptions={[5, 10, 15]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            disabled={byPayroll}
                        >
                            <Column
                                field="idEmployee"
                                header="ID Empleado"
                                sortable
                                filter
                                filterField="doctorName"
                                filterPlaceholder="Buscar por nombre"
                                showFilterMenuOptions={false}
                                onFilterApplyClick={(e) => onFilter(e)}
                                onFilterClear={clearFilters}
                            ></Column>
                            <Column
                                field="employeeName"
                                header="Nombre del Empleado"
                                sortable
                                filter
                                filterField="doctorName"
                                filterPlaceholder="Buscar por nombre"
                                showFilterMenuOptions={false}
                                onFilterApplyClick={(e) => onFilter(e)}
                                onFilterClear={clearFilters}
                            />
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Nomina Simulada">
                    </TabPanel>
                </TabView>
            </div>
            <DialogFooterButtons hideDialog={hideDialog} />
        </Dialog>
    )
}

export default PayrollPayDetails