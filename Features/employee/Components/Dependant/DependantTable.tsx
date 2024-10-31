"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { IDependant } from "./Types/IDependant";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useDependantByIdEmployee from "./Hooks/useDependantByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IDependant) => void;
    handleDelete: (entity: IDependant) => void;
    handleAdd: () => void;
}

const DependantTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useDependantByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Dependientes</h3>

            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="DEPENDIENTES"
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
                className="p-datatable-md"
                dataKey="idDependant"
                rows={5}
            >
                <Column field="fullName" header="Nombre" />
                <Column field="relationship" header="Relación" />

                <Column
                    header="Acciones"
                    body={(rowData: IDependant) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            accessName="DEPENDIENTES"
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default DependantTable;
