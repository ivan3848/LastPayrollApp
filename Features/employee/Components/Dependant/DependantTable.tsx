"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { IDependant } from "./Types/IDependant";
import useDependantService from "./Hooks/useDependantService";

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
    const { data, isLoading } = useDependantService(
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
                <Column field="bankName" header="Nombre" />
                <Column field="paymentMethod" header="Parentesco" />
                <Column field="accountNumber" header="Número de Cuenta" />
            </DataTable>
        </Card>
    );
};

export default DependantTable;
