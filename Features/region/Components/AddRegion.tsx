import useCountryQuery from "@/Features/country/Hooks/useCountryQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddRegionQuery from "../Hooks/useAddRegionQuery";
import { IRegion } from "../Types/IRegion";
import regionFormSchemas from "../Validations/RegionFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddRegion = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = regionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IRegion>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddRegionQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IRegion) => {
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
            header="Agregar Región"
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

export default AddRegion;
