import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddCostCenterQuery from "../Hooks/useAddCostCenterQuery";
import { ICostCenter } from "../Types/ICostCenter";
import costCenterFormSchemas from "../Validations/CostCenterFormSchemas";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddCostCenter = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = costCenterFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<ICostCenter>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddCostCenterQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: ICostCenter) => {
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
            header="Agregar Centro De Costo"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="description" className="w-full">
                        Centro de costo
                    </label>
                    <InputText
                        {...register("description")}
                        id="description"
                        autoFocus
                        className={classNames({
                            "p-invalid": errors.description,
                        })}
                    />
                    {errors.description && (
                        <small className="p-invalid text-danger">
                            {errors.description.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="accountNumber" className="w-full">
                        Número de cuenta
                    </label>
                    <InputText
                        {...register("accountNumber")}
                        id="accountNumber"
                        className={classNames({
                            "p-invalid": errors.accountNumber,
                        })}
                    />
                    {errors.accountNumber && (
                        <small className="p-invalid text-danger">
                            {errors.accountNumber.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddCostCenter;
