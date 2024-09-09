import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { IPerson } from "@/Features/person/Types/IPerson";
import userFormSchema from "../Validation/userFormSchema";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useRolQuery from "@/Features/rol/Hooks/useRolQuery";
import { classNames } from "primereact/utils";
import useEditUser from "../Hooks/useEditUser";
import { IInsertUser } from "../Types/IInsertUser";
import useUserQuery from "../Hooks/useUserQuery";
import { IUser } from "../Types/IUser";

interface Props {
    entity: IUser;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
}

const EditUser = ({
    setEditEntityDialog,
    setSubmitted,
    toast,
    entity,
    editEntityDialog,
    id,
}: Props) => {
    const { editEntityFormSchema } = userFormSchema();
    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [true];
    const { data, isLoading } = useUserQuery(params, listOfDependencies);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IInsertUser>({
        resolver: zodResolver(editEntityFormSchema),
    });
    const editEntity = useEditUser({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IInsertUser) => {
        data.idRol = data.idRol;
        data.idEmployee = id;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Dependiente"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="userName">Nombre de Usuario</label>
                            <InputText
                                {...register("username")}
                                id="username"
                                autoFocus
                                className={classNames({
                                    "p-invalid": errors.username,
                                })}
                            />
                            {errors.username && (
                                <small className="p-invalid text-danger">
                                    {errors.username.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="name" className="w-full">
                                username
                            </label>
                            <InputText
                                {...register("username")}
                                id="username"
                                autoFocus
                                defaultValue={entity?.username}
                                className={classNames({
                                    "p-invalid": errors.username,
                                })}
                            />
                            {errors.username && (
                                <small className="p-invalid text-danger">
                                    {errors.username.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="idCosCenter" className="w-full">
                                Centro De Costo
                            </label>
                            <GenericDropDown
                                id="idCostCenter"
                                isValid={!!errors.idRol}
                                text="name"
                                useQuery={useRolQuery}
                                setValue={setValue}
                                watch={watch}
                                idValueEdit={entity.idRol}
                            />
                            {errors.idRol && (
                                <small className="p-invalid text-danger">
                                    {errors.idRol.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditUser;
