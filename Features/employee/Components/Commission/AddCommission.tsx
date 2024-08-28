import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { Calendar } from "primereact/calendar";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import commissionFormSchema from "./Validation/commissionFormSchema";
import { commissionServiceToInsert } from "./Services/commissionService";
import { ICommission } from "./Types/ICommission";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import { SelectButton } from "primereact/selectbutton";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddCommission = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = commissionFormSchema();
    let isCommissionPayroll: string[] = ["Si", "No"];
    const commission = useState<ICommission>();
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ICommission>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: commissionServiceToInsert,
    });

    const onSubmit = (data: ICommission) => {
        console.log(data);
        data.idEmployee = id;
        data.description = data.description;
        data.idPayrollPay = data.idPayrollPay;
        data.payDate = data.payDate;
        data.isExcecuted = false;
        data.conceptCode = data.conceptCode;
        data.commissionDetail = [{ ...data }];
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Comisión"
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
                                id="payDate"
                                onChange={(e) => setValue("payDate", e.value!)}
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
                                Por Nomina de Comisiones
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

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="Description">Description</label>
                            <InputText
                                id="description"
                                type="text"
                                {...register("description")}
                                defaultValue={
                                    "Dejar vacio si no hay descripcion"
                                }
                            />
                            {errors.description && (
                                <small className="p-invalid text-red-500">
                                    {errors.description.message?.toString()}
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

export default AddCommission;
