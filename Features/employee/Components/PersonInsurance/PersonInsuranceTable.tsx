"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { IEmployee } from "../../Types/IEmployee";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useGetPersonInsuranceQueryByIdEmployee from "./Hooks/useGetPersonInsuranceQueryByIdEmployee";

interface Props {
    submitted: boolean;
    handleDelete: (entity: IPersonInsurance) => void;
    handleEdit: (entity: IPersonInsurance) => void;
    handleAdd: () => void;
    employee: IEmployee;
}

const PersonInsuranceTable: React.FC<Props> = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    employee,
}) => {
    const { params } = useParamFilter();
    const listOfDependencies: boolean[] = [submitted];

    const { data } = useGetPersonInsuranceQueryByIdEmployee(
        params,
        listOfDependencies,
        employee.idEmployee!
    );

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Seguros</h3>
            <AddButton
                handleAdd={handleAdd}
                entity={employee.idEmployee}
                accessName="SEGUROS"
            />
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

    const formatPercentage = (value: number) => {
        return `${value}%`;
    };

    const formatMoney = (value: number) => {
        return `RD$${value}`;
    };

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idPersonInsurance"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column
                    key={"firstName"}
                    field="firstName"
                    header="Nombre"
                    body={(rowData: IPersonInsurance) => {
                        return `${rowData.person?.firstName} ${rowData.person?.firstLastName}`;
                    }}
                />

                <Column
                    key={"idConcept"}
                    field="concept"
                    header="Seguro"
                    body={(rowData: IPersonInsurance) => rowData.concept}
                />

                <Column
                    key="percentDiscount"
                    field="percentDiscount"
                    header="Descuento"
                    body={(rowData: IPersonInsurance) =>
                        formatPercentage(rowData.percentDiscount)
                    }
                />
                <Column
                    key="amount"
                    field="amount"
                    header="Monto"
                    body={(rowData: IPersonInsurance) =>
                        formatMoney(rowData.amount)
                    }
                />
                <Column
                    key="startDate"
                    field="startDate"
                    header="Fecha de Inicio"
                    body={(rowData: IPersonInsurance) =>
                        formatDate(rowData.startDate?.toString()!)
                    }
                />
                <Column
                    key="endDate"
                    field="endDate"
                    header="Fecha final"
                    body={(rowData: IPersonInsurance) =>
                        formatDate(rowData.endDate?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData: IPersonInsurance) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            accessName="SEGUROS"
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default PersonInsuranceTable;
