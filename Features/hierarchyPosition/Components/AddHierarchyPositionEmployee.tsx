import { IPosition } from "@/Features/position/Types/IPosition";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import hierarchyPositionService from "../Services/hierarchyPositionService";
import { IHierarchyPosition } from "../Types/IHierarchyPosition";
import hierarchyPositionFormSchemas from "../Validations/HierarchyPositionFormSchemas";

interface Props {
    addEntityDialog: boolean;
    toast: React.MutableRefObject<any>;
    position?: IPosition;
    setAddEntityDialog: (value: boolean) => void;
    setPositionValue: UseFormSetValue<any>;
}

const AddHierarchyPositionEmployee = ({
    addEntityDialog,
    toast,
    position,
    setAddEntityDialog,
    setPositionValue,
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
        reset,
        service: hierarchyPositionService,
    });

    useEffect(() => {
        if (position) {
            setValue("name", position.name);
            setValue("idPosition", position.idPosition!);
        }
    }, [position, setValue]);

    const onSubmit = async (data: IHierarchyPosition) => {
        await addEntity.mutateAsync(data).then((response) => {
            setPositionValue(
                "idHierarchyPosition",
                response?.idHierarchyPosition!
            );
        });
        setAddEntityDialog(false);
        return;
    };

    const hideDialog = (isCancel: boolean) => {
        setAddEntityDialog(false);
        isCancel && setPositionValue("idPosition", undefined);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar Vacante"
            modal
            className="p-fluid"
            onHide={() => hideDialog(false)}
        >
            <h6>No hay vacantes para esta posición, desea agregar alguna?</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                <DialogFooterButtons hideDialog={() => hideDialog(true)} />
            </form>
        </Dialog>
    );
};

export default AddHierarchyPositionEmployee;
