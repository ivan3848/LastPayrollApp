import useRegionQuery from "@/Features/region/Hooks/useRegionQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddCityQuery from "../Hooks/useAddCityQuery";
import { ICity } from "../Types/ICity";
import cityFormSchemas from "../Validations/CityFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddCity = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = cityFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ICity>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddCityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ICity) => {
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
            header="Agregar Ciudad"
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
                        useQuery={useRegionQuery}
                        setValue={setValue}
                        watch={watch}
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

export default AddCity;
