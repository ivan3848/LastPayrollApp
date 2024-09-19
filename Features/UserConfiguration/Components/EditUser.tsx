import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useRolQuery from "@/Features/rol/Hooks/useRolQuery";
import useEditUser from "../Hooks/useEditUser";
import userFormSchema from "../Validation/userFormSchema";
import { IInsertUser } from "../Types/IInsertUser";
import { IUser } from "../Types/IUser";
import { classNames } from "primereact/utils";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import ComponentToTest from "./ComponentToTest";

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
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<IInsertUser>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: {
            password: "",
            idRol: entity.idRol || 0,
            idEmployee: entity.idEmployee || id,
        },
    });
    const editEntity = useEditUser({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            const user = entity.users[0];

            setValue("username", user.username || "");
            setValue("idRol", user.idRol || entity.idRol);
            setValue("password", user.password);
        }
    }, [entity, setValue, id]);

    const expireQuery = useExpireSessionQuery([CACHE_KEY_USER_CONFIGURATION]);

    const onSubmit = (data: IInsertUser) => {
        data.idEmployee = id;
        data.userId = entity.users[0].userId;

        editEntity.mutateAsync(data).then(() => {
            expireQuery();
        });
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    if (!entity) {
        return <div>Loading...</div>;
    }

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "55vw" }}
            header="Editar Usuario"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="username">Nombre de Usuario</label>
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

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="password">
                                Contraseña de Usuario
                            </label>
                            <InputText
                                {...register("password")}
                                id="password"
                                autoFocus
                                className={classNames({
                                    "p-invalid": errors.password,
                                })}
                            />
                            {errors.password && (
                                <small className="p-invalid text-danger">
                                    {errors.password.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-8">
                            <label htmlFor="idRol">Rol</label>
                            <ComponentToTest
                                id="idRol"
                                isValid={!!errors.idRol}
                                text="description"
                                useQuery={useRolQuery}
                                setValue={setValue}
                                watch={watch}
                                idValueEdit={entity.idRol}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditUser;
