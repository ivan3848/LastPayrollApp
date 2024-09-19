import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import AmortizationFormSchema from "./Validation/AmortizationFormSchema";
import useEditAmortization from "./Hooks/useEditAmortization";
import { CONCEPT_TYPE_LEASE } from "@/constants/conceptTypes";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import {
    TABLE_NAME_AMORTIZATION,
    TABLE_NAME_RECURRENCY,
} from "@/constants/StatusTableName";
import { SelectButton } from "primereact/selectbutton";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { set } from "zod";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_LEASE } from "@/constants/cacheKeys";

interface Props {
    entity: IAmortization;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditAmortization = ({
    entity,
    setEditEntityDialog,
    setSubmitted,
    toast,
    editEntityDialog,
}: Props) => {
    const { editEntityFormSchema } = AmortizationFormSchema();
    const expireQuery = useExpireSessionQuery([CACHE_KEY_LEASE]);

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IAmortization>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: entity,
    });

    const editEntity = useEditAmortization({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IAmortization) => {
        editEntity
            .mutateAsync({
                ...data,
            })
            .then(() => {
                expireQuery();
            });
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "payDate") {
                    setValue(
                        key as keyof IAmortization,
                        new Date(entity[key as keyof IAmortization] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IAmortization,
                    entity[key as keyof IAmortization]
                );
            });
        }
    }, [entity, setEditEntityDialog]);

    const onSubmit = (data: IAmortization) => {
        editEntity.mutate(data);
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "90vw" }}
            header="Editar préstamo"
            modal
            maximizable
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="idStatus" className="w-full">
                                Amortización
                            </label>
                            <GenericStatusDropDown
                                id="idStatus"
                                isValid={!!errors.idStatus}
                                setValue={setValue}
                                watch={watch}
                                isFocus={true}
                                tableName={TABLE_NAME_AMORTIZATION}
                            />
                            {errors.idStatus && (
                                <small className="p-invalid text-danger">
                                    {errors.idStatus.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="payDate">Fecha de pago</label>
                            <Calendar
                                id="payDate"
                                {...register("payDate")}
                                value={
                                    watch("payDate") ??
                                    new Date(entity.payDate!)
                                }
                                onChange={(e) =>
                                    setValue("payDate", new Date(e.value!))
                                }
                                showIcon
                                key={entity.payDate?.toString()}
                            />
                            {errors.payDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.payDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="amount">Cantidad</label>
                            <input
                                {...register("amount", {
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                value={watch("amount") ?? entity.amount}
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
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditAmortization;
