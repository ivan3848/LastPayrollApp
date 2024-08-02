import useDepartmentQuery from "@/Features/departments/Hooks/useDepartmentQuery";
import useOccupationQuery from "@/Features/occupation/Hooks/useOccupationQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddPositionQuery from "../Hooks/useAddPositionQuery";
import { IPosition } from "../Types/IPosition";
import positionFormSchemas from "../Validations/PositionFormSchemas";
import usePositionQuery from "../Hooks/usePositionQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddPosition = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = positionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IPosition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddPositionQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IPosition) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Posición"
            modal
            style={{ width: "450px" }}
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

export default AddPosition;
