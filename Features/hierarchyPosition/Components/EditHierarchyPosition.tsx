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
import { IHierarchyPosition } from "../Types/IHierarchyPosition";
import hierarchyPositionFormSchemas from "../Validations/HierarchyPositionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useEditEntityQuery from "@/Features/Shared/Hooks/useEditEntityQuery";
import hierarchyPositionService from "../Services/hierarchyPositionService";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";

interface Props {
    entity: IHierarchyPosition;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditHierarchyPosition = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = hierarchyPositionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IHierarchyPosition>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditEntityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
        service: hierarchyPositionService,
    });

    const onSubmit = (data: IHierarchyPosition) => {
        data.idHierarchyPosition = entity.idHierarchyPosition;
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
            header="Editar Vacante"
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
                        isDisabled
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
                        autoFocus
                        defaultValue={entity?.name}
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
                {/* <div className="field">
                    <label htmlFor="positionCode" className="w-full">
                        Código
                    </label>
                    <InputText
                        {...register("positionCode")}
                        id="positionCode"
                        defaultValue={entity?.positionCode}
                        className={classNames({
                            "p-invalid": errors.positionCode,
                        })}
                    />
                    {errors.positionCode && (
                        <small className="p-invalid text-danger">
                            {errors.positionCode.message?.toString()}
                        </small>
                    )}
                </div> */}
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditHierarchyPosition;
