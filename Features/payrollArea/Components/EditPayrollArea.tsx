import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useEditEntityQuery from "@/Features/Shared/Hooks/useEditEntityQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { IPayrollArea } from "../Types/IPayrollArea";
import payrollAreaService from "../Services/payrollAreaService";
import PayrollAreaFormSchemas from "../Validations/PayrollAreaFormSchemas";

interface Props {
    entity: IPayrollArea;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditPayrollArea = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = PayrollAreaFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPayrollArea>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const editEntity = useEditEntityQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
        service: payrollAreaService,
    });

    const onSubmit = (data: IPayrollArea) => {
        data.idPayrollArea = entity.idPayrollArea;
        data.name = entity.name;
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
            header="Asignar clave"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Nómina
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        disabled
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
                    <label htmlFor="payrollCode" className="w-full">
                        Clave
                    </label>
                    <InputText
                        {...register("payrollCode")}
                        id="payrollCode"
                        autoFocus
                        defaultValue={entity?.payrollCode}
                        className={classNames({
                            "p-invalid": errors.name,
                        })}
                    />
                    {errors.payrollCode && (
                        <small className="p-invalid text-danger">
                            {errors.payrollCode.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditPayrollArea;
