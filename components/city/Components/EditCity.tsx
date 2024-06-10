import DialogFooterButtons from "@/Components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Components/Shared/Hooks/useParamFilter";
import useRegionQuery from "@/Components/region/Hooks/useRegionQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditCityQuery from "../Hooks/useEditCityQuery";
import { ICity } from "../Types/ICity";
import cityFormSchemas from "../Validations/CityFormSchemas";

interface Props {
    entity: ICity;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditCity = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = cityFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ICity>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useRegionQuery(params, []);

    const editEntity = useEditCityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ICity) => {
        data.idCity = entity.idCity;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const setDropdownValues = () => {
        setValue("idRegion", entity.idRegion);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Ciudad"
            modal
            className="p-fluid"
            onHide={hideDialog}
            onShow={setDropdownValues}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Ciudad
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
                    <label htmlFor="idRegion" className="w-full">
                        Región
                    </label>
                    <Dropdown
                        value={data.items.find(
                            (item) =>
                                item.idRegion ===
                                (watch("idRegion") ?? entity.idRegion)
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idRegion", e.value.idRegion)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione una opción..."
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idRegion,
                            },
                            "w-full"
                        )}
                    />
                    {errors.idRegion && (
                        <small className="p-invalid text-danger">
                            {errors.idRegion.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditCity;
