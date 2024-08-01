import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useZoneQuery from "@/Features/zone/Hooks/useZoneQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditPositionQuery from "../Hooks/useEditPositionQuery";
import { IPosition } from "../Types/IPosition";
import positionFormSchemas from "../Validations/PositionFormSchemas";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useOccupationQuery from "@/Features/occupation/Hooks/useOccupationQuery";
import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import usePositionQuery from "../Hooks/usePositionQuery";

interface Props {
    entity: IPosition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditPosition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = positionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPosition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditPositionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPosition) => {
        data.idPosition = entity.idPosition;
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
            header="Editar Posición"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Posición
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
                        defaultValue={entity.name}
                        className={classNames({
                            "p-invalid": errors.name,
                        })}
                    />
                    {errors.name && (
                        <small className="p-invalid text-danger">
                            {errors.name.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idDepartment" className="w-full">
                        Departamento
                    </label>
                    <GenericDropDown
                        id="idDepartment"
                        isValid={!!errors.idDepartment}
                        idValueEdit={entity.idDepartment}
                        text="name"
                        useQuery={useDepartmentQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idDepartment && (
                        <small className="p-invalid text-danger">
                            {errors.idDepartment.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="idPositionManager" className="w-full">
                        Posición superior
                    </label>
                    <GenericDropDown
                        id="idPosition"
                        idToSet="idPositionManager"
                        idValueEdit={entity.idPositionManager}
                        isValid={!!errors.idPositionManager}
                        text="name"
                        useQuery={usePositionQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idPositionManager && (
                        <small className="p-invalid text-danger">
                            {errors.idPositionManager.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idOccupation" className="w-full">
                        Ocupación (Para archivos TSS y DGT)
                    </label>
                    <GenericDropDown
                        id="idOccupation"
                        isValid={!!errors.idOccupation}
                        idValueEdit={entity.idOccupation}
                        text="name"
                        useQuery={useOccupationQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idOccupation && (
                        <small className="p-invalid text-danger">
                            {errors.idOccupation.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="minSalary" className="w-full">
                        Salario mínimo
                    </label>
                    <GenericInputNumber
                        id="minSalary"
                        currentValue={entity.minSalary}
                        isValid={!!errors.minSalary}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.minSalary && (
                        <small className="p-invalid text-danger">
                            {errors.minSalary.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="maxSalary" className="w-full">
                        Salario máximo
                    </label>
                    <GenericInputNumber
                        id="maxSalary"
                        currentValue={entity.maxSalary}
                        isValid={!!errors.maxSalary}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.maxSalary && (
                        <small className="p-invalid text-danger">
                            {errors.maxSalary.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditPosition;
