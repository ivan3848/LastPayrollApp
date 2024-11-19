import usePayrollConfigurationQuery from "@/Features/payrollConfiguration/Hooks/usePayrollConfigurationQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import IBonificationBreak from "../Types/IBonificationBreak";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IBonificationBreak) => void;
    handleDelete: (entity: IBonificationBreak) => void;
}

const BonificationTabe = ({
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
    const [bonification, setBonification] = useState<IBonificationBreak[]>();

    useEffect(() => {
        if (data?.items && data.items.length > 0) {
            try {
                const parseBonificationBreak: IBonificationBreak[] = JSON.parse(
                    data.items[0].bonificationBreak!.toString()
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
            <h3 className="m-0">Configurar Bonificación</h3>
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
                    <ActionTableTemplate<IBonificationBreak>
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

export default BonificationTabe;
