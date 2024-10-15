import usePayrollConfigurationQuery from "@/Features/payrollConfiguration/Hooks/usePayrollConfigurationQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import IISRBreak from "../Types/IISRBreak";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IISRBreak) => void;
    handleDelete: (entity: IISRBreak) => void;
}

const ISRBreakTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
}: Props) => {
    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = usePayrollConfigurationQuery(
        params,
        listOfDependencies
    );
    const [isrBreak, setIsrBreak] = useState<IISRBreak[]>();

    useEffect(() => {
        if (data?.items && data.items.length > 0) {
            try {
                const parsedISRBreaks: IISRBreak[] = JSON.parse(
                    data.items[0].isrBreak.toString()
                ).map((item: any, index: any) => ({
                    ...item,
                    Id: index + 1,
                }));

                setIsrBreak(parsedISRBreaks);
            } catch (error) {
                console.error("Error parsing ISR breaks:", error);
            }
        }
    }, [data]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0"> Configurar ISR </h3>

            <Button
                label="Agregar"
                icon="pi pi-plus"
                severity="info"
                className="mr-2"
                onClick={handleAdd}
            />
        </div>
    );

    return (
        <DataTable
            value={isrBreak}
            lazy
            loading={isLoading}
            className="datatable-responsive"
            emptyMessage="No hay registros para mostrar."
            header={header}
        >
            <Column
                field={"From"}
                header="Minimo"
                headerStyle={{ minWidth: "15rem" }}
                body={(rowData) => `$${rowData.From}`}
                sortable
                filter
                filterField="absenFromteeism"
                showFilterMenuOptions={false}
            />
            <Column
                field="Fee"
                header="Cargo"
                headerStyle={{ minWidth: "15rem" }}
                body={(rowData) => `$${rowData.Fee}`}
            />

            <Column
                field="Percentage"
                header="Porcentaje"
                headerStyle={{ minWidth: "15rem" }}
                body={(rowData) => `${rowData.Percentage} %`}
            />

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IISRBreak>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            />
        </DataTable>
    );
};

export default ISRBreakTable;
