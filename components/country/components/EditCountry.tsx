import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ICountry } from "../Types/ICountry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import countryService from "../Services/countryService";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import countryFormSchemas from "../Validations/CountryFormSchemas";

interface Props {
    entity: ICountry;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditCountry = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
  
    const { editEntityFormSchema } = countryFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<ICountry>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useMutation({
        mutationFn: (entity: ICountry) => countryService.put(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            reset();
            setEditEntityDialog(false);
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Editado!",
                detail: "Registro editado correctamente",
                life: 3000,
            });
        },
    });

    const onSubmit = (data: ICountry) => {
        data.idCountry = entity.idCountry;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const editDialogFooter = (
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
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar País"
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
                {editDialogFooter}
            </form>
        </Dialog>
    );
};

export default EditCountry;
