import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useWorkSchedulerDetailStore } from "../store/workSchedulerDetailStore";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";

const WorkSchedulerDetailTable = () => {
    const { data, removeWorkSchedulerDetail } = useWorkSchedulerDetailStore();

    const dateStartTemplate = (data: IWorkSchedulerDetail) => {
        return new Date(data.start).toLocaleTimeString();
    };

    const dateEndTemplate = (data: IWorkSchedulerDetail) => {
        return new Date(data.end).toLocaleTimeString();
    };

    return (
        <div className="card">
            <DataTable value={data}>
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
                            severity="secondary"
                            onClick={() =>
                                removeWorkSchedulerDetail(
                                    rowData.idWorkSchedulerDetail
                                )
                            }
                        />
                    )}
                ></Column>
            </DataTable>
        </div>
    );
};

export default WorkSchedulerDetailTable;
