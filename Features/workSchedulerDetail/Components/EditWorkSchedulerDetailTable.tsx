import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";

interface Props {
    details: IWorkSchedulerDetail[];
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditWorkSchedulerDetailTable = ({
    details,
    toast,
    setSubmitted,
}: Props) => {
    const dateStartTemplate = (data: IWorkSchedulerDetail) => {
        return new Date(data.start).toLocaleTimeString();
    };

    const dateEndTemplate = (data: IWorkSchedulerDetail) => {
        return new Date(data.end).toLocaleTimeString();
    };

    const [deleteEntityDialog, setDeleteEntityDialog] =
        useState<boolean>(false);
    const [idToDelete, setIdToDelete] = useState<number>(0);

    const handleDelete = (entity: IWorkSchedulerDetail) => {
        setIdToDelete(entity.idWorkSchedulerDetail!);
        setDeleteEntityDialog(true);
    };

    return (
        <div className="card">
            <DataTable value={details}>
                <Column
                    field="start"
                    header="Entrada"
                    body={dateStartTemplate}
                ></Column>
                <Column
                    field="start"
                    header="Entrada"
                    body={dateEndTemplate}
                ></Column>
                <Column field="week" header="Semana"></Column>
                <Column field="days" header="Días"></Column>

                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <Button
                            icon="pi pi-trash"
                            rounded
                            type="button"
                            severity="secondary"
                            onClick={() => handleDelete(rowData)}
                        />
                    )}
                ></Column>
            </DataTable>

            {deleteEntityDialog && (
                <DeleteEntity
                    id={idToDelete}
                    endpoint="employee/workSchedulerDetail"
                    deleteEntityDialog={deleteEntityDialog}
                    setDeleteEntityDialog={setDeleteEntityDialog}
                    setSubmitted={setSubmitted}
                    toast={toast}
                />
            )}
        </div>
    );
};

export default EditWorkSchedulerDetailTable;
