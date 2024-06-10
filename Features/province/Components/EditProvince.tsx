import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useCityQuery from "@/Features/city/Hooks/useCityQuery";
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
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";

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

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar Provincia"
            modal
            className="p-fluid"
            onHide={hideDialog}
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
                    <GenericDropDown
                        id="idCity"
                        isValid={!!errors.idCity}
                        text="name"
                        data={data.items}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idCity}
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
