import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IEmployee } from "../../Types/IEmployee";
import AddPersonInsurance from "./AddPersonInsurance";
import EditPersonInsurance from "./EditPersonInsurance";
import PersonInsuranceTable from "./PersonInsuranceTable";

interface Props {
    employee: IEmployee;
}

const PersonInsurance = ({ employee }: Props) => {
    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        addEntityDialog,
        setAddEntityDialog,
        editEntityDialog,
        setEditEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IPersonInsurance>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IPersonInsurance) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IPersonInsurance) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Seguro",
        "Descuento",
        "Monto",
        "Fecha de inicio",
        "Fecha final",
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <PersonInsuranceTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        employee={employee}
                    />
                </Suspense>
                {/* {editEntityDialog && (
                    <EditPersonInsurance
                    // setEditEntityDialog={setEditEntityDialog}
                    // setSubmitted={setSubmitted}
                    // toast={toast}
                    // entity={entity!}
                    // editEntityDialog={editEntityDialog}
                    />
                )} */}
                {addEntityDialog && (
                    <AddPersonInsurance
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        id={employee.idEmployee ?? 0}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idPersonInsurance ?? 0}
                        endpoint="employee/personInsurance"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
};

export default PersonInsurance;


