import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import ILeaseDetailPayment from "../../LeaseDetail/Types/ILeaseDetailPayment";
import LeaseDetailFormSchema from "../../LeaseDetail/Validation/LeaseDetailFormSchema";
import { addLeasePaymentService } from "../Services/LeaseService";
import { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useGetLeaseDetailByIdLease from "../../LeaseDetail/Hooks/useGetLeaseDetailByIdLease";
import { ILeaseDetail } from "../../LeaseDetail/Types/ILeaseDetail";
import { Card } from "primereact/card";
import { SelectButton } from "primereact/selectbutton";
import React from "react";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entity: ILease;
    submitted: boolean;
}

const AddLeasePayment = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
    entity,
    submitted,
}: Props) => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];

    const { addPaymentEntityFormSchema } = LeaseDetailFormSchema();
    const [addPaymentEntityDialog, setAddPaymentEntityDialog] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(false);

    const { data, isLoading } = useGetLeaseDetailByIdLease(
        params,
        listOfDependencies,
        entity.idLease
    );

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ILeaseDetailPayment>({
        resolver: zodResolver(addPaymentEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addLeasePaymentService,
    });

    const onSubmit = (data: ILeaseDetailPayment) => {
        setPaymentMethod(false);
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    const handlePayment = () => {
        setAddPaymentEntityDialog(true);
        setPaymentMethod(true);
    };
    const handlePaymentCancel = () => {
        setAddPaymentEntityDialog(false);
        setPaymentMethod(false);
    };

    const handleSubmitValidation = (data: ILeaseDetailPayment) => {
        setAddPaymentEntityDialog(false);
        //data.paymentMethod = paymentMethod;
        data.idLease = entity.idLease;
        onSubmit(data);
    };

    const addConfirmationDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={handlePaymentCancel}
            />
            <Button
                label="Confirmar"
                icon="pi pi-check"
                text
                onClick={handleSubmit(handleSubmitValidation)}
            />
        </>
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-DO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <Dialog
                visible={addPaymentEntityDialog}
                style={{ width: "450px" }}
                header="Pago de préstamo"
                modal
                footer={addConfirmationDialogFooter}
                onHide={() => setAddPaymentEntityDialog(false)}
            >
                <div className="flex align-items-center justify-content-center">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {id && (
                        <span>
                            ¿Está seguro que desea realizar esta acción?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={addEntityDialog}
                style={{ width: "85vw", overflow: "hidden" }}
                header="Realizar pago"
                modal
                maximizable
                className="p-fluid"
                onHide={hideDialog}
            >
                <form
                    onSubmit={
                        paymentMethod
                            ? handleSubmit(handleSubmitValidation)
                            : handleSubmit(handlePayment)
                    }
                    style={{ margin: "20px" }}
                >
                    <div className="col-12" style={{ margin: "20px" }}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="date">Fecha de pago</label>
                                <Calendar
                                    id="date"
                                    onChange={(e) => setValue("date", e.value!)}
                                    showIcon
                                    showButtonBar
                                />
                                {errors && (
                                    <small className="p-invalid text-red-500">
                                        {errors.date?.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="amount">Cantidad</label>
                                <input
                                    {...register("amount", {
                                        setValueAs: (value) =>
                                            parseFloat(value),
                                    })}
                                    id="amount"
                                    type="number"
                                    min={0}
                                    className="p-inputtext p-component"
                                    placeholder="0.00"
                                />
                                {errors.amount && (
                                    <small className="p-invalid text-red-500">
                                        {errors.amount.message?.toString()}
                                    </small>
                                )}
                                <div />
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
                                            { label: "Nómina", value: true },
                                        ]}
                                    />
                                    {errors.paymentMethod && (
                                        <small className="p-invalid text-red-500">
                                            {errors.paymentMethod.message?.toString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Card className="m-2">
                        <DataTable
                            value={data}
                            className="p-datatable-sm"
                            dataKey="idLeaseDetail"
                            paginator
                            removableSort
                            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                            sortOrder={
                                params.filter?.sorts?.[0]?.isAsc ? 1 : -1
                            }
                            sortMode="single"
                            rows={10}
                            rowsPerPageOptions={[5, 10, 15]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        >
                            <Column
                                field="amountFee"
                                header="Monto"
                                sortable
                                filter
                                filterField="amountFee"
                                showFilterMenuOptions={false}
                            ></Column>
                            <Column
                                field="payDate"
                                header="Fecha de pago"
                                body={(rowData: ILeaseDetail) =>
                                    formatDate(rowData.payDate?.toString()!)
                                }
                            />
                            <Column
                                field="numberFee"
                                header="cuotas"
                                sortable
                                filter
                                filterField="numberFee"
                                showFilterMenuOptions={false}
                            ></Column>
                        </DataTable>
                    </Card>
                    <DialogFooterButtons hideDialog={hideDialog} />
                </form>
            </Dialog>
        </>
    );
};

export default AddLeasePayment;
