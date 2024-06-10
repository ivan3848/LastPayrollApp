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
import useEditCityQuery from "../Hooks/useEditCityQuery";
import { ICity } from "../Types/ICity";
import cityFormSchemas from "../Validations/CityFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";

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

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Ciudad"
            modal
            className="p-fluid"
            onHide={hideDialog}
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
                    <GenericDropDown
                        id="idRegion"
                        isValid={!!errors.idRegion}
                        text="name"
                        data={data.items}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idRegion}
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
