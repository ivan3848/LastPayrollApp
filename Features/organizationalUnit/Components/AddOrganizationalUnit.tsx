import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import organizationalUnitFormSchema from "../Validation/OrganizationalUnitFormSchema";
import useAddOrganizationalUnit from "../Hooks/useAddOrganizationalUnit";
import { IOrganizationalUnit } from "../Types/IOrganizationalUnit";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddOrganizationalUnit = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = organizationalUnitFormSchema();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IOrganizationalUnit>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddOrganizationalUnit({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IOrganizationalUnit) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Unidad Organizacional"
            modal
            style={{ width: "450px" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Unidad organizacional
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

                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddOrganizationalUnit;