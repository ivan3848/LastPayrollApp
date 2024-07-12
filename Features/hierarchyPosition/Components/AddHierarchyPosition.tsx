import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import hierarchyPositionService from "../Services/hierarchyPositionService";
import { IHierarchyPosition } from "../Types/IHierarchyPosition";
import hierarchyPositionFormSchemas from "../Validations/HierarchyPositionFormSchemas";
import { IPosition } from "@/Features/position/Types/IPosition";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    position?: IPosition;
}

const AddHierarchyPosition = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
    position,
}: Props) => {
    const { addEntityFormSchema } = hierarchyPositionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IHierarchyPosition>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: hierarchyPositionService,
    });

    const onSubmit = (data: IHierarchyPosition) => {
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
            header="Agregar Vacante"
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
                        text="departmentPosition"
                        useQuery={usePositionQuery}
                        setValue={setValue}
                        watch={watch}
                        onChange={(e) => setValue("name", e.value.name)}
                        idValueEdit={position?.idPosition}
                    />
                    {errors.idPosition && (
                        <small className="p-invalid text-danger">
                            {errors.idPosition.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Vacante
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        defaultValue={position?.name ?? watch("name")}
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
                    <label htmlFor="positionCode" className="w-full">
                        Cantidad de vacantes
                    </label>
                    <GenericInputNumber
                        {...register("vacancyAmount")}
                        id="vacancyAmount"
                        isValid={!!errors.vacancyAmount}
                        setValue={setValue}
                        watch={watch}
                        minValue={1}
                        currentValue={1}
                        format={false}
                    />
                    {errors.vacancyAmount && (
                        <small className="p-invalid text-danger">
                            {errors.vacancyAmount.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddHierarchyPosition;
