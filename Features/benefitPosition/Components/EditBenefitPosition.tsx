import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useRegionQuery from "@/Features/region/Hooks/useRegionQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditBenefitPositionQuery from "../Hooks/useEditBenefitPositionQuery";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import benefitPositionFormSchemas from "../Validations/BenefitPositionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import IParamsApi from "@/types/IParamApi";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";

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

    const { params } = useParamAllData();
    const { data: dataPosition } = usePositionQuery(params, []);
    const { data: dataConcept } = useConceptByStatusCodeQuery("PROC", []);

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
                        data={dataPosition.items}
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
                    <GenericDropDown
                        id="idConcept"
                        isValid={!!errors.idConcept}
                        text="name"
                        data={dataConcept}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idConcept}
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
