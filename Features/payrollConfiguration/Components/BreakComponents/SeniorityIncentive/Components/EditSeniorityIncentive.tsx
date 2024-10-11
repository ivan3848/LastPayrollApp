import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";
import seniorityIncentiveFormSchemas from "../Validation/seniorityIncentiveFormSchemas";
import InputNumberWithoutFractions from "../../Bonification/Components/InputNumberWithoutFractions";
import useEditSeniorityIncentiveBreak from "../Hooks/useEditSeniorityIncentiveBreak";

interface Props {
    entity: ISeniorityIncentiveBreak;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditSeniorityIncentive = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = seniorityIncentiveFormSchemas();
    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ISeniorityIncentiveBreak>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditSeniorityIncentiveBreak({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ISeniorityIncentiveBreak) => {
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
            header="Editar Bonificación"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="field">
                        <div>
                            <label htmlFor="From">Cantidad de años</label>
                            <InputNumberWithoutFractions
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
                            <label htmlFor="Days">Días a pagar</label>
                            <InputNumberWithoutFractions
                                id="Days"
                                isValid={!!errors.Days}
                                setValue={setValue}
                                watch={watch}
                                currentValue={entity.Days}
                            />
                            {errors.Days && (
                                <small className="p-invalid text-danger">
                                    {errors.Days.message?.toString()}
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

export default EditSeniorityIncentive;
