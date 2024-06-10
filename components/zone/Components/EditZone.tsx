import DialogFooterButtons from "@/Components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Components/Shared/Hooks/useParamFilter";
import useCountryQuery from "@/Components/country/Hooks/useCountryQuery";
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
import useSectorQuery from "@/Components/sector/Hooks/useSectorQuery";

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

    const setDropdownValues = () => {
        setValue("idSector", entity.idSector);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Zona"
            modal
            className="p-fluid"
            onHide={hideDialog}
            onShow={setDropdownValues}
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
                    <Dropdown
                        value={data.items.find(
                            (item) =>
                                item.idSector ===
                                (watch("idSector") ?? entity.idSector)
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idSector", e.value.idSector)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione una opción..."
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idSector,
                            },
                            "w-full"
                        )}
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
