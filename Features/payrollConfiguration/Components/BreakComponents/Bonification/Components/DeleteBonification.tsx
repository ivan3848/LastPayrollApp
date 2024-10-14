import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import IBonificationBreak from "../Types/IBonificationBreak";
import bonificationBreakFormSchemas from "../Validations/bonificationBreakFormSchemas";
import useAddBonificationBreakQuery from "../Hooks/useAddBonificationBreakQuery";

interface Props {
    addEntityDialog: boolean;
    entity: IBonificationBreak;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const DeleteBonification = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
    entity,
}: Props) => {
    const { deleteEntityFormSchema } = bonificationBreakFormSchemas();

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IBonificationBreak>({
        resolver: zodResolver(deleteEntityFormSchema),
    });

    const addEntity = useAddBonificationBreakQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    console.log(entity);

    const onSubmit = (data: IBonificationBreak) => {
        data.ToDelete = true;
        entity = { ...entity, ...data };
        addEntity.mutate(entity);
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

export default DeleteBonification;
