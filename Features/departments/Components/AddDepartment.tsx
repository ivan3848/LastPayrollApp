import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import departmentFormSchemas from "../Validation/DepartmentFormSchema";
import { IDepartment } from "../Types/IDepartment";
import useAddDepartmentQuery from "../Hooks/useAddDepartmentQuery";
import useCostCenterQuery from "@/Features/costCenter/Hooks/useCostCenterQuery";
import useOrganizationalUnitQuery from "@/Features/organizationalUnit/Hooks/useOrganizationalUnitQuery";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import useDepartmentQuery from "../Hooks/useDepartmentQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddDepartment = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = departmentFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IDepartment>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddDepartmentQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IDepartment) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Departamento"
            modal
            style={{ width: "450px" }}
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
                    <label htmlFor="idCostCenter" className="w-full">
                        Centro de costo
                    </label>
                    <GenericDropDown
                        id="idCostCenter"
                        isValid={!!errors.idCostCenter}
                        text="description"
                        setValue={setValue}
                        watch={watch}
                        useQuery={useDepartmentQuery}
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

export default AddDepartment;
