import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddISRBreakQuery from "../Hooks/useAddISRBreakQuery";
import IISRBreak from "../Types/IISRBreak";
import isrBreakFormSchemas from "../Validation/isrBreakFormSchemas";
import { Button } from "primereact/button";

interface Props {
    addEntityDialog: boolean;
    entity: IISRBreak;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const DeleteISRBreak = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
    entity,
}: Props) => {
    const { deleteEntityFormSchema } = isrBreakFormSchemas();

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IISRBreak>({
        resolver: zodResolver(deleteEntityFormSchema),
    });

    const addEntity = useAddISRBreakQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    console.log(entity);

    const onSubmit = (data: IISRBreak) => {
        data.ToDelete = true;
        entity = { ...entity, ...data };
        console.log(data);
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
            header="Eliminar ISR Break"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-field">
                    <h4 className="">
                        Esta seguro que desea eliminar este Registro?
                    </h4>
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

export default DeleteISRBreak;
