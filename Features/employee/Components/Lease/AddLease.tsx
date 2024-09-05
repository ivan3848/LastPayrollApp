import { CONCEPT_TYPE_LEASE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { addLeaseService } from "./Services/LeaseService";
import LeaseFormSchema from "./Validation/LeaseFormSchema";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { TabPanel, TabView } from "primereact/tabview";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_RECURRENCY } from "@/constants/StatusTableName";
import { ToggleButton } from "primereact/togglebutton";
import { useRef, useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddLease = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = LeaseFormSchema();
    const { data: values } = useConceptByStatusCodeQuery(
        CONCEPT_TYPE_LEASE,
        []
    );

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ILease>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addLeaseService,
    });

    const onSubmit = (data: ILease) => {
        data.idEmployee = id;
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    function FeeLease() {
        //cuota mensual
        const monthlyFee = watch("totalAmount", 0);
        if (!isNaN(monthlyFee) && monthlyFee > 0) 
            console.log(monthlyFee);
    }
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "85vw", overflow: "hidden" }}
            header="Agregar préstamos"
            modal
            maximizable
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px" }}>
                <div className="col-12" style={{ margin: "20px" }}>
                    <div
                        className="p-fluid formgrid grid"
                        style={{ margin: "20px" }}
                    >
                        <div className="field col-12 md:col-6">
                            <label htmlFor="idConcept">Tipo</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_LEASE}
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

                        <div className="field col-12 md:col-6">
                            <label htmlFor="requestDate">
                                Fecha de aprobación
                            </label>
                            <Calendar
                                id="requestDate"
                                onChange={(e) =>
                                    setValue("requestDate", e.value!)
                                }
                                showIcon
                                showButtonBar
                            />
                            {errors.requestDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.requestDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="startDate">
                                Fecha de inicio de descuento
                            </label>
                            <Calendar
                                id="startDate"
                                onChange={(e) =>
                                    setValue("startDate", e.value!)
                                }
                                showIcon
                                showButtonBar
                            />
                            {errors.startDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.startDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="endDate">
                                Fecha de finalización de descuento
                            </label>
                            <Calendar
                                id="endDate"
                                onChange={(e) => setValue("endDate", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.endDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.endDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="idBank" className="block">
                                Entidad financiera
                            </label>
                            <GenericDropDown
                                id="idBank"
                                isValid={!!errors.idBank}
                                text="name"
                                useQuery={useBankQuery}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.idBank && (
                                <small className="text-red-600">
                                    {errors.idBank.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label
                                htmlFor="idRecurrencyStatus"
                                className="w-full"
                            >
                                Recurrencia de pago
                            </label>
                            <GenericStatusDropDown
                                id="idRecurrencyStatus"
                                isValid={!!errors.idRecurrencyStatus}
                                setValue={setValue}
                                watch={watch}
                                isFocus={true}
                                tableName={TABLE_NAME_RECURRENCY}
                            />
                            {errors.idRecurrencyStatus && (
                                <small className="p-invalid text-danger">
                                    {errors.idRecurrencyStatus.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="fees">Cantidad de cuotas</label>
                            <input
                                {...register("fees", {
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                id="fees"
                                type="number"
                                className="p-inputtext p-component"
                                placeholder="Se calcula al guardar el préstamo"
                                disabled
                            />
                            {errors.fees && (
                                <small className="p-invalid text-red-500">
                                    {errors.fees.message?.toString()}
                                </small>
                            )}
                            <div />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="totalAmount">Monto total</label>
                            <input
                                {...register("totalAmount", {
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                id="totalAmount"
                                type="number"
                                onChangeCapture={FeeLease}
                                className="p-inputtext p-component"
                                placeholder="0.00"
                            />
                            {errors.totalAmount && (
                                <small className="p-invalid text-red-500">
                                    {errors.totalAmount?.message?.toString()}
                                </small>
                            )}
                            <div />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="monthlyFee">Cuota mensual</label>
                            <input
                                {...register("monthlyFee", {
                                    setValueAs: (value) => parseInt(value),
                                })}
                                id="monthlyFee"
                                type="number"
                                className="p-inputtext p-component"
                                placeholder="0.00"
                            />
                            {errors.monthlyFee && (
                                <small className="p-invalid text-red-500">
                                    {errors.monthlyFee?.message?.toString()}
                                </small>
                            )}
                            <div />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="amountFee">Por cuota</label>
                            <input
                                {...register("amountFee", {
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                id="amountFee"
                                type="number"
                                className="p-inputtext p-component"
                                placeholder="0.00"
                            />
                            {errors.amountFee && (
                                <small className="p-invalid text-red-500">
                                    {errors.amountFee?.message?.toString()}
                                </small>
                            )}
                            <div />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="leaseNumber">
                                Número de préstamo
                            </label>
                            <input
                                {...register("leaseNumber")}
                                id="leaseNumber"
                                type="text"
                                className="p-inputtext p-component"
                                placeholder="Ingrese el numero de préstamo"
                            />
                            {errors.leaseNumber && (
                                <small className="p-invalid text-red-500">
                                    {errors.leaseNumber.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="paymentMethod">
                                Método de pago
                            </label>
                            <div>
                                <SelectButton
                                    {...register("paymentMethod")}
                                    value={watch("paymentMethod")}
                                    onChange={(e) =>
                                        setValue("paymentMethod", e.value)
                                    }
                                    options={[
                                        { label: "Cheque", value: true },
                                        { label: "Nomina", value: false },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label
                                htmlFor="idDepositConcept"
                                className="w-full"
                            >
                                Deposito de préstamo
                            </label>
                            <Dropdown
                                value={values?.find(
                                    (item: any) =>
                                        item.idConcept ===
                                        (watch("idDepositConcept") ?? 0)
                                )}
                                onChange={(e: DropdownChangeEvent) => {
                                    setValue(
                                        "idDepositConcept",
                                        e.value ? e.value.idConcept : null
                                    );
                                }}
                                id="idDepositConcept"
                                options={values}
                                optionLabel="name"
                                placeholder="Seleccione una opción..."
                                filter
                                emptyMessage="No hay registros"
                            />
                            {errors.idDepositConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idDepositConcept.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6">
                            <label
                                htmlFor="idDiscountConcept"
                                className="w-full"
                            >
                                Descuento de préstamo
                            </label>
                            <Dropdown
                                value={values?.find(
                                    (item: any) =>
                                        item.idConcept ===
                                        (watch("idDiscountConcept") ?? 0)
                                )}
                                onChange={(e: DropdownChangeEvent) => {
                                    setValue(
                                        "idDiscountConcept",
                                        e.value ? e.value.idConcept : null
                                    );
                                }}
                                id="idDiscountConcept"
                                options={values}
                                optionLabel="name"
                                placeholder="Seleccione una opción..."
                                filter
                                emptyMessage="No hay registros"
                            />
                            {errors.idDiscountConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idDiscountConcept.message?.toString()}
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

export default AddLease;
