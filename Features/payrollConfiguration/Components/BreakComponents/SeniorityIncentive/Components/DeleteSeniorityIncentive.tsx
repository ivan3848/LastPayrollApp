import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";
import seniorityIncentiveFormSchemas from "../Validation/seniorityIncentiveFormSchemas";
import useAddSeniorityIncentiveBreakQuery from "../Hooks/useAddSeniorityIncentiveBreakQuery";

interface Props {
    addEntityDialog: boolean;
    entity: ISeniorityIncentiveBreak;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const DeleteSeniorityIncentive = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
    entity,
}: Props) => {
    const { deleteEntityFormSchema } = seniorityIncentiveFormSchemas();

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ISeniorityIncentiveBreak>({
        resolver: zodResolver(deleteEntityFormSchema),
    });

    const deleteEntity = useAddSeniorityIncentiveBreakQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ISeniorityIncentiveBreak) => {
        data.ToDelete = true;
        entity = { ...entity, ...data };
        deleteEntity.mutate(entity);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Eliminar Bonificación"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-field">
                    <h4>Esta seguro que desea eliminar este Registro?</h4>
                </div>
                <div
                    className="flex justify-content-end mt-3"
                    style={{ width: "55%", gap: "5px", marginLeft: "auto" }}
                >
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        raised
                        type="button"
                        onClick={hideDialog}
                        severity="danger"
                    />
                    <Button
                        label="Eliminar"
                        severity="warning"
                        icon="pi pi-check"
                        type="submit"
                    />
                </div>
            </form>
        </Dialog>
    );
};

export default DeleteSeniorityIncentive;
