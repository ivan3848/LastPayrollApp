import useCountryQuery from "@/components/country/Hooks/useCountryQuery";
import DialogFooterButtons from "@/components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/components/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddZoneQuery from "../Hooks/useAddZoneQuery";
import { IZone } from "../Types/IZone";
import zoneFormSchemas from "../Validations/ZoneFormSchemas";
import useSectorQuery from "@/components/sector/Hooks/useSectorQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddZone = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = zoneFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IZone>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useSectorQuery(params, []);

    const addEntity = useAddZoneQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IZone) => {
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
            header="Agregar Zona"
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
                            (item) => item.idSector === watch("idSector")
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

export default AddZone;
