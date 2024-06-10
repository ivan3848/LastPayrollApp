import DialogFooterButtons from "@/Components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Components/Shared/Hooks/useParamFilter";
import useCityQuery from "@/Components/city/Hooks/useCityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditProvinceQuery from "../Hooks/useEditProvinceQuery";
import { IProvince } from "../Types/IProvince";
import provinceFormSchemas from "../Validations/ProvinceFormSchemas";

interface Props {
    entity: IProvince;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditProvince = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = provinceFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IProvince>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useCityQuery(params, []);

    const editEntity = useEditProvinceQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IProvince) => {
        data.idProvince = entity.idProvince;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const setDropdownValues = () => {
        setValue("idCity", entity.idCity);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Provincia"
            modal
            className="p-fluid"
            onHide={hideDialog}
            onShow={setDropdownValues}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Provincia
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
                    <label htmlFor="idCity" className="w-full">
                        Ciudad
                    </label>
                    <Dropdown
                        value={data.items.find(
                            (item) =>
                                item.idCity ===
                                (watch("idCity") ?? entity.idCity)
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idCity", e.value.idCity)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione una opción..."
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idCity,
                            },
                            "w-full"
                        )}
                    />
                    {errors.idCity && (
                        <small className="p-invalid text-danger">
                            {errors.idCity.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditProvince;
