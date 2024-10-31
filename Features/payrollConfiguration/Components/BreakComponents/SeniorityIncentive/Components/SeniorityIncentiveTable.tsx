import usePayrollConfigurationQuery from "@/Features/payrollConfiguration/Hooks/usePayrollConfigurationQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: ISeniorityIncentiveBreak) => void;
    handleDelete: (entity: ISeniorityIncentiveBreak) => void;
}

const SeniorityIncentiveTable = ({
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
    const [bonification, setBonification] =
        useState<ISeniorityIncentiveBreak[]>();
    console.log(data.items);
    useEffect(() => {
        if (data?.items && data.items.length > 0) {
            try {
                const parseBonificationBreak: ISeniorityIncentiveBreak[] =
                    JSON.parse(
                        data.items[0].seniorityIncentiveBreak!.toString()
                    ).map((item: any, index: any) => ({
                        ...item,
                        Id: index + 1,
                    }));

                setBonification(parseBonificationBreak);
            } catch (error) {
                console.error("Error parsing Bonification:", error);
            }
        }
    }, [data]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Configurar Incentivo Vacacional</h3>

            <AddSingleButton
                handleAdd={handleAdd}
                accessName="CONFIGURACION_NOMINA"
            />
        </div>
    );

    return (
        <DataTable
            value={bonification}
            lazy
            loading={isLoading}
            className="datatable-responsive"
            emptyMessage="No hay registros para mostrar."
            header={header}
        >
            <Column
                field={"From"}
                header="Minimo de años"
                headerStyle={{ minWidth: "15rem" }}
            />
            <Column
                field={"Days"}
                header="Días a pagar"
                headerStyle={{ minWidth: "15rem" }}
            />

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<ISeniorityIncentiveBreak>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        accessName="CONFIGURACION_NOMINA"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            />
        </DataTable>
    );
};

export default SeniorityIncentiveTable;
