import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import IISRBreak from "../Types/IISRBreak";
import isrBreakFormSchemas from "../Validation/isrBreakFormSchemas";
import useEditISRBreakQuery from "../Hooks/useEditISRBreakQuery";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";

interface Props {
    entity: IISRBreak;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditISRBreak = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = isrBreakFormSchemas();
    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IISRBreak>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditISRBreakQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IISRBreak) => {
        data.ToUpdate = true;
        entity = { ...entity, ...data };
        editEntity.mutate(entity);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "30vw" }}
            header="Editar Break"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div>
                        <div>
                            <label htmlFor="From">Minimo</label>
                            <GenericInputNumber
                                id="From"
                                isValid={!!errors.From}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.From}
                            />
                            {errors.From && (
                                <small className="p-invalid text-danger">
                                    {errors.From.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div>
                            <label htmlFor="Fee">Cargo</label>
                            <GenericInputNumber
                                id="Fee"
                                isValid={!!errors.Fee}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.Fee ? entity.Fee : 0}
                            />
                            {errors.Fee && (
                                <small className="p-invalid text-danger">
                                    {errors.Fee.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div>
                            <label htmlFor="Percentage">Porcentaje</label>
                            <GenericInputNumber
                                id="Percentage"
                                isValid={!!errors.Percentage}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.Percentage}
                                prefix=""
                                suffix=" %"
                            />
                            {errors.Percentage && (
                                <small className="p-invalid text-danger">
                                    {errors.Percentage.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditISRBreak;
