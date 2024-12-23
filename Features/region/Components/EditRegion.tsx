import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useCountryQuery from "@/Features/country/Hooks/useCountryQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditRegionQuery from "../Hooks/useEditRegionQuery";
import { IRegion } from "../Types/IRegion";
import regionFormSchemas from "../Validations/RegionFormSchemas";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";

interface Props {
    entity: IRegion;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditRegion = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = regionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IRegion>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditRegionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IRegion) => {
        data.idRegion = entity.idRegion;
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
            header="Editar Región"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Región
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
                    <label htmlFor="idCountry" className="w-full">
                        País
                    </label>
                    <GenericDropDown
                        id="idCountry"
                        isValid={!!errors.idCountry}
                        text="name"
                        useQuery={useCountryQuery}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idCountry}
                    />
                    {errors.idCountry && (
                        <small className="p-invalid text-danger">
                            {errors.idCountry.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditRegion;
