import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import useEditBenefitPositionQuery from "../Hooks/useEditBenefitPositionQuery";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import benefitPositionFormSchemas from "../Validations/BenefitPositionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";

interface Props {
    entity: IBenefitPosition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditBenefitPosition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = benefitPositionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IBenefitPosition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditBenefitPositionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IBenefitPosition) => {
        data.idBenefitPosition = entity.idBenefitPosition;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Beneficio De Posición"
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
                        idValueEdit={entity.idPosition}
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
                        idValueEdit={entity.idConcept}
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

export default EditBenefitPosition;
