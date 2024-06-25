import { TABLE_NAME_CONCEPT_TYPE } from "@/constants/StatusTableName";
import useAccountingAccountQuery from "@/Features/accountingAccount/Hooks/useAccountingAccountQuery";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericCheckBox from "@/Features/Shared/Components/GenericCheckBox";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericInputNumber from "@/Features/Shared/Components/GenericInputNumber";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddConceptQuery from "../Hooks/useAddConceptQuery";
import { IConcept } from "../Types/IConcept";
import conceptFormSchemas from "../Validations/ConceptFormSchemas";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddConcept = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = conceptFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IConcept>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddConceptQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IConcept) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            header="Agregar Concepto"
            modal
            style={{ width: "450px" }}
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="idConceptType" className="w-full">
                        Tipo de concepto
                    </label>
                    <GenericStatusDropDown
                        id="idConceptType"
                        isValid={!!errors.idConceptType}
                        setValue={setValue}
                        watch={watch}
                        isFocus={true}
                        tableName={TABLE_NAME_CONCEPT_TYPE}
                    />
                    {errors.idConceptType && (
                        <small className="p-invalid text-danger">
                            {errors.idConceptType.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Concepto
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
                    <label htmlFor="conceptCode" className="w-full">
                        Código de concepto
                    </label>
                    <InputText
                        {...register("conceptCode")}
                        id="conceptCode"
                        className={classNames({
                            "p-invalid": errors.conceptCode,
                        })}
                    />
                    {errors.conceptCode && (
                        <small className="p-invalid text-danger">
                            {errors.conceptCode.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="idAccountingAccount" className="w-full">
                        Cuenta contable
                    </label>
                    <GenericDropDown
                        id="idAccountingAccount"
                        isValid={!!errors.idAccountingAccount}
                        text="name"
                        useQuery={useAccountingAccountQuery}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.idAccountingAccount && (
                        <small className="p-invalid text-danger">
                            {errors.idAccountingAccount.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="percentValue" className="w-full">
                        Porcentaje
                    </label>
                    <GenericInputNumber
                        {...register("percentValue")}
                        id="percentValue"
                        isValid={!!errors.percentValue}
                        minValue={0}
                        maxValue={100}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.percentValue && (
                        <small className="p-invalid text-danger">
                            {errors.percentValue.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="amount" className="w-full">
                        Monto
                    </label>
                    <GenericInputNumber
                        {...register("amount")}
                        id="amount"
                        isValid={!!errors.amount}
                        setValue={setValue}
                        watch={watch}
                    />
                    {errors.percentValue && (
                        <small className="p-invalid text-danger">
                            {errors.percentValue.message?.toString()}
                        </small>
                    )}
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isSpecial"
                                text="Especial"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isBonification"
                                text="Bonificación"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isCommission"
                                text="Comisión"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isAbsenteeism"
                                text="Absentismo"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isLease"
                                text="Préstamo"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isExtraHour"
                                text="Tipo de hora"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isTax"
                                text="Impuesto"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isCompany"
                                text="Compañía"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isInsurance"
                                text="Seguro"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="IsProfit"
                                text="Beneficio"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isDeduction"
                                text="Deducción"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="isOnlySecondPayroll"
                                text="Último pago de mes"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="BeforeIsr"
                                text="Excluir de ISR"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="IsForChargeTax"
                                text="Para TSS"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="IsForChargeTaxIsr"
                                text="Para ISR"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="toProjectTax"
                                text="Proyectar TSS"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <GenericCheckBox
                                id="toProjectIsr"
                                text="Proyectar ISR"
                                watch={watch}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddConcept;
