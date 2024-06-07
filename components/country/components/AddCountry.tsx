import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import countryService from "../Services/countryService";
import { ICountry } from "../Types/ICountry";
import countryFormSchemas from "../Validations/CountryFormSchemas";
import useAddCountryQuery from "../Hooks/useAddCountryQuery";

const addEntityFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "El país debe tener al menos 2 caracteres" })
        .max(100, {
            message: "El país debe tener menos de 100 caracteres",
        }),
});

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddCountry = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = countryFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<ICountry>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addCountry = useAddCountryQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ICountry) => {
        addCountry.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    const addDialogFooter = (
        <div className="flex justify-content-end">
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button label="Guardar" icon="pi pi-check" type="submit" />
        </div>
    );

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar País"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        País
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
                {addDialogFooter}
            </form>
        </Dialog>
    );
};

export default AddCountry;
