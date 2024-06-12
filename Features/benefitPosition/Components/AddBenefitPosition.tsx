import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useAddBenefitPositionQuery from "../Hooks/useAddBenefitPositionQuery";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import benefitPositionFormSchemas from "../Validations/benefitPositionFormSchemas";

import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";

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
        formState: { errors },
    } = useForm<IBenefitPosition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddBenefitPositionQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
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
                        Concepto del beneficio
                    </label>
                    <GenericConceptDropDown
                        id="idConcept"
                        isValid={!!errors.idConcept}
                        text="name"
                        useQuery={useConceptByStatusCodeQuery}
                        setValue={setValue}
                        watch={watch}
                        code="PROC"
                    />
                    {errors.idConcept && (
                        <small className="p-invalid text-danger">
                            {errors.idConcept.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddBenefitPosition;
