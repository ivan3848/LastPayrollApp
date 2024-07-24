"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { IEmployee } from "../../Types/IEmployee";
import GenericTableCheck from "@/Features/Shared/Components/GenericTableCheck";

interface Props {
    employee: IEmployee;
    submitted: boolean;
    handleEdit: (entity: IPersonInsurance) => void;
    handleDelete: (entity: IPersonInsurance) => void;
    handleAdd: () => void;
}

const PersonInsuranceTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    employee,
}: Props) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];
    // const { data, isLoading } = useBankEmployeeHistoryByIdEmployee(
    //     params,
    //     listOfDependencies,
    //     employee
    // );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Seguros</h3>
            <AddButton handleAdd={handleAdd} entity={employee.idEmployee} />
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

    return (
        <Card className="m-2">
            <DataTable
                // value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idPersonInsurance"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column field="IdConcept" header="Seguro" />
                <Column field="PercentDiscount" header="Descuento" />
                <Column field="Amount" header="Monto" />
                <Column
                    field="StartDate"
                    header="Fecha de Inicio"
                    body={(rowData: IPersonInsurance) =>
                        formatDate(rowData.StartDate?.toString()!)
                    }
                />
                <Column
                    field="EndDate"
                    header="Fecha final"
                    body={(rowData: IPersonInsurance) =>
                        formatDate(rowData.EndDate.toString())
                    }
                />
            </DataTable>
        </Card>
    );
};

export default PersonInsuranceTable;
