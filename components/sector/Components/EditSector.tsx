import DialogFooterButtons from "@/Components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Components/Shared/Hooks/useParamFilter";
import useProvinceQuery from "@/Components/province/Hooks/useProvinceQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditSectorQuery from "../Hooks/useEditSectorQuery";
import { ISector } from "../Types/ISector";
import sectorFormSchemas from "../Validations/SectorFormSchemas";

interface Props {
    entity: ISector;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditSector = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = sectorFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ISector>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useProvinceQuery(params, []);

    const editEntity = useEditSectorQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ISector) => {
        data.idSector = entity.idSector;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const setDropdownValues = () => {
        setValue("idProvince", entity.idProvince);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Sector"
            modal
            className="p-fluid"
            onHide={hideDialog}
            onShow={setDropdownValues}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Sector
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
                    <label htmlFor="idProvince" className="w-full">
                        Provincia
                    </label>
                    <Dropdown
                        value={data.items.find(
                            (item) =>
                                item.idProvince ===
                                (watch("idProvince") ?? entity.idProvince)
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idProvince", e.value.idProvince)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione una opción..."
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idProvince,
                            },
                            "w-full"
                        )}
                    />
                    {errors.idProvince && (
                        <small className="p-invalid text-danger">
                            {errors.idProvince.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditSector;
