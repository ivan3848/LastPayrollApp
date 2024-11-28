import { IMassiveIncrease } from "@/Features/massiveChange/Components/MassiveIncrease/Types/IMassiveIncrease";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

interface Props {
    isExistEmployee: boolean;
    setIsExistEmployee: (value: boolean) => void;
    notExistedEmployeeData: IMassiveIncrease[];
}
const NotExistedEmployee = ({
    isExistEmployee,
    setIsExistEmployee,
    notExistedEmployeeData,
}: Props) => {
    const hideDeleteEntityDialog = () => {
        setIsExistEmployee(false);
    };
    return (
        <>
            <Dialog
                visible={isExistEmployee}
                style={{ width: "450px" }}
                header="Codigos de empleados no existentes"
                onHide={hideDeleteEntityDialog}
                modal
            >
                {
                    <DataTable
                        id="Excel-Table"
                        value={notExistedEmployeeData}
                        lazy
                        paginator
                        removableSort
                        sortMode="single"
                        totalRecords={notExistedEmployeeData?.length}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        emptyMessage="No hay registros para mostrar."
                        rowsPerPageOptions={[5, 10, 25]}
                        rows={notExistedEmployeeData.length}
                        currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
                    >
                        {
                            <Column
                                field="idEmployee"
                                header="Codigo"
                                headerStyle={{ minWidth: "15rem" }}
                                filterField="idEmployee"
                                showFilterMenuOptions={false}
                            ></Column>
                        }
                    </DataTable>
                }
            </Dialog>
        </>
    );
};

export default NotExistedEmployee;
