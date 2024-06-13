import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import useZoneQuery from "@/Features/zone/Hooks/useZoneQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { IDepartment } from "../Types/IDepartment";
import departmentFormSchemas from "../Validation/DepartmentFormSchema";
import useEditDepartmentQuery from "../Hooks/useEditDepartmentQuery";
import useCostCenterQuery from "@/Features/costCenter/Hooks/useCostCenterQuery";
import useOrganizationalUnitQuery from "@/Features/organizationalUnit/Hooks/useOrganizationalUnitQuery";

interface Props {
    entity: IDepartment;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditLocation = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = departmentFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IDepartment>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditDepartmentQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IDepartment) => {
        data.idDepartment = entity.idDepartment;
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
            header="Editar Departamento"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Departamento
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
                    <label htmlFor="idCosCenter" className="w-full">
                        Centro De Costo
                    </label>
                    <GenericDropDown
                        id="idCostCenter"
                        isValid={!!errors.idCostCenter}
                        text="name"
                        useQuery={useCostCenterQuery}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idCostCenter}
                    />
                    {errors.idCostCenter && (
                        <small className="p-invalid text-danger">
                            {errors.idCostCenter.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idOrganizationalUnit" className="w-full">
                        Unidad Organizacional
                    </label>
                    <GenericDropDown
                        id="idOrganizationalUnit"
                        isValid={!!errors.idOrganizationalUnit}
                        text="name"
                        useQuery={useOrganizationalUnitQuery}
                        setValue={setValue}
                        watch={watch}
                        idValueEdit={entity.idOrganizationalUnit}
                    />
                    {errors.idOrganizationalUnit && (
                        <small className="p-invalid text-danger">
                            {errors.idOrganizationalUnit.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditLocation;
