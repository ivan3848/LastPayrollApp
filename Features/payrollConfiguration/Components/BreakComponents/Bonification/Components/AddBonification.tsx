import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddBonificationBreakQuery from "../Hooks/useAddBonificationBreakQuery";
import IBonificationBreak from "../Types/IBonificationBreak";
import bonificationBreakFormSchemas from "../Validations/bonificationBreakFormSchemas";
import InputNumberWithoutFractions from "./InputNumberWithoutFractions";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddBonification = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = bonificationBreakFormSchemas();

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IBonificationBreak>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddBonificationBreakQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBonificationBreak) => {
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
            header="Agregar Bonificación"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <div>
                        <label htmlFor="From">Cantidad de años</label>
                        <InputNumberWithoutFractions
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
                        <label htmlFor="Days">Días a pagar</label>

                        <InputNumberWithoutFractions
                            id="Days"
                            isValid={!!errors.Days}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.Days && (
                            <small className="p-invalid text-danger">
                                {errors.Days.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddBonification;
