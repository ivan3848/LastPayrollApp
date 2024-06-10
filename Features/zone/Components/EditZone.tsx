import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useSectorQuery from "@/Features/sector/Hooks/useSectorQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditZoneQuery from "../Hooks/useEditZoneQuery";
import { IZone } from "../Types/IZone";
import zoneFormSchemas from "../Validations/ZoneFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";

interface Props {
    entity: IZone;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditZone = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = zoneFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IZone>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useSectorQuery(params, []);

    const editEntity = useEditZoneQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IZone) => {
        data.idZone = entity.idZone;
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
            header="Editar Zona"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Zona
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
                    <label htmlFor="zoneCode" className="w-full">
                        Código de zona
                    </label>
                    <InputText
                        {...register("zoneCode")}
                        id="zoneCode"
                        defaultValue={entity?.zoneCode}
                        className={classNames({
                            "p-invalid": errors.zoneCode,
                        })}
                    />
                    {errors.zoneCode && (
                        <small className="p-invalid text-danger">
                            {errors.zoneCode.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idSector" className="w-full">
                        Sector
                    </label>
                    <GenericDropDown
                        id="idSector"
                        isValid={!!errors.idSector}
                        text="name"
                        data={data.items}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idSector}
                    />
                    {errors.idSector && (
                        <small className="p-invalid text-danger">
                            {errors.idSector.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditZone;
