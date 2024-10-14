import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddISRBreakQuery from "../Hooks/useAddISRBreakQuery";
import IISRBreak from "../Types/IISRBreak";
import isrBreakFormSchemas from "../Validation/isrBreakFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddISRBreak = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = isrBreakFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IISRBreak>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddISRBreakQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IISRBreak) => {
        data.ToAdd = true;
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar ISR Break"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <div>
                        <label htmlFor="originalAmount">Minimo</label>
                        <GenericInputNumber
                            id="From"
                            isValid={!!errors.From}
                            setValue={setValue}
                            watch={watch}
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
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddISRBreak;
