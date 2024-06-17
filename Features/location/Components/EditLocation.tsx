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
import useEditLocationQuery from "../Hooks/useEditLocationQuery";
import { ILocation } from "../Types/ILocation";
import locationFormSchemas from "../Validations/LocationFormSchemas";

interface Props {
    entity: ILocation;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditLocation = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = locationFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ILocation>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditLocationQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ILocation) => {
        data.idLocation = entity.idLocation;
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
            header="Editar Ubicación"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Nombre de ubicación
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
                <div className="field">
                    <label htmlFor="address" className="w-full">
                        Dirección
                    </label>
                    <InputText
                        {...register("address")}
                        id="address"
                        defaultValue={entity?.address}
                        className={classNames({
                            "p-invalid": errors.address,
                        })}
                    />
                    {errors.address && (
                        <small className="p-invalid text-danger">
                            {errors.address.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="code" className="w-full">
                        Código
                    </label>
                    <InputText
                        {...register("code")}
                        id="code"
                        autoFocus
                        defaultValue={entity?.code}
                        className={classNames({
                            "p-invalid": errors.code,
                        })}
                    />
                    {errors.code && (
                        <small className="p-invalid text-danger">
                            {errors.code.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idZone" className="w-full">
                        Zona
                    </label>
                    <GenericDropDown
                        id="idZone"
                        isValid={!!errors.idZone}
                        text="name"
                        useQuery={useZoneQuery}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idZone}
                    />
                    {errors.idZone && (
                        <small className="p-invalid text-danger">
                            {errors.idZone.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditLocation;
