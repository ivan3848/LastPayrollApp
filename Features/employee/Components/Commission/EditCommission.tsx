import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import commissionFormSchema from "./Validation/commissionFormSchema";
import useEditCommission from "./Hooks/useEditCommission";
import { SelectButton } from "primereact/selectbutton";
import { ICommissionDetail } from "./Types/ICommissionDetail";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";

interface Props {
    entity: ICommissionDetail;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    id: number;
}

const EditBankEmployeeHistory = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
    id,
}: Props) => {
    const { editEntityFormSchema } = commissionFormSchema();
    let isCommissionPayroll: string[] = ["Si", "No"];
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        register,
        formState: { errors },
    } = useForm<ICommissionDetail>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditCommission({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "date") {
                    setValue(
                        key as keyof ICommissionDetail,
                        new Date(entity[key as keyof ICommissionDetail] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof ICommissionDetail,
                    entity[key as keyof ICommissionDetail]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: ICommissionDetail) => {
        data.amount = data.amount;
        data.idEmployee = id;
        data.idPayrollPay = data.idPayrollPay;
        data.idConcept = data.idConcept;
        data.date = data.date;
        data.idCommissionDetail = entity.idCommissionDetail;
        data.isCommissionPayroll = data.isCommissionPayroll;
        data.chargeDate = entity.chargeDate;
        data.idCommission = entity.idCommission;
        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "50vw" }}
            header="Editar Commission"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="amount">Cantidad</label>
                            <GenericInputNumber
                                id="amount"
                                isValid={!!errors.amount}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.amount && (
                                <small className="p-invalid text-danger">
                                    {errors.amount.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="birthDate">Fecha de pago</label>
                            <Calendar
                                id="date"
                                value={watch("date") ?? new Date()}
                                onChange={(e) => setValue("date", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.payDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.payDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isCommissionPayroll">
                                Por Nómina de Comisiones
                            </label>
                            <div>
                                <SelectButton
                                    {...register("isCommissionPayroll")}
                                    value={
                                        watch("isCommissionPayroll")
                                            ? "Si"
                                            : "No"
                                    }
                                    onChange={(e) => {
                                        setValue(
                                            "isCommissionPayroll",
                                            e.value === "Si" ? true : false
                                        );
                                    }}
                                    options={isCommissionPayroll}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="idPayrollPay" className="w-full">
                                Nómina de Pago
                            </label>
                            <GenericDropDown
                                id="idPayrollPay"
                                isValid={!!errors.idPayrollPay}
                                text="payrollName"
                                placeholder="Si quiere una comisión nueva, deje el campo vacío"
                                useQuery={usePayrollPayQuery}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.idPayrollPay && (
                                <small className="p-invalid text-danger">
                                    {errors.idPayrollPay.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_BENEFIT}
                                isValid={!!errors.idConcept}
                                watch={watch}
                                setValue={setValue}
                            />
                            {errors.idConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idConcept.message?.toString()}
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
