import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import useEditEmployeeQuery from "@/Features/employee/Hooks/useEditEmployeeQuery";
import { Calendar } from "primereact/calendar";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { InputText } from "primereact/inputtext";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
import { Dialog } from "primereact/dialog";
import { IDependant } from "./Types/IDependant";
import dependantFormSchema from "./Validation/DependantFormSchema";
import useDependant from "./Hooks/useDependant";
import { IInsertDependant } from "./Types/IInsertDependant";
import { InputMask } from "primereact/inputmask";
import useEditDependant from "./Hooks/useEditDependant";
import { IPerson } from "@/Features/person/Types/IPerson";

interface Props {
    entity: IDependant;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
    person?: IPerson;
}

const EditBankEmployeeHistory = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    id,
}: Props) => {
    const { editEntityFormSchema } = dependantFormSchema();
    const { params } = useParamFilter();

    const listOfDependencies: boolean[] = [true];
    const { data, isLoading } = useDependant(params, listOfDependencies);

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
    } = useForm<IInsertDependant>({
        resolver: zodResolver(editEntityFormSchema),
    });
    const editEntity = useEditDependant({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IDependant) => {
        data.idEmployee = id;
        data.idPerson = entity.idPerson;
        data.idDependant = entity.idDependant;
        data.person = { ...data };
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
                            <label htmlFor="identification">
                                Identificación
                            </label>
                            <InputText
                                {...register("identification")}
                                id="identification"
                                defaultValue={entity.identification}
                            />
                            {errors.identification && (
                                <small className="p-invalid text-red-500">
                                    {errors.identification.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="firstName">Primer Nombre</label>
                            <InputText
                                id="firstName"
                                type="text"
                                {...register("firstName")}
                                defaultValue={entity.firstName}
                            />
                            {errors.firstName && (
                                <small className="p-invalid text-red-500">
                                    {errors.firstName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="middleName">Segundo Nombre</label>
                            <InputText
                                id="middleName"
                                type="text"
                                {...register("middleName")}
                                defaultValue={entity?.middleName}
                            />
                            {errors.middleName && (
                                <small className="p-invalid text-red-500">
                                    {errors.middleName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="firstLastName">
                                Primer Apellido
                            </label>
                            <InputText
                                id="firstLastName"
                                type="text"
                                {...register("firstLastName")}
                                defaultValue={entity?.lastName}
                            />
                            {errors.firstLastName && (
                                <small className="p-invalid text-red-500">
                                    {errors.firstLastName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="secondLastName">
                                Segundo Apellido
                            </label>
                            <InputText
                                id="secondLastName"
                                type="text"
                                {...register("secondLastName")}
                                defaultValue={entity?.secondLastName}
                            />
                            {errors.secondLastName && (
                                <small className="p-invalid text-red-500">
                                    {errors.secondLastName.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="birthDate">
                                Fecha De Nacimiento
                            </label>
                            <Calendar
                                id="birthDate"
                                value={new Date(entity.birthDate)}
                                onChange={(e) =>
                                    setValue("birthDate", e.value!)
                                }
                                showIcon
                                showButtonBar
                            />
                            {errors.birthDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.birthDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label
                                htmlFor="idStatusRelationship"
                                className="block mt-1"
                            >
                                Relación
                            </label>
                            <GenericStatusDropDown
                                id="idStatusRelationship"
                                isValid={!!errors.idStatusRelationship}
                                setValue={setValue}
                                watch={watch}
                                tableName={TABLE_NAME_RELATIONSHIP}
                            />
                            {errors.idStatusRelationship && (
                                <small className="text-red-600">
                                    {errors.idStatusRelationship.message?.toString()}
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

export default EditBankEmployeeHistory;
