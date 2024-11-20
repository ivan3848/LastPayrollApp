import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { TABLE_NAME_RECURRENCY } from "@/constants/StatusTableName";
import { CONCEPT_TYPE_LEASE } from "@/constants/conceptTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { useForm } from "react-hook-form";
import { addLeaseService } from "./Services/LeaseService";
import LeaseFormSchema from "./Validation/LeaseFormSchema";
import { InputNumber } from "primereact/inputnumber";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";

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
        data.idDepositConcept = data.idDepositConcept ?? data.idConcept
        data.idDiscountConcept = data.idDiscountConcept ?? data.idConcept
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    // function FeeLease(e?: any) {
    //     const recurrency = watch("recurrency");
    //     if (e?.innerText) setValue("recurrency", e.innerText);

    //     const monthly = watch("monthlyFee", 0)!;
    //     let result = 0;
    //     if (recurrency == "Quincenal" && monthly > 0) {
    //         result = monthly / 2;
    //         setValue("amountFee", result);
    //     } else if (recurrency == "Mensual" && monthly > 0) {
    //         result = monthly / 1;
    //         setValue("amountFee", result);
    //     } else {
    //         setValue("amountFee", 0);
    //     }
    // }

    const calculateMonthlyFee = () => {
        const totalAmount = watch("totalAmount");
        const feeQuantity = calculateAmountFees();

        return feeQuantity == 1
            ? totalAmount
            : totalAmount / feeQuantity
    }

    const calculateAmountFees = (): number => {
        const start = watch("startDate") ? new Date(watch("startDate")) : new Date();
        const end = watch("endDate") ? new Date(watch("endDate")) : new Date();
        const recurrency = watch("idRecurrencyStatus");

        const startDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
        const endDate = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));

        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

        if (endDate < startDate) months -= 1;

        months = Math.max(0, months);
        return recurrency === 15 ? months * 2 : months;
    };

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
                                <small className="p-invalid text-red-500">
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
                                <small className="p-invalid text-red-500">
                                    {errors.idRecurrencyStatus.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="fees">Cantidad de cuotas</label>
                            <GenericInputNumber
                                id="fees"
                                isValid={!!errors.fees}
                                currentValue={calculateAmountFees()}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly
                                format={false}
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
                            <GenericInputNumber
                                id="totalAmount"
                                isValid={!!errors.fees}
                                setValue={setValue}
                                watch={watch}
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
                            <GenericInputNumber
                                id="monthlyFee"
                                isValid={!!errors.monthlyFee}
                                currentValue={watch("idRecurrencyStatus") == 16 ? calculateMonthlyFee() : calculateMonthlyFee() * 2}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly
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
                            <GenericInputNumber
                                id="amountFee"
                                isValid={!!errors.amountFee}
                                currentValue={calculateMonthlyFee()}
                                setValue={setValue}
                                watch={watch}
                                isReadOnly
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
                                        { label: "Cheque", value: false },
                                        { label: "Nomina", value: true },
                                    ]}
                                />
                                {errors.paymentMethod && (
                                    <small className="p-invalid text-red-500">
                                        {errors.paymentMethod.message?.toString()}
                                    </small>
                                )}
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
                                <small className="p-invalid text-red-500">
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
                                <small className="p-invalid text-red-500">
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
