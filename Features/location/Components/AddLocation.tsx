import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useZoneQuery from "@/Features/zone/Hooks/useZoneQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddLocationQuery from "../Hooks/useAddLocationQuery";
import { ILocation } from "../Types/ILocation";
import locationFormSchemas from "../Validations/LocationFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddLocation = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = locationFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ILocation>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddLocationQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ILocation) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Ubicación"
            modal
            style={{ width: "450px" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Ubicación
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
                    <label htmlFor="address" className="w-full">
                        Dirección
                    </label>
                    <InputText
                        {...register("address")}
                        id="address"
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

export default AddLocation;
