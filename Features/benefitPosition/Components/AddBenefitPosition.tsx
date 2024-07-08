import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import benefitPositionFormSchemas from "../Validations/benefitPositionFormSchemas";

import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import benefitPositionService from "../Services/benefitPositionService";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddBenefitPosition = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = benefitPositionFormSchemas();

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        register,
        formState: { errors },
    } = useForm<IBenefitPosition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: benefitPositionService,
    });

    const onSubmit = (data: IBenefitPosition) => {
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
            header="Agregar Beneficio De Posición"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idPosition" className="w-full">
                        Posición
                    </label>
                    <GenericDropDown
                        id="idPosition"
                        isValid={!!errors.idPosition}
                        text="name"
                        useQuery={usePositionQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idPosition && (
                        <small className="p-invalid text-danger">
                            {errors.idPosition.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idConcept" className="w-full">
                        Beneficio
                    </label>
                    <GenericConceptDropDown
                        id="idConcept"
                        isValid={!!errors.idConcept}
                        setValue={setValue}
                        watch={watch}
                        code={CONCEPT_TYPE_BENEFIT}
                    />
                    {errors.idConcept && (
                        <small className="p-invalid text-danger">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="amount" className="w-full">
                        Monto
                    </label>
                    <GenericInputNumber
                        {...register("amount")}
                        id="amount"
                        isValid={!!errors.amount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.amount && (
                        <small className="p-invalid text-danger">
                            {errors.amount.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddBenefitPosition;
